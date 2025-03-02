import { counterSlice } from '../store/slices/counterSlice.js';
import { userSlice, type UserStatus } from '../store/slices/userSlice.js';
import { type RootState } from '../store/store.js';
import { configureStore } from '@reduxjs/toolkit';

export function setupCounterStore(preloadedState?: { counter: RootState['counter'] }) {
	return configureStore({
		reducer: { counter: counterSlice.reducer },
		preloadedState: preloadedState ?? { counter: { value: 0 } } // ✅ Ensure initial state is always defined
	});
}

export function setupUserStore(preloadedState?: { user: RootState['user'] }) {
	return configureStore({
		reducer: { user: userSlice.reducer },
		preloadedState: preloadedState ?? {
			user: { isLoggedIn: false, name: '', status: 'idle' as UserStatus }
		}
	});
}
