import { VideoModel } from "./videoModel"

export const createVideo = () => {
  return VideoModel.create({});
};

export const findVideo = (videoId: string) => {
  return VideoModel.findOne({videoId})
}

export const findVideos = () => {
  return VideoModel.find({
    published: true
  }).lean();
}