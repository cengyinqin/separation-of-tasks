import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:3000',
    viewport: { width: 390, height: 844 },
    channel: 'chrome',
  },
  webServer: {
    command: 'node server.js',
    port: 3000,
    reuseExistingServer: true,
  },
});
