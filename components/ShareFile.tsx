import {
  ContentCopy,
  Email,
  QrCode,
  Reddit,
  Twitter,
} from "@mui/icons-material"
import { ButtonGroup, IconButton } from "@mui/material"
import QRcode from "qrcode"

export default function ShareFile({ url }: { url: string }) {
  const shareUrl = (destination: string, url: string) => {
    switch (true) {
      case destination == "reddit":
        window.open(
          `https://www.reddit.com/submit?url=${url}&title=File%20on%20Hypershare`
        )
        break
      case destination == "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${url}`)
        break
      case destination == "email":
        window.open(`mailto:?body=${url}`)
        break

      case destination == "qr":
        QRcode.toDataURL(url).then((dataUri: string) => {
          window.open(dataUri)
        })
        break

      case destination == "copy":
        window.navigator.clipboard.writeText(url)
        break
      default:
        break
    }
  }
  return (
    <ButtonGroup
      style={{
        marginTop: "2.5rem",
      }}
    >
      <IconButton
        aria-details="Reddit"
        onClick={() => {
          shareUrl("reddit", url)
        }}
        title="Share on Reddit"
      >
        <Reddit />
      </IconButton>
      <IconButton
        aria-details="Twitter"
        onClick={() => {
          shareUrl("twitter", url)
        }}
        title="Share on Twitter"
      >
        <Twitter />
      </IconButton>
      <IconButton
        aria-details="E-Mail"
        onClick={() => {
          shareUrl("email", url)
        }}
        title="Share via E-Mail"
      >
        <Email />
      </IconButton>
      <IconButton
        aria-details="QR Code"
        onClick={() => {
          shareUrl("qr", url)
        }}
        title="Get QR Code"
      >
        <QrCode />
      </IconButton>
      <IconButton
        aria-details="Copy Url"
        onClick={() => {
          shareUrl("copy", url)
        }}
        title="Copy URL to Clipboard"
      >
        <ContentCopy />
      </IconButton>
    </ButtonGroup>
  )
}
