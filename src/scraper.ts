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
    const delay = this.setDelay();
    await new Promise((resolve) => setTimeout(resolve, delay));
    console.log('scraper initiated after:', delay);
    const core = this.getCore();
    console.log('core:', core);
  }

  private getCore(): string {
    const coreList = ['fourChan', 'reddit'];

    const number = Math.random();
    const choice = number >= 0.5 ? coreList[1] : coreList[0];
    return choice;
  }
}

export default Scraper;
