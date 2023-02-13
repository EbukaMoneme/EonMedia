import { ReactElement } from "react";
import { HomePageLayout } from "@/layout/Home";
import { useVideo } from "@/context/video";
import { CardsCarousel } from "../components/Carousel";

/**
 * Home page
 * @returns Home page function
 */
export default function Home() {
  const { videos } = useVideo();
  const half = (videos.length - 1) / 2;

  return (
    <>
      <CardsCarousel data={videos.slice(0, half) || []} />
      <CardsCarousel data={videos.slice(half) || []} />
    </>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <HomePageLayout>{page}</HomePageLayout>;
};
