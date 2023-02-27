import CoreMessage from '../interfaces/CoreMessage.js';
import ScraperClass from './scraperClass.js';

console.log('CHILD SCRAPER CREATED', process.pid);

process.on('message', async (message: CoreMessage) => {
  try {
    const scraper = new ScraperClass(message.scrollAmount, message.headless);
    const result = await scraper.init();
    process.send(result);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
