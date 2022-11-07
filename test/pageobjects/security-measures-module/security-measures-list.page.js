const { waitForElementToBeDisplayed } = require('../../utilities/helper');
const mapPage = require('../main.map.page');
const appSettings = require('../../utilities/app-settings.json');


class SecurityMeasuresListPage {
	get spanSecurityMeasures() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > app-security-measures > app-table-security-measures > section > button > span') }
	get btnAddSecurityMeasure() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > app-security-measures > app-table-security-measures > section > button') }
	get trFirstSecurityMeasure() { return $('div.table-containter > table > tbody > tr')}
	get spanFirstSecMeasInList() { return $('div.table-containter > table > tbody > tr > td > span')}
	get mapSecurityMeasures() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > app-security-measures > app-add-security-measure > div > app-leaflet-map') }
	get btnSituation() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > app-security-measures > app-add-security-measure > div > div > div > button') }
	get btnMeasure() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > app-security-measures > app-add-security-measure > div > div > div > button:nth-child(2)') }
	get inputSecMeasCode() { return $$('[formcontrolname="code"]')}
	get situationDialog() { return $('body > div > div > div > mat-dialog-container > app-situation-security-measures-dialog')}
	get txtFilterField() { return $('div.quick-search > mat-form-field > div.mat-form-field-wrapper > div.mat-form-field-flex > div.mat-form-field-infix > input') }
	get btnFilterSMList() { return $('div.quick-search > mat-form-field > div.mat-form-field-wrapper > div.mat-form-field-flex > div.mat-form-field-prefix > button') }
	get trSMList() { return $$('div.table-containter > table > tbody > tr')}
	get btnClearFilter() { return $('mat-sidenav-content > div > app-security-measures > app-table-security-measures > div > app-data-table > div.quick-search > mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-suffix> button')}
	get btnSearch() { return $('app-security-measures > app-table-security-measures > div > form > div:nth-child(2) > button.mat-focus-indicator.forms-positive-action-btn.search-btn.margin-left-10.mat-raised-button.mat-button-base')}
	get btnDeleteSearch() { return $('app-security-measures > app-table-security-measures > div > form > div:nth-child(2) > button.mat-focus-indicator.forms-negative-action-btn.search-btn.mat-raised-button.mat-button-base')}

	async redirectToSecurityMeasuresList() {
		await waitForElementToBeDisplayed(mapPage.securityMeasuresIcon, 20000);
		await mapPage.securityMeasuresIcon.click();
		await expect(browser).toHaveUrl(`${appSettings.base_url}/security-measures/security-measures-list`);
		await waitForElementToBeDisplayed(this.spanSecurityMeasures, 20000);
	}

	async chekMapandButton() {
		await waitForElementToBeDisplayed(this.mapSecurityMeasures, 10000);
		await waitForElementToBeDisplayed(this.btnSituation, 10000);
		await waitForElementToBeDisplayed(this.btnMeasure, 10000);
	}

	async getFirstSecMeasCodeFromList() {
		await waitForElementToBeDisplayed(this.spanFirstSecMeasInList, 20000);
        return await this.spanFirstSecMeasInList.getText();
	}

	async checkIfSMExists() {
		await waitForElementToBeDisplayed(this.trSMList[0], 10000);
		await browser.waitUntil(async () => (await this.trSMList.length) == 1,
			{
				timeout: 10000,
				timeoutMsg: `List was not reduced to 1 element`
			}
		);
		let smCount = await this.trSMList.length
		console.log('!!!!SMCount', smCount);
	}

	async filterinTableFilter(smCode) {
		await waitForElementToBeDisplayed(this.txtFilterField, 10000);
		await this.txtFilterField.setValue(smCode);
		await this.btnFilterSMList.click();
		await browser.pause(1000);
		await this.checkIfSMExists();
	}

	async redirectToAddSecurityMeasuresList() {
		await this.redirectToSecurityMeasuresList();
		await this.btnAddSecurityMeasure.click();
		await expect(browser).toHaveUrl(`${appSettings.base_url}/security-measures/add-security-measures`);
		await this.chekMapandButton();
	}

}

module.exports = new SecurityMeasuresListPage()