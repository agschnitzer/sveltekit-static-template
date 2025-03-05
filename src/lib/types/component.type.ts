import type { Snippet } from 'svelte'
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

/**
 * Represents the base properties of a component.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @interface ComponentProps
 * @property {Snippet} [children] Optional. The children of the component.
 */
export type ComponentProps = {
  children?: Snippet
}

/**
 * Represents the properties of a link component. Can be an anchor or a button.
 * @since 1.0.0
 * @version 1.0.0
 *
 * @interface LinkProps
 */
export type LinkProps = ComponentProps & HTMLAnchorAttributes & HTMLButtonAttributes
