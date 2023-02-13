import { getVideos } from "@/api";
import { HeaderComponent } from "@/components/Header";
import { Video } from "@/types";
import { AppShell, Loader } from "@mantine/core";
import { createContext, ReactNode, useContext } from "react";
import { RefetchOptions, RefetchQueryFilters, useQuery } from "react-query";

const VideoContext = createContext<{
  videos: Video[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

// Creates a video context to wrap the application for easy refetching and loading states
const VideoContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useQuery("videos", getVideos);

  return (
    <VideoContext.Provider
      value={{
        videos: data,
        refetch,
      }}
    >
      {isLoading ? (
        <AppShell padding="md" header={<HeaderComponent />}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader size="xl" />
          </div>
        </AppShell>
      ) : (
        children
      )}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoContextProvider, useVideo };
