<!-- @component Anchor or button element -->
<script lang="ts">
  import type { LinkProps } from '$lib/types/component.type'

  let { class: styles, children, ...props }: LinkProps = $props()
</script>

<!-- Render an anchor element if the href property is present -->
<svelte:element this={props.href ? 'a' : 'button'} {...props} class={styles}>
  {@render children?.()}
</svelte:element>
