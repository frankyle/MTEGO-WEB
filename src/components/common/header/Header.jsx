import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Box,
  Divider,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import "./header.css";
import { nav } from '../../data/Data';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: 250,
          backgroundColor: '#27ae60',
          color: '#ffffff',
          padding: '20px 10px'
        }
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#fff' }}>
        MGI CANDLES
      </Typography>
      <Divider sx={{ backgroundColor: "#ffffff" }} />
      <List>
        {nav.map((list, index) => (
          <ListItem
            key={index}
            button
            onClick={() => {
              history.push(list.path);
              handleDrawerToggle();
            }}
            sx={{
              '&:hover': {
                backgroundColor: '#388E3C',
                cursor: 'pointer'
              }
            }}
          >
            <ListItemText primary={list.text} />
          </ListItem>
        ))}
        <Divider sx={{ backgroundColor: "#ffffff", my: 1 }} />
        {isLoggedIn ? (
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              '&:hover': {
                backgroundColor: '#d32f2f',
                cursor: 'pointer'
              }
            }}
          >
            <LogoutIcon sx={{ mr: 1 }} />
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem
              button
              onClick={() => {
                history.push("/login");
                handleDrawerToggle();
              }}
              sx={{
                '&:hover': {
                  backgroundColor: '#388E3C',
                  cursor: 'pointer'
                }
              }}
            >
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                history.push("/register");
                handleDrawerToggle();
              }}
              sx={{
                '&:hover': {
                  backgroundColor: '#388E3C',
                  cursor: 'pointer'
                }
              }}
            >
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#27ae60' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: "flex", fontWeight: "bold" }}
        >
          <span className="logo-highlight">MGI</span> CANDLES
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, justifyContent: 'center', ml: 3 }}>
          {nav.map((list, index) => (
            <MuiLink
              key={index}
              underline="none"
              color="inherit"
              onClick={() => history.push(list.path)}
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                mx: 1.5,
                cursor: 'pointer',
                '&:hover': { color: '#FFEB3B' }
              }}
            >
              {list.text}
            </MuiLink>
          ))}
        </Box>
        <Box sx={{ marginLeft: "auto" }}>
          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => history.push("/login")}
                variant="outlined"
                color="inherit"
                sx={{ fontWeight: 'bold', mx: 1, borderRadius: '18px' }}
              >
                Login
              </Button>
              <Button
                onClick={() => history.push("/register")}
                variant="contained"
                color="primary"
                sx={{ fontWeight: 'bold', mx: 1, borderRadius: '18px' }}
              >
                Register
              </Button>
            </>
          ) : (
            <IconButton
              onClick={handleLogout}
              color="inherit"
              sx={{
                backgroundColor: '#d32f2f',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#c62828'
                }
              }}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
      {drawerContent}
    </AppBar>
  );
};

export default Header;
