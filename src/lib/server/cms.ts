import { findUpdatedAtDate, loadAsset } from '$lib/server/data'
import { cms, config } from '$lib/server/shared'
import type { Page } from '$lib/types/entity.type'
import type { Asset, PageRef } from '$lib/types/shared.type'
import assert from 'node:assert'
import { ReadableStream } from 'node:stream/web'
import type { Asset as ContentfulAsset } from 'contentful'

/**
 * Fetches data for an individual page.
 * @since 1.0.0
 * @version 1.0.0
 * @async
 *
 * @param {string} slug The slug of the page to fetch.
 * @returns {Promise<Page>} A promise that resolves with the page data.
 */
export const fetchPage = async (slug: string): Promise<Page> => {
  try {
    // Extract the first item from the array since the slug is unique
    const page = (await cms.getEntries({ content_type: config.cms.contentTypeId, 'fields.slug': slug })).items[0]

    const { sys: { id }, fields: { title, description, url, publishedOn, image } } = page
    const { sys: { id: assetId }, fields: { title: alt, file } } = image as ContentfulAsset
    assert(file, `No file found for asset ${ assetId }`)

    return {
      id,
      updatedAt: findUpdatedAtDate(page),
      publishedOn: publishedOn as string,
      slug,
      title: title as string,
      description: description as string,
      url: url as string,
      image: {
        ...await loadAsset(file.fileName as string),
        id: assetId,
        alt: alt as string,
      },
    }
  } catch (error: unknown) {
    throw new Error(`Error fetching page\n${ error }`)
  }
}

/**
 * Fetches all pages with their URLs and last updated dates.
 * @since 1.0.0
 * @version 1.0.0
 * @async
 *
 * @returns {Promise<PageRef[]>} A promise that resolves with the page URLs and their last updated dates.
 */
export const fetchAllPages = async (): Promise<PageRef[]> => {
  try {
    return (await cms.getEntries({ content_type: config.cms.contentTypeId, include: 10 })).items.map(page => ({
      url: page.fields.url as string,
      updatedAt: findUpdatedAtDate(page),
    }))
  } catch (error: unknown) {
    throw new Error(`Error fetching pages\n${ error }`)
  }
}

/**
 * Fetches all assets from the CMS.
 * @since 1.0.0
 * @version 1.0.0
 * @async
 *
 * @returns {Promise<Asset[]>} A promise that resolves with the assets.
 */
export const fetchAllAssets = async (): Promise<Asset[]> => {
  try {
    const { items: assets } = await cms.getAssets({
      'metadata.tags.sys.id[in]': [config.cms.assetTag],
      select: ['sys.id', 'fields.description', 'fields.file'],
    })

    return await Promise.all(assets.map(async asset => {
      const { sys: { id }, fields: { description, file } } = asset
      assert(file, `No file found for asset ${ id }`)

      return {
        id,
        filename: file.fileName,
        stream: (await fetch(`https:${ file.url }`)).body as ReadableStream<Uint8Array>,
        // The description defines the sizes of the asset for responsive images
        sizes: (config.cms.assetSizes[description as keyof typeof config.cms.assetSizes] ?? config.cms.assetSizes.default).split(';'),
      }
    }))
  } catch (error: unknown) {
    throw new Error(`Error fetching assets\n${ error }`)
  }
}
