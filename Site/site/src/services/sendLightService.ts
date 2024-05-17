import { baseApi } from "./baseApi";

type data ={
    name: string, 
    ilumminence: number, 
    range: number, 
    color: string, 
    userId: string | undefined;
}

export async function SendLightService(data: data){
    const response = await baseApi.post("/light", data);
    return response;
}