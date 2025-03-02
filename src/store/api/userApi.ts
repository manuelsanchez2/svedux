import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'; // ✅ Ensure `.react` is removed

const delayedBaseQuery = async (args: any, api: any, extraOptions: any) => {
	await new Promise((resolve) => setTimeout(resolve, 2000)); // ⏳ Add 2-second delay
	return fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' })(
		args,
		api,
		extraOptions
	);
};

// RTK Query API for user-related operations
export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: delayedBaseQuery, // 🕒 Use the custom base query
	endpoints: (builder) => ({
		// Fetch a single user
		fetchUser: builder.query<{ id: number; name: string }, void>({
			query: () => '/users/1'
		}),

		// Fetch multiple users
		fetchUsers: builder.query<{ id: number; name: string }[], void>({
			query: () => '/users'
		}),

		// Fetch user by ID (dynamic)
		fetchUserById: builder.query<{ id: number; name: string }, number>({
			query: (id) => `/users/${id}`
		}),

		// Update user (PUT request)
		updateUser: builder.mutation<{ id: number; name: string }, { id: number; name: string }>({
			query: ({ id, name }) => ({
				url: `/users/${id}`,
				method: 'PUT',
				body: { name }
			})
		}),

		// Delete user
		deleteUser: builder.mutation<{ success: boolean }, number>({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'DELETE'
			})
		})
	})
});

// ✅ Instead of exporting React hooks, we export endpoints for manual dispatching
export const {
	endpoints: { fetchUser, fetchUsers, fetchUserById, updateUser, deleteUser }
} = userApi;
