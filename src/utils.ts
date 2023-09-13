import { urls, affId } from './constants'

export const roundCent = (price: string) => Math.round(Number(price) * 100) / 100

export const toUrl = (slug: string, productId: string) =>
  `${urls.base}${urls.lang}/product/${productId}/${slug}?affiliate_id=${affId}`

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
