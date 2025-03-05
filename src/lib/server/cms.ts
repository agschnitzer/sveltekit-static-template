import { cms } from '$lib/server/shared'
import type { Page } from '$lib/types/entity.type'

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
    const { sys: { id, updatedAt }, fields: { title, description, url } } = (await cms.getEntries({
      content_type: 'demoPages',
      'fields.slug': slug,
    })).items[0]

    return {
      id,
      updatedAt,
      slug,
      title: title as string,
      description: description as string,
      url: url as string,
    }
  } catch (error: unknown) {
    throw new Error(`Error fetching page: ${ error }`)
  }
}
