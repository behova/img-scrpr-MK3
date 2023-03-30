import DbObject from '../interfaces/dbObject.js';
import createImageBuffer from './processing/createImageBuffer.js';
import sharpProcess from './processing/sharp.js';
import createDBObject from './processing/createDBObject.js';
import createPallet from './processing/createPallet.js';
import Path from 'path';
import getDimensions from './processing/getDimensions.js';

class ImageProcesser {
  public linkArray: string[][];
  public imagesPath: string;

  constructor(linkArray: string[][], imagesPath: string) {
    this.linkArray = linkArray;
    this.imagesPath = imagesPath;
  }

  public async init(): Promise<DbObject[]> {
    const dbObjectArray: DbObject[] = [];

    for (const l in this.linkArray) {
      try {
        const buffer = await createImageBuffer(this.linkArray[l][1]);
        const sourceName = this.linkArray[l][0];
        const fileName = await sharpProcess(this.imagesPath, buffer);
        const path = Path.resolve(this.imagesPath, fileName);
        const pallet = await createPallet(path);
        const dimensions = await getDimensions(buffer);

        const object = createDBObject(fileName, sourceName, pallet, dimensions);

        dbObjectArray.push(object);
      } catch (error) {
        console.log(error);
      }
    }
    return dbObjectArray;
  }
}

export default ImageProcesser;
