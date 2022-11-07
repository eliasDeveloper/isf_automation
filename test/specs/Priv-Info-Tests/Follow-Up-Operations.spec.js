const privInfoPage = require('../../pageobjects/priv-info.page');
let isValid = false;
let returnedObjectOfCreatedPrivInfo = null
let found = false
describe('Create new priv info and check the business logic', async () => {
    it('Should be able to login successfully', async() => {
        allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new privileged information')
        allureReporter.addSeverity('blocker')
        await browser.maximizeWindow()
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
        await browser.pause(3000)
    });
	it('Should be able to access the privileged info module and new privileged information section', async () => {
		//Go to Priv Info Section
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new privileged information')
		allureReporter.addSeverity('normal')
		await privInfoPage.redirectToDocumentsList();
		await privInfoPage.redirectToAddNewPrivilegeInfoSection();
        await browser.pause(3000)
	})
	it('Should be able to create a new privileged information', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new privileged information')
		allureReporter.addSeverity('normal')
		returnedObjectOfCreatedPrivInfo = await privInfoPage.createNewPrivilegedInformation()
		await browser.pause(2000)
		let latestSerialNumberFromTable = await privInfoPage.serialNumbersFromTable[0].getText()
		await browser.pause(2000)
		let latestSubjectFromTable = await privInfoPage.subjectsFromTable[0].getText()
		latestSubjectFromTable = latestSubjectFromTable.replace(/^\s+|\s+$/gm,'')
		chaiExpect(latestSerialNumberFromTable.trim()).to.be.equal(returnedObjectOfCreatedPrivInfo.serialNumber)
		chaiExpect(latestSubjectFromTable).to.be.equal(returnedObjectOfCreatedPrivInfo.subject)
		await browser.pause(3000)
	})
	it('Should be able to find the created priv info in the follow up operation section', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to find the created priv info in the follow up operation')
		allureReporter.addSeverity('normal')
		await privInfoPage.redirectToDocumentsList();
		await privInfoPage.documentsTab[3].click()
		await browser.pause(2000)
        isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(3)
		await expect(await privInfoPage.tooltipAddOppBtn).toBeDisplayed()
		await browser.pause(2000)
		await expect(await privInfoPage.tooltipAddOppBtnText.getText()).toEqual(translator.privileged_information.operation.tooltip_add_opp_btn)
		await browser.pause(2000)
		await privInfoPage.tooltipAddOppBtn.click()
		await browser.pause(2000)
		await privInfoPage.datePicker.click()
		await privInfoPage.datePickerSelectToday.click()
		await browser.pause(2000)
		await privInfoPage.searchAndClearSearchButtons[1].click()
		await browser.pause(2000)
		const exists = await privInfoPage.followUpConfirmDialog.isExisting();
		if(exists){
			await privInfoPage.confirmEditFollowUpOperation.click()
			await browser.pause(2000)
			await privInfoPage.saveRegenerateAddButtons[1].click()
			await browser.pause(2000)
			await privInfoPage.confirmEditFollowUpOperation.click()
		}
		await browser.pause(2000)
		await expect(await privInfoPage.saveRegenerateAddButtons[0]).toBeDisplayed()
		await expect(privInfoPage.followUpOperationsPopUpTitle).toBeDisplayed()
		const length = await privInfoPage.ekhabryeCodeInFollowUpOperations.length
		for(let i=0; i<length; i++){
			const serialNumber = await privInfoPage.ekhabryeCodeInFollowUpOperations[i].getText()
			if(serialNumber === returnedObjectOfCreatedPrivInfo.serialNumber){
				found = true
				break
			}
		}
		await expect(found).toEqual(true)
		let titleWithoutDate = await privInfoPage.followUpOperationsPopUpTitle.getText()
		titleWithoutDate = titleWithoutDate.slice(0,-10).trim()
		await expect(titleWithoutDate).toEqual(translator.privileged_information.operation.title)
		if(exists){
			await expect(await privInfoPage.sitesDataTable).toBeDisplayed()
		}
		await privInfoPage.saveRegenerateAddButtons[1].click()
	});
})