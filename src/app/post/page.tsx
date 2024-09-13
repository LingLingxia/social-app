// pages/posts.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { getPosts } from '@/utils/fn';

// const posts = Array.from({ length: 10 }, (_, i) => ({
//   title: 'Title ' + i,
//   message: 'Message ' + i,
//   picture: null,  // Assuming no picture
//   likeCount: 5 + i,
//   commentsCount: 2 + i,
// }));

const PostList: React.FC = () => {
  const [posts,setPosts] = useState<any[]>([]);
  useEffect(()=>{
     getPosts().then((data:any)=>{
        if(data.success){
          setPosts(data.data.list)
        }
        
     })
  },[])
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {post.message}
                  </Typography>
                  {/* 如果未来有图片，可以在这里插入图片逻辑 */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box>
                      <IconButton aria-label="like">
                        <FavoriteIcon />
                      </IconButton>
                      {post.likeCount}
                    </Box>
                    <Box>
                      <IconButton aria-label="comments">
                        <CommentIcon />
                      </IconButton>
                      {post.commentsCount}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PostList;
