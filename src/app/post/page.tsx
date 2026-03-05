// pages/posts.tsx
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { getPosts, editPost } from '@/utils/apis';
import { useRouter } from 'next/navigation';



const PostList: React.FC = () => {
  const [posts,setPosts] = useState<any[]>([]);
  const fetchInProgress = useRef(false);
  const router = useRouter()
  useEffect(()=>{
     if(fetchInProgress.current) return ;
     fetchInProgress.current = true;
     getPosts().then((data:any)=>{
        if(data.success){
          setPosts(data.data.list)
        }
        
     })
  },[])

const toDetail = (post:any)=>{
  router.push("/post/detail?id="+post._id)
}

const handleLike = async (e: React.MouseEvent, post:any, idx:number) => {
  // prevent the CardContent onClick from firing
  e.stopPropagation();

  // optimistic update
  const prevPosts = [...posts];
  const updatedPost = { ...post, likeCount: (post.likeCount || 0) + 1 };
  const newPosts = [...posts];
  newPosts[idx] = updatedPost;
  setPosts(newPosts);

  try{
    // call the PUT API to persist the change
    const res:any = await editPost(updatedPost);
    if(!res || !res.success){
      // revert on failure
      setPosts(prevPosts);
      alert(res?.message || 'Failed to like the post');
    } else {
      // if backend returns updated data, replace local item with authoritative data
      const serverData = res.data?.data;
      if(serverData){
        const newer = [...(posts || [])];
        newer[idx] = serverData;
        setPosts(newer);
      }
    }
  }catch(err:any){
    setPosts(prevPosts);
    alert(err?.message || 'An error occurred');
  }
}
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent onClick={()=>{toDetail(post)}}>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {post.message}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box>
                      <IconButton aria-label="like" onClick={(e)=>handleLike(e, post, index)}>
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
