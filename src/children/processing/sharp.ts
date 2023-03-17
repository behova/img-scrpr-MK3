import sharp from 'sharp';
import Path from 'path';
import { nanoid } from 'nanoid';

async function sharpProcess(
  imagesPath: string,
  buffer: Buffer,
): Promise<string> {
  try {
    const date = new Date().toISOString().slice(0, 10);
    const id = nanoid(10);

    const fileName = `${date}${id}`;

    const path = Path.resolve(imagesPath, fileName);

    const result = await sharp(buffer).png().toFile(`${path}.png`);
    const thumb = await sharp(buffer)
      .jpeg({
        quality: 70,
      })
      .resize({
        width: 500,
        height: 500,
        fit: sharp.fit.cover,
        position: sharp.strategy.attention,
      })
      .toFile(`${path}-thumb.jpeg`);

    if (result && thumb) {
      return fileName;
    } else {
      throw new Error('sharpProcess buffer');
    }
  } catch (error) {
    //console.error('sharpProcess', error);
    throw new Error('sharpProcess', error);
  }
}

export default sharpProcess;
