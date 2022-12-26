/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next"
import type Response from "../../interfaces/Response"
import { Box } from "@mui/system"
import { Button, Divider, List, ListItem, Typography } from "@mui/material"
import ShareFile from "../../components/ShareFile"
import { Download } from "@mui/icons-material"
import { useEffect, useState } from "react"
import Head from "next/head"
import formatBytes from "../../utils/FormatBytes"
import Link from "next/link"
import ReportFile from "../../components/ReportFile"
interface IDownloadPageProps {
  response: Response
  status: number
}

export default function DownloadPage({ response, status }: IDownloadPageProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [downloads, setDownloads] = useState<number>(0)
  const determineFileViewer = (mimeType: string, id: string) => {
    switch (true) {
      case mimeType.includes("image"):
        return (
          <Box width={"50%"} height={"50%"} margin="auto">
            <img
              src={`${apiUrl}/d/${id}`}
              alt="image"
              style={{
                maxWidth: "50%",
              }}
            />
          </Box>
        )
      case mimeType.includes("video"):
        return (
          <video
            src={`${apiUrl}/d/${id}`}
            controls
            style={{
              maxWidth: "50%",
            }}
          ></video>
        )
      case mimeType.includes("audio"):
        return (
          <audio controls>
            <source src={`${apiUrl}/d/${id}`} />
          </audio>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    setDownloads(response.downloads)
  }, [response.downloads])

  if (status === 200) {
    return (
      <>
        <Head>
          <title>{`${response.filename} | Hypershare`}</title>
        </Head>
        <Box
          textAlign={"center"}
          display="flex"
          flexDirection={"column"}
          width={"50%"}
          margin={"auto"}
          alignItems={"center"}
          gap={1}
        >
          <h1>{response.filename}</h1>
          <Typography>
            This file was uploaded on{" "}
            <b>{new Date(response.createdAt).toDateString()}</b>. <br />
            It will expire on{" "}
            <b>{new Date(response.deleteAt).toDateString()}</b> if there are no
            downloads.
          </Typography>
          <Divider light style={{ width: "100%" }}>
            File Info
          </Divider>

          <List>
            <ListItem>Size: {formatBytes(response.size)}</ListItem>
            <ListItem>Mime-Type: {response.mimeType}</ListItem>
            <ListItem>MD5 Hash: {response.hash}</ListItem>
          </List>
          {determineFileViewer(response.mimeType, response.id) ? (
            <>
              <Divider light style={{ width: "100%" }}>
                File Preview
              </Divider>
              {determineFileViewer(response.mimeType, response.id)}
            </>
          ) : null}
          <Divider light style={{ width: "100%" }}>
            Download
          </Divider>
          <Typography>
            This file has {downloads}{" "}
            {downloads != 1 ? "downloads" : "download"}
          </Typography>
          <Button
            startIcon={<Download />}
            variant="contained"
            onClick={() => {
              setDownloads(downloads + 1)
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/d/${response.id}`
            }}
            size="large"
          >
            Download
          </Button>
          <ReportFile id={response.id}></ReportFile>
          <ShareFile
            url={`${process.env.NEXT_PUBLIC_CLIENT_URL}/d/${response.id}`}
          />
        </Box>
      </>
    )
  } else {
    return (
      <>
        <Box textAlign={"center"}>
          <h1>{response.error}</h1>

          <Link href={"/"}>
            <Button variant="contained">Go Back Home</Button>
          </Link>
        </Box>
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/file/${id}`
  const response = await fetch(url)
  const responseData = await response.json()
  return {
    props: { response: responseData, status: response.status },
  }
}
