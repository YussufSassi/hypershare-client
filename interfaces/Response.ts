export default interface Response {
  id: string
  createdAt: string
  filename: string
  hash: string
  size: number
  mimeType: string
  downloads: number
  deleteAt: string
  error?: string
}
