const smPage = require('../../pageobjects/security-measures-module/security-measures-list.page');
const smManagePage = require('../../pageobjects/security-measures-module/manage-security-measures.page');
const chaiExpect = require('chai').expect;
const helper = require('../../utilities/helper');


describe('Check editing a Security-Measure', async () => {
	it('should Login successfully', async () => {
		await browser.maximizeWindow();
		await helper.loginAndCheckIfSuccessful();
	});

	it('should redirect to add-security measure and edit some fields for Situation and Measures Dialogs ', async () => {
		// Redirect to add-security-measures and check elements
		await smPage.redirectToSecurityMeasuresList();
		// Click on first security-measure to edit 
		while (await smPage.trSMList.length == 0) {
			await browser.pause(1000);
		}
		await helper.selectRandomlyFromArrayAndClick(await smPage.trSMList);
		await helper.WaitBrowserToFinishLoading(10000);
		// Open Situation tab 
		await smPage.btnSituation.click();
		await helper.waitForElementToBeDisplayed(smPage.situationDialog, 10000);
		//Edit some Fields 
		await smManagePage.lookupMissionType.click();
		await helper.selectRandomlyMatOption();
		await smManagePage.situationField.setValue(helper.getRandomText(5));
		//Press finish
		await smManagePage.smFinishBtn.click();
		//Open measures dialog and edit fields
		await helper.WaitBrowserToFinishLoading(10000);
		await smPage.btnMeasure.click();
		await smManagePage.measurePlan.setValue(helper.getRandomText(10));
		await helper.waitForElementToBeDisplayed(smManagePage.addPlanBody, 10000);
		// Check if ideaLookup exists or not to add
		if (await smManagePage.ideaLookup.length === 0) {
			await smManagePage.addPlanBtn.click();
			// Select idea
			await smManagePage.ideaLookup[0].click();
			await helper.selectRandomlyMatOption();
		} else {
			// Select idea
			await smManagePage.ideaLookup[0].click();
			await helper.selectRandomlyMatOption();
		}
		//Press Finish
		await smManagePage.smFinishBtn.click();
		await helper.WaitBrowserToFinishLoading(10000);
		// Open again and check measure plan is not empty
		await smPage.btnMeasure.click();
		await helper.WaitBrowserToFinishLoading(10000);
		await chaiExpect(await smManagePage.measurePlan.getValue()).to.not.equal('');
	});
});

