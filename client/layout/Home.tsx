import { AppShell, Box, Header } from "@mantine/core";
import React from "react";
import Image from "next/image";
import { HeaderComponent } from "@/components/Header";

export const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      padding="md"
      // Move header to separate component
      // header={
      //   <Header height={120} p="xs">
      //     <Box>
      //       <Box>
      //         <Image src="/eon.svg" alt="logo" width="100" height="100" />
      //       </Box>
      //     </Box>
      //   </Header>
      // }
      header={<HeaderComponent />}
    >
      {children}
    </AppShell>
  );
};
