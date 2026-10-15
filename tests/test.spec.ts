import { test } from '@playwright/test';
import { LoginPage } from '../pageFactory/LoginPage';

test.describe('FinOps Dashboard Validation', () => {

  test('Validate Cost Monitoring with FiltersAndSettings and Cost Allocation navigation', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // Step 1: Open FinOps application
    await loginPage.openApplication();

    // Step 2: Validate application/browser title
    await loginPage.validateApplicationTitle();

    // Step 3: Click Cost Monitoring
    await loginPage.clickCostMonitoring();

    // Step 4: Validate Cost Monitoring page
    await loginPage.validateCostMonitoringPage();

    // Step 5: Validate Filters & Settings
    await loginPage.validateFiltersAndSettings();

    // Step 6: Select Last 90 days
    await loginPage.select90Days();

    // Step 7: Validate Last 90 days selected
    await loginPage.validate90DaysSelected();

    // Step 8: Click Cost Allocation
    await loginPage.clickCostAllocation();

    // Step 9: Validate Cost Allocation page title
    await loginPage.validateCostAllocationPage();

    // Step 10: Close browser
    await page.close();

  });

});