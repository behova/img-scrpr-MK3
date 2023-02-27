import { fork, Serializable } from 'child_process';
import path from 'path';

class scraperInterface {
  public delayMax: number;
  public delayMin: number;

  constructor(delayMax: number, delayMin: number) {
    this.delayMax = delayMax;
    this.delayMin = delayMin;
  }

  private setDelay(): number {
    const delay = Math.floor(
      Math.random() * (this.delayMax - this.delayMin) + this.delayMin,
    );
    return delay;
  }
  //todo this is a mess with the  promises logging result before it completes
  public async initScraper(): Promise<void> {
    //get delay time
    const delay = this.setDelay();
    //wait for randomized delay
    await new Promise((resolve) => setTimeout(resolve, delay));
    console.log('scraper initiated after:', delay);
    const result = this.runScraper();
    console.log(result);
  }

  public runScraper(): Serializable {
    const childRoute = path.resolve(`./build/src/children/scraper.js`);

    const child = fork(childRoute);
    let result: Serializable;
    child.send({ scrollAmount: 5, headless: true });

    child.on('message', (message): void => {
      result = message;
    });

    child.on('exit', (code): void => {
      console.log('Child exit on', code);
    });
    console.log(child.exitCode);

    return result;
  }
}

export default scraperInterface;
