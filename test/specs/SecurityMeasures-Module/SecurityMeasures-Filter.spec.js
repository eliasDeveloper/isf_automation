const smPage = require('../../pageobjects/security-measures-module/security-measures-list.page');
const { loginAndCheckIfSuccessful, WaitBrowserToFinishLoading, waitForElementToBeDisplayed } = require('../../utilities/helper');
let firstSMCode;

describe('check filtering functionality', async () => {
	it('should Login successfully', async () => {
		await browser.maximizeWindow();
		await loginAndCheckIfSuccessful();
	});

	//// Not Stable - failing sometimes - Filter Behavior should be checked
	// it('should select first Security-Measure code and filter using table filter', async () => {
	// 	await smPage.redirectToSecurityMeasuresList();
	// 	while(await smPage.trSMList.length == 0){
	// 		await browser.pause(1000)
	// 	}
	// 	firstSMCode = await smPage.getFirstSecMeasCodeFromList();
	// 	await smPage.filterinTableFilter(firstSMCode);
	// await smPage.btnClearFilter.click();
	// });

	it('should select first Security-Measure code and filter using general filter', async () => {
		await smPage.redirectToSecurityMeasuresList();
		while (await smPage.trSMList.length == 0) {
			await browser.pause(1000)
		}
		firstSMCode = await smPage.getFirstSecMeasCodeFromList();
		await smPage.inputSecMeasCode[1].setValue(firstSMCode);
		await smPage.btnSearch.click();
		await WaitBrowserToFinishLoading(10000);
		await smPage.checkIfSMExists();
	});

	it('Should click on delete search button and all security-measures will be loaded back to the list', async () => {
		await WaitBrowserToFinishLoading(10000);
		await smPage.btnDeleteSearch.click();
		await WaitBrowserToFinishLoading(10000);
		await browser.waitUntil(async () => (await smPage.trSMList.length) > 1,
			{
				timeout: 10000,
				timeoutMsg: `List was not reloaded when delete btn clicked`
			}
		);
	});


});
