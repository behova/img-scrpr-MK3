import puppeteer from 'puppeteer';

async function redditCore(
  scrollAmount: number,
  headless: boolean,
  source: string,
): Promise<string[][]> {
  const result: string[][] = [];
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
    const strings = links.map((link) => link.toString());
    const filtered = strings.filter(
      (link) => link.includes('comment') && link.length < 100,
    );
    return Array.from(new Set(filtered));
  });
  for (const link in imgLinks) {
    const imagePage = await browser.newPage();
    await imagePage.goto(imgLinks[link]);
    await imagePage.keyboard.press('PageDown');
    await imagePage.keyboard.press('PageDown');
    await imagePage.keyboard.press('PageDown');
    await imagePage.keyboard.press('PageDown');

    const source = await imagePage.$$eval('a', (links) => {
      const strings = links.map((link) => link.toString());
      const filtered = strings.filter(
        (link) => link.includes('redd.it') && link.length < 300,
      );
      return Array.from(new Set(filtered));
    });
    const name = imgLinks[link].split('/'); //gets the name from link
    name.pop();
    const newName = name.pop()?.toString() || name.join();

    // create key-pair for each name/image-source
    for (const i in source) {
      const obj: string[] = [];
      obj.push(newName);
      obj.push(source[i]);
      result.push(obj);
    }

    await imagePage.close();
  }
  await page.close();

  await browser.close();

  return result;
}

export default redditCore;
