const privInfoPage = require('../../pageobjects/priv-info.page');
const translator = require('../../utilities/page-translator.json')
const arrayOfSites=[translator.site_names.beirut_police,translator.site_names.gendarmerie_command, translator.site_names.car_power_unit, translator.site_names.embassies_security_unit, translator.site_names.judicial_police_unit];
let returnedObjectOfCreatedPrivInfo = null
let latestSerialNumberFromTable = ''
let pendingDocsTabText = ''
let pendingDocumentsNumber = 0
let isValid = false
describe('Create a new Privileged Info, fill all its fields and check business logic', async () => {

	it('Should be able to Login successfully', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		//Login as user u1 to get first the pending documents number
		await helper.loginForSpecificUser(appSettings.users.u1_user.username, appSettings.users.u1_user.password, true)
	});
	it('Should be able to get the number of pending documents', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addDescription('Should be able to access priv info and get pending documents count')
		allureReporter.addSeverity('critical')
		//go to documents list inside priv info
		await privInfoPage.redirectToDocumentsList()
		await browser.pause(1000)
		isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
		await expect(isValid).toEqual(true)
		await privInfoPage.documentsTab[1].click()
		await browser.pause(1000)
		isValid =await privInfoPage.getSelectedTabAriaSelectionProperty(1)
		await expect(isValid).toEqual(true)
		await browser.pause(1000)
		pendingDocsTabText = await privInfoPage.documentsTabTexts[1].getText()
		pendingDocumentsNumber= await privInfoPage.getPendingDocumentsNumber(pendingDocsTabText)
		await browser.pause(3000)
	});
	it('Should be able to logout',async () => {
		//logout as user u1
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addSeverity('critical')
		await helper.LogoutFromHQCCC();
		await browser.pause(3000)
	});

	it('Should be able to Login successfully', async () => {
		//login as user elias
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addDescription('Should be able to Login successfully as modiriyye user')
		allureReporter.addSeverity('blocker')
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, false)
	});

	it('Should be able to be redirected to the New Privileged Information section', async () => {
		//Go to Priv Info Section
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addSeverity('normal')
		await privInfoPage.redirectToDocumentsList();
		await privInfoPage.redirectToAddNewPrivilegeInfoSection();
	})
	it('Should be able to create new priv info by filling the subject (required) field', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create new privileged information')
		allureReporter.addDescription('Create new priv info by filling the subject field and fetch the serial number of the created priv info')
		allureReporter.addSeverity('critical')
		returnedObjectOfCreatedPrivInfo = await privInfoPage.createNewPrivilegedInformation()
		await browser.pause(2000)
		latestSerialNumberFromTable = await privInfoPage.serialNumbersFromTable[0].getText()
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
		await expect(browser).toHaveUrl(returnedObjectOfCreatedPrivInfo.linkOfCreatedPrivInfo)
		await browser.pause(2000)
		chaiExpect(await privInfoPage.documentCorrespondence.isExisting()).to.equal(false)
		chaiExpect(await privInfoPage.documentCorrespondenceDataTable.isExisting()).to.equal(false)
		await privInfoPage.sendDocumentAsTransfer('internal', false, 1)
		await browser.pause(3000)
	});
	it('Should be able to validate that the selected site doesnt exist anymore in the table', async() => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to send the created priv info as internal transfer')
		allureReporter.addDescription('Should be able to validate that the selected site doesnt exist anymore in the table')
		allureReporter.addSeverity('normal')
		//now check if the site selected doesnt exist anymore
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
		await expect(await privInfoPage.deleteBtnInLinkedTransfers).toBeDisplayed()
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
	it('Should be able to login successfully', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to accept the sent privileged information')
		allureReporter.addDescription('Login as Beirut Police user')
		allureReporter.addSeverity('blocker')
		//user u1
		await helper.loginForSpecificUser(appSettings.users.u1_user.username, appSettings.users.u1_user.password, false)
		await browser.pause(3000)
	});
	it('Should be able to be redirected to the priv info module',async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to accept the sent privileged information')
		allureReporter.addDescription('Should be able to be redirected to the priv info module')
		allureReporter.addSeverity('normal')
		await privInfoPage.redirectToDocumentsList();
		await browser.pause(3000)
	});
	it('Should be able to validate that the number of the received documents has been updated', async() => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to accept the sent privileged information')
		allureReporter.addDescription('Should be able to access pending documents section inside priv info module and validate the counter of received privileged info documents has been updated (incremented)')
		allureReporter.addSeverity('normal')
		//Expect the counter of received privileged info documents to be decremented
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
	it('Should be able to allocate the newly created privileged info in the table',async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to accept the sent privileged information')
		allureReporter.addDescription('Should be able to allocate the sent priv info at the first row of the pending documents table')
		allureReporter.addSeverity('normal')
		await privInfoPage.insertDocSerialNumber(returnedObjectOfCreatedPrivInfo.serialNumber)
		await expect(await privInfoPage.rowsofPrivInfoTable.length).toEqual(1)
		const serialNumberFromTable = await privInfoPage.dataFromPendingDocsTable[0].getText()
		const subjectFromTable = await privInfoPage.dataFromPendingDocsTable[7].getText()
		chaiExpect(serialNumberFromTable).to.be.equal(returnedObjectOfCreatedPrivInfo.serialNumber)
		chaiExpect(subjectFromTable.trim()).to.be.equal(returnedObjectOfCreatedPrivInfo.subject)
		await browser.pause(3000)
	});
	
	it('Should be able to accept the sent privileged information', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to accept the sent privileged information')
		allureReporter.addDescription('Should be able to accept the sent priv info as شرطة بيروت')
		allureReporter.addSeverity('normal')
		await browser.pause(1000)
		isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(1)
		await expect(isValid).toEqual(true)
		await browser.pause(3000)
		await expect(await privInfoPage.rowsofPrivInfoTable.length).toEqual(1)
		await expect(privInfoPage.acceptSendDocumentButton[0]).toBeDisplayed()
		await privInfoPage.acceptSendDocumentButton[0].click()
		await browser.pause(3000)
		const handles = await browser.getWindowHandles()
		await browser.switchToWindow(handles[1])
		await browser.pause(3000)
		const serialNumber=await privInfoPage.serialNumberOfCreatedPrivInfo.getValue()
		await chaiExpect(serialNumber).to.equal(returnedObjectOfCreatedPrivInfo.serialNumber)
		await browser.pause(3000)
		await expect(browser).toHaveUrl(returnedObjectOfCreatedPrivInfo.linkOfCreatedPrivInfo)
		await browser.pause(4000)
		await expect(await privInfoPage.serialNumberOfCreatedPrivInfo.getValue()).toEqual(returnedObjectOfCreatedPrivInfo.serialNumber)
		await browser.switchWindow(appSettings.hqccc_urls.privileged_information.get_privileged_information_url)
		await browser.pause(3000)
		const noDataText = await privInfoPage.noDataTextFromPendingDocs.getText()
		await expect(noDataText).toEqual(translator.data_table.no_data)
		pendingDocsTabText = await privInfoPage.documentsTabTexts[1].getText()
		const newPendingDocsNumber = await privInfoPage.getPendingDocumentsNumber(pendingDocsTabText)
		chaiExpect(pendingDocumentsNumber).to.equal(newPendingDocsNumber)
		await browser.pause(2000)
	});
	it('Should Logout from the system', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to accept the sent privileged information')
		allureReporter.addSeverity('critical')
		await helper.LogoutFromHQCCC();
		await browser.pause(3000)
	});
	it('Should be able to login and access priv info module', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should not be able to revoke the sent privileged info document ')
		allureReporter.addSeverity('blocker')
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, false)
		await browser.pause(3000)
		await privInfoPage.redirectToDocumentsList();
		await browser.pause(3000)
	});
	
	it('Should be able to locate the sent document in مراسلات الوثيقة in the created priv info' , async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should not be able to revoke the sent privileged info document ')
		allureReporter.addDescription('Should be able to locate the sent document in مراسلات الوثيقة in the created priv info')
		allureReporter.addSeverity('normal')
		isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
		await expect(isValid).toEqual(true)
		await browser.pause(2000)
		const serialNumberOfCreatedPrivInfo = await privInfoPage.serialNumbersFromTable[0].getText()
		chaiExpect(returnedObjectOfCreatedPrivInfo.serialNumber).to.equal(serialNumberOfCreatedPrivInfo)
		chaiExpect(await privInfoPage.serialNumbersFromTable[0].getText()).to.equal(latestSerialNumberFromTable)
		await browser.pause(1000)
		chaiExpect(await privInfoPage.toggleButtons[0].isExisting())
		await privInfoPage.toggleButtons[0].click()
		await browser.pause(3000)
		await expect(privInfoPage.insideAllToggledBtnIcon[0]).toHaveAttributeContaining('class', 'checked-label')
		chaiExpect(await privInfoPage.insideAllToggledBtnText[0].getText()).to.equal(arrayOfSites[0])
		await privInfoPage.randomClickOnWeb.click()
		await browser.pause(1000)
		await privInfoPage.rowsofPrivInfoTable[0].click()
		await browser.pause(1000)
		chaiExpect(await privInfoPage.documentCorrespondence.isExisting())
		chaiExpect(await privInfoPage.documentCorrespondenceDataTable.isExisting())
		await expect(privInfoPage.acceptIconOfCreatedPrivInfos[0]).toBeDisplayed()
	});
})