import { fork } from 'child_process';
import { CronJob } from 'cron';
import path from 'path';

class App {
  public scraperSch: string;
  public cullSch: string;
  public delayMax: number;
  public delayMin: number;
  public imagesPath: string;

  constructor(
    scraperSch: string,
    cullSch: string,
    delayMax: number,
    delayMin: number,
    imagesPath: string,
  ) {
    this.scraperSch = scraperSch;
    this.cullSch = cullSch;
    this.delayMax = delayMax;
    this.delayMin = delayMin;
    this.imagesPath = imagesPath;
  }
  public initScraperSchedule(): void {
    const delayMax = this.delayMax;
    const delayMin = this.delayMin;
    const imagesPath = this.imagesPath;
    const scraperTimer = new CronJob(this.scraperSch, function () {
      //fork child directly from app. build delay into child process
      const childRoute = path.resolve(
        `./build/src/children/scraperInterface.js`,
      );

      const child = fork(childRoute);
      child.send({
        scrollAmount: 5,
        headless: true,
        imagesPath: imagesPath,
        delayMax: delayMax,
        delayMin: delayMin,
      });
      console.log('scraper will init between:', delayMax, delayMin);

      child.on('message', (message): void => {
        console.log(message);
      });

      child.on('exit', (code): void => {
        console.log('Child exit on', code);
      });
      //console.log(child.exitCode);
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
