import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import Response from "../interfaces/Response"
import Link from "next/link"
import ShareFile from "./ShareFile"
interface Props {
  response: Response
}

export default function UploadResult({ response }: Props) {
  const url = window.location.href + "d/" + response.id
  return (
    <Box height={"2rem"} width="50%" margin={"auto"} textAlign="center">
      <h1>Your Upload is complete!</h1>
      <Typography>
        You can share this URL so people can download the file:{" "}
        <b>
          <Link href={`/d/${response.id}`}>{url}</Link>
        </b>
      </Typography>
      <ShareFile url={url} />
    </Box>
  )
}
