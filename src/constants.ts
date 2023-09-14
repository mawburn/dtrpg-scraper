export const affId = '4082781' as const

export const urls = {
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  base: 'https://preview.drivethrurpg.com',
  lang: '/en',
  bestSelling: {
    url: 'https://preview.drivethrurpg.com/en/browse?sortBy=titleStripBestselling&excludeGiftCerts=true&partial=true#Bestselling%20Titles',
    api: (page: number) =>
      `https://api.drivethrurpg.com/api/vBeta/products?page=${page}&partial=false&groupId=1&order%5Bhottest%5D=desc&excludeGiftCerts=true&siteId=10&includeRatedContent=true&status=1`,
  },
} as const
