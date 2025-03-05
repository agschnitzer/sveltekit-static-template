/**
 * Represents the configuration of the application.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @interface Config
 * @property {object} cms The contentful configuration.
 */
export interface Config {
  cms: {
    /** The contentful space. */
    uri: string
    /** The key to access the contentful API. */
    key: string
  }
}
