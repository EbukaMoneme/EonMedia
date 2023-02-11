import express from 'express';
import { 
  uploadVideoHandler, 
  updateVideoHandler, 
  findVideosHandler, 
  streamVideoHandler 
} from './videoController';
const router = express.Router();

router.post('/', uploadVideoHandler);

router.patch('/:videoId', updateVideoHandler);

router.patch('/:videoId', streamVideoHandler);

router.get('/', findVideosHandler);

export default router;