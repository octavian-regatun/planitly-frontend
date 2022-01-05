import { Avatar, Button, SxProps, Typography } from "@mui/material";
import { useUserStore } from "../lib/stores";

function getNameInitials(name: string): string {
  const nameParts = name.split(" ");

  return nameParts[0].charAt(0) + nameParts[1].charAt(0);
}

export default function NavbarProfile() {
  const user = useUserStore((store) => store.user);

  return (
    <Button sx={buttonStyles}>
      <Avatar sx={avatarStyles}>
        {getNameInitials(`${user?.firstName} ${user?.lastName}`)}
      </Avatar>
      <Typography variant="h6" component="div">
        {user?.firstName} {user?.lastName}
      </Typography>
    </Button>
  );
}

const buttonStyles: SxProps = {
  display: "flex",
  textTransform: "none",
  color: "black",
};

const avatarStyles: SxProps = {
  mr: 1,
  backgroundColor: "secondary.main",
};
