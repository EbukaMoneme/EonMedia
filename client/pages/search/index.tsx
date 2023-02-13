import { getVideosQuery } from "@/api";
import { VideoPreview } from "@/components/VideoPreview";
import { HomePageLayout } from "@/layout/Home";
import { Video } from "@/types";
import { Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useStyles } from "../../components/Styles";

/**
 * Search Results Page
 */
const SearchPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const { query } = useRouter();
  const search = query.searchParams as string;
  const { classes } = useStyles();

  useEffect(() => {
    const getInfo = async () => {
      const data = await getVideosQuery(search);

      if (data) {
        setVideos(data);
      }
    };

    getInfo();
  }, [search]);

  return (
    <Stack className={classes.searchContainer}>
      {(videos || []).map((video: Video) => (
        <VideoPreview key={video.videoId} video={video} search />
      ))}
    </Stack>
  );
};

SearchPage.getLayout = (page: ReactElement) => {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default SearchPage;
