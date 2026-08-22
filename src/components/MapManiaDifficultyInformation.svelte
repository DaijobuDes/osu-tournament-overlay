<script lang="ts">
	interface Props {
		rc: number | string;
		ln: number | string;
	}

	const { rc = NaN, ln = NaN }: Props = $props();
</script>

<div class="inner-box">
	<div class="row-1">
		<div class="text">Rice Count</div>
		<div class="value">{rc}</div>
	</div>
	<div class="row-2">
		<div class="text">Long Notes Count</div>
		<div class="value">{ln}</div>
	</div>
</div>
