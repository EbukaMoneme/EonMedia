import { Carousel } from "@mantine/carousel";
import { VideoPreview } from "./VideoPreview";

/**
 * Carousel component
 */
export function CardsCarousel({ data }: { data: any }) {
  const slides = data.map((video: any) => (
    <Carousel.Slide key={video.videoId}>
      <VideoPreview key={video.videoId} video={video} search={false} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="25%"
      breakpoints={[
        { maxWidth: "lg", slideSize: "33.33%" },
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
      slideGap="lg"
      align="start"
      loop
    >
      {slides}
    </Carousel>
  );
}
