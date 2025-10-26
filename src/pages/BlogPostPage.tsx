import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
  Button,
  Divider,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Grid,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  AccessTime,
  CalendarToday,
  Facebook,
  Twitter,
  LinkedIn,
} from '@mui/icons-material';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { blogPosts, authors } from '../data/blogData';
import ReactMarkdown from 'react-markdown';

const BlogPostPage: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.id === id);
  const author = authors.find(a => a.name === post?.author);
  const relatedPosts = blogPosts
    .filter(p => p.id !== id && p.category === post?.category)
    .slice(0, 3);

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Post Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The article you're looking for doesn't exist.
        </Typography>
        <Button
          component={RouterLink}
          to="/blog"
          variant="contained"
          startIcon={<ArrowBack />}
        >
          Back to Blog
        </Button>
      </Container>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Home
        </Link>
        <Link component={RouterLink} to="/blog" underline="hover" color="inherit">
          Blog
        </Link>
        <Typography color="text.primary">{post.category}</Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Article Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          <Chip
            label={post.category}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${post.readTime} min read`}
            icon={<AccessTime />}
            variant="outlined"
          />
          {post.featured && (
            <Chip
              label="Featured"
              color="secondary"
              variant="filled"
            />
          )}
        </Box>

        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 3,
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{
            mb: 4,
            lineHeight: 1.6,
            fontSize: '1.1rem',
          }}
        >
          {post.excerpt}
        </Typography>

        {/* Author Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar
            src={author?.avatar}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {post.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {author?.bio}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <CalendarToday sx={{ fontSize: 16 }} />
              <Typography variant="body2" color="text.secondary">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Share Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Share:
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleShare('twitter')}
            sx={{ color: '#1DA1F2' }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleShare('facebook')}
            sx={{ color: '#4267B2' }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleShare('linkedin')}
            sx={{ color: '#0077B5' }}
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Box>

      {/* Featured Image */}
      {post.imageUrl && (
        <Box sx={{ mb: 4 }}>
          <img
            src={post.imageUrl}
            alt={post.title}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </Box>
      )}

      {/* Article Content */}
      <Box
        sx={{
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            fontWeight: 'bold',
            mt: 4,
            mb: 2,
          },
          '& p': {
            mb: 2,
            lineHeight: 1.7,
            fontSize: '1.1rem',
          },
          '& pre': {
            backgroundColor: theme.palette.grey[800],
            padding: 2,
            borderRadius: 1,
            overflow: 'auto',
            mb: 2,
            border: '1px solid',
            borderColor: 'divider',
          },
          '& code': {
            backgroundColor: theme.palette.grey[800],
            padding: '2px 4px',
            borderRadius: '4px',
            fontSize: '0.9em',
            border: '1px solid',
            borderColor: 'divider',
          },
          '& ul, & ol': {
            mb: 2,
            pl: 3,
          },
          '& li': {
            mb: 1,
            lineHeight: 1.6,
          },
          '& blockquote': {
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            paddingLeft: 2,
            margin: '2rem 0',
            fontStyle: 'italic',
            backgroundColor: theme.palette.grey[800],
            padding: 2,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Box>

      {/* Tags */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Tags
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Related Articles
          </Typography>
          <Grid container spacing={3}>
            {relatedPosts.map((relatedPost) => (
              <Grid size={{ xs: 12, md: 4 }} key={relatedPost.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <img
                    src={relatedPost.imageUrl}
                    alt={relatedPost.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {relatedPost.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {relatedPost.excerpt}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Button
                      component={RouterLink}
                      to={`/blog/${relatedPost.id}`}
                      size="small"
                      fullWidth
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default BlogPostPage;