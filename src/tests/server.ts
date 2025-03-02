import { http } from 'msw';
import { setupServer } from 'msw/node';

const mockUser = { id: 1, name: 'Leanne Graham' };
const mockUsers = [
	{ id: 1, name: 'User1' },
	{ id: 2, name: 'User2' }
];

// ✅ Mock API handlers
export const handlers = [
	http.get('https://jsonplaceholder.typicode.com/users/1', (_info) => {
		return new Response(JSON.stringify(mockUser));
	}),
	http.get('https://jsonplaceholder.typicode.com/users', (_info) => {
		return new Response(JSON.stringify(mockUsers));
	}),
	http.get('https://jsonplaceholder.typicode.com/users/:id', ({ params }) => {
		const userId = Number(params.id);
		const user = mockUsers.find((user) => user.id === userId);
		return user ? new Response(JSON.stringify(user)) : new Response(null, { status: 404 });
	}),
	http.put('https://jsonplaceholder.typicode.com/users/:id', async ({ request, params }) => {
		const userId = Number(params.id);
		const { name } = (await request.json()) as { name: string };
		return new Response(JSON.stringify({ id: userId, name }));
	}),
	http.delete('https://jsonplaceholder.typicode.com/users/:id', (_info) => {
		return new Response(JSON.stringify({ success: true }));
	})
];

// ✅ Setup mock server
export const server = setupServer(...handlers);
