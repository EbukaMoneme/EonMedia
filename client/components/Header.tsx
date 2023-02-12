import { createStyles, Box, Button, Header } from "@mantine/core";
import Image from "next/image";
import { RiVideoUploadLine } from "react-icons/ri";
import { useStyles } from "./Styles";
import { UploadVideo } from "./UploadVideo";

// const useStyles = createStyles((theme) => ({
//   header: {
//     border: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "transparent",
//   },

//   button: {
//     backgroundImage: theme.fn.gradient(),
//     position: "relative",
//     transition: "background-color 150ms ease",
//     fontSize: "1em",
//     display: "flex",
//     alignItems: "center",
//     cursor: "pointer",
//   },
//   buttonIcon: {
//     fontSize: "1.2em",
//     padding: "0",
//     marginRight: "5px",
//   },
// }));

export const HeaderComponent = () => {
  const { classes } = useStyles();
  return (
    <Header height={120} p="lg" className={classes.header}>
      <Box>
        <Box>
          <Image src="/eon.svg" alt="logo" width="80" height="80" />
        </Box>
      </Box>

      {/* <Button className={classes.button} mr={5}>
        <RiVideoUploadLine className={classes.buttonIcon} />
        Create
      </Button> */}
      <UploadVideo />
    </Header>
  );
};
