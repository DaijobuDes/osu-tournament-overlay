<script lang="ts">
	interface Props {
		musicArtist: string;
		beatmapTitle: string;
		mapperName: string;
		difficultyName: string;
	}

	const { musicArtist, beatmapTitle, mapperName, difficultyName }: Props = $props();
</script>

<div class="inner-box">
	<div class="row-1">
		<div class="title" id="title">{musicArtist} - {beatmapTitle}</div>
	</div>
	<div class="row-2">
		<div class="mapper">mapper</div>
		<div class="mapper-name">{mapperName}</div>
		<div class="difficulty">difficulty</div>
		<div class="difficulty-name">{difficultyName}</div>
	</div>
</div>
