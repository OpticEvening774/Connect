/**
 * server.js - Express backend for Learning Resources
 *
 * This server uses the Google Drive API to list files, including recursively scanning
 * subfolders. It provides the following endpoints:
 *   - GET /api/resources/tree  => Returns a tree structure (folders and files) of the entire Drive folder.
 *   - GET /api/resources/all   => Returns a flat list of all files (ignoring folder structure).
 *   - GET /api/resources/sub/:folderId  => Returns the immediate children of a folder.
 *   - GET /api/preview/:fileId  => Returns an embeddable preview URL for a file.
 *
 * Ensure that .env is configured with: PORT, DRIVE_FOLDER_ID, GOOGLE_APPLICATION_CREDENTIALS.
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { google } = require('googleapis');
const path = require('path');

// Load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Google Drive API setup using service account credentials
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  // If you wish, specify the keyFile using an environment variable:
  // keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || './backend/connected-456212-c3e810ec146f.json'
});
const drive = google.drive({ version: 'v3', auth });

// Function to recursively build a tree structure of folder and file data
async function listFilesRecursively(folderId) {
  const result = {
    id: folderId,
    name: '',
    mimeType: 'application/vnd.google-apps.folder',
    children: []
  };

  try {
    // Get folder metadata (name, etc.)
    const folderMeta = await drive.files.get({
      fileId: folderId,
      fields: 'id, name, mimeType'
    });
    result.name = folderMeta.data.name;

    // List immediate children of the folder
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType)'
    });
    const files = res.data.files || [];

    // Process each file/folder
    for (const file of files) {
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        // Recurse into subfolder
        const subfolder = await listFilesRecursively(file.id);
        result.children.push(subfolder);
      } else {
        // Simple file object
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

// Function to recursively add all files into a flat list
async function listAllFiles(folderId, allFiles = []) {
  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType)'
    });
    const files = res.data.files || [];
    for (const file of files) {
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        // Recur for subfolder
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

// Endpoint to return a tree of folders and files
app.get('/api/resources/tree', async (req, res) => {
  try {
    const tree = await listFilesRecursively(process.env.DRIVE_FOLDER_ID);
    res.json(tree);
  } catch (error) {
    console.error('Error retrieving tree structure:', error.message);
    res.status(500).json({ error: 'Failed to retrieve folder tree' });
  }
});

// Endpoint to return a flat list of all files (ignoring folder structure)
app.get('/api/resources/all', async (req, res) => {
  try {
    const files = await listAllFiles(process.env.DRIVE_FOLDER_ID);
    res.json(files);
  } catch (error) {
    console.error('Error retrieving files:', error.message);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

// Endpoint to return the immediate children of a specific folder
app.get('/api/resources/sub/:folderId', async (req, res) => {
  try {
    const { folderId } = req.params;
    // Get folder metadata for name
    const folderMeta = await drive.files.get({
      fileId: folderId,
      fields: 'id, name, mimeType'
    });
    // List immediate children in the folder
    const listResponse = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType)'
    });
    const items = listResponse.data.files || [];
    res.json({
      folderName: folderMeta.data.name,
      items
    });
  } catch (error) {
    console.error('Error retrieving subfolder:', error.message);
    res.status(500).json({ error: 'Failed to retrieve subfolder' });
  }
});

// Endpoint to generate an embeddable preview URL for a file
app.get('/api/preview/:fileId', (req, res) => {
  const { fileId } = req.params;
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview?embedded=true`;
  res.json({ embedUrl });
});

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catch-all" handler: for any request that doesn't match your API routes, send back React's index.html.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
