import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useState } from "react"
import { Typography } from "@mui/material"

export default function ReportFile({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  const [reported, setReported] = useState<boolean>(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleReport = () => {
    if (email && reason) {
      sendReport({ email, reason })
    }
  }

  const sendReport = async ({
    email,
    reason,
  }: {
    email: string
    reason: string
  }) => {
    if (email && reason) {
      const body = { email, reason }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/file/${id}/report`,
        {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json",
          },
        }
      )
      if (response.status == 200) {
        setReported(true)
      }
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} color={"error"}>
        Report File
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report this file</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <TextField
            margin="dense"
            label="Reason for report"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setReason(e.target.value)
            }}
          />

          <Typography>
            {reported &&
              "Your report has been sent. We will contact you and resolve this shortly."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReport} disabled={reported}>
            {reported ? "Reported." : "Report"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
