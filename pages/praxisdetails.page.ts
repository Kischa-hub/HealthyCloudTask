import { expect, type Locator, type Page } from '@playwright/test';

export class PraxisDetails {
  readonly page: Page;
  readonly praxisImage: Locator;
  readonly praxisLabel:Locator;




  constructor(page: Page) {
    this.page = page;
    this.praxisImage = page.getByRole('img', { name: 'Dieses Bild zeigt die' });
    this.praxisLabel = page.locator('#PraxisName');
  }

  async goto() {
    await this.page.goto('https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/PraxisDetailsPage/c7a06cbf-1af5-4dc1-a495-33092d8efd38');
  }


 

}