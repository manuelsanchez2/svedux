<script lang="ts">
	import { Provider } from '$lib/index.js';
	import { store } from '../store/store.js';
	export let Component;
</script>

<Provider {store}>
	<svelte:component this={Component} />
</Provider>
