import { Box, Header, TextInput, ActionIcon } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useStyles } from "./Styles";
import { UploadVideo } from "./UploadVideo";
import { BsSearch } from "react-icons/bs";
import { useInputState } from "@mantine/hooks";
import { useRouter } from "next/router";

/**
 * Header component with search bar and upload image button
 */
export const HeaderComponent = () => {
  const { classes } = useStyles();
  const [search, setSearch] = useInputState("");
  const router = useRouter();

  const submitSearch = () => {
    if (search) {
      router.push({
        pathname: "/search/",
        query: { searchParams: search },
      });
    }
  };

  return (
    <Header height={70} p="lg" className={classes.header}>
      <Box>
        <Link href={`/`} onClick={() => setSearch("")}>
          <Image src="/eon.svg" alt="logo" width="50" height="50" style={{}} />
        </Link>
      </Box>

      <TextInput
        radius="xl"
        size="md"
        w={600}
        className={classes.searchBar}
        value={search}
        onChange={setSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitSearch();
          }
          e.stopPropagation();
        }}
        rightSection={
          <ActionIcon
            type="submit"
            size={40}
            variant="light"
            style={{
              borderTopRightRadius: "30px",
              borderBottomRightRadius: "30px",
            }}
            onClick={() => submitSearch()}
          >
            <BsSearch />
          </ActionIcon>
        }
        placeholder="Search"
        rightSectionWidth={40}
      />

      <UploadVideo />
    </Header>
  );
};
