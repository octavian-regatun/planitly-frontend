import { Avatar, Button, SxProps, Typography } from "@mui/material"
import Link from "next/link"
import { useUserStore } from "../lib/stores"

function getNameInitials(name: string): string {
  const nameParts = name.split(" ")

  return nameParts[0].charAt(0) + nameParts[1].charAt(0)
}

export default function NavbarProfile() {
  const user = useUserStore((store) => store.user)

  return (
    <Link href="profile">
      <Button className="NavbarProfile-button">
        <Avatar className="NavbarProfile-avatar">
          {getNameInitials(`${user?.firstName} ${user?.lastName}`)}
        </Avatar>
        <Typography variant="h6" component="div">
          {user?.firstName} {user?.lastName}
        </Typography>
      </Button>
    </Link>
  )
}
