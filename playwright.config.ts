import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  // 3 minutes per test
  timeout: 180000,

  expect: {
    timeout: 10000
  },

  use: {
    baseURL: 'https://finops-demo.streamlit.app/',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});