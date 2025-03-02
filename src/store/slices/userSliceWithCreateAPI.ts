import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi.js';

export const userSliceWithCreateAPI = createSlice({
	name: 'userWithCreateAPI',
	initialState: {
		isLoggedIn: false,
		user: null as any | null, // ✅ Store the full user object
		status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
		error: null as string | null
	},
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.user = { name: action.payload }; // ✅ Ensure user object exists
			state.error = null;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = null;
			state.status = 'idle';
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(userApi.endpoints.fetchUser.matchPending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addMatcher(userApi.endpoints.fetchUser.matchFulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isLoggedIn = true;
				state.user = action.payload; // ✅ Store full user object
				state.error = null;
			})
			.addMatcher(userApi.endpoints.fetchUser.matchRejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error?.message || 'Failed to fetch user';
			});
	}
});

export const { login, logout } = userSliceWithCreateAPI.actions;
