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
import { Code, Design, Rocket, School } from '@mui/icons-material';
import { authors } from '../data/sampleData';

const AboutPage: React.FC = () => {
  const theme = useTheme();

  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'CSS/SCSS', level: 90 },
    { name: 'Material-UI', level: 85 },
  ];

  const values = [
    {
      icon: <Code />,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code that follows best practices and industry standards.',
    },
    {
      icon: <Design />,
      title: 'User Experience',
      description: 'Creating intuitive and beautiful interfaces that provide exceptional user experiences.',
    },
    {
      icon: <Rocket />,
      title: 'Performance',
      description: 'Building fast and efficient applications that deliver optimal performance across all devices.',
    },
    {
      icon: <School />,
      title: 'Continuous Learning',
      description: 'Staying up-to-date with the latest technologies and sharing knowledge with the community.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          About TechBlog
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
          We're passionate developers dedicated to sharing knowledge, insights, and best practices 
          in modern web development. Our mission is to help developers grow and build amazing applications.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box sx={{ mb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              At TechBlog, we believe that great software comes from great developers. Our mission is to 
              provide high-quality content that helps developers at all levels improve their skills and 
              stay current with the rapidly evolving world of web development.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
              We focus on practical, real-world solutions that you can implement in your projects today. 
              From beginner tutorials to advanced architectural patterns, we cover the full spectrum of 
              modern web development.
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
          Our Values
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
          Technologies We Cover
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {skills.map((skill) => (
            <Grid item key={skill.name}>
              <Chip
                label={skill.name}
                variant="outlined"
                size="large"
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
          Meet Our Authors
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
      <Box sx={{ backgroundColor: 'grey.50', py: 6, borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
          Our Impact
        </Typography>
        <Grid container spacing={4} textAlign="center">
            <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              50+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Articles Published
            </Typography>
          </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              10K+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Monthly Readers
            </Typography>
          </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              5
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Years Experience
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
