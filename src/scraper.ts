import { fork } from 'child_process';
import path from 'path';

class Scraper {
  public delayMax: number;
  public delayMin: number;

  constructor(delayMax: string, delayMin: string) {
    this.delayMax = Number(delayMax);
    this.delayMin = Number(delayMin);
  }

  private setDelay(): number {
    const delay = Math.floor(
      Math.random() * (this.delayMax - this.delayMin) + this.delayMin,
    );
    return delay;
  }

  public async initScraper(): Promise<void> {
    //get delay time
    const delay = this.setDelay();
    //wait for randomized delay
    await new Promise((resolve) => setTimeout(resolve, delay));
    console.log('scraper initiated after:', delay);
    //get puppeteer core
    const core = this.getCore();
    console.log('core:', core);
    this.runScraper(core);
  }

  private getCore(): string {
    const coreList = ['fourChanCore.js', 'redditCore.js'];

    const number = Math.random();
    const choice = number >= 0.5 ? coreList[1] : coreList[0];
    return choice;
  }

  private runScraper(core: string): void {
    const childRoute = path.resolve(`./build/src/children/${core}`);

    const child = fork(childRoute);
    child.send({ scrollAmount: 5, headless: true });

    child.on('message', (message): void => {
      console.log(message);
    });

    child.on('exit', (code): void => {
      console.log('Child exit on', code);
    });
    console.log(child.exitCode);
  }
}

export default Scraper;
