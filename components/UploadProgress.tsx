import { LinearProgress } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
interface Props {
  progress: number
}
export default function UploadProgress({ progress }: Props) {
  const [prog, setProg] = useState(0)

  useEffect(() => {
    setProg(progress)
  }, [prog, progress])
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={prog} />
    </Box>
  )
}
