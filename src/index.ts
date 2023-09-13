import { initializePlaywright } from './initializePlaywright'

void (async () => {
  const page = await initializePlaywright()
  const content = await page.textContent('h5.u-text-bold.u-mb-1')
  console.log(content)
  await page?.context()?.browser()
})()
