import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';


/* Read environment variables from file.*/

const testEnv = process.env.TEST_ENV || 'test';
const headless = process.env.HEADLESS !== 'false';
const selectedBrowser = process.env.BROWSER_NAME?.toLowerCase();

const baseUrls: Record<string, string> = {
  test: 'https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/',
  pentest: 'https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/',
  prod: 'https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/',
};

const baseURL = baseUrls[testEnv];

// Define all browser projects with device presets + overrides
const allProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], headless, baseURL,
      viewport: { width: 1600, height: 900 },
      deviceScaleFactor: 1,
      // to deny permission prompts for geolocation.
      permissions: [],
      launchOptions: {
          args: ['--deny-permission-prompts'],
        },
       
     },
  },
  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'], headless, baseURL },
  // },
  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'], headless, baseURL },
  // },
];

// Filter project if BROWSER_NAME is provided
const filteredProjects = selectedBrowser
  ? allProjects.filter(p => p.name === selectedBrowser)
  : allProjects;


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  testDir: './tests',
  outputDir: 'test-results/',

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright']
  ],
  timeout: 30000, // 30 seconds for each test
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // dont need it here anymore
    //baseURL: 'https://vwfs-cc.test.exozet.com/',
    // Enable screenshot only on failure
    screenshot: 'only-on-failure',
    // Enable video recording only on failure
    video: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: filteredProjects,
  // [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
 // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
