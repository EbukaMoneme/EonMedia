/**
 * Function to help generate a thumbnail
 * Could be improved to allow user to pick what section of the video
 * would become the thumbnail
 */
const generateVideoThumbnail = (file: File) => {
  return new Promise((resolve) => {
    // Create a canvas and video element
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");

    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file);

    // Once loaded grab a screenshot of the video
    video.onloadeddata = () => {
      let ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      video.pause();
      return resolve(canvas.toDataURL("image/png"));
    };
  });
};

export default generateVideoThumbnail;
