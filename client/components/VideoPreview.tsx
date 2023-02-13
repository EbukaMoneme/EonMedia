import { Video } from "@/types";
import { Card, Paper, Text } from "@mantine/core";
import Link from "next/link";
import { useStyles } from "./Styles";

/**
 * Video Preview component viewed on home page and search results
 */
export const VideoPreview = ({
  video,
  search,
}: {
  video: Video;
  search: boolean;
}) => {
  const { classes } = useStyles();

  // Grab buffer from MongoDb and convert to base64 encoded string to create the
  // src for the thumbnail image
  const buffer = video.thumbnail && JSON.parse(video.thumbnail);
  const b64 = video.thumbnail && Buffer.from(buffer).toString("base64");
  const mimeType = video.thumbnail && "image/png";
  const thumbnail = video.thumbnail
    ? `url(data:${mimeType};base64,${b64})`
    : "";

  return (
    <Link
      href={`watch/${video.videoId}`}
      style={
        search ? { display: "flex", width: "70%", marginBottom: "10px" } : {}
      }
    >
      <Paper
        sx={{
          backgroundImage: thumbnail,
        }}
        className={search ? classes.videoImageSearch : classes.videoImageHome}
      />
      <Card
        shadow="sm"
        p="lg"
        style={{ background: "transparent" }}
        className={search ? classes.videoCardSearch : ""}
      >
        <Text weight={500} size="lg">
          {video.title}
        </Text>
        <Text size="sm" color="dimmed">
          {video.description}
        </Text>
      </Card>
    </Link>
  );
};
