/**
 * Represents a page.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @interface Page
 * @property {string} id The unique identifier of the page.
 * @property {string} updatedAt The date when the page was last updated.
 * @property {string} title The title of the page.
 * @property {string} slug The slug of the page.
 */
export interface Page {
  readonly id: string
  readonly updatedAt: string
  title: string
  slug: string
}
