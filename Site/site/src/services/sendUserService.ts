import { baseApi } from "./baseApi";

type data = {
    name: string;
    email: string;
    password: string;
}

export async function SendUserService(data: data) {
    const response = baseApi.post("/user", data);
    return response;
}