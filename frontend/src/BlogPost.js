// BlogPost.js
import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const blogPosts = [
  {
    id: 'spanish',
    title: 'Spanish Study Strategies',
    content: `Spanish Study Strategies:

Mainly study your grammar and vocabulary to boost your writing grades and comprehension skills. 
Practice writing questions related to your Global Context to strengthen your overall language abilities.

This approach will help enhance both your writing and comprehension capabilities.`,
  },
  {
    id: 'english',
    title: 'Effective English Analysis Techniques',
    content: `Effective English Analysis Techniques:

Task 1 is all about analysis – use responses from structured questions in your compare-and-contrast. 
Use your existing answers to form a unified analysis rather than writing new content.

A solid approach is to compare the theme (both texts focus on the same theme) and contrast their techniques,
keeping the analysis unified in a single paragraph.`,
  },
  {
    id: 'math',
    title: 'Math Exam Preparation Tips',
    content: `Math Exam Preparation Tips:

Before the exam:
● Practice IGCSE past paper questions in addition to MYP ones—logical thinking is crucial.
● Use the Oxford MYP textbook to your advantage for Criteria D questions.

During the exam:
Focus on Criteria B first if you feel Criteria D requires more critical thinking.`,
  },
  {
    id: 'history',
    title: 'History Research and Analysis',
    content: `History Research and Analysis:

Criterion B:
NEVER explicitly mention the KC, GC, and RC in your research question. Ensure it is TIME BOUND and includes a COMMAND TERM (e.g., why, how, to what extent).
Justify your research question in 200 words; relate it to the SOI, KC, GC, and RC. Consider:
- Is the question time-bound, specific, and historically accurate?
- How do the KC, GC, and RC interrelate and link to the topic?

Primary sources include diary entries, newspaper articles, manuscripts, interviews, letters, photographs, cartoons, and raw data.
  ADD WHY THIS IS IMPORTANT.

Secondary sources include textbooks and credible websites. 
  ADD WHY THIS IS IMPORTANT.

History websites: Britannica.com, Worldhistory.org, Archives.gov.

Criterion D (OPVL):
- Origin: Who, what, when? Primary or secondary? Reliability?
- Purpose: The intended message or audience.
- Value: How it aids your analysis.
- Limitations: Any biases or omissions.`,
  },
  {
    id: 'geography',
    title: 'Geography Research and Analysis',
    content: `Geography Research and Analysis:

Criteria B:
Formulate a research question starting with what, why, can, or to what extent. 
Make it very specific—narrow it down multiple times until it can’t be further refined.
Ensure the question is analytic rather than descriptive.

Justification:
- Split into two paragraphs: one explaining why the research is conducted (with facts) and the main aim.
- Discuss the appropriateness of the research methodology with a command term, clear time limit, and a focused approach.

Form two sub-questions to aid your research.

Sources:
Specify two primary and two secondary sources—be specific, not generic.

OPVL:
- Origin: Who, what, when? Primary/secondary? Credibility?
- Purpose: The intended audience or message.
- Value: Its reliability and usefulness.
- Limitations: What’s missing or potentially biased.`,
  },
];

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Blog post not found.</Typography>
        <Button variant="contained" color="secondary" onClick={() => navigate('/blog')} sx={{ mt: 2 }}>
          Back to Blog
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: '8px' }}>
        <Typography variant="h3" sx={{ mb: 3, fontWeight: 700, color: '#242424' }}>
          {post.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-line',
            lineHeight: 1.7,
            fontSize: { xs: '1rem', md: '1.125rem' },
            color: '#333',
          }}
        >
          {post.content}
        </Typography>
        <Box sx={{ textAlign: 'right', mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default BlogPost;
