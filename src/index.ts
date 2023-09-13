import { initializePlaywright } from './initializePlaywright'
import { urls } from './constants'
import { dedupe, roundCent, toUrl } from './utils'
import fs from 'fs'

async function run() {
  const { page, context } = await initializePlaywright()

  if (!page || !context) {
    console.error('Page is not defined')
    return
  }

  const cookies = await context.cookies([urls.base])
  const userAgent = await page.evaluate(() => navigator.userAgent)

  const cookiesString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')

  const headers = {
    'User-Agent': userAgent,
    Cookie: cookiesString,
  }

  const bestSellingUrls = []

  for (let i = 1; i < 3; i++) {
    bestSellingUrls.push(fetch(urls.bestSelling.api(i), { method: 'GET', headers }))
  }

  const bestSellingRes = await Promise.all(bestSellingUrls)
  const bestSelling = await Promise.all(bestSellingRes.map(res => res.json()))

  const links = bestSelling
    .map((b: any) =>
      b.data.map((product: any) => ({
        name: product.attributes.description.name,
        url: toUrl(product.attributes.description.slug, product.attributes.productId),
        slug: product.attributes.description.slug,
        productId: product.attributes.productId,
        prices: {
          pdf: roundCent(product.attributes.lowestDigitalPrice),
          print: roundCent(product.attributes.lowestPrintPrice),
        },
      }))
    )
    .flat()

  const bestLinks = dedupe(links)
  fs.writeFileSync('links.json', JSON.stringify(bestLinks, null, 2))

  await page?.context()?.browser()?.close()
}

void (async () => run())()
