import { baseApi } from "./baseApi";

export async function DeleteVideoService(id: string) {
  const response = await baseApi.delete(`/video/${id}`);
  window.location.reload();
  return response;
}