<script lang="ts">
	import { onMount } from 'svelte';
	import { tosuState, initSocket } from '../utils/socket.svelte';

	onMount(() => {
		initSocket();
	});

	// $derived re-evaluates automatically whenever tosuState.data updates
	let title = $derived(tosuState.data?.beatmap?.title ?? 'No map');
	let difficulty = $derived(tosuState.data?.beatmap?.version ?? 'N/A');
	let songFolder = $derived(tosuState.data?.folders?.songs);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if tosuState.data}
	<div>
		<h2>Beatmap: {title}</h2>
		<p>Folder: {songFolder}</p>
		<p>Difficulty: {difficulty}</p>
	</div>
{:else}
	<p>Connecting to socket...</p>
{/if}
