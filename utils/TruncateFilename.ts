export default function truncateFilename(name: string) {
  const fileNameParts = name.split(".")
  const fileExtension = fileNameParts.pop()
  const truncatedFileName = fileNameParts.join(".").substring(0, 20)
  return `${truncatedFileName}.${fileExtension}`
}
