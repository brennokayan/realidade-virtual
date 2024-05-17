import { baseApi } from "./baseApi";
export type data = {
    name: string;
    time: string;
    video: File|null;
    userId: string | undefined;
}
export async function SendVideoService(data: data) {
  const response = await baseApi.post("/video/update", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
