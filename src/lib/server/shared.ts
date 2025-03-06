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
    assetSizes: {
      default: process.env.CMS_ASSET_TYPE_DEFAULT!,
    },
    assetTag: process.env.CMS_ASSET_ID!,
  },
  assets: {
    dir: process.env.ASSET_DIR!,
    generatedDir: process.env.ASSET_GENERATED_DIR!,
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
