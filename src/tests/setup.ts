import '@testing-library/jest-dom';

import { server } from './server.js';
import { beforeAll, afterEach, afterAll } from 'vitest';

// Start the API mock server before tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers()); // Reset after each test
afterAll(() => server.close()); // Cleanup after all tests
