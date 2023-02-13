import { VideoModel } from "./videoModel";

// Creates video
export const createVideo = () => {
  return VideoModel.create({});
};

// Finds single video
export const findVideo = (videoId: string) => {
  return VideoModel.findOne({ videoId });
};

// Find all videos
export const findVideos = () => {
  return VideoModel.find({
    published: true,
  }).lean();
};

// Find videos who's title or description includes query
export const findVideosQuery = (query: string) => {
  return VideoModel.aggregate([
    {
      $match: {
        $or: [
          { title: { $regex: `.*${query}.*`, $options: "i" } },
          { description: { $regex: `.*${query}.*`, $options: "i" } },
        ],
      },
    },
  ]);
};
