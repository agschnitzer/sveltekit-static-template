import type { Image } from '$lib/types/entity.type'
import { ReadableStream } from 'node:stream/web'

/**
 * Represents the configuration of the application.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @interface Config
 * @property {object} cms The contentful configuration.
 * @property {object} assets The paths where the assets are stored.
 */
export interface Config {
  cms: {
    /** The contentful space. */
    uri: string
    /** The key to access the contentful API. */
    key: string,
    /** The ID of the content type for pages. */
    contentTypeId: string
    assetSizes: {
      /** The default sizes of the responsive images. */
      default: string
    },
    /** A unique tag associated with assets. */
    assetTag: string
  }
  assets: {
    /** The path to the assets' directory. */
    dir: string
    /** The path to the generated files' directory. */
    generatedDir: string
  }
}

/**
 * Represents an asset.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @interface Asset
 * @property {string} filename The name of the asset file.
 * @property {ReadableStream<Uint8Array>} stream The stream to download the asset.
 * @property {string[]} sizes The sizes of the asset for responsive images.
 */
export interface Asset {
  filename: string
  stream: ReadableStream<Uint8Array>
  sizes: string[]
}

/**
 * Represents an imported asset.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @interface AssetImport
 * @property {Omit<Image, 'id' | 'alt'>} image The image object without the ID and alt text.
 * @property {string} srcset The srcset attribute of the image.
 */
export interface AssetImport {
  image: Omit<Image, 'id' | 'alt'>
  srcset: string
}
