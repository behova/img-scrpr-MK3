import CoreMessage from '../interfaces/CoreMessage.js';
import Scraper from './scraper.js';
//import ImageProcesser from './ImageProcesser.js';

console.log('CHILD SCRAPER CREATED', process.pid);
//todo run processing from here

process.on('message', async (message: CoreMessage) => {
  try {
    //set and await random delay to finish
    const delay = Math.floor(
      Math.random() * (message.delayMax - message.delayMin) + message.delayMin,
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
    console.log('scraper is initiating after:', delay);

    //init scraper after delay
    const scraper = new Scraper(message.scrollAmount, message.headless);
    const result = await scraper.init();
    //console.log(result);
    // const imageProcesser = new ImageProcesser(result, message.imagesPath);
    // const dbObjectArray = await imageProcesser.init();

    process.send(result);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
