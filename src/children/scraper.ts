import redditCore from './cores/redditCore.js';
import fourChanCore from './cores/fourChanCore.js';

class Scraper {
  //todo: put sources into json files
  static redditSources = [
    'https://www.reddit.com/r/wallpapers/',
    'https://www.reddit.com/r/wallpaper/',
    'https://www.reddit.com/r/wallpaperdump/',
  ];
  static fourChanSources = [
    'https://boards.4chan.org/wg/2',
    'https://boards.4channel.org/w/',
  ];
  public scrollAmount: number;
  public headless: boolean;

  constructor(scrollAmount: number, headless: boolean) {
    this.scrollAmount = scrollAmount;
    this.headless = headless;
  }

  public async init(): Promise<string[][]> {
    const core = this.getCore();
    const result = await this.initCore(core);
    return result;
  }

  public getCore(): string {
    const coreList = ['fourChanCore', 'redditCore'];

    const number = Math.random();
    const choice = number >= 0.5 ? coreList[1] : coreList[0];
    return choice;
  }

  private getSource(core: string): string {
    let number: number;

    switch (core) {
      case 'redditCore':
        number = Math.floor(Math.random() * Scraper.redditSources.length);
        return Scraper.redditSources[number];
      case 'fourChanCore':
        number = Math.floor(Math.random() * Scraper.fourChanSources.length);
        return Scraper.fourChanSources[number];
      default:
        console.log('ERROR: returning default source to scraper');
        number = Math.floor(Math.random() * Scraper.redditSources.length);
        return Scraper.redditSources[number];
    }
  }

  private async initCore(core: string): Promise<string[][]> {
    const source = this.getSource(core);
    let result: string[][];
    switch (core) {
      case 'redditCore':
        result = await redditCore(this.scrollAmount, this.headless, source);
        return result;
      case 'fourChanCore':
        result = await fourChanCore(this.scrollAmount, this.headless, source);
        return result;
      default:
        console.log('ERROR: running default scraper core');
        result = await redditCore(this.scrollAmount, this.headless, source);
        return result;
    }
  }
}

export default Scraper;
