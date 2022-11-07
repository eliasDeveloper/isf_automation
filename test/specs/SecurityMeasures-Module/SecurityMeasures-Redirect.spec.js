const smPage = require('../../pageobjects/security-measures-module/security-measures-list.page');
const chaiExpect = require('chai').expect;
const helper = require('../../utilities/helper');

describe('check redirecting to the security measures page', async () => {
	it('should Login successfully', async () => {
		await browser.maximizeWindow();
		await helper.loginAndCheckIfSuccessful();
	});

	it('should click on security-measures menu icon and redirect', async () => {
		await smPage.redirectToSecurityMeasuresList();
	});

	it('should click on create new security-measures and redirect', async () => {
		await smPage.redirectToAddSecurityMeasuresList();
	});

	it('should select a security-measure from the list and redirect', async () => {
		await smPage.redirectToSecurityMeasuresList();
		await smPage.trFirstSecurityMeasure.click();
		await helper.WaitBrowserToFinishLoading(10000);
		await smPage.chekMapandButton();
	});

	it('should select a security-measure from the list, redirect and compare code', async () => {
		await smPage.redirectToSecurityMeasuresList();
		const firstSecMeas = await smPage.getFirstSecMeasCodeFromList();
		await smPage.trFirstSecurityMeasure.click();
		await helper.WaitBrowserToFinishLoading(10000);
		await smPage.chekMapandButton();
		await smPage.btnSituation.click();
		await helper.WaitBrowserToFinishLoading(20000);
		await helper.waitForElementToBeDisplayed(smPage.situationDialog, 20000);
		await helper.waitForElementToBeDisplayed(smPage.inputSecMeasCode[1], 20000);
		await chaiExpect(await smPage.inputSecMeasCode[1].getValue()).to.equal(firstSecMeas);
	});

});
