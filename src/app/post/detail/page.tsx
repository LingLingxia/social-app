"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Stack, TextField, Avatar } from '@mui/material';
import { getPost } from '@/utils/apis';

const PostDetail = () => {
  const router = useRouter();
  const [post, setPost] = useState<any>(null); 
  const [comments, setComments] = useState<string[]>([]); 
  const [newComment, setNewComment] = useState(''); 

  useEffect(() => {
        getPost("1").then(data=>{
            console.log(data);
            setPost({
                title:"this is a title",
                description:"this is a description",
                image:"",
                likeCount:"2",
            })
        })
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]); // 添加新评论
      setNewComment(''); // 清空输入框
    }
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>

      <Typography variant="h3" gutterBottom>
        {post.title}
      </Typography>


      <Typography variant="body1" gutterBottom>
        {post.description}
      </Typography>


      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt="Post Image"
          sx={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
            borderRadius: 2,
            mb: 2,
          }}
        />
      )}


      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <Typography variant="body2">
          Likes: {post.likeCount}
        </Typography>
        <Button variant="outlined" size="small">
          Like
        </Button>
      </Stack>

      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>


      <Stack spacing={2} sx={{ mb: 3 }}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Stack direction="row" spacing={2} alignItems="center" key={index}>
              <Avatar>{comment.charAt(0)}</Avatar>
              <Typography variant="body1">{comment}</Typography>
            </Stack>
          ))
        ) : (
          <Typography>No comments yet.</Typography>
        )}
      </Stack>


      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          fullWidth
          label="Add a comment"
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Post
        </Button>
      </Stack>
    </Box>
  );
};

export default PostDetail;
