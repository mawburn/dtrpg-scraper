import { affId, urls } from './constants'

export const roundCent = (price: string) => Math.round(Number(price) * 100) / 100

export const toUrl = (slug: string, productId: string) =>
  `${urls.base}${urls.lang}/product/${productId}/${slug}?affiliate_id=${affId}`

export const apiUrl = (productId: string) =>
  `https://api.drivethrurpg.com/api/vBeta/products/${productId}?groupId=1&siteId=10`

export const reviewUrl = (productId: string) =>
  `https://api.drivethrurpg.com/api/vBeta/reviews?productId=${productId}&empty%5Bdescription.description%5D=false&order%5Brating%5D=desc&order%5BdateCreated%5D=desc&partial=false&groupId=1&siteId=10`

export const dedupe = (arr: any[]) => {
  const seen = new Set()
  const result = []

  for (const item of arr) {
    if (!seen.has(item.productId)) {
      seen.add(item.productId)
      result.push(item)
    }
  }

  return result
}
