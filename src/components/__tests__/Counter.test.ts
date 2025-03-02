import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Counter from '../Counter.svelte';
import TestWrapper from '../TestWrapper.svelte';

describe('Counter Component', () => {
	it('renders with initial value', async () => {
		const { getByText } = render(TestWrapper, {
			props: { Component: Counter }
		});

		expect(getByText('Clicks: 0')).toBeInTheDocument();
	});

	it('increments and decrements the counter when the button is clicked', async () => {
		const { getByText } = render(TestWrapper, {
			props: { Component: Counter }
		});

		const button = getByText('+1');
		await fireEvent.click(button);

		expect(getByText('Clicks: 1')).toBeInTheDocument();

		const buttonMinus = getByText('-1');
		await fireEvent.click(buttonMinus);

		expect(getByText('Clicks: 0')).toBeInTheDocument();
	});
});
