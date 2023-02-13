import express from "express";
import {
  uploadVideoHandler,
  updateVideoHandler,
  findVideosHandler,
  streamVideoHandler,
  findVideoHandler,
} from "./videoController";
const router = express.Router();

router.post("/", uploadVideoHandler);

router.patch("/:videoId", updateVideoHandler);

router.get("/:videoId", streamVideoHandler);

router.get("/:videoId/info", findVideoHandler);

router.get("/", findVideosHandler);

export default router;
