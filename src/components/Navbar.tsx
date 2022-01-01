import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  IconButton,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";
import { NextRouter, useRouter } from "next/router";

function getCurrentPage(router: NextRouter): string {
  const currentPage = router.pathname.split("/")[1];

  return currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
}

export default function Navbar() {
  const router = useRouter();
  const currentPage = getCurrentPage(router);

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={iconButtonStyles}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {currentPage}
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

const iconButtonStyles: SxProps = {
  mr: 2,
};
