import React from 'react';
import { useHomePageData } from '../hooks/useBlog';
import { CircularProgress, Alert, Typography, Box, Container } from '@mui/material';

// Example component showing how to use the new architecture
const HomePageExample: React.FC = () => {
  const { data: homeData, loading, error } = useHomePageData();

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading homepage data: {error.message}
        </Alert>
      </Container>
    );
  }

  if (!homeData) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>No data available</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Our Blog
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Featured Posts ({homeData.featuredPosts.length})
        </Typography>
        {homeData.featuredPosts.map(post => (
          <Typography key={post.id} variant="body1">
            • {post.title}
          </Typography>
        ))}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Posts ({homeData.recentPosts.length})
        </Typography>
        {homeData.recentPosts.map(post => (
          <Typography key={post.id} variant="body1">
            • {post.title}
          </Typography>
        ))}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Popular Posts ({homeData.popularPosts.length})
        </Typography>
        {homeData.popularPosts.map(post => (
          <Typography key={post.id} variant="body1">
            • {post.title}
          </Typography>
        ))}
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Categories ({homeData.categories.length})
        </Typography>
        {homeData.categories.map(category => (
          <Typography key={category.id} variant="body1">
            • {category.name}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default HomePageExample;

