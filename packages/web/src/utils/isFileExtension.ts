export default function isFileExtension(
  filename: string,
  extension: string,
): boolean {
  const fileNameSplitted = filename.split('.');

  const fileExtension = fileNameSplitted[fileNameSplitted.length - 1];

  return fileExtension === extension;
}
