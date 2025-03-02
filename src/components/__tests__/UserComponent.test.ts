import { render, fireEvent, screen, waitFor } from '@testing-library/svelte';
import { beforeEach, describe, expect, it } from 'vitest';
import UserComponent from '../UserComponent.svelte';
import TestWrapper from '../TestWrapper.svelte';
import { server } from '../../tests/server.js';

describe('UserComponent', () => {
	beforeEach(() => {
		server.resetHandlers(); // Reset API mocks before each test
	});

	it('renders with initial state', async () => {
		render(TestWrapper, { props: { Component: UserComponent } });

		await waitFor(() => {
			expect(screen.getByText('Status:', { exact: false })).toBeInTheDocument();
		});

		expect(screen.getByText('Fetch User')).toBeInTheDocument();
	});

	it('logs in manually', async () => {
		render(TestWrapper, { props: { Component: UserComponent } });

		const loginButton = screen.getByText('Login Manually');
		await fireEvent.click(loginButton);

		expect(screen.getByText('Welcome, Manual User!')).toBeInTheDocument();
	});

	it('logs out successfully', async () => {
		render(TestWrapper, { props: { Component: UserComponent } });

		const logoutButton = screen.getByText('Logout');
		await fireEvent.click(logoutButton);

		expect(screen.getByText('Fetch User')).toBeInTheDocument();
	});

	it('fetches user and updates UI', async () => {
		render(TestWrapper, { props: { Component: UserComponent } });

		const fetchButton = screen.getByText('Fetch User');
		await fireEvent.click(fetchButton);

		// Wait for loading status
		await waitFor(() => {
			expect(screen.getByText('Status:', { exact: false })).toHaveTextContent('loading');
		});

		// Wait for user data to load
		await waitFor(() => {
			expect(
				screen.getByText((content) => content.includes('Welcome, Leanne Graham'))
			).toBeInTheDocument();
		});
	});
});
