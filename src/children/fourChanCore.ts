import puppeteer from 'puppeteer';

interface CoreMessage {
  scrollAmount: number;
  headless: boolean;
}

function getFourChanSource(): string {
  const fourChanSources = [
    'https://boards.4chan.org/wg/2',
    'https://boards.4channel.org/w/',
  ];

  const number = Math.floor(Math.random() * fourChanSources.length);
  return fourChanSources[number];
}

async function fourChanCore(
  scrollAmount: number,
  headless: boolean,
): Promise<string[][]> {
  const source = getFourChanSource();
  //pupeteer init
  const browser = await puppeteer.launch({ headless: headless });
  console.log('launching puppeteer');
  const page = await browser.newPage();

  //specify url
  await page.goto(source);
  console.log('root page loaded');
  await page.waitForNetworkIdle();

  console.log(`scrolling ${scrollAmount} times`);

  //Load more images by scrolling down (i) times
  for (let i = 0; i < scrollAmount; i += 1) {
    await page.keyboard.press('PageDown');
    await page.waitForNetworkIdle();
  }

  //cop all image links
  const imgLinks = await page.$$eval('a', (links) => {
    const result: string[][] = [];
    for (const l in links) {
      const pair: string[] = [];
      const string = links[l].toString();
      //filter
      if (string.includes('.jpg') || string.includes('.png')) {
        pair.push(links[l].innerText.toString());
        pair.push(links[l].toString());

        //if link text isn't blank
        if (pair[0] != '') {
          result.push(pair);
        }
      }
    }
    return result;
  });
  await page.close();

  await browser.close();

  return imgLinks;
}

console.log('FOURCHAN CHILD CREATED', process.pid);

process.on('message', async (message: CoreMessage) => {
  try {
    const result = await fourChanCore(message.scrollAmount, message.headless);
    process.send(result);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
