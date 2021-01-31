import uploadConfig from '@config/upload';

export default function formatFileToUrl(filename: string): string | null {
  if (!filename) return null;

  switch (uploadConfig.driver) {
    case 'disk':
      return `${process.env.APP_API_URL}/files/${filename}`;
    case 's3':
      return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${filename}`;
    default:
      return null;
  }
}
