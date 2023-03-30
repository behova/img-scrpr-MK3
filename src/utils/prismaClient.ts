import { PrismaClient } from '@prisma/client';
import DbObject from '../interfaces/dbObject.js';

const prisma = new PrismaClient();

async function createDBImages(newImages: DbObject[]): Promise<number> {
  let upload = 0;

  for (const i in newImages) {
    try {
      const image = await prisma.image.create({
        data: newImages[i],
      });
      if (image) {
        upload += 1;
      }
    } catch (error) {
      console.log(error);
    }
  }
  await prisma.$disconnect();
  return upload;
}
export default createDBImages;
