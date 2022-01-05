import { Paper, SxProps } from "@mui/material";
import { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from "../lib/constants";

export default function Sidebar() {
  return (
    <Paper sx={containerStyle} elevation={4}>
      <div style={topPlaceholderStyle}></div>
    </Paper>
  );
}

const containerStyle: SxProps = {
  width: `${SIDEBAR_WIDTH}px`,
  height: "100vh",
  position: "absolute",
  top: "0",
  borderRadius:"0px"
};

const topPlaceholderStyle = {
  height: `${NAVBAR_HEIGHT + 1}px`,
};
