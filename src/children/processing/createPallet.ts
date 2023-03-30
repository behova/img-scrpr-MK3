import sharp from 'sharp';

async function createPallet(filename: string): Promise<string> {
  const { data } = await sharp(`${filename}-thumb.jpeg`)
    .raw()
    .toBuffer({ resolveWithObject: true });

  //console.log(info);

  const array = new Uint8ClampedArray(data.buffer);

  const pArray: number[][] = [];
  for (let i = 0; i < array.length; i += 3) {
    const pixel = [];
    const r = array[i];
    pixel.push(r);
    const b = array[i + 1];
    pixel.push(b);
    const g = array[i + 2];
    pixel.push(g);
    pArray.push(pixel);
  }

  const findBiggestColorRange = (rgbValues: number[][]): number => {
    let rMin = Number.MAX_VALUE;
    let gMin = Number.MAX_VALUE;
    let bMin = Number.MAX_VALUE;

    let rMax = Number.MIN_VALUE;
    let gMax = Number.MIN_VALUE;
    let bMax = Number.MIN_VALUE;

    rgbValues.forEach((pixel) => {
      rMin = Math.min(rMin, pixel[0]);
      gMin = Math.min(gMin, pixel[1]);
      bMin = Math.min(bMin, pixel[2]);

      rMax = Math.max(rMax, pixel[0]);
      gMax = Math.max(gMax, pixel[1]);
      bMax = Math.max(bMax, pixel[2]);
    });

    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;

    const biggestRange = Math.max(rRange, gRange, bRange);
    if (biggestRange === rRange) {
      return 0;
    } else if (biggestRange === gRange) {
      return 1;
    } else {
      return 2;
    }
  };

  const quantization = (rgbValues: number[][], depth: number): number[][] => {
    const MAX_DEPTH = 4;
    if (depth === MAX_DEPTH || rgbValues.length === 0) {
      const color = rgbValues.reduce(
        (prev, curr) => {
          prev[0] += curr[0];
          prev[1] += curr[1];
          prev[2] += curr[2];

          return prev;
        },
        [0, 0, 0],
      );

      color[0] = Math.round(color[0] / rgbValues.length);
      color[1] = Math.round(color[1] / rgbValues.length);
      color[2] = Math.round(color[2] / rgbValues.length);
      return [color];
    }
    const componentToSortBy = findBiggestColorRange(rgbValues);
    rgbValues.sort((p1, p2) => {
      return p1[componentToSortBy] - p2[componentToSortBy];
    });

    const mid = rgbValues.length / 2;
    return [
      ...quantization(rgbValues.slice(0, mid), depth + 1),
      ...quantization(rgbValues.slice(mid + 1), depth + 1),
    ];
  };

  const result = quantization(pArray, 0);
  const stringResult = result.join();

  return stringResult;
}
export default createPallet;
