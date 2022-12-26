import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Link from "next/link"
export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href={"/"}
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Hypershare
            </Link>
          </Typography>
          <Link href={"/about"}>
            <Button color="inherit">About</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
