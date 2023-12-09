<script>
	import { fly, fade } from 'svelte/transition'
	export let visible = false
</script>

{#if visible}
<div class="absolute -translate-y-2/4 -translate-x-2/4 rounded-sm bg-slate-100 top-[20%] left-[50%] bg-base-200 z-10 w-4/6 h-20 min-h-[10vh] padding-[24px]" transition:fly= {{ y: -200, duration: 300 }}>
	<slot />
</div>
<div class="fixed top-0 left-0 right-0 bottom-0 bg-black/[.54] z-2" transition:fade={{ duration: 200 }}></div>
{/if}

<style>
</style>