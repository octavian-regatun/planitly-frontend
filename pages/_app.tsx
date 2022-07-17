import { CacheProvider, EmotionCache } from "@emotion/react"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { AppProps } from "next/app"
import Head from "next/head"
import * as React from "react"
import Auth from "../src/components/Auth"
import createEmotionCache from "../src/lib/createEmotionCache"
import theme from "../src/lib/theme"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDayjs from "@mui/lab/AdapterDayjs"
import { SnackbarProvider } from "notistack"
import "../src/scss/index.scss"
import { QueryClientProvider } from "react-query"
import queryClient from "../src/lib/queryClient"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>PlanITLY</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
          <Auth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SnackbarProvider maxSnack={3}>
                <QueryClientProvider client={queryClient}>
                  <Component {...pageProps} />
                </QueryClientProvider>
              </SnackbarProvider>
            </LocalizationProvider>
          </Auth>
      </ThemeProvider>
    </CacheProvider>
  )
}
