// SubjectList.js (With Square Cards Example)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ROOT_FOLDER_ID = '1dbUzdT34_iU9y9C5vwa6ewmkgLjagIKi';

function SubjectList() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/resources/sub/${ROOT_FOLDER_ID}`)
      .then(res => {
        const { items } = res.data;
        const onlyFolders = items.filter(item => item.mimeType === 'application/vnd.google-apps.folder');
        setFolders(onlyFolders);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching folders:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Hero Section (optional: same as before, or keep your reduced-space code) */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: '200px', md: '350px' },
          background: 'linear-gradient(to bottom, #D1EEB2 0%, #D1EEB2 70%, #ffffff 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          pt: { xs: 2, md: 3 },
          px: 2,
          mb: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#000',
            textAlign: 'center',
            mt: 4,
          }}
        >
          Welcome to ConnectED
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#555',
            mt: 1,
            maxWidth: 600,
            textAlign: 'center',
          }}
        >
          Explore a wide range of subjects and resources designed by students, for students.
        </Typography>
      </Box>

      {/* Subjects Section */}
      <Container sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4, color: '#008080' }}>
          Subjects
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {folders.map(folder => (
            <Grid key={folder.id} item>
              {/* Force each card to be 200 x 200 */}
              <Card
                variant="outlined"
                sx={{
                  width: '250px',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 18px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {folder.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/folder/${folder.id}`)}
                  >
                    Open Subject
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default SubjectList;
