const adminModulePage = require('../../../pageobjects/admin.module.page')
const privInfoPage = require('../../../pageobjects/priv-info.page')
const mapPage = require('../../../pageobjects/main.map.page')
const incidentPage = require('../../../pageobjects/incident.page')
const commonPage = require('../../../pageobjects/common-module/common.page')
let randomString =''

describe('Create a new Health condition lookup, and validate in the incident module', async () => {
    it('Should be able to Login successfully', async () => {
        allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new health condition lookup')
		allureReporter.addDescription('Should be able to Login successfully as modiriye aamme user')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
        await browser.pause(3000)
    })
    it('Should be able to be redirected to the User module', async () => {
		allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new health condition lookup')
		allureReporter.addDescription('Should be able to access the user module in order to create a new health condition lookup')
		allureReporter.addSeverity('normal')
		await adminModulePage.redirectToUserModule()
        await browser.pause(3000)
    })
    it('Should be able to access the incident lookups section in the user module', async () => {
		allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new health condition lookup')
		allureReporter.addDescription('Should be able to access the incident lookups section in the user module')
		allureReporter.addSeverity('normal')
        await browser.pause(1000)
        await adminModulePage.redirectToUserModuleTab(6,`${appSettings.hqccc_urls.admin_module.lookups_url}`)
		await browser.pause(3000) 
    });
    it('Should be able to select the HealthCondition option in the incident lookups dropdown',async () => {
        allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new health condition lookup')
		allureReporter.addDescription('Should be able select the HealthCondition option in the incident lookups dropdown')
		allureReporter.addSeverity('normal')
        await adminModulePage.chooseLookup("Health Condition")
        await browser.pause(3000)
    });
    it('Should be able to retrieve all previous health condition data',async () => {
        allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new health condition lookup')
		allureReporter.addDescription('Should be able to retrieve all health condition data and validate the add and edit widgets')
		allureReporter.addSeverity('normal')
        await expect(await adminModulePage.firstRowOfLookupsTable).toBeDisplayed()
        await expect(await adminModulePage.editButtonOfLookup).toBeDisplayed()
        await browser.pause(3000)
    });
    it('Should be able to create a new health condition', async() => {
        allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new health condition lookup')
		allureReporter.addDescription('Should be able to create a new health condition')
		allureReporter.addSeverity('normal')
        await adminModulePage.addLookupBtn.click()
        await browser.pause(3000)
        await adminModulePage.editButtonOfLookup.click()
        await browser.pause(3000)
        await expect(await adminModulePage.chosenLookupInputs[0]).toBeDisplayed()
        randomString = await helper.getRandomText(5)
        await adminModulePage.chosenLookupInputs[0].setValue(randomString)
        await adminModulePage.saveButton.click()
        await helper.waitForElementToBeDisplayed(mapPage.adminModuleIcon, 20000)
        await browser.pause(3000)
        
    });
    it('Should be able to find the newly created health condition lookup in the health conditions data table', async() => {
        allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new health condition lookup')
		allureReporter.addDescription('Should be able to find the newly created health condition in the all health conditions data table')
		allureReporter.addSeverity('normal')
        let found = false
        const length = await adminModulePage.lookupNames.length
        for(let i = 0; i <length; i++) {
            if(await adminModulePage.lookupNames[i].getText() === randomString){
                found = true
                break
            }
        }
        await expect(found).toEqual(true)
        await browser.pause(3000)
        
    });
    it('Should be able to locate the newly created lookup inside the section of the health condition in the incidents module',async() => {
        allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new health condition lookup')
		allureReporter.addDescription('Expect to find the newly created health condition in the people tab of the incident module')
		allureReporter.addSeverity('normal')
        await browser.pause(3000)
        await mapPage.incidentIcon.click()
        await browser.pause(10000)
        await helper.navigateBetweenTabIncidentPrivilegedInfo(2, false)
        await browser.pause(4000)
        await incidentPage.personInfoSection.scrollIntoView()
        await browser.pause(3000)
        await commonPage.personHealthCondition.click()
        await browser.pause(2000)
        let found = false
        for (let i = 1; i <await commonPage.selectedLookupArrayData.length; i++){
            if(await commonPage.selectedLookupArrayData[i].getText() === randomString){
                found = true
                break
            }
        }
        await expect(found).toEqual(true)
        await browser.pause(3000)
        await helper.selectSpecificMatOption(randomString)
        await browser.pause(3000)
        const healthConditionText = await commonPage.personHealthCondition.getText()
        await browser.pause(3000)
        await expect(healthConditionText).toEqual(randomString)
        await mapPage.privilegedInfoIcon.click()
        await browser.pause(3000)
        await expect(await incidentPage.appConfirmDialog).toBeDisplayed()
        await browser.pause(3000)
        await incidentPage.confirmUnsavedChanges.click()
        await browser.pause(3000)
    });
    it('Should be able to create a new incident and assign the new health condition for a person in the Incident', async () => {
        allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to validate the existence of the newly added health condition lookup')
		allureReporter.addDescription('Expect to find the newly created health condition in the people tab of the incident module')
		allureReporter.addSeverity('normal')
        const isCreated = await commonPage.create("incident")
        await expect(isCreated).toEqual(true)
        await browser.pause(4000)
        await incidentPage.searchPersonBtn.scrollIntoView()
        await incidentPage.searchPersonBtn.click()
        while (await incidentPage.peopleOptions.length == 0) {
			await browser.pause(2000)
		}
        await privInfoPage.choosePersonFromList[1].click()
        await privInfoPage.doneFromChoosingPerson.click()
        await browser.pause(7000)
        await incidentPage.saveAndContinueBtn.click()
        await browser.pause(4000)
        await privInfoPage.personPropertyTable[1].click()
        await incidentPage.personInfoSection.scrollIntoView()
        await commonPage.personHealthCondition.click()
        let found = false
        for (let i = 1; i <await commonPage.selectedLookupArrayData.length; i++){
            if(await commonPage.selectedLookupArrayData[i].getText() === randomString){
                found = true
                break
            }
        }
        await expect(found).toEqual(true)
        await browser.pause(3000)
        await helper.selectSpecificMatOption(randomString)
        let healthConditionText = await commonPage.personHealthCondition.getText()
        await expect(healthConditionText).toEqual(randomString)
        await incidentPage.addPersonBtn.click()
        await browser.pause(3000)
        await privInfoPage.appAlertClose.click()
        await browser.pause(1000)
        await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
        await incidentPage.saveAndContinueBtn.click()
        await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
        await browser.pause(4000)
        await incidentPage.personInfoSection.scrollIntoView()
        healthConditionText = await commonPage.personHealthCondition.getText()
        await expect(healthConditionText).toEqual(randomString)
        await browser.pause(5000)

    });
    it('Should be able to retrieve the person assigned to the created health condition lookup', async () => {
        allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to validate the existence of the newly added health condition lookup')
		allureReporter.addDescription('Should be able to retrieve the person assigned to the health condition')
		allureReporter.addSeverity('normal')
        await browser.refresh()
        await helper.WaitBrowserToFinishLoading(5000) 
        await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
        await privInfoPage.personPropertyTable[1].click()
    });
    it('Should be able to expect that the health condition lookup to be filled correctly within the person object', async () => {
        allureReporter.addFeature('Health Condition Incident Lookup')
		allureReporter.addStory('As an HQCCC user, I should be able to validate the existence of the newly added health condition lookup')
		allureReporter.addDescription('Expect health condition to be filled correctly within the person object')
		allureReporter.addSeverity('normal')
        await incidentPage.personInfoSection.scrollIntoView()
        let healthConditionText = await commonPage.personHealthCondition.getText()
        await expect(healthConditionText).toEqual(randomString)
    });
    
})