import { createStyles, Box, Button, Header } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  header: {
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  button: {
    backgroundImage: theme.fn.gradient(),
    position: "relative",
    transition: "background-color 150ms ease",
    fontSize: "1em",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  buttonIcon: {
    fontSize: "1.2em",
    padding: "0",
    marginRight: "5px",
  },
  uploadIcon: {
    fontSize: "4em",
  },
}));
