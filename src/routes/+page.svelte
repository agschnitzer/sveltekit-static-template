<script lang="ts">
  import Image from '$lib/elements/Image.svelte'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<div class="max-w-xl mx-auto p-4 bg-slate-200 rounded-md">
  <Image {...data.image} sizes="(min-width: 23rem) 21rem, 90vw" class="mb-4 mx-auto"/>
  <h2 class="font-medium">{data.title}</h2>
  <p>{data.description}</p>
</div>
