import { fetchAssets } from '$lib/server/cms'
import { storeAsset } from '$lib/server/data'
import { config } from '$lib/server/shared'
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs'

(async () => {
  Object.values(config.assets).forEach(dir => {
    if (!existsSync(dir)) return mkdirSync(dir)

    // Remove all files in the assets' and generated files' directories
    readdirSync(dir).forEach(file => unlinkSync(`${ dir }/${ file }`))
  })

  const assets = await fetchAssets()
  for (const asset of assets) await storeAsset(asset)
})()
