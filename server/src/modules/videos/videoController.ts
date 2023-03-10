import busboy from "busboy";
import fs from "fs";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Video } from "./videoModel";
import {
  createVideo,
  findVideo,
  findVideos,
  findVideosQuery,
} from "./videoService";
import { UpdateVideoBody, UpdateVideoParams } from "./videoSchema";

// Currently only mp4 works
const MIME_TYPES = ["video/mp4", "video/mov", "video/quicktime"];

const CHUNK_SIZE_IN_BYTES = 1000000; // 1mb

// Get path of video
const getPath = ({
  videoId,
  extension,
}: {
  videoId: Video["videoId"];
  extension: Video["extension"];
}) => {
  return `${process.cwd()}/videos/${videoId}.${extension}`;
};

// Handler to upload a video
export const uploadVideoHandler = async (req: Request, res: Response) => {
  const bb = busboy({ headers: req.headers });
  const video = await createVideo();

  bb.on("file", async (_, file, info) => {
    if (!MIME_TYPES.includes(info.mimeType)) {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid file type");
      // Delete created video
    }

    const extension = info.mimeType.split("/")[1];

    const filePath = getPath({
      videoId: video.videoId,
      extension,
    });

    video.extension = extension;

    await video.save();

    const stream = fs.createWriteStream(filePath);

    file.pipe(stream);
  });

  bb.on("close", () => {
    res.writeHead(StatusCodes.CREATED, {
      Connection: "close",
      "Content-Type": "application/json",
    });

    res.write(JSON.stringify(video));
    res.end();
  });

  return req.pipe(bb);
};

// Handler to update video with Title, Description and Thumbnail
export const updateVideoHandler = async (
  req: Request<UpdateVideoParams, {}, UpdateVideoBody>,
  res: Response
) => {
  const { videoId } = req.params;
  const { title, description, published, thumbnail } = req.body;

  const video = await findVideo(videoId);

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send("Video not found");
  }

  video.title = title;
  video.description = description;
  video.published = published;
  video.thumbnail = thumbnail;

  await video.save();
  return res.status(StatusCodes.OK).send(video);
};

// Handler to find videos (all or through query)
export const findVideosHandler = async (req: Request, res: Response) => {
  const { searchParams } = req.query;

  // If no search params get all videos
  const videos: Video[] = searchParams
    ? await findVideosQuery(String(searchParams))
    : await findVideos();

  return res.status(StatusCodes.OK).send(videos);
};

// Handler to find a single video to populate page when viewing video
export const findVideoHandler = async (req: Request, res: Response) => {
  const { videoId } = req.params;
  const video = await findVideo(videoId);

  return res.status(StatusCodes.OK).send(video);
};

// Handler to stream video
export const streamVideoHandler = async (req: Request, res: Response) => {
  const { videoId } = req.params;

  /**
   * Tells the server what part of the document should be returned.
   * Important because we are using chunks of the file rather than the entire file
   */
  const range = req.headers.range;

  if (!range) {
    return res.status(StatusCodes.BAD_REQUEST).send("Range must be provided");
  }

  const video = await findVideo(videoId);

  if (!video) {
    return res.status(StatusCodes.NOT_FOUND).send("Video not found");
  }

  const filePath = getPath({
    videoId: video.videoId,
    extension: video.extension,
  });

  const fileSizeInBytes = fs.statSync(filePath).size;

  const chunkStart = Number(range.replace(/\D/g, ""));

  // Don't want to find a chunk outside of the files range
  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    fileSizeInBytes - 1
  );

  const contentLength = chunkEnd - chunkStart + 1;

  const headers = {
    "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${fileSizeInBytes}`,
    "Accept-Ranges": "bytes",
    "Content-length": contentLength,
    "Content-Type": `video/${video.extension}`,
    "Cross-Origin-Resource-Policy": "cross-origin",
  };

  res.writeHead(StatusCodes.PARTIAL_CONTENT, headers);

  const videoStream = fs.createReadStream(filePath, {
    start: chunkStart,
    end: chunkEnd,
  });

  videoStream.pipe(res);
};
