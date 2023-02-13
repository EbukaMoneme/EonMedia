import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;
const videosBase = `${base}/api/videos`;

// Function to send video to server
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

// Function to send video details to server
export const updateVideo = ({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
  thumbnail: any;
}) => {
  return axios.patch(`${videosBase}/${videoId}`, payload, {
    withCredentials: true,
  });
};

// Function to get all videos
export const getVideos = () => {
  return axios.get(videosBase).then((res) => res.data);
};

// Function to get all videos relating to query
export const getVideosQuery = (query: string) => {
  return axios
    .get(videosBase, {
      params: {
        searchParams: query,
      },
    })
    .then((res) => res.data);
};

// Function to get specific video
export const getVideo = (videoId: string) => {
  return axios.get(`${videosBase}/${videoId}/info`).then((res) => res.data);
};
