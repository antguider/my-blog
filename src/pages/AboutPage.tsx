import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import { Code, Palette, Rocket, School } from '@mui/icons-material';
import { authors } from '../data/blogData';

const AboutPage: React.FC = () => {
  const theme = useTheme();

  const skills = [
    { name: 'React', level: 99 },
    { name: 'Angular', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'Micro Frontends', level: 85 },
    { name: 'NX Monorepo', level: 90 },
    { name: 'AWS', level: 75 },
    { name: 'Testing (Jest/Playwright)', level: 85 },
    { name: 'CI/CD', level: 85 },
    { name: 'Agile/Scrum', level: 90 },
  ];

  const values = [
    {
      icon: <Code />,
      title: 'Technical Leadership',
      description: 'Leading teams of 5-10 developers with proven success in architecture design and technical strategy.',
    },
    {
      icon: <Palette />,
      title: 'Frontend Architecture',
      description: 'Designing scalable micro frontend architectures and implementing design systems for enterprise applications.',
    },
    {
      icon: <Rocket />,
      title: 'Performance Optimization',
      description: 'Achieving 40%+ load time reduction through advanced optimization techniques and CI/CD pipeline improvements.',
    },
    {
      icon: <School />,
      title: 'Agile Methodologies',
      description: 'Scrum Master with expertise in velocity planning, sprint execution, and continuous improvement practices.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          About Muthukumar Jayamurugan
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
          UI Lead with 12 years of extensive experience in leading the development and implementation 
          of high-performance web applications. Expertise in React, Angular, TypeScript, and Micro Frontend architecture.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Professional Summary
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              Seasoned UI Lead with 12 years experience building scalable web applications. Expertise in React, 
              Angular, TypeScript, and Micro Frontend architecture. Proven success leading teams (5-10 developers), 
              optimizing performance (40%+ load time reduction), and implementing design systems.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              Agile practitioner with strong leadership in CI/CD pipelines and frontend architecture. Currently serving 
              as Member of Technical Staff at Aquera, leading Angular NX migration and component library development 
              for enterprise applications.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
                backgroundColor: theme.palette.primary.light,
                borderRadius: 2,
                color: 'white',
              }}
            >
              <Typography variant="h1" sx={{ fontSize: '6rem', opacity: 0.8 }}>
                💻
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Values Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Core Competencies
        </Typography>
        <Grid container spacing={3}>
          {values.map((value, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'primary.main',
                    }}
                  >
                    {React.cloneElement(value.icon, { sx: { fontSize: 40 } })}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Skills Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Technical Skills
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {skills.map((skill) => (
            <Grid size="auto" key={skill.name}>
              <Chip
                label={skill.name}
                variant="outlined"
                size="medium"
                sx={{
                  fontSize: '1rem',
                  padding: '8px 16px',
                  height: 'auto',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Professional Experience
        </Typography>
        <Grid container spacing={4}>
          {authors.map((author) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={author.id}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Avatar
                    src={author.avatar}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {author.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {author.bio}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {author.socialLinks.twitter && (
                      <Chip
                        label="Twitter"
                        size="small"
                        variant="outlined"
                        component="a"
                        href={author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    )}
                    {author.socialLinks.linkedin && (
                      <Chip
                        label="LinkedIn"
                        size="small"
                        variant="outlined"
                        component="a"
                        href={author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    )}
                    {author.socialLinks.github && (
                      <Chip
                        label="GitHub"
                        size="small"
                        variant="outlined"
                        component="a"
                        href={author.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 6, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Career Highlights
        </Typography>
        <Grid container spacing={4} textAlign="center">
            <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              12+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Years Experience
            </Typography>
          </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              10+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Team Members Led
            </Typography>
          </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              40%+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Performance Improvement
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
