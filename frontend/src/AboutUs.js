// AboutUs.js
import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

function AboutUs() {
  return (
    <>
      {/* Hero Section - Reduced Height + Less bottom margin */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: '120px', md: '160px' }, // Lower hero height
          background: 'linear-gradient(to bottom, #D1EEB2 0%, #ffffff 70%)',
          /* transitions from #D1EEB2 to white at 70% for a gentle gradient */
          display: 'flex',
          alignItems: 'flex-end', // Places text near the bottom
          justifyContent: 'center',
          pb: { xs: 1, md: 2 }, // Less padding at the bottom
          px: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: '#000',
            textAlign: 'center',
            mb: 0, // remove default margin below heading
          }}
        >
          ABOUT US
        </Typography>
      </Box>

      {/* Main Content (White Panel) */}
      <Container maxWidth="md" sx={{ mt: { xs: 2, md: 3 }, mb: { xs: 6, md: 8 } }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '8px',
            backgroundColor: '#fff',
          }}
        >
          {/* WHO WE ARE Section */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#008080',
              mb: 2,
            }}
          >
            WHO WE ARE
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            ConnectED Knowledge Hub is your one-stop destination for academic resources,
            IB-focused guidance, and subject-specific materials—created by students, for students.
            Our mission is to simplify the IB curriculum with modern, well-structured study
            materials, so you can achieve excellence while learning smarter.
          </Typography>

          {/* WE'RE DIFFERENT Section */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#008080',
              mb: 2,
            }}
          >
            WE'RE DIFFERENT
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Whether you’re seeking revision notes, practical assessments, or fresh perspectives on 
            challenging topics, ConnectED provides straightforward, student-led resources you can trust.
            Our platform is built on the belief that collaboration and shared expertise yield the best
            learning outcomes. Join our community of curious learners and discover a more confident 
            approach to academics.
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default AboutUs;
