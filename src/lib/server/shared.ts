import type { Config } from '$lib/types/shared.type'
import { type ContentfulClientApi, createClient } from 'contentful'

/**
 * The application configuration object.
 * @since 1.0.0
 *
 * @const
 * @type {Config}
 */
export const config: Config = {
  cms: {
    uri: process.env.CMS_URI!,
    key: process.env.CMS_KEY!,
  },
}

/**
 * The contentful client.
 * @since 1.0.0
 *
 * @const
 * @type {ContentfulClientApi<undefined>}
 */
export const cms: ContentfulClientApi<undefined> = createClient({ space: config.cms.uri, accessToken: config.cms.key })
