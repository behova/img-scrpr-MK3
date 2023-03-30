import puppeteer from 'puppeteer';

async function fourChanCore(
  scrollAmount: number,
  headless: boolean,
  source: string,
): Promise<string[][]> {
  //pupeteer init
  const browser = await puppeteer.launch({ headless: headless });
  console.log('Puppeteer Launched');
  const page = await browser.newPage();

  //specify url
  await page.goto(source);
  console.log('Chrome Loaded Root');
  await page.waitForNetworkIdle();

  //console.log(`scrolling ${scrollAmount} times`);

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

export default fourChanCore;
