import { config } from '$lib/server/shared'
import type { Image } from '$lib/types/entity.type'
import type { Asset, AssetImport } from '$lib/types/shared.type'
import type { Entry, EntryField, EntrySkeletonType } from 'contentful'
import { createWriteStream, writeFileSync } from 'node:fs'
import { relative } from 'node:path'
import { Readable } from 'node:stream'

/**
 * Stores an asset in the filesystem and generates a file with the image and srcset imports.
 * @since 1.0.0
 * @version 1.0.0
 * @async
 *
 * @param {Asset} asset The asset to store.
 * @returns {Promise<void>} A promise that resolves when the asset is stored and the generated file is written.
 */
export const storeAsset = async (asset: Asset): Promise<void> => {
  try {
    const { filename, sizes, stream } = asset

    const writeStream = createWriteStream(`${ config.assets.dir }/${ filename }`, { encoding: 'utf-8', flags: 'w' })
    Readable.fromWeb(stream).pipe(writeStream)

    writeFileSync(
        `${ config.assets.generatedDir }/${ filename }.js`,
        [
          `import image from '/${ config.assets.dir }/${ filename }?w=${ sizes.shift() }&imagetools'`,
          `import highRes from '/${ config.assets.dir }/${ filename }?w=${ sizes[sizes.length - 1] }&imagetools'`,
          `import srcset from '/${ config.assets.dir }/${ filename }?w=${ sizes.join(';') }&as=srcset&imagetools'`,
          `export default { image, highRes, srcset }`,
        ].join('\n'),
        { encoding: 'utf-8', flag: 'w+' },
    )
  } catch (error: unknown) {
    throw new Error(`Error saving asset ${ asset.filename }\n${ error }`)
  }
}

/**
 * Loads an asset from the filesystem.
 * @since 1.0.0
 * @version 1.0.0
 * @async
 *
 * @param {string} filename The name of the asset file.
 * @returns {Promise<Omit<Image, 'id' | 'alt'>>} A promise that resolves to the image object without the ID and alt text.
 */
export const loadAsset = async (filename: string): Promise<Omit<Image, 'id' | 'alt'>> => {
  try {
    /** The relative path to the generated files' directory. */
    const dir = relative(import.meta.dirname, config.assets.generatedDir)

    const {
      image,
      image: { format },
      highRes,
      srcset,
    } = (await import(/* @vite-ignore */`${ dir }/${ filename }.js`)).default as AssetImport

    return {
      ...image,
      format: `image/${ format }`,
      srcset,
      highRes,
    }
  } catch (error: unknown) {
    throw new Error(`Error loading asset ${ filename }\n${ error }`)
  }
}

/**
 * Finds the date when the entry or any of its content was last updated.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @param {Entry<EntrySkeletonType, undefined, any>} entry The entry to check.
 * @returns {string} A string representing the date when the entry or any of its content was last updated.
 */
export const findLastUpdatedAtDate = (entry: Entry<EntrySkeletonType, undefined, any>): string => {
  return Object.entries(entry.fields).reduce((result: string, [key, value]) => {
    if (key === 'updatedAt') return (value as string).localeCompare(result) > 0 ? value as string : result

    if (value && typeof value === 'object' && ('sys' in value || 'updatedAt' in value || Array.isArray(value))) {
      const array = Array.isArray(value) ? value : [value]

      const updatedAt = array.reduce((result: string, item) => {
        const updatedAt = findLastUpdatedAtDate(item as Entry<EntrySkeletonType, undefined, any>)
        return result.localeCompare(updatedAt) > 0 ? result : updatedAt
      }, '')

      return result.localeCompare(updatedAt) > 0 ? result : updatedAt
    }

    return result
  }, entry?.sys?.updatedAt ?? '')
}
