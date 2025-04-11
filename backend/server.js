/**
 * server.js - Express backend for Learning Resources
 *
 * Endpoints:
 *   - GET /api/resources/tree        => Returns a tree of folders/files recursively.
 *   - GET /api/resources/all         => Returns a flat list of all files.
 *   - GET /api/resources/sub/:folderId => Returns immediate children of a folder.
 *   - GET /api/preview/:fileId       => Returns an embeddable preview URL for a file.
 *
 * Environment variables required:
 *   - PORT             (optional, defaults to 5000)
 *   - DRIVE_FOLDER_ID  (the root Drive folder ID to read)
 *   - GOOGLE_SERVICE_ACCOUNT (raw JSON service account credentials)
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { google } = require('googleapis');
const path = require('path');

// 1) Load environment variables from .env (for local dev only).
//    In production (Railway), .env is NOT used; environment variables come from Railway's dashboard.
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 2) Parse the service account JSON from GOOGLE_SERVICE_ACCOUNT
let serviceAccount;
try {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT environment variable.");
  }
  serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  console.log("Service account JSON loaded successfully.");
} catch (error) {
  console.error("Error parsing GOOGLE_SERVICE_ACCOUNT:", error);
  process.exit(1);
}

// 3) Initialize Google Auth using the parsed credentials
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

// 4) Create a Drive client
const drive = google.drive({ version: 'v3', auth });

// 5) Helper function to recursively build a folder/file tree
async function listFilesRecursively(folderId) {
  const result = {
    id: folderId,
    name: '',
    mimeType: 'application/vnd.google-apps.folder',
    children: []
  };

  try {
    // Get folder metadata
    const folderMeta = await drive.files.get({
      fileId: folderId,
      fields: 'id, name, mimeType'
    });
    result.name = folderMeta.data.name;

    // List immediate children
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType)'
    });
    const files = res.data.files || [];

    // Recurse or push file objects
    for (const file of files) {
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        const subfolder = await listFilesRecursively(file.id);
        result.children.push(subfolder);
      } else {
        result.children.push({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType
        });
      }
    }
  } catch (error) {
    console.error('Error listing folder recursively:', error.message);
  }

  return result;
}

// 6) Helper to recursively list *all* files in a flat array
async function listAllFiles(folderId, allFiles = []) {
  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType)'
    });
    const files = res.data.files || [];

    for (const file of files) {
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        await listAllFiles(file.id, allFiles);
      } else {
        allFiles.push({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType
        });
      }
    }
  } catch (error) {
    console.error('Error listing all files:', error.message);
  }
  return allFiles;
}

// 7) Endpoints

// Returns a tree structure (folders/files) recursively
app.get('/api/resources/tree', async (req, res) => {
  try {
    const tree = await listFilesRecursively(process.env.DRIVE_FOLDER_ID);
    res.json(tree);
  } catch (error) {
    console.error('Error retrieving tree structure:', error.message);
    res.status(500).json({ error: 'Failed to retrieve folder tree' });
  }
});

// Returns a flat list of all files, ignoring folder structure
app.get('/api/resources/all', async (req, res) => {
  try {
    const files = await listAllFiles(process.env.DRIVE_FOLDER_ID);
    res.json(files);
  } catch (error) {
    console.error('Error retrieving files:', error.message);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

// Returns immediate children of a specific folder
app.get('/api/resources/sub/:folderId', async (req, res) => {
  try {
    const { folderId } = req.params;
    const folderMeta = await drive.files.get({
      fileId: folderId,
      fields: 'id, name, mimeType'
    });
    const listResponse = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType)'
    });
    res.json({
      folderName: folderMeta.data.name,
      items: listResponse.data.files || []
    });
  } catch (error) {
    console.error('Error retrieving subfolder:', error.message);
    res.status(500).json({ error: 'Failed to retrieve subfolder' });
  }
});

// Returns an embeddable preview URL for a file
app.get('/api/preview/:fileId', (req, res) => {
  const { fileId } = req.params;
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview?embedded=true`;
  res.json({ embedUrl });
});

// 8) Serve the React build (assuming you built your frontend into ../frontend/build)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// For React SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// 9) Start the server
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
