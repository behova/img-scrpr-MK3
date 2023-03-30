import DbObject from '../../interfaces/dbObject.js';

function createDBObject(
  fileName: string,
  sourceName: string,
  pallet: string,
  dimensions: string,
): DbObject {
  const object = {
    fileName,
    sourceName,
    pallet,
    dimensions,
  };
  return object;
}

export default createDBObject;
