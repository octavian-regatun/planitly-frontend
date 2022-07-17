import { AppBar, SxProps, Toolbar, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { NextRouter, useRouter } from "next/router"
import { SIDEBAR_WIDTH } from "../lib/constants"
import NavbarProfile from "./NavbarProfile"

function getCurrentPage(router: NextRouter): string {
  const currentPage = router.pathname.split("/")[1]

  return currentPage.charAt(0).toUpperCase() + currentPage.slice(1)
}

export default function Navbar() {
  const router = useRouter()
  const currentPage = getCurrentPage(router)

  return (
    <AppBar position="static" color="transparent">
      <Toolbar className="Navbar-toolbar">
        <Link href="/calendar" passHref>
          <div className="Navbar-logo">
            <Image width={48} height={48} src="/logo.svg" alt="logo" />
          </div>
        </Link>
        <Typography className="Navbar-currentPage" variant="h4" component="div">
          {currentPage}
        </Typography>
        <NavbarProfile />
      </Toolbar>
    </AppBar>
  )
}
