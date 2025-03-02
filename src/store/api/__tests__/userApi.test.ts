import { describe, it, expect, beforeEach } from 'vitest';
import { setupApiStore } from '../../../tests/setupApiStore.js';
import { userApi } from '../userApi.js';

describe('userApi', () => {
	let store: ReturnType<typeof setupApiStore> = setupApiStore(userApi);

	beforeEach(() => {
		store = setupApiStore(userApi);
	});

	it('fetches a single user', async () => {
		const result = await store.dispatch(userApi.endpoints.fetchUser.initiate());
		expect(result.data).toEqual({ id: 1, name: 'Leanne Graham' });
	});

	it('fetches multiple users', async () => {
		const result = await store.dispatch(userApi.endpoints.fetchUsers.initiate());
		expect(result.data).toEqual([
			{ id: 1, name: 'User1' },
			{ id: 2, name: 'User2' }
		]);
	});

	it('fetches a user by ID', async () => {
		const result = await store.dispatch(userApi.endpoints.fetchUserById.initiate(2));
		expect(result.data).toEqual({ id: 2, name: 'User2' });
	});

	it('updates a user', async () => {
		const result = await store.dispatch(
			userApi.endpoints.updateUser.initiate({ id: 1, name: 'Updated User' })
		);
		expect(result.data).toEqual({ id: 1, name: 'Updated User' });
	});

	it('deletes a user', async () => {
		const result = await store.dispatch(userApi.endpoints.deleteUser.initiate(1));
		expect(result.data).toEqual({ success: true });
	});
});
