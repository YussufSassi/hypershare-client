import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import Nav from "../components/Nav"

function MyApp({ Component, pageProps }: AppProps) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Nav />
        <Component {...pageProps} />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default MyApp
