/**
 * Represents a page.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @interface Page
 * @property {string} id The unique identifier of the page.
 * @property {string} updatedAt The date when the page was last updated.
 * @property {string} publishedOn The date when the page was published.
 * @property {string} slug The slug of the page.
 * @property {string} title The title of the page.
 * @property {string} description The description of the page shown in search results.
 * @property {string} url The URL of the page.
 * @property {Image} image The image associated with the page used for social sharing.
 */
export interface Page {
  readonly id: string
  readonly updatedAt: string
  readonly publishedOn: string
  slug: string
  title: string
  description: string
  url: string
  image: Image
}

/**
 * Represents an image.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @interface Image
 * @property {string} src The source of the image.
 * @property {number} width The width of the image in pixels.
 * @property {number} height The height of the image in pixels.
 * @property {string} alt The alt text of the image.
 * @property {string} format The format of the image.
 * @property {string} srcset The srcset of the image.
 */
export interface Image {
  readonly id: string
  src: string
  width: number
  height: number
  alt: string
  format: string
  srcset: string
}
