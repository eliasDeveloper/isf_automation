const mapPage = require('../../pageobjects/main.map.page')
const incidentPage = require('../../pageobjects/incident.page')


class Common {

	get stepHeaders() { return $$('div.mat-horizontal-stepper-header-container > mat-step-header') }
	get nickName() { return $$('[formcontrolname="epithet"]') }
	get firstName() { return $$('[formcontrolname="firstName"]') }
	get lastName() { return $$('[formcontrolname="lastName"]') }
	get fatherName() { return $$('[formcontrolname="fatherName"]') }
	get motherName() { return $$('[formcontrolname="motherName"]') }
	get personGender() { return $('form >div > div:nth-child(1) > app-single-selection:nth-child(4) div > mat-select') }
	get personTabs() { return $$('app-person-component > div > div > form > mat-tab-group > mat-tab-header > div > div > div > div') }
	get personHealthCondition() { return $('div:nth-child(1) > div:nth-child(2) > div > app-single-selection:nth-child(4) > mat-form-field mat-select') }
	get selectedLookupArrayData() { return $$('div.cdk-overlay-connected-position-bounding-box > div > div > div  > mat-option > span') }
	get sexFields() { return $$('mat-select.mat-select.ng-star-inserted > div.mat-select-trigger > div.mat-select-value > span.mat-select-value-text') }
	get personRole() { return $('div:nth-child(1) > app-single-selection:nth-child(7) > mat-form-field >div > div > div > mat-select > div > div > span') }
	get source() { return $$('div > div > mat-card > mat-card-header > div.forms-card-header-container > div > span') }
	get sourceType() { return $('mat-card > mat-card-content > div > app-single-selection  mat-select') }
	get dateOfBirthOfPersonBtn() { return $('[formcontrolname="DOB"]') }
	get importanceLevelBtn() { return $$('.selection-box.full-width.ng-star-inserted') }
	get incidentLocationField() { return $$('mat-form-field.full-width-mobile > div > div> div.mat-form-field-infix')[1] }
	get incidentLocationText() { return $('[formcontrolname="display"]') }
	get personDescription() { return $$('mat-card-content > div > app-single-selection > mat-form-field > div > div > div > mat-select') }
	get personClothingDescription() { return $$('mat-card-content > div > div > app-single-selection > mat-form-field > div > div > div > mat-select') }
	get optionsList() { return $$('span.mat-option-text') }

	async create(moduleType) {
		let isCreated = false
		if (moduleType === "incident") {
			await browser.pause(3000)
			await mapPage.incidentIcon.click()
			await browser.pause(5000)
			await helper.waitForElementToBeDisplayed(incidentPage.incidentNumber, 25000)
			await incidentPage.newIncidentButton.click()
			await helper.WaitBrowserToFinishLoading(10000)
			await expect(browser).toHaveUrl(appSettings.hqccc_urls.incident.new_incident_url)
			await helper.waitForElementToBeDisplayed(incidentPage.newIncidentContainerMessage, 20000)
			await expect(incidentPage.newIncidentContainerMessage).toHaveText(`${translator.incident.add_incident.tooltip_add_incident_btn}`)
			await incidentPage.incidentLocationField.click()
			await helper.waitForElementToBeDisplayed(incidentPage.incidentLocationContainer, 20000)
			await helper.randomLocationSelector()
			await helper.WaitBrowserToFinishLoading(20000)
			await browser.pause(3000)
			let incidentLocationText = await incidentPage.incidentLocationField.getValue()
			chaiExpect(incidentLocationText).to.not.be.empty
			await helper.WaitBrowserToFinishLoading(5000)
			//select randomly a date
			await helper.WaitBrowserToFinishLoading(20000)
			await helper.checkElementIsDisplayedAndClickable(incidentPage.dateSelectorButton)
			await incidentPage.dateSelectorButton.click()
			await helper.WaitBrowserToFinishLoading(5000)
			await helper.waitForElementToBeDisplayed(incidentPage.calendarContainer, 5000)
			await helper.selectRandomlyFromCalender(incidentPage.allMonthDays)
			await helper.WaitBrowserToFinishLoading(5000)
			await helper.clickOnElementByLocation(await incidentPage.approveCalendarSelectionBtn)
			//select an incident type
			await incidentPage.incidentTypeField.click()
			let incidentType = await helper.selectRandomlyMatOption()
			chaiExpect(incidentType).to.not.be.empty
			await helper.WaitBrowserToFinishLoading(5000)
			await incidentPage.incidentMethodUsedField.click()
			await helper.selectRandomlyMatOption()
			const randomString = await helper.getRandomText(5)
			await incidentPage.incidentDescriptionField.setValue(randomString)
			await incidentPage.incidentDescriptionField.scrollIntoView()
			await helper.selectRandomlyFromArrayAndClick(await incidentPage.importanceLevelBtn)
			await incidentPage.wasikaTypeField.click()
			await helper.selectRandomlyMatOption()
			await incidentPage.involvedPieceField.click()
			await helper.selectRandomlyMatOption()
			await browser.pause(2000)
			await incidentPage.saveAndContinueBtn.click()
			await browser.pause(7000)
			await expect(browser).toHaveUrlContaining('https://hqcccqa.sirenanalytics.com/hqcccweb/incident/')
			await browser.pause(3000)
			await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
			await incidentPage.importanceLevelBtn[0].scrollIntoView()
			await incidentPage.addLinkedIncidentBtn.click()
			while (await incidentPage.linkedIncidentsCheckBox.length == 0) {
				await browser.pause(2000)
			}
			await helper.waitForElementToBeDisplayed(incidentPage.linkedIncidentContainer, 10000)
			await helper.waitForElementToBeDisplayed(incidentPage.linkedIncidentsCheckBox[0], 10000)
			let numOfSelectedIncidents = await helper.selectRandomlyFromDefinedSizeArrayAndClick(await incidentPage.linkedIncidentsCheckBox, 5)
			await incidentPage.submitLinkedIncidents.click()
			await helper.waitForElementToBeDisplayed(incidentPage.linkedIncidentTable, 10000)
			let linkedIncidentCount = await incidentPage.rowsOfLinkedIncidents.length
			chaiExpect(numOfSelectedIncidents).to.be.equal(linkedIncidentCount)
		}
		isCreated = true
		return isCreated
	}

}

module.exports = new Common()