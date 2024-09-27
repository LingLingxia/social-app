"use client"
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, TextField, InputAdornment } from '@mui/material';
import { AccountCircle, Search } from '@mui/icons-material';
import Link from "next/link";

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // 处理登出逻辑
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
       { isLoggedIn &&  <Link href="/post/add" passHref> create my post</Link>}
        <Link href="/post" passHref> POST </Link>
        
        {/* Search Box */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search posts"
          sx={{ mr: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {isLoggedIn ? (
          <>
            {/* User Menu */}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              aria-controls={open ? 'user-menu' : undefined}
              aria-haspopup="true"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {/* Login and Sign Up Buttons */}
            <Button color="inherit" sx={{ mr: 2 }}>
              Login
            </Button>
            <Button color="inherit">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
