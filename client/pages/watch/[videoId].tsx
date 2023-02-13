import { getVideo } from "@/api";
import { useStyles } from "@/components/Styles";
import { HomePageLayout } from "@/layout/Home";
import { Video } from "@/types";
import { Card, Group, Paper, Text } from "@mantine/core";

import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

/**
 * Stream Video Page
 */
const WatchVideoPage = () => {
  const [video, setVideo] = useState<Video>();
  const { query } = useRouter();
  const { classes } = useStyles();

  useEffect(() => {
    const getInfo = async () => {
      const data = await getVideo(query.videoId as string);

      if (data) {
        setVideo(data);
      }
    };

    getInfo();
  }, [query]);

  return (
    <div>
      <Card
        bg="black"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 0,
          marginTop: "-10px",
        }}
      >
        <video
          src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
          className={classes.video}
          controls
          autoPlay
          id="video-player"
        />
      </Card>
      <Group className={classes.videoDetails}>
        <Text className={classes.videoTitle}>{video?.title}</Text>
        <Card style={{ width: "100%" }}>
          <Text weight={500} color="dimmed" size="md">
            {video?.description}
          </Text>
        </Card>
      </Group>
    </div>
  );
};

WatchVideoPage.getLayout = (page: ReactElement) => {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default WatchVideoPage;
