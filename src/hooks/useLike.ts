import { useState } from 'react';
import { editPost } from '@/utils/apis';

type LikeParams = {
  post?: any;
  posts?: any[];
  setPost?: (p: any) => void;
  setPosts?: (p: any[]) => void;
  index?: number;
  id?: string;
}

export default function useLike() {
  const [loading, setLoading] = useState(false);

  const like = async ({ post, posts, setPost, setPosts, index, id }: LikeParams) => {
    setLoading(true);
    try{
      if(Array.isArray(posts) && typeof index === 'number'){
        const prevPosts = [...posts];
        const current = posts[index] || post;
        const updated = { ...current, likeCount: (current.likeCount || 0) + 1 };
        const newPosts = [...posts];
        newPosts[index] = updated;
        setPosts && setPosts(newPosts);

        const res:any = await editPost({ _id: updated._id, likeCount: updated.likeCount });
        if(!res || !res.success){
          setPosts && setPosts(prevPosts);
          return { success:false, message: res?.message };
        }

        const serverData = res.data?.data;
        if(serverData){
          const newer = [...(prevPosts || [])];
          newer[index] = serverData;
          setPosts && setPosts(newer);
        }

        return { success:true };
      } else if(post && setPost){
        const prev = post;
        const newCount = (post.likeCount || 0) + 1;
        setPost({ ...post, likeCount: newCount });

        const res:any = await editPost({ _id: id || post._id, likeCount: newCount });
        if(!res || !res.success){
          setPost(prev);
          return { success:false, message: res?.message };
        }

        const serverData = res.data?.data;
        if(serverData){
          setPost((p:any) => ({ ...p, likeCount: serverData.likeCount }));
        }

        return { success:true };
      }

      return { success:false, message: 'Invalid parameters' };
    }catch(err:any){
      // revert handled by callers via returned value or internal fallback
      return { success:false, message: err?.message || 'Error' };
    }finally{
      setLoading(false);
    }
  }

  return { like, loading };
}
