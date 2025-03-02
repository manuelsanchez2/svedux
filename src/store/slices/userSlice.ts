import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export type UserStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// ✅ Define UserState interface
export interface UserState {
	isLoggedIn: boolean;
	name: string;
	status: UserStatus;
}

// ✅ Define Initial State with the correct type
const initialState: UserState = {
	isLoggedIn: false,
	name: '',
	status: 'idle'
};

// ✅ Async thunk to fetch user data
export const fetchUser = createAsyncThunk<string, void>('user/fetchUser', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
	const data = await response.json();
	return data.name; // Only return the user's name
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			state.isLoggedIn = true;
			state.name = action.payload;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.name = '';
			state.status = 'idle'; // Reset status on logout
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isLoggedIn = true; // Automatically log in after fetching user
				state.name = action.payload;
			})
			.addCase(fetchUser.rejected, (state) => {
				state.status = 'failed';
			});
	}
});

export const { login, logout } = userSlice.actions;
