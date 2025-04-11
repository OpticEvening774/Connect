// ResourceViewer.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ResourceViewer() {
  const { fileId } = useParams();
  const [embedUrl, setEmbedUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/preview/${fileId}`)
      .then(response => {
        setEmbedUrl(response.data.embedUrl);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching preview URL:', error);
        setLoading(false);
      });
  }, [fileId]);

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 2, fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
        Document Preview
      </Typography>
      <Box sx={{
        position: 'relative',
        paddingTop: '56.25%' /* 16:9 Aspect Ratio */
      }}>
        <iframe
          title="Resource Preview"
          src={embedUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          allow="autoplay"
        />
      </Box>
    </Paper>
  );
}

export default ResourceViewer;
