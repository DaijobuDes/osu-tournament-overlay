<script lang="ts">
	import { onMount } from 'svelte';
	import { initSocket } from '../utils/socket.svelte';
	import Overlay from '../layouts/Overlay.svelte';

	onMount(() => {
		initSocket();
	});
</script>

<Overlay />
