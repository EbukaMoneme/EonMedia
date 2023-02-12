import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { ReactElement } from "react";
import { HomePageLayout } from "@/layout/Home";

export default function Home() {
  return <></>;
}

Home.getLayout = (page: ReactElement) => {
  return <HomePageLayout>{page}</HomePageLayout>;
};
