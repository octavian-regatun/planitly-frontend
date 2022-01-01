import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, SxProps, useTheme } from "@mui/system";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <>
      <Box sx={boxStyles}>
        <Navbar />
        <Sidebar/>
      </Box>
      {children}
    </>
  );
}

const boxStyles: SxProps = {
  display: {
    xs: "none",
    sm: "block",
  },
};
