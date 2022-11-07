const adminModulePage = require('../../../pageobjects/admin.module.page')
const privInfoPage = require('../../../pageobjects/priv-info.page')
const mapPage = require('../../../pageobjects/main.map.page')
const incidentPage = require('../../../pageobjects/incident.page')
const commonPage = require('../../../pageobjects/common-module/common.page')
let randomString = ''
let chosenLookup = ''
let nameOfLookup = ''

describe('Create a new incident lookup, fill all its fields and check business logic', async () => {
	it('Should be able to Login successfully', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new incident lookup')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
		await browser.pause(3000)
	})
	it('Should be able to be redirected to the User module', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new incident lookup')
		allureReporter.addSeverity('normal')
		await adminModulePage.redirectToUserModule()
		await browser.pause(3000)
	})
	it('Should be able to access the incident lookups section in the user module', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new incident lookup')
		allureReporter.addSeverity('normal')
		await browser.pause(1000)
		await adminModulePage.redirectToUserModuleTab(6, `${appSettings.hqccc_urls.admin_module.lookups_url}`)
		await browser.pause(3000)
	});
	it('Should be able to access the incident lookups section in the user module', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new incident lookup')
		allureReporter.addSeverity('normal')
		chosenLookup = await adminModulePage.chooseLookup(null, true)
		chaiExpect(chosenLookup).to.not.be.empty
		await browser.pause(3000)
	});
	it('Should be able to all retrieve the previous lookups of the selected incident lookup', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new incident lookup')
		allureReporter.addSeverity('normal')
		await expect(await adminModulePage.firstRowOfLookupsTable).toBeDisplayed()
		await expect(await adminModulePage.editButtonOfLookup).toBeDisplayed()
		await browser.pause(3000)
	});
	it('Should be able to create a new lookup for the selected option of the incident lookups', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new incident lookup')
		allureReporter.addSeverity('normal')
		await adminModulePage.addLookupBtn.click()
		await browser.pause(3000)
		await adminModulePage.editButtonOfLookup.click()
		await browser.pause(3000)
		const numberOfInputs = await adminModulePage.chosenLookupInputs.length
		await adminModulePage.saveButton.click()
		for (let i = 0; i < numberOfInputs; i++) {
			await expect(await adminModulePage.chosenLookupInputs[i]).toBeDisplayed()
			randomString = await helper.getRandomText(5)
			let attr = await adminModulePage.chosenLookupInputs[i].getAttribute('aria-invalid')
			if (attr === 'true') {
				nameOfLookup = randomString
			}
			await adminModulePage.chosenLookupInputs[i].setValue(randomString)
		}
		await adminModulePage.saveButton.click()
		await helper.waitForElementToBeDisplayed(mapPage.adminModuleIcon, 20000)
		await browser.pause(3000)

	});
	it('Should find the newly created incident lookup in the selected option of the incident lookups in its corresponding data table', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new incident lookup')
		allureReporter.addSeverity('normal')
		let found = false
		const length = await adminModulePage.lookupTableData.length
		for (let i = length - 1; i >= 0; i--) {
			if (await adminModulePage.lookupTableData[i].getText() === nameOfLookup) {
				found = true
				break
			}
		}
		await expect(found).toEqual(true)
		await browser.pause(3000)

	});
	it('Should be able to create a new incident and assign the created lookup to this Incident', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to validate the existence of the newly created incident lookup in an incident')
		allureReporter.addSeverity('normal')
		await browser.pause(3000)
		const isCreated = await commonPage.create("incident")
		await expect(isCreated).toEqual(true)
		await browser.pause(7000)

	});
	it('Should be able to add a person to the created incident', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to validate the existence of the newly created incident lookup in an incident')
		allureReporter.addSeverity('normal')
		await incidentPage.searchPersonBtn.scrollIntoView()
		await incidentPage.searchPersonBtn.click()
		while (await incidentPage.peopleOptions.length == 0) {
			await browser.pause(2000)
		}
		await incidentPage.peopleOptions[1].click()
		await incidentPage.submitPeopleOptionBtn.click()
		await browser.pause(7000)
		await incidentPage.saveAndContinueBtn.click()
		await browser.pause(7000)

	});
	it('Should be able to find the newly created data in its corresponding data lookup inside the created incident', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to validate the existence of the newly created incident lookup in an incident')
		allureReporter.addSeverity('normal')
		const isValid = await adminModulePage.validateTheSpecifiedLookup(chosenLookup, nameOfLookup, false)
		await expect(isValid).toEqual(true)
		await browser.pause(7000)
	});
	it('Should be able to assign the newly created lookup into the newly created incident successfully', async () => {
		allureReporter.addFeature('Incident Lookups')
		allureReporter.addStory('As an HQCCC user, I should be able to validate the existence of the newly created incident lookup in an incident')
		allureReporter.addSeverity('normal')
		await privInfoPage.randomClickOnWeb.click()
		const isValid = await adminModulePage.validateTheSpecifiedLookup(chosenLookup, nameOfLookup, true)
		await expect(isValid).toEqual(true)
	});
})