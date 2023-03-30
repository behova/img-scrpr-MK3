import CoreMessage from '../interfaces/CoreMessage.js';
import Scraper from './scraper.js';
import ImageProcesser from './ImageProcesser.js';
import createDBImages from '../utils/prismaClient.js';

console.log('Child Created', process.pid);
//todo run processing from here

process.on('message', async (message: CoreMessage) => {
  try {
    //set and await random delay to finish
    const delay = Math.floor(
      Math.random() * (message.delayMax - message.delayMin) + message.delayMin,
    );
    console.log('scraper will start in', delay);
    await new Promise((resolve) => setTimeout(resolve, delay));

    //init scraper after delay
    const scraper = new Scraper(message.scrollAmount, message.headless);
    const result = await scraper.init();
    const imageProcesser = new ImageProcesser(result, message.imagesPath);
    const dbObjectArray = await imageProcesser.init();
    const upload = await createDBImages(dbObjectArray);

    process.send(`[Uploaded ${upload} Images]`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
