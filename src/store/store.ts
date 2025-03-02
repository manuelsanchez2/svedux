import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counterSlice.js';
import { userSlice } from './slices/userSlice.js';
import { userSliceWithCreateAPI } from './slices/userSliceWithCreateAPI.js';
import { userApi } from './api/userApi.js';

export const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		user: userSlice.reducer,
		userCreateAPI: userSliceWithCreateAPI.reducer,
		[userApi.reducerPath]: userApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
});

export const { increment, decrement } = counterSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
