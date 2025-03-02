<script lang="ts">
	import { useDispatch, useSelector } from '$lib/index.js';
	import type { RootState } from '../store/store.js';
	import { decrement, increment } from '../store/store.js';

	const count = useSelector((state: RootState) => state.counter.value);
	const dispatch = useDispatch();
</script>

<div>
	<h3>Clicks: {count.value}</h3>
	<button onclick={() => dispatch(increment())}> +1 </button>

	<button onclick={() => dispatch(decrement())}> -1 </button>
</div>

<style>
	div {
		border: 1px solid black;
		padding: 10px;
		margin: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		width: fit-content;
		background-color: white;
		color: black;
		border-radius: 8px;
	}
</style>
