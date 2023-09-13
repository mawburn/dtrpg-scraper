import { chromium } from 'playwright-extra'
import stealth from 'puppeteer-extra-plugin-stealth'

import type { Page, Route, Request } from 'playwright'

export async function initializePlaywright(): Promise<Page> {
  chromium.use(stealth())
  const browser = await chromium.launch({ headless: true })

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  })

  await context.route('**/*', async (route: Route, request: Request) => {
    if (request.resourceType() === 'image') {
      await route.abort()
    } else {
      await route.continue()
    }
  })

  const page = await context.newPage()

  await page.goto('https://preview.drivethrurpg.com/', {
    waitUntil: 'domcontentloaded',
  })

  const tenMinutesAgo = Date.now() - 10 * 60 * 1000

  await page.evaluate(value => {
    localStorage.setItem('viewedIntro', value)
  }, tenMinutesAgo.toString())

  await page.goto('https://preview.drivethrurpg.com/en/', {
    waitUntil: 'networkidle',
  })

  return page
}
