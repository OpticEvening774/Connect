// SubfolderView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid, Card, CardContent, CardActions,
  Typography, Button, CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function SubfolderView() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [folderName, setFolderName] = useState('Loading...');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/resources/sub/${folderId}`)
      .then(response => {
        setFolderName(response.data.folderName || 'Untitled Folder');
        setItems(response.data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching subfolder:', err);
        setLoading(false);
      });
  }, [folderId]);

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        {folderName}
      </Typography>
      {items.length === 0 ? (
        <Typography align="center">No items in this folder.</Typography>
      ) : (
        <Grid container spacing={3}>
          {items.map(item => {
            const isFolder = item.mimeType === 'application/vnd.google-apps.folder';
            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  variant="outlined"
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: 'auto' }}>
                    {isFolder ? (
                      <Button
                        size="small"
                        onClick={() => navigate(`/folder/${item.id}`)}
                      >
                        Open Subfolder
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        onClick={() => navigate(`/view/${item.id}`)}
                      >
                        View File
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}

export default SubfolderView;
