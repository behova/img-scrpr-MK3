import DbObject from '../interfaces/dbObject.js';
import createImageBuffer from './processing/createImageBuffer.js';
import sharpProcess from './processing/sharp.js';

class ImageProcesser {
  public linkArray: string[][];
  public imagesPath: string;

  constructor(linkArray: string[][], imagesPath: string) {
    this.linkArray = linkArray;
    this.imagesPath = imagesPath;
  }

  public async init(): Promise<DbObject[]> {
    let dbObjectArray: DbObject[];
    for (const l in this.linkArray) {
      try {
        const dbObject = {} as DbObject;
        const buffer = await createImageBuffer(this.linkArray[l][1]);
        dbObject.sourceName = this.linkArray[l][0];
        dbObject.fileName = await sharpProcess(this.imagesPath, buffer);
        dbObject.pallet = [
          ['test', 'test', 'test'],
          ['test1', 'test1', 'test1'],
        ];
        dbObject.dimensions = '1087x999';

        dbObjectArray.push(dbObject);
      } catch (error) {
        console.log(error);
      }
    }
    return dbObjectArray;
  }
}

export default ImageProcesser;
