import { Page, TestInfo } from '@playwright/test';

export async function attachScreenshot(page: Page, testInfo: TestInfo, name: string = 'screenshot') {
  const buffer = await page.screenshot();
  await testInfo.attach(name, {
    body: buffer,
    contentType: 'image/png',
  });
}