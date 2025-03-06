import { fetchAllAssets, fetchAllPages } from '$lib/server/cms'
import { storeAsset } from '$lib/server/data'
import { config } from '$lib/server/shared'
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'

(async () => {
  Object.values(config.assets).forEach(dir => {
    if (!existsSync(dir)) return mkdirSync(dir)

    // Remove all files in the assets' and generated files' directories
    readdirSync(dir).forEach(file => unlinkSync(`${ dir }/${ file }`))
  })

  const assets = await fetchAllAssets()
  for (const asset of assets) await storeAsset(asset)

  const urls = (await fetchAllPages())
      .map(({ url, updatedAt }) => `<url><loc>${ url }index.html</loc><lastmod>${ updatedAt.split('T')[0] }</lastmod></url>`)

  writeFileSync('static/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset>${ urls }</urlset>`, { encoding: 'utf-8', flag: 'w+' })
})()
