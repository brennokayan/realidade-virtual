import { baseApi } from "./baseApi";

type data ={
    name: string;
    time: string;
    url: string;
    userId: string | undefined;
}

export async function SendUrlVideoService(data: data){
    const response = await baseApi.post("/video", data);
    return response;
}