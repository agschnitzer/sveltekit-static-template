<!-- @component Lazy loading image -->
<script lang="ts">
  import type { ImageProps } from '$lib/types/component.type'

  let { class: styles, id, src, alt, width, height, srcset, sizes, loading = 'lazy' }: ImageProps = $props()
</script>

<img {id} {src} {alt} {width} {height} {loading} {srcset} {sizes} fetchpriority={loading === 'lazy' ? 'low' : 'high'} class={styles}>
