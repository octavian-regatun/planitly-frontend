import { Paper, SxProps } from "@mui/material"
import { grey } from "@mui/material/colors"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import * as React from "react"
import GoogleLogin from "react-google-login"
import FullscreenLoading from "../src/components/FullScreenLoading"
import { fetchJwt, setJwtInLocalStorage } from "../src/lib/jwt"
import { useUserStore } from "../src/lib/stores"

async function handleSuccess(data: any): Promise<void> {
  const tokenId = data.tokenId as string

  console.log(tokenId)

  const jwt = (await fetchJwt(tokenId)) as string

  await setJwtInLocalStorage(jwt)
}

function handleFailure(error: any): void {
  console.log(error)
}

const Home: NextPage = () => {
  const user = useUserStore((store) => store.user)
  const router = useRouter()

  if (user) {
    router.push("/calendar")
  }

  return !user ? (
    <Container sx={containerStyles} maxWidth="sm">
      <Paper sx={paperStyles}>
        <Typography sx={titleStyles} variant="h4" component="h1" gutterBottom>
          Planitly
        </Typography>
        <Typography
          sx={subtitleStyles}
          variant="h5"
          component="h2"
          gutterBottom
        >
          Plan and organize meetings easier!
        </Typography>
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
          buttonText="Sign in with Google"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
        />
      </Paper>
    </Container>
  ) : (
    <FullscreenLoading />
  )
}

const containerStyles: SxProps = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const paperStyles: SxProps = {
  width: "100%",
  backgroundColor: "primary.main",
  padding: 4,
}

const titleStyles: SxProps = {
  color: "primary.contrastText",
}

const subtitleStyles: SxProps = {
  color: grey[300],
}

export default Home
