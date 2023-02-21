import { CronJob } from 'cron';
import Scraper from './scraper.js';

class App {
  public scraperSch: string;
  public cullSch: string;

  constructor(scraperSch: string, cullSch: string) {
    this.scraperSch = scraperSch;
    this.cullSch = cullSch;
  }

  public initScraperSchedule(): void {
    const scraperTimer = new CronJob(this.scraperSch, function () {
      const { DELAY_MIN, DELAY_MAX } = process.env;
      const scraper = new Scraper(DELAY_MAX, DELAY_MIN);
      scraper.initScraper();
      console.log(
        'scraper will init between:',
        scraper.delayMax,
        scraper.delayMin,
      );
    });
    scraperTimer.start();
  }

  public initCullSchedule(): void {
    const cullTimer = new CronJob(this.cullSch, function () {
      console.log('hello cull');
    });
    cullTimer.start();
  }
}

export default App;
