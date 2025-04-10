<script lang="ts">
  import '../app.css'
  import { page } from '$app/state'
  import Link from '$lib/elements/Link.svelte'

  let { children } = $props()

  const imageUrl = `${ page.data.url }${ page.data.image.highRes.src.substring(1) }`

  /**
   * Convert a date string to a human-readable format.
   * @since 1.0.0
   * @version 1.0.0
   *
   * @param {string} date The date string to convert.
   * @returns {string} A human-readable date string.
   */
  const dateToString = (date: string): string => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
</script>

<svelte:head>
  <link rel="canonical" href={page.data.url}>

  <title>{page.data.title}</title>
  <meta property="og:title" content={page.data.title}>
  <meta name="og:site_name" content={page.data.title}>
  <meta property="twitter:title" content={page.data.title}>

  <meta name="description" content={page.data.description}>
  <meta property="og:description" content={page.data.description}>
  <meta property="twitter:description" content={page.data.description}>

  <meta property="og:locale" content="en_GB">
  <meta property="og:type" content="website">
  <meta property="og:url" content={page.data.url}>
  <meta name="twitter:card" content="summary_large_image">

  <meta property="og:image" content={imageUrl}>
  <meta property="twitter:image" content={imageUrl}>
  <meta property="og:image:alt" content={page.data.image.alt}>
  <meta property="twitter:image:alt" content={page.data.image.alt}>
  <meta property="og:image:width" content={page.data.image.highRes.width.toString()}>
  <meta property="og:image:height" content={page.data.image.highRes.height.toString()}>
  <meta property="og:image:type" content={page.data.image.highRes.format}>
</svelte:head>

<Link href="#content" class="focus:fixed top-4 left-4 z-50 sr-only focus:not-sr-only">Skip to content</Link>

<p class="sr-only">
  Published
  <time datetime={page.data.publishedOn}>{dateToString(page.data.publishedOn)}</time>
</p>
<p class="sr-only">
  Last updated:
  <time datetime={page.data.updatedAt}>{dateToString(page.data.updatedAt)}</time>
</p>

<main id="content">{@render children()}</main>
