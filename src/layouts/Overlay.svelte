<script lang="ts">
	import MapDifficultyInfomation from '../components/MapDifficultyInfomation.svelte';
	import MapGeneralInformation from '../components/MapGeneralInformation.svelte';
	import MapInformation from '../components/MapInformation.svelte';
	import MapManiaDifficultyInformation from '../components/MapManiaDifficultyInformation.svelte';
	import { isMania, secondsToHumanReadable } from '../utils/helpers';
	import { tosuState } from '../utils/socket.svelte';

	const baseBgImg = '/card@2x.jpg';
	const baseUrl = 'http://127.0.0.1:24050/files/beatmap';

	let artist = $derived(tosuState.data?.beatmap.artist ?? 'Unknown artist');
	let beatmapTitle = $derived(tosuState.data?.beatmap?.title ?? 'No map loaded.');
	let difficultyName = $derived(tosuState.data?.beatmap?.version ?? 'No difficulty loaded.');
	let mapperName = $derived(tosuState.data?.beatmap?.mapper ?? 'No mapper.');
	let beatmapGamemode = $derived(tosuState.data?.beatmap.mode.number);

	let ar = $derived(tosuState.data?.beatmap.stats.ar.converted);
	let cs = $derived(tosuState.data?.beatmap.stats.cs.converted);
	let hp = $derived(tosuState.data?.beatmap.stats.hp.converted);
	let ln = $derived(tosuState.data?.beatmap.stats.objects.holds);
	let od = $derived(tosuState.data?.beatmap.stats.od.converted);
	let rc = $derived(tosuState.data?.beatmap.stats.objects.circles);
	let stars = $derived(tosuState.data?.beatmap.stats.stars.total);

	let bpmCommon = $derived(tosuState.data?.beatmap.stats.bpm.common);
	let bpmMin = $derived(tosuState.data?.beatmap.stats.bpm.min);
	let bpmMax = $derived(tosuState.data?.beatmap.stats.bpm.max);

	let bpmFormatted = $derived.by(() => {
		if (bpmMin != bpmMax) return `${bpmMin}-${bpmMax} (${Math.round(bpmCommon)})`;
		return Math.round(bpmCommon);
	});

	let drainTime = $derived(
		tosuState.data?.beatmap.time.lastObject - tosuState.data?.beatmap.time.firstObject
	);

	let rawBgUrl = $derived(
		tosuState.data?.directPath?.beatmapBackground
			? `${baseUrl}/${encodeURIComponent(tosuState.data.directPath.beatmapBackground)}`
			: baseBgImg
	);

	// Active image state (only updates AFTER preloading completes)
	let activeBgUrl = $state(baseBgImg);

	// Preload effect: whenever rawBgUrl changes, fetch off-screen first
	$effect(() => {
		const target = rawBgUrl;
		if (!target) return;

		const img = new Image();
		img.src = target;

		img.onload = () => {
			activeBgUrl = target;
		};
	});
</script>

<div class="overlay">
	<div class="box-1" style="background-image: url('{activeBgUrl}')">
		<MapInformation musicArtist={artist} {beatmapTitle} {difficultyName} {mapperName} />
	</div>

	<div class="box-2">
		<MapDifficultyInfomation {ar} {cs} {od} {stars} />
	</div>

	{#if isMania(beatmapGamemode)}
		<div class="box-6">
			<MapManiaDifficultyInformation {rc} {ln} />
		</div>
	{/if}

	<div class="box-3">
		<MapGeneralInformation length={drainTime} bpm={bpmFormatted} />
	</div>

	<div class="box-4">
		<div class="inner-box">
			<div class="row-1">
				<!-- <template x-for="item in items.row1">
					<div class="value" id="item.col"></div>
				</template> -->
			</div>
			<div class="row-2">
				<!-- <template x-for="item in items.row2">
					<div class="value" id="item.col"></div>
				</template> -->
			</div>
		</div>
	</div>

	<div class="box-5">
		<div class="inner-box">
			<div class="logo">
				<img src="Logo_White.png" width="60" height="60" alt="Logo" />
			</div>
		</div>
	</div>
</div>
