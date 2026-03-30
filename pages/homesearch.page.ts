import { expect, type Locator, type Page } from '@playwright/test';

export class HomeSearch {
  readonly page: Page;
  readonly denyCookies: Locator;
  readonly searchTextbox:Locator;
  readonly searchButton :Locator;
  readonly resultsLabel:Locator;
  readonly detalisLink: Locator;



  constructor(page: Page) {
    this.page = page;
    this.denyCookies = page.getByLabel('Deny');
    this.searchTextbox = page.getByPlaceholder('Bitte Ort oder Postleitzahl');
    this.searchButton = page.getByRole('button', { name: 'Gruppen suchen' });
    this.resultsLabel = page.getByText('Ergebnisse');
    this.detalisLink = page.getByRole('link', { name: 'Details' });
  }

  async goto() {
    await this.page.goto('https://gruppenplatz.healthycloud.de/HC_GP_Public_Pages/');
  }

  async fillSeachboxwithCity(city : string){
    return await this.searchTextbox.fill(city);
  }



  

  

 

}