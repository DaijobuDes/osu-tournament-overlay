<script lang="ts">
	import { secondsToHumanReadable } from '../utils/helpers';

	interface Props {
		length: number;
		bpm: number | string;
	}

	const { length = 0, bpm = NaN }: Props = $props();
</script>

<div class="inner-box">
	<div class="row-1">
		<div class="text">Length</div>
		<div class="value">{secondsToHumanReadable(length)}</div>
	</div>
	<div class="row-2">
		<div class="text">BPM</div>
		<div class="value">{bpm}</div>
	</div>
</div>
