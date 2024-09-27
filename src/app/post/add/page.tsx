// pages/createpost.tsx
'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const CreatePost = () => {
  const router = useRouter();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //todo: upload file 
    console.log({ title, description, image });
    router.push('/');
  };

  const handleCancel = () => {
    router.push('/post');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        px: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create New Post
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%', maxWidth: 600 }}
      >
        <Stack spacing={3}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Button
            variant="outlined"
            component="label"
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {image && (
            <Typography variant="body2" color="textSecondary">
              {image.name}
            </Typography>
          )}

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreatePost;
