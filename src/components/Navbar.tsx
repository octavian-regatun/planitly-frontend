import { AppBar, SxProps, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { SIDEBAR_WIDTH } from "../lib/constants";
import NavbarProfile from "./NavbarProfile";

function getCurrentPage(router: NextRouter): string {
  const currentPage = router.pathname.split("/")[1];

  return currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
}

export default function Navbar() {
  const router = useRouter();
  const currentPage = getCurrentPage(router);

  return (
    <AppBar position="static" color="transparent">
      <Toolbar sx={toolbarStyles}>
        <Link href="/calendar" passHref>
          <div style={logoStyles}>
            <Image width={48} height={48} src="/logo.svg" alt="logo" />
          </div>
        </Link>
        <Typography sx={currentPageStyles} variant="h4" component="div">
          {currentPage}
        </Typography>
        <NavbarProfile />
      </Toolbar>
    </AppBar>
  );
}

const toolbarStyles: SxProps = {
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "center",
};

const currentPageStyles: SxProps = {
  textAlign: "center",
  fontWeight: "bold",
  color: "primary.main",
};

const logoStyles = {
  cursor: "pointer",
  marginLeft: `${SIDEBAR_WIDTH}px`,
};
