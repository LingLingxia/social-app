// src/app/auth/login/page.tsx
'use client';

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

import { useRouter } from 'next/navigation';
import { login } from '@/utils/apis';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('test@abc.com');
  const [password, setPassword] = useState('1234');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const res = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await res.json();

    const result = await login({ email, password })
    if(result.success){
      router.push("/post")
      setMessage(result.data.message);
    }else{
      console.error(result.message)
    }

  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
            Login
          </Button>
        </form>
        {message && <Typography>{message}</Typography>}
      </Box>
    </Container>
  );
};

export default Login;
