class Scraper {
  public delayMax: number;
  public delayMin: number;

  constructor(delayMax: string, delayMin: string) {
    this.delayMax = Number(delayMax);
    this.delayMin = Number(delayMin);
    const delay = this.setDelay();
    this.initScraper(delay);
  }

  private setDelay(): number {
    const delay = Math.floor(
      Math.random() * (this.delayMax - this.delayMin) + this.delayMin,
    );
    return delay;
  }

  private initScraper(delay: number): void {
    setTimeout(() => {
      console.log('scraper initiated with delay:', delay);
    }, delay);
  }
}

export default Scraper;
