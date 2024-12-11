
import { get , remove , post, put} from "./api-utils";

export const getPosts = ()=> get("/api/content/posts")
export const getPost = (id:string)=> get(`/api/post/${id}`)
export const deletePost = (id:string)=> remove(`/api/post/${id}`)
export const editPost = (data:any)=>put(`/api/post/${data._id}`,data)
export const createPost = (data:any)=>post("/api/content/posts",data)

export const login = (data:any)=> post('/api/auth/login',data);
export const register = (data:any)=> post('/api/auth/register',data);

