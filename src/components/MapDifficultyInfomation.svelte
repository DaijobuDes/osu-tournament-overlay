<script lang="ts">
	import { supportedCS } from '../utils/helpers';
	import { tosuState } from '../utils/socket.svelte';

	interface Props {
		ar: number | string;
		cs: number | string;
		od: number | string;
		stars: number | string;
	}

	const { ar = NaN, cs = NaN, od = NaN, stars = NaN }: Props = $props();
	let beatmapGamemode = $derived(tosuState?.data?.beatmap.mode.number);
</script>

<div class="inner-box">
	<div class="row-1">
		{#if supportedCS(beatmapGamemode)}
			<div class="text">CS</div>
			<div class="value">{cs}</div>
			<div class="text">&nbsp;/&nbsp;</div>
			<div class="text">AR</div>
			<div class="value">{ar}</div>
			<div class="text">&nbsp;/&nbsp;</div>
		{/if}
		<div class="text">OD</div>
		<div class="value">{od}</div>
	</div>
	<div class="row-2">
		<div class="text">Star Rating</div>
		<div class="value">{stars}</div>
	</div>
</div>
