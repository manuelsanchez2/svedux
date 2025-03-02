<script lang="ts">
	import { Provider, useSelector } from '$lib/index.js';
	import Counter from '../components/Counter.svelte';
	import { store, type RootState } from '../store/store.js';
	import '../global.css';
	import GitHubCorner from '../components/GitHubCorner.svelte';
	import SvelteLogo from '../components/SvelteLogo.svelte';
	import UserComponent from '../components/UserComponent.svelte';
	import UserComponentWithCreateApi from '../components/UserComponentWithCreateAPI.svelte';

	// const count = useSelector((state: RootState) => state.counter.value);
</script>

<Provider {store}>
	<main>
		<GitHubCorner />

		<SvelteLogo />
		<h1>Let's discuss Redux with Svelte</h1>

		<section class="flex-col">
			<h2>Cases with simple stores</h2>
			<Counter />
		</section>

		<section class="flex-col">
			<h2>Cases with API</h2>

			<div class="user-components">
				<div class="user-components__block">
					<h3>User Component (createAsyncThunk)</h3>
					<UserComponent />
				</div>

				<div class="user-components__block">
					<h3>User Component (with createAPI)</h3>
					<UserComponentWithCreateApi />
				</div>
			</div>
		</section>
	</main>
</Provider>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 2rem;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
