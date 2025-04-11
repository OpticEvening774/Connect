// Blog.js
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const blogPosts = [
  {
    id: 'spanish',
    title: 'Spanish Study Strategies',
    excerpt: `Mainly study your grammar and vocabulary to boost your writing grades and comprehension skills. Practice writing questions related to your Global Context.`,
    content: `Spanish Study Strategies:

Mainly study your grammar and vocabulary to boost your writing grades and comprehension skills. Practice writing questions related to your Global Context to strengthen your overall language abilities.

This approach will help you enhance your writing substantially while simultaneously improving your ability to comprehend texts.`,
  },
  {
    id: 'english',
    title: 'Effective English Analysis Techniques',
    excerpt: `Task 1 is all about analysis – use responses from structured questions in your compare-and-contrast to create a cohesive analysis.`,
    content: `Effective English Analysis Techniques:

Task 1 is all about analysis – it starts with structured questions and then moves into a compare-and-contrast section.
Biggest tip: USE YOUR RESPONSES FROM THE STRUCTURED QUESTIONS IN YOUR COMPARE-AND-CONTRAST! This will save you a lot of time. The structured questions are usually designed to lead directly into the compare-and-contrast section, so don't waste effort writing a whole new analysis. Instead, copy and paste what you've written and tweak it to fit the compare-and-contrast format.

A solid approach is to compare the theme—state that both texts focus on the same theme—and then contrast their techniques, as the text types will always be different. Most importantly, talk about both texts in the same paragraph to show clear comparisons.`,
  },
  {
    id: 'math',
    title: 'Math Exam Preparation Tips',
    excerpt: `Practice IGCSE past paper questions alongside MYP ones. Focus on logical thinking before the exam, and tackle the simpler sections first.`,
    content: `Math Exam Preparation Tips:

Before the exam:
● Practice IGCSE past paper questions in addition to MYP ones, because they require more logical thinking.
● For Criteria D, use the Oxford MYP textbook to your advantage—each unit has 3 to 4 criteria D questions with the marking scheme.

During the exam:
Criteria B is usually the simplest and most predictable section. Tackle that first if you feel Criteria D requires the most critical thinking, to save as much time as you can.`,
  },
  {
    id: 'history',
    title: 'History Research and Analysis',
    excerpt: `Learn to form time-bound research questions, justify them with primary and secondary sources, and analyze them effectively.`,
    content: `History Research and Analysis:

Criterion B:
NEVER explicitly mention the KC, GC, and RC in your research question. Ensure it is TIME BOUND and includes a COMMAND TERM such as why, how, or to what extent.
Justify your RQ in 200 words. Relate it to the SOI, KC, GC, and RC. Ask:
- Is the question time-bound? Specific? Historically accurate?
- How is it relevant to the SOI?
- How are the KC, GC, and RC interrelated and linked to the topic of the RQ?

Primary sources: Diary entries, newspaper articles from the time, manuscripts, interviews, letters, photographs, cartoons, raw data.
  ADD WHY THIS IS IMPORTANT.

Secondary sources: Textbooks, credible websites, processed data.
  ADD WHY THIS IS IMPORTANT.

History websites to consider: Britannica.com, Worldhistory.org, Archives.gov.

Criterion D (OPVL):
- Origin: Who, what, when? Primary or secondary? Credible? Where?
- Purpose: The intended message or audience.
- Value: How it helps a history student.
- Limitations: Bias, propaganda, or factual omissions.

General Tips:
- Write your analysis in a connected paragraph.
- Avoid overly descriptive language. Use comparative language and avoid terms like “small,” “huge,” or “massive,” except in your conclusion if necessary.
- For each section, list real-world examples to support your analysis.`,
  },
  {
    id: 'geography',
    title: 'Geography Research and Analysis',
    excerpt: `Formulate a specific and analytic research question based on the SOI. Justify your research with detailed sources.`,
    content: `Geography Research and Analysis:

Criteria B:
Formulate a research question:
- Start with what, why, can, or to what extent.
- Narrow it down multiple times until it's very specific.
- Ensure it's analytic rather than descriptive.

Justification:
Split the justification into two paragraphs:
1. Explain why the research is being conducted—reference facts supporting the RQ.
2. State the main aim of the RQ and why it is appropriate.

Discuss the research methodology:
- Use a command term.
- Provide a time limit and focus to ensure it's analytical.

Two sub-questions should be formulated to aid your research.

Sources:
Specify two primary sources and two secondary sources; be very specific.

OPVL:
- Origin: Who created the source? When? Was it primary or secondary?
- Purpose: The goal behind the source.
- Value: Its reliability and usefulness.
- Limitations: What it fails to communicate.`,
  },
];

function Blog() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: 700, color: '#008080' }}>
        Blog (Under Work)
      </Typography>
      <Grid container spacing={4}>
        {blogPosts.map((post) => (
          <Grid key={post.id} item xs={12}>
            <Card variant="outlined" sx={{ transition: 'transform 0.2s, box-shadow 0.2s', p: 2, '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 18px rgba(0,0,0,0.1)' } }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#242424' }}>
                  {post.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#555' }}>
                  {post.excerpt}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" color="secondary" size="small" onClick={() => navigate(`/blog/${post.id}`)}>
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Blog;
