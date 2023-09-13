import { chromium } from 'playwright'

async function scrapeClassContent(url: string): Promise<string | null> {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto(url)
    const content = await page.textContent('h5.u-text-bold.u-mb-1')
    return content
  } catch (error) {
    console.error('Error fetching or parsing the content:', error)
    return null
  } finally {
    await browser.close()
  }
}

void (async () => {
  const url = 'https://www.drivethrurpg.com/index.php'
  const content = await scrapeClassContent(url)
  console.log(content)
})()
