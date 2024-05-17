import { baseApi } from "./baseApi";

type data ={
    name: string;
    color: string;
    userId: string | undefined;
}

export async function SendWallService(data: data){
    const response = await baseApi.post("/wall", data);
    return response;
}