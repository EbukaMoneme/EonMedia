import { AppShell } from "@mantine/core";
import React from "react";
import { HeaderComponent } from "@/components/Header";
import { VideoContextProvider } from "@/context/video";

/**
 * Page layout that maintains header throughout application
 */
export const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <VideoContextProvider>
      <AppShell padding="md" header={<HeaderComponent />}>
        {children}
      </AppShell>
    </VideoContextProvider>
  );
};
