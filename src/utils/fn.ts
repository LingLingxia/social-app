import { get } from "./api";

export const getPosts = ()=> get("/api/content/posts")