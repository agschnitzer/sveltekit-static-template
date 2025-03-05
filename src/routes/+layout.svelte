<script lang="ts">
  import '../app.css'
  import { page } from '$app/state'

  let { children } = $props()
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
</svelte:head>

{@render children()}
