import { post } from "./api-utils";
import { get } from "./api-utils";

export const getPosts = ()=> get("/api/content/posts")
export const getPost = (id:string)=> get(`/api/post/${id}`)
export const createPost = (data:any)=>post("/api/content/posts",data)

export const login = (data:any)=> post('/api/auth/login',data);
export const register = (data:any)=> post('/api/auth/register',data);

