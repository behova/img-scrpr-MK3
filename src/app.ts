import { CronJob } from 'cron';
import ScraperInterface from './scraperInterface.js';

class App {
  public scraperSch: string;
  public cullSch: string;
  public delayMax: number;
  public delayMin: number;

  constructor(
    scraperSch: string,
    cullSch: string,
    delayMax: number,
    delayMin: number,
  ) {
    this.scraperSch = scraperSch;
    this.cullSch = cullSch;
    this.delayMax = delayMax;
    this.delayMin = delayMin;
  }
  //todo: this isn't getting any defined variables for delay
  public initScraperSchedule(): void {
    const delayMx = this.delayMax;
    const delayMn = this.delayMin;
    const scraperTimer = new CronJob(this.scraperSch, function () {
      const scraper = new ScraperInterface(delayMx, delayMn);
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
