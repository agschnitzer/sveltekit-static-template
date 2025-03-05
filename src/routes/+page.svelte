<script lang="ts">
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()
</script>

<h2 class="font-medium">{data.title}</h2>
<p>{data.description}</p>
