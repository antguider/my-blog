import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../data/blogData';

interface HeaderProps {
  onMenuToggle: () => void;
  mobileOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, mobileOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Create category navigation items
  const categoryItems = categories.map(category => ({
    label: category.name,
    path: `/blog?category=${category.slug}`,
    slug: category.slug
  }));

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" component="div">
          TechBlog
        </Typography>
        <IconButton onClick={onMenuToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {categoryItems.map((item) => (
          <ListItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={onMenuToggle}
            sx={{
              backgroundColor: location.search.includes(item.slug) ? theme.palette.primary.light : 'transparent',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.dark',
                },
              }}
            >
              TechBlog
            </Typography>

            {isMobile ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onMenuToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {categoryItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: location.search.includes(item.slug) ? 'primary.main' : 'text.primary',
                      fontWeight: location.search.includes(item.slug) ? 'bold' : 'normal',
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'primary.dark',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={onMenuToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
