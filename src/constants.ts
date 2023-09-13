export const affId = '4082781' as const

export const urls = {
  base: 'https://preview.drivethrurpg.com',
  lang: '/en',
  bestSelling: {
    url: 'https://preview.drivethrurpg.com/en/browse?sortBy=titleStripBestselling&excludeGiftCerts=true&partial=true#Bestselling%20Titles',
    api: (page: number) =>
      `https://api.drivethrurpg.com/api/vBeta/products?page=${page}&partial=false&groupId=1&order%5Bhottest%5D=desc&excludeGiftCerts=true&siteId=10&includeRatedContent=true&status=1`,
  },
} as const
