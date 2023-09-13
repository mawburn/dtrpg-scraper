import { initializePlaywright } from './initializePlaywright'

void (async () => {
  const page = await initializePlaywright()
  const content = await page.textContent('.site-header-tagline')
  console.log(content)
  await page?.context()?.browser()?.close()
})()
