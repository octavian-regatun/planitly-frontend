import { Button, Container, Paper, SxProps, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ErrorNextPage(): JSX.Element {
  const router = useRouter();

  return (
    <Container sx={containerStyles} maxWidth="sm">
      <Paper sx={paperStyles}>
        <Typography sx={titleStyles} variant="h3" component="h1" gutterBottom>
          App just crashed
        </Typography>
        <Typography sx={infoStyles} variant="h4" component="h1" gutterBottom>
          Error:{" "}
            <b>{router.query.text}</b>
        </Typography>
        <div style={buttonContainer}>
          <Link href="/" passHref>
            <Button variant="contained" color="secondary">
              Return to main page
            </Button>
          </Link>
        </div>
      </Paper>
    </Container>
  );
}

const containerStyles: SxProps = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const paperStyles: SxProps = {
  backgroundColor: "primary.main",
  p: 4,
};

const titleStyles: SxProps = {
  color: "primary.contrastText",
  textAlign: "center",
};

const infoStyles: SxProps = {
  color: "error.main",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "center",
};
