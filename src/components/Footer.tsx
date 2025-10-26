import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
} from '@mui/material';
import {
  Twitter,
  LinkedIn,
  GitHub,
  Email,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Muthukumar Jayamurugan
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              UI Lead with 12 years of extensive experience in leading the development and implementation 
              of high-performance web applications. Expertise in React, Angular, TypeScript, and Micro Frontend architecture.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component={Link}
                href="https://twitter.com/devmuthu"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'primary.main' }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                component={Link}
                href="https://linkedin.com/in/muthukumar-jayamurugan"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'primary.main' }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                component={Link}
                href="https://github.com/devmuthu"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'primary.main' }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                component={Link}
                href="mailto:muthukumar.jayamurugan@gmail.com"
                size="small"
                sx={{ color: 'primary.main' }}
              >
                <Email />
              </IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/blog?category=react" color="text.secondary" underline="hover">
                React
              </Link>
              <Link href="/blog?category=css" color="text.secondary" underline="hover">
                CSS
              </Link>
              <Link href="/blog?category=nextjs" color="text.secondary" underline="hover">
                Next.js
              </Link>
              <Link href="/blog?category=ai-ml" color="text.secondary" underline="hover">
                AI/ML
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="text.secondary" underline="hover">
                Home
              </Link>
              <Link href="/blog" color="text.secondary" underline="hover">
                Blog
              </Link>
              <Link href="/about" color="text.secondary" underline="hover">
                About
              </Link>
              <Link href="/contact" color="text.secondary" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Stay updated with the latest articles and tutorials. Subscribe to our newsletter for weekly insights.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Built with ❤️ using React 18 & Material-UI
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            mt: 4,
            pt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Muthukumar Jayamurugan. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/privacy" color="text.secondary" underline="hover" variant="body2">
              Privacy Policy
            </Link>
            <Link href="/terms" color="text.secondary" underline="hover" variant="body2">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
