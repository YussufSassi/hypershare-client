import type { NextPage } from "next"
import { Box, Button, Card } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { Container } from "@mui/system"
import { useState } from "react"
import { AttachFile, Save } from "@mui/icons-material"
import axios, { AxiosError } from "axios"
import type Response from "../interfaces/Response"
import UploadResult from "../components/UploadResult"
import UploadProgress from "../components/UploadProgress"
import truncateFilename from "../utils/TruncateFilename"
import Head from "next/head"
const Home: NextPage = () => {
  const [file, setFile] = useState<File>()
  const [response, setResponse] = useState<Response | undefined>()
  const [isUploading, setIsUploading] = useState<boolean>()
  const [progress, setProgress] = useState<number>()
  const [error, setError] = useState<string>("")
  const upload = async (file: File) => {
    if (!file) return
    setIsUploading(true)
    setProgress(undefined)
    const formData = new FormData()
    formData.append("file", file)
    const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
      method: "POST",
      data: formData,
      onUploadProgress: (e) => {
        if (e.progress) {
          setProgress(Math.floor(e.progress * 100))
        }
      },
    })
      .then(async (response) => {
        const data: Response = await response.data

        setResponse(data)
        setIsUploading(false)
        setProgress(undefined)
        setError("")
        return data
      })
      .catch((e) => {
        setIsUploading(false)
        setProgress(undefined)
        setError(e.response.data.error)
      })
  }

  const reset = () => {
    setFile(undefined)
    setResponse(undefined)
    setProgress(undefined)
    setError("")
  }

  return (
    <>
      <Head>
        <title>Hypershare</title>
      </Head>

      <Container
        style={{
          padding: "2rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            padding: "0",
            margin: "0",
          }}
        >
          Hypershare
        </h1>
        <Card
          style={{
            minHeight: "100vh",
            padding: "2.5rem",
            margin: "2.5rem",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={"1rem"}
          >
            <h1>Choose a file to get started</h1>

            <Button
              component="label"
              variant="contained"
              startIcon={<AttachFile />}
            >
              <input
                type={"file"}
                hidden
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0])
                  }
                }}
              />
              {file ? truncateFilename(file.name) : "Choose a file"}
            </Button>
            <Box display={"flex"} gap={"1rem"}>
              {file ? (
                <>
                  {isUploading ? (
                    <LoadingButton
                      variant="outlined"
                      loading
                      loadingPosition="start"
                      startIcon={<Save />}
                    >
                      Upload
                    </LoadingButton>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        upload(file)
                      }}
                    >
                      Upload
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                      reset()
                    }}
                  >
                    Reset
                  </Button>
                </>
              ) : null}
            </Box>
            {error && error}
            {progress && <UploadProgress progress={progress}></UploadProgress>}
          </Box>

          <Box>{response && <UploadResult response={response} />}</Box>
        </Card>
      </Container>
    </>
  )
}

export default Home
