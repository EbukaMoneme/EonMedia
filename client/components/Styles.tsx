import { createStyles } from "@mantine/core";

// Central styles for various components
export const useStyles = createStyles((theme) => ({
  // Header
  header: {
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar: {
    // Static media query
    "@media (max-width: 900px)": {
      width: 400,
    },
    // Static media query
    "@media (max-width: 600px)": {
      width: 275,
    },
  },

  // Create video button
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

    // Static media query
    "@media (min-width: 860px)": {
      marginRight: "5px",
    },
  },
  buttonText: {
    // Static media query
    "@media (max-width: 860px)": {
      display: "none",
    },
  },

  // Upload form
  uploadIcon: {
    fontSize: "4em",
  },

  // Streaming video
  video: {
    width: "60%",

    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
  videoDetails: {
    width: "80%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "10%",
  },
  videoTitle: {
    fontSize: "30px",
    marginBottom: "-15px",
  },
  videoImageHome: {
    height: "200px",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  videoImageSearch: {
    height: "200px",
    width: "400px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  videoCardSearch: {
    width: "50%",
    marginLeft: "5px",
  },

  searchContainer: {
    display: "flex",
    alignItems: "center",
  },
}));
