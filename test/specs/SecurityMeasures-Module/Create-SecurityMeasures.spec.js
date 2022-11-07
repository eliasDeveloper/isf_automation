const smPage = require('../../pageobjects/security-measures-module/security-measures-list.page');
const smManagePage = require('../../pageobjects/security-measures-module/manage-security-measures.page');
const chaiExpect = require('chai').expect;
const helper = require('../../utilities/helper');
let linkedIncidentFirstCodeSpan = '';
let date = "";

describe('Check creating a new Security-Measure', async () => {
	it('should Login successfully', async () => {
		await browser.maximizeWindow();
		await helper.loginAndCheckIfSuccessful();
	});

	it('should redirect to add-security measure and create a new one by filling some Situation and Measures Dialog Tabs', async () => {
		// Redirect to add-security-measures and check elements
		await smPage.redirectToAddSecurityMeasuresList();
		// Open Situation tab 
		await smPage.btnSituation.click();
		await helper.waitForElementToBeDisplayed(smPage.situationDialog, 10000);
		// Check if field date has value
		date = await smManagePage.inputSecMeasDate.getValue();
		await chaiExpect(date).to.not.equal('');
		// Fill Main Tab
		await smManagePage.lookupFileType.click();
		await helper.selectRandomlyMatOption();
		// Select an incident randomly
		await smManagePage.btnAddIncident.click();
		await helper.WaitBrowserToFinishLoading(10000);
		while (await smManagePage.linkedIncidentArr.length == 0) {
			await browser.pause(1000);
		}
		linkedIncidentFirstCodeSpan = await helper.selectRandomlySMAndReturnSerialNum(await smManagePage.linkedIncidentArr, 'incident');
		await smManagePage.linkedIncidentFinishBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.linkedIncidentNumb, 10000);
		await chaiExpect(await smManagePage.linkedIncidentNumb.getValue()).to.equal(linkedIncidentFirstCodeSpan);
		// Fill remaining fields 
		await smManagePage.smStartDateBtn.click();
		await smManagePage.smSetDateBtn.click();
		await smManagePage.lookupImportanceScale.click();
		await helper.selectRandomlyMatOption();
		// Fill Many Sources Tab
		await smManagePage.SourcesTabBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.addSourceBtn, 10000);
		await browser.pause(1000);
		await smManagePage.addSourceBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.addSourceBodyRow, 10000);
		await smManagePage.sourceLookup.click();
		await helper.selectRandomlyMatOption();
		await smManagePage.inputSourceType.setValue(helper.getRandomText(5));
		// Fill Person's Tab
		await smManagePage.personsTabBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.personsComponent, 10000);
		// Call] selectRandomPerson Function in smManage Page to select and add a person 
		await smManagePage.selectRandomPerson();
		// Fill Inviting Party Tab
		await smManagePage.invitingPartyTabBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.addInvitingPartyBtn, 10000);
		await browser.pause(1000);
		await smManagePage.addInvitingPartyBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.addInvitingPartyBodyRow, 10000);
		await smManagePage.invitingPartyLookup.click();
		await helper.selectRandomlyMatOption();
		// wait to finish previous selection
		await browser.pause(1000);
		await smManagePage.lookupTargetClassification.click();
		await helper.selectRandomlyMatOption();
		// Fill Threats-Measures Tab
		await smManagePage.threatsMeasuresTabBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.addThreatsMeasuresBtn, 10000);
		await browser.pause(1000);
		await smManagePage.addThreatsMeasuresBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.addThreatsMeasuresBodyRow, 10000);
		await browser.pause(2000);
		await smManagePage.threatsMeasuresLookup.click();
		await helper.selectRandomlyMatOption();
		// wait to finish previous selection
		await browser.pause(1000);
		await smManagePage.measuresExpectedLookup.click();
		await helper.selectRandomlyMatOption();
		await browser.pause(1000);
		await smManagePage.measuresThreatLookup.click();
		await helper.selectRandomlyMatOption();
		await smManagePage.addMeasuresBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.addMeasuresBodyRow, 10000);
		await smManagePage.measuresInput.setValue(await helper.getRandomText(5));
		// Fill Information Tab
		await smManagePage.informationTabBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.addInformationBtn, 10000);
		await browser.pause(1000);
		await smManagePage.addInformationBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.informationInput, 10000);
		await smManagePage.informationInput.setValue(await helper.getRandomText(5));
		await helper.waitForElementToBeDisplayed(smManagePage.sourceInfoInput, 10000);
		await smManagePage.sourceInfoInput.setValue(await helper.getRandomText(7));
		// Press Finsih
		await smManagePage.smFinishBtn.click();
		// Recheck situation dialog and code number not empty
		await helper.WaitBrowserToFinishLoading(20000);
		await smPage.btnSituation.click();
		await helper.WaitBrowserToFinishLoading(20000);
		await helper.waitForElementToBeDisplayed(smPage.situationDialog, 20000);
		await helper.waitForElementToBeDisplayed(smPage.inputSecMeasCode[1], 20000);
		await chaiExpect(await smPage.inputSecMeasCode[1].getValue()).to.not.equal('');
		//Press Finish 
		await smManagePage.smFinishBtn.click();
		// Open measures dialog and Add fields
		await helper.WaitBrowserToFinishLoading(10000);
		await smPage.btnMeasure.click();
		await smManagePage.measurePlan.setValue(helper.getRandomText(10));
		await smManagePage.addPlanBtn.click();
		await helper.waitForElementToBeDisplayed(smManagePage.addPlanBody, 10000);
		// Select idea
		await smManagePage.ideaLookup[0].click();
		await helper.selectRandomlyMatOption();
		//Press Finish
		await smManagePage.smFinishBtn.click();
		await helper.WaitBrowserToFinishLoading(10000);
		// Open again and check measure plan is not empty
		await smPage.btnMeasure.click();
		await helper.WaitBrowserToFinishLoading(10000);
		await chaiExpect(await smManagePage.measurePlan.getValue()).to.not.equal('');
	});
});

