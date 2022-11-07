const privInfoPage = require('../../pageobjects/priv-info.page');
const translator = require('../../utilities/page-translator.json')
const arrayOfSites=[translator.site_names.beirut_police,translator.site_names.gendarmerie_command, translator.site_names.car_power_unit, translator.site_names.embassies_security_unit, translator.site_names.judicial_police_unit];
let returnedObjectOfCreatedPrivInfo = null
let latestSerialNumberFromTable = ''
let pendingDocsTabText = ''
let pendingDocumentsNumber = 0
let isValid = false
describe('Create a new Privileged Info, fill all its fields and check business logic', async () => {

	it('Should be able to Login successfully ', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addDescription('Should login as user u1 to get first the pending documents number')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		//Login as user u1 to get first the pending documents number
		await helper.loginForSpecificUser(appSettings.users.u1_user.username, appSettings.users.u1_user.password, true)
	});
	it('Should be able to get the number of the pending documents', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addSeverity('normal')
		//go to documents list inside priv info
		await privInfoPage.redirectToDocumentsList()
		await browser.pause(1000)
		isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
		await expect(isValid).toEqual(true)
		await privInfoPage.documentsTab[1].click()
		await browser.pause(1000)
		isValid =await privInfoPage.getSelectedTabAriaSelectionProperty(1)
		await expect(isValid).toEqual(true)
		pendingDocsTabText = await privInfoPage.documentsTabTexts[1].getText()//get Text of pending Documents and then take only the number and convert the text received into int
		pendingDocumentsNumber= await privInfoPage.getPendingDocumentsNumber(pendingDocsTabText)
		await browser.pause(3000)
	});
	it('Should be able to logout ',async () => {
		//logout as user u1
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addDescription('Should be able to Logout as u1')
		allureReporter.addSeverity('critical')
		await helper.LogoutFromHQCCC();
		await browser.pause(3000)
	});

	it('Should be able to Login successfully', async () => {
		//login as user elias
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addDescription('Should be able to Login as modiriye user')
		allureReporter.addSeverity('blocker')
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, false)
	});

	it('Should be able to be redirected to the New Privileged Information section', async () => {
		//Go to Priv Info Section
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addDescription('Should be able to be redirected to the Privileged Information section')
		allureReporter.addSeverity('normal')
		await privInfoPage.redirectToDocumentsList();
		await privInfoPage.redirectToAddNewPrivilegeInfoSection();
	})
	it('Should be able to create new priv info by filling the subject (required) field', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information  ')
		allureReporter.addDescription('Should be able to create new priv info by filling the subject field and fetch the serial number of the created priv info')
		allureReporter.addSeverity('critical')
		returnedObjectOfCreatedPrivInfo = await privInfoPage.createNewPrivilegedInformation()
		await browser.pause(2000)
		latestSerialNumberFromTable = await privInfoPage.serialNumbersFromTable[0].getText();
		await browser.pause(2000)
		let latestSubjectFromTable = await privInfoPage.subjectsFromTable[0].getText()
		latestSubjectFromTable = latestSubjectFromTable.replace(/^\s+|\s+$/gm,'')
		chaiExpect(latestSerialNumberFromTable.trim()).to.be.equal(returnedObjectOfCreatedPrivInfo.serialNumber)
		chaiExpect(latestSubjectFromTable).to.be.equal(returnedObjectOfCreatedPrivInfo.subject)
		await browser.pause(3000)
	})
	it('Should be able to send the newly created document as internal transfer', async() => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to send the created priv info as internal transfer')
		allureReporter.addDescription('Send the newly created document as internal transfer to Beirut Police site')
		allureReporter.addSeverity('normal')
		await privInfoPage.rowsofPrivInfoTable[0].click() //Access to the priv info section and click on the previously created priv info
		await browser.pause(2000)
		chaiExpect(await privInfoPage.documentCorrespondence.isExisting()).to.equal(false)
		chaiExpect(await privInfoPage.documentCorrespondenceDataTable.isExisting()).to.equal(false)
		await browser.pause(2000)
		await expect(browser).toHaveUrl(returnedObjectOfCreatedPrivInfo.linkOfCreatedPrivInfo)
		await privInfoPage.sendDocumentAsTransfer('internal', false, 1)
		await browser.pause(3000)
	});
	it('Should be able to validate that the selected site doesnt exist anymore in the table', async() => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to send the created priv info as internal transfer')
		allureReporter.addDescription('Should be able to validate that the selected site doesnt exist anymore in the table')
		allureReporter.addSeverity('normal')
		//now check if the site selected doesnt exist anymore
		await expect(browser).toHaveUrl(returnedObjectOfCreatedPrivInfo.linkOfCreatedPrivInfo)
		await privInfoPage.sendDocument.click()
		await browser.pause(1000)
		await privInfoPage.internalTransferButton.click()
		await browser.pause(1000)
		await expect(privInfoPage.sitesDataTable).toBeDisplayed()
		await browser.pause(1000)
		const sitesNamesArrayLength = await privInfoPage.sitesNames.length
		for(let i = 0; i<sitesNamesArrayLength; i++){
			chaiExpect(await privInfoPage.sitesNames[i].getText()).to.not.equal(arrayOfSites[0])
		}
		await browser.pause(3000)
		await privInfoPage.closeSitesDataTable.click()
		await expect(await privInfoPage.deleteBtnInLinkedTransfers[0]).toBeDisplayed()
		await browser.pause(2000)
		chaiExpect(await privInfoPage.elementsInLinkedTransfersTable[0].getText()).to.equal(appSettings.users.main_user_2.username)
		chaiExpect(await privInfoPage.elementsInLinkedTransfersTable[1].getText()).to.equal(arrayOfSites[0])
		await browser.pause(5000)
		
	});
	it('Should be able to logout as modiriyye user',async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to send the created priv info as internal transfer')
		allureReporter.addDescription('Should be able to logout as مديرية عامة user')
		allureReporter.addSeverity('critical')
		await helper.LogoutFromHQCCC();
		await browser.pause(5000)
	});
	it('Should be able to login', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to revoke the sent privileged information')
		allureReporter.addDescription('Login as Police Beirut user')
		allureReporter.addSeverity('blocker')
		//user u1
		await helper.loginForSpecificUser(appSettings.users.u1_user.username, appSettings.users.u1_user.password, false)
		await browser.pause(3000)
	});
	it('Should be able to be redirected to the priv info module',async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to revoke the sent privileged information')
		allureReporter.addDescription('Should be able to access priv info module')
		allureReporter.addSeverity('normal')
		await privInfoPage.redirectToDocumentsList();
		await browser.pause(3000)
	});
	it('Should access the pending documents section', async() => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to revoke the sent privileged information')
		allureReporter.addDescription('Should be able to access pending documents section inside priv info module')
		allureReporter.addSeverity('normal')
		isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
		await expect(isValid).toEqual(true)
		await privInfoPage.documentsTab[1].click()
		await browser.pause(1000)
		isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(1)
		await expect(isValid).toEqual(true)
		pendingDocsTabText = await privInfoPage.documentsTabTexts[1].getText()
		const newPendingDocsNumber = await privInfoPage.getPendingDocumentsNumber(pendingDocsTabText)
		chaiExpect(pendingDocumentsNumber).to.equal(newPendingDocsNumber -1)
		await browser.pause(3000)
	});
	it('Should be able to validate the created privileged info',async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to revoke the sent privileged information')
		allureReporter.addDescription('Should be able to validate that the serial number from the first row matches the created one as well as for the subject')
		allureReporter.addSeverity('normal')
		await privInfoPage.insertDocSerialNumber(returnedObjectOfCreatedPrivInfo.serialNumber)
		await browser.pause(3000)
		await expect(await privInfoPage.rowsofPrivInfoTable.length).toEqual(1)
		await browser.pause(3000)
		const serialNumberFromTable = await privInfoPage.dataFromPendingDocsTable[0].getText()
		const subjectFromTable = await privInfoPage.dataFromPendingDocsTable[7].getText()
		chaiExpect(serialNumberFromTable).to.be.equal(returnedObjectOfCreatedPrivInfo.serialNumber)
		chaiExpect(subjectFromTable.trim()).to.be.equal(returnedObjectOfCreatedPrivInfo.subject)
		await browser.pause(3000)
	});
	it('Should Logout from the system', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to revoke the sent privileged information')
		allureReporter.addDescription('Should be able to logout')
		allureReporter.addSeverity('critical')
		await helper.LogoutFromHQCCC();
		await browser.pause(3000)
	});
	it('Should be able to login', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user,, I should be able to revoke the sent internal transfer')
		allureReporter.addDescription('login as modiriyye user and access priv info module')
		allureReporter.addSeverity('blocker')
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, false)
		await browser.pause(3000)
		await privInfoPage.redirectToDocumentsList();
		await browser.pause(3000)
	});
	it('Should be able to access the previously created document and revoke it', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user,, I should be able to revoke the sent internal transfer')
		allureReporter.addSeverity('normal')
		await privInfoPage.rowsofPrivInfoTable[0].click()
		await browser.pause(3000)
		await privInfoPage.deleteBtnInLinkedTransfers[0].scrollIntoView()
		await browser.pause(3000)
		await privInfoPage.deleteBtnInLinkedTransfers[0].click()
		await browser.pause(1000)
		chaiExpect(await privInfoPage.documentCorrespondence.isExisting()).to.equal(false)
		chaiExpect(await privInfoPage.documentCorrespondenceDataTable.isExisting()).to.equal(false)
		await browser.pause(2000)
		await helper.LogoutFromHQCCC();
		await browser.pause(3000)
	});
	it('Should be able to validate that the previously sent document was revoked', async() => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user,, I should be able to revoke the sent internal transfer')
		allureReporter.addDescription('Should be able to validate that the previously sent document was revoked')
		allureReporter.addSeverity('normal')
		await helper.loginForSpecificUser(appSettings.users.u1_user.username, appSettings.users.u1_user.password, false)
		await browser.pause(3000)
		await privInfoPage.redirectToDocumentsList();
		isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
		await expect(isValid).toEqual(true)
		await privInfoPage.documentsTab[1].click()
		await browser.pause(1000)
		isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(1)
		await expect(isValid).toEqual(true)
		await browser.pause(3000)
		pendingDocsTabText = await privInfoPage.documentsTabTexts[1].getText()
		const newPendingDocsNumber = await privInfoPage.getPendingDocumentsNumber(pendingDocsTabText)
		chaiExpect(pendingDocumentsNumber).to.equal(newPendingDocsNumber)
		const serialNumberFromTable = await privInfoPage.dataFromPendingDocsTable[0].getText()
		chaiExpect(pendingDocsTabText).to.not.equal(privInfoPage.documentsTabTexts[1].getText())
		chaiExpect(serialNumberFromTable).to.not.equal(returnedObjectOfCreatedPrivInfo.serialNumber)
		await browser.pause(3000)
	});
})