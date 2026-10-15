import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly appFrame: FrameLocator;

  // Sidebar
  readonly costMonitoringLink: Locator;
  readonly costAllocationLink: Locator;

  // Cost Monitoring
  readonly costMonitoringTitle: Locator;
  readonly filtersSettings: Locator;
  readonly timeRangeDropdown: Locator;

  // Cost Allocation
  readonly costAllocationTitle: Locator;

  constructor(page: Page) {

    this.page = page;

    // Streamlit application iframe
    this.appFrame = page.frameLocator('iframe[title="streamlitApp"]');

    // -------------------------
    // Sidebar Navigation
    // -------------------------

    this.costMonitoringLink = this.appFrame.getByRole('link', {
      name: 'Cost Monitoring',
      exact: true
    });

    this.costAllocationLink = this.appFrame.getByRole('link', {
      name: 'Cost Allocation',
      exact: true
    });

    // -------------------------
    // Cost Monitoring Page
    // -------------------------

    this.costMonitoringTitle = this.appFrame.getByRole('heading', {
      name: /Cost Monitoring/i
    });

    this.filtersSettings = this.appFrame.getByText(
      'Filters & Settings',
      { exact: false }
    ).first();

    /*
       Streamlit normally exposes the selectbox as a combobox.

       If there are multiple dropdowns on the page,
       using .first() selects the first one.
    */
    this.timeRangeDropdown = this.appFrame
      .getByRole('combobox')
      .first();

    // -------------------------
    // Cost Allocation Page
    // -------------------------

    this.costAllocationTitle = this.appFrame.getByRole('heading', {
    name: /Cost Allocation & Tag Management/i,
    level: 1
     });
  }


  // ==========================================
  // Open Application
  // ==========================================

  async openApplication(): Promise<void> {

    await this.page.goto('https://finops-demo.streamlit.app/');

    await expect(
      this.page.locator('iframe[title="streamlitApp"]')
    ).toBeVisible();
  }


  // ==========================================
  // Validate Application Title
  // ==========================================

  async validateApplicationTitle(): Promise<void> {

    await expect(this.page)
      .toHaveTitle(/FinOps Dashboard/i);
  }


  // ==========================================
  // Cost Monitoring
  // ==========================================

  async clickCostMonitoring(): Promise<void> {

    await expect(this.costMonitoringLink)
      .toBeVisible();

    await this.costMonitoringLink.click();
  }


  async validateCostMonitoringPage(): Promise<void> {

    await expect(this.costMonitoringTitle)
      .toBeVisible();
  }


  // ==========================================
  // Filters & Settings
  // ==========================================

  async validateFiltersAndSettings(): Promise<void> {

    await expect(this.filtersSettings)
      .toBeVisible();
  }


  // ==========================================
  // Time Range
  // ==========================================

  async select90Days(): Promise<void> {

    await expect(this.timeRangeDropdown)
      .toBeVisible();

    await this.timeRangeDropdown.click();

    const last90DaysOption = this.appFrame
      .getByRole('option', {
        name: 'Last 90 days',
        exact: true
      });

    await expect(last90DaysOption)
      .toBeVisible();

    await last90DaysOption.click();
  }


  async validate90DaysSelected(): Promise<void> {
  await expect(this.timeRangeDropdown)
    .toHaveValue('Last 90 days');
}


  // ==========================================
  // Cost Allocation
  // ==========================================

  async clickCostAllocation(): Promise<void> {

    await expect(this.costAllocationLink)
      .toBeVisible();

    await this.costAllocationLink.click();
  }


  async validateCostAllocationPage(): Promise<void> {

    await expect(this.costAllocationTitle)
      .toBeVisible();
  }

}