import sharp from 'sharp';

async function getDimensions(buffer: Buffer): Promise<string> {
  const metadata = await sharp(buffer).metadata();

  return `${metadata.width},${metadata.height}`;
}

export default getDimensions;
