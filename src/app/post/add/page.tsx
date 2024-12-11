// pages/createpost.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createPost, editPost, getPost } from '@/utils/apis';
import { getUrlParams } from '@/utils/utilFn';

const CreatePost = () => {
  const router = useRouter();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const postId = useRef("");
  const postItem = useRef(null);

  useEffect(()=>{
    const params =  getUrlParams(location.href);
    const id:string = params.get("id") || "";
    if(id){
      postId.current = id;
      
      getPost(id).then(({success,data:result})=>{
        const data = result.data;
          if(success){
            postItem.current = data
            setTitle(data.title);
            setDescription(data.message);
            setImage(data.image);
          }


      })
    }
  },[])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //todo: add user id 
    console.log({ title, description, image });
    if(postId.current){
    //@ts-ignore
      editPost({...postItem.current,title,message:description,image}).then(data=>{
        console.log(data);
        router.push('/post');
      })
    }else{
      createPost({title, description, image}).then(data=>{
        router.push('/post');
        console.log(data);
      })
    }

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
