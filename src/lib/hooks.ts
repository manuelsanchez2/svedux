import type {
	UnknownAction,
	Action as BasicAction,
	Store,
	Dispatch,
	ThunkDispatch
} from '@reduxjs/toolkit';
import { getContext } from 'svelte';

export const contextStoreKey = Symbol('redux-store');
export const contextStoreStateKey = Symbol('redux-store-state');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useStore<State = unknown, Action extends BasicAction<any> = UnknownAction>() {
	const store = getContext<Store<State, Action>>(contextStoreKey);
	return store;
}

export function useSelector<TState, TSelected>(
	selector: (state: TState) => TSelected
): {
	readonly value: TSelected;
} {
	if (typeof selector !== 'function')
		throw new Error('You must pass a function as a selector to useSelector');

	const stateFn = getContext<() => TState>(contextStoreStateKey);

	return {
		get value() {
			return selector(stateFn());
		}
	};
}

export function useDispatch<
	State = unknown,
	Action extends BasicAction<any> = UnknownAction
>(): ThunkDispatch<State, undefined, Action> & Dispatch<Action> {
	const store = useStore<State, Action>();
	return store.dispatch as ThunkDispatch<State, undefined, Action> & Dispatch<Action>;
}
