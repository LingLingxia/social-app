import { post } from "./api";

export const login = (data:any)=> post('/api/auth/login',data);
export const register = (data:any)=> post('/api/auth/register',data);