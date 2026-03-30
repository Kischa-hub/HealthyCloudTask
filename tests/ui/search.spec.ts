import { test, expect } from '@playwright/test';
import { HomeSearch } from '../../pages/homesearch.page';
import {PraxisDetails } from '../../pages/praxisdetails.page'; 
import { logger, logTestStart, logSuiteEnd, logTestEnd } from '../../utils/logging/logger';
import { attachScreenshot } from '../../utils/screenshotHelper';

test.describe('TestSuit - Search', () => {
    let homesearchpage: HomeSearch;
    let praxisdetailspage: PraxisDetails;

    // HOOKS
    test.beforeEach(async ({ page, browserName }, testInfo) => {
        logTestStart(browserName, testInfo);
        homesearchpage = new HomeSearch(page);
        praxisdetailspage = new PraxisDetails(page);
        logger.info('Step 1: Navigating to Search page');
        await homesearchpage.goto();
        logger.info('Step deny cookies: Deny Cookies');
        await homesearchpage.denyCookies.click();
    });

    test('Search by a city name & verify the result label and details page', async ({ page }, testInfo) => {
        
        logger.info('Step 2: Insert city name in the search box');
        await homesearchpage.fillSeachboxwithCity('berlin');
        logger.info('Step 3: Click on search button');
        await page.getByRole('option', { name: 'Berlin', exact: true }).click();
        await homesearchpage.searchTextbox.press('Enter');
        await homesearchpage.searchButton.click();
        logger.info('Step 4: Expect the result label to be visible');
        await expect(homesearchpage.resultsLabel).toBeVisible();
        logger.info('Step 5: Expect the result label to contain text');
        await expect(homesearchpage.resultsLabel).toContainText('151 Ergebnisse');
        logger.info('Step 6: Click on details link');
        await homesearchpage.detalisLink.click();
        logger.info('Step 7: Expect the praxis image to be visible');
        await expect(praxisdetailspage.praxisImage).toBeVisible();
        logger.info('Step 8: Expect the praxis label to contain text');
        await expect(praxisdetailspage.praxisLabel).toContainText('Alexander Liebrucks');
    });





    test.afterEach(async ({ page }, testInfo) => {
        // Clear cookies and local storage
        if (!page.isClosed()) {
            await page.evaluate(() => {
                localStorage.clear();
                sessionStorage.clear();
            });

            await page.context().clearCookies();
        }
        // Log
        logTestEnd(testInfo);

    });

    test.afterAll(async () => {
        logSuiteEnd('TestSuit - Search');
    });

});