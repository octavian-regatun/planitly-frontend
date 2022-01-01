import { Box, CircularProgress, SxProps } from "@mui/material";

export default function FullScreenLoading() {
  return (
    <Box sx={boxStyles}>
      <CircularProgress />
    </Box>
  );
}

const boxStyles: SxProps = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
