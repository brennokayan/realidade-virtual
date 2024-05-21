import { baseApi } from "./baseApi";

type updateVideoServiceProps = {
  time: string;
  name: string;
};

export function UpdateVideoService(data: updateVideoServiceProps, id: string) {
  const response = baseApi.put(`/video/${id}`, data);
  window.location.reload();
  return response;
}
