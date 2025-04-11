import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/resources/all')
      .then(response => {
        setResources(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching resources:', error);
        setLoading(false);
      });
  }, []);

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
        Available Learning Resources
      </Typography>
      <Grid container spacing={3}>
        {resources.map((resource) => {
          // Check if item is a folder
          const isFolder = resource.mimeType === 'application/vnd.google-apps.folder';

          return (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <Card
                variant="outlined"
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {resource.name}
                  </Typography>
                  {/* You could display "Folder" or "File" here if you like */}
                </CardContent>
                <CardActions sx={{ mt: 'auto' }}>
                  {isFolder ? (
                    <Button
                      size="small"
                      onClick={() => navigate(`/folder/${resource.id}`)}
                    >
                      Open Folder
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      onClick={() => navigate(`/view/${resource.id}`)}
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
    </>
  );
}

export default ResourceList;
