import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: '#f0f0f0', color: 'black', boxShadow: 'none', WebkitBackdropFilter: 'blur(10px)', backdropFilter: 'blur(10px)', top: 5, pl: 3, mr: 1, borderRadius: '80px', opacity: .9 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontFamily: 'Anton SC', letterSpacing: 6 }}>
            MarkBlog
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button color="inherit" component={NavLink} to="/blogs" sx={{ mr: 2, fontFamily: 'Anton SC' , letterSpacing : 4, fontWeight: 'light' }}>Blogs</Button>
            <Button color="inherit" component={NavLink} to="/account/login" sx={{ mr: 2, fontFamily: 'Anton SC' , letterSpacing : 4, fontWeight: 'light' }}>Log Out</Button>
            <Button color="inherit" component={NavLink} to="/account/profile" sx={{ mr: 2, fontFamily: 'Anton SC' , letterSpacing : 4, fontWeight: 'light' }}>Profile</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
          <ListItem component={Link} to="/blogs">
            <ListItemText primary="Blogs" />
          </ListItem>
          <ListItem component={Link} to="/account/register">
            <ListItemText primary="Register" />
          </ListItem>

          <ListItem component={Link} to="/account/login">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem component={Link} to="/account/profile">
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
