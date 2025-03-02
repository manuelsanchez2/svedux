import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/tests/setup.ts',
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		conditions: mode === 'test' ? ['browser'] : undefined
	}
}));
