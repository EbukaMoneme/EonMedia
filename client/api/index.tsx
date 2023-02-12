import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;
const videosBase = `${base}/api/videos`;

export const uploadVideo = ({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) => {
  return axios
    .post(videosBase, formData, {
      withCredentials: true,
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const updateVideo = ({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) => {
  return axios.patch(`${videosBase}/${videoId}`, payload, {
    withCredentials: true,
  });
};
