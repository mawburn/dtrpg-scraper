import { chromium } from 'playwright-extra'
import stealth from 'puppeteer-extra-plugin-stealth'

import type { Page, Route, Request, BrowserContext } from 'playwright'
import { urls } from './constants'

export async function initializePlaywright(): Promise<{ page: Page; context: BrowserContext }> {
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

  await page.goto(urls.base, {
    waitUntil: 'domcontentloaded',
  })

  const tenMinutesAgo = Date.now() - 10 * 60 * 1000

  await page.evaluate(value => {
    localStorage.setItem('viewedIntro', value)
  }, tenMinutesAgo.toString())

  await page.goto(urls.base, {
    waitUntil: 'networkidle',
  })

  return {
    page,
    context,
  }
}
