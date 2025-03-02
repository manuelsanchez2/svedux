<script lang="ts">
	import { useDispatch, useSelector } from '$lib/index.js';
	import { fetchUser } from '../store/api/userApi.js';
	import { login, logout } from '../store/slices/userSliceWithCreateAPI.js';
	import type { RootState } from '../store/store.js';

	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.userCreateAPI);

	async function getUser() {
		const result = await dispatch(fetchUser.initiate());
		console.log(result);
	}
</script>

<div class="user">
	<h2 class="user__title">User Authentication</h2>
	<p class="user__status">Status: <strong>{user.value.status}</strong></p>

	{#if user.value.isLoggedIn}
		<div>
			<p class="user__message">Welcome, {user.value.user.name || 'User'}!</p>
			<button class="user__button user__button--logout" on:click={() => dispatch(logout())}>
				Logout
			</button>
		</div>
	{:else}
		<div class="user__buttons">
			<button
				class="user__button user__button--login"
				on:click={() => dispatch(login('Manual User'))}
			>
				Login Manually
			</button>
			<button class="user__button user__button--fetch" on:click={getUser}> Fetch User </button>
		</div>
	{/if}
</div>

<style>
	.user {
		padding: 16px;
		border: 1px solid #ddd;
		border-radius: 8px;
		box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
		max-width: 300px;
		background-color: #fff;
		color: black;
	}

	.user__title {
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 8px;
	}

	.user__status {
		margin: 8px 0;
		font-size: 0.9rem;
		color: #555;
	}

	.user__message {
		font-size: 1rem;
		margin-bottom: 12px;
	}

	.user__buttons {
		display: flex;
		gap: 10px;
	}

	.user__button {
		padding: 8px 12px;
		font-size: 0.9rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background 0.3s;
	}

	.user__button--login {
		background-color: #007bff;
		color: white;
	}

	.user__button--login:hover {
		background-color: #0056b3;
	}

	.user__button--fetch {
		background-color: #28a745;
		color: white;
	}

	.user__button--fetch:hover {
		background-color: #1e7e34;
	}

	.user__button--logout {
		background-color: #dc3545;
		color: white;
	}

	.user__button--logout:hover {
		background-color: #a71d2a;
	}

	.user__button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>
