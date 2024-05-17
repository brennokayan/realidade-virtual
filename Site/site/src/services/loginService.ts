import { baseApi } from "./baseApi";
type data = {
    email: string;
    password: string;
}
export async function LoginService(data: data){
    const response = await baseApi.post("/user/login",data)
    return response.data.data;
}

export async function AuthService(token: string){
    const response = await baseApi.post("/auth",{token})
    return response.data
}