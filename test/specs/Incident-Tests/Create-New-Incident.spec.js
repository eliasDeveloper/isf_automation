const mapPage = require('../../pageobjects/main.map.page')
const incidentPage = require('../../pageobjects/incident.page');
const nickName = 'fady automated testing'
const firstName = 'fady'
const lastName = 'chebly'
let incidentType = ''
let propertySerialNumber = ''
let properyType = ''
let propertyOwner = ''
let crimeMethod = ''

//Notes to do: add verification on table row count when adding new objects
describe('Create a new incident, fill all its fields and check business logic', async () => {
	it('should login successfully', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to create an Incident')
		allureReporter.addDescription('Should be able to login to HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('should click on incident Icon and and navigate us to incidents page', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to create an Incident')
		allureReporter.addDescription('Should be able to access the incident module')
		allureReporter.addSeverity('critical')
		await browser.pause(5000)
		await helper.waitForElementToBeDisplayed(mapPage.incidentIcon, 35000)
		await helper.selectRandomIncidentFromIncidentList()
		await browser.pause(1500)
		await mapPage.incidentIcon.click()
		await browser.pause(5000)
		await helper.waitForElementToBeDisplayed(incidentPage.incidentNumber, 25000)
	});

	it('should click on create new incident icon and check required fields', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to create an Incident')
		allureReporter.addDescription('Should be able to access the create new incident module')
		allureReporter.addSeverity('normal')
		await incidentPage.newIncidentButton.click()
		await helper.WaitBrowserToFinishLoading(10000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.incident.new_incident_url)
		await helper.waitForElementToBeDisplayed(incidentPage.newIncidentContainerMessage, 20000)
		await expect(incidentPage.newIncidentContainerMessage).toHaveText(`${translator.incident.add_incident.tooltip_add_incident_btn}`)
		await incidentPage.incidentLocationField.click()
		await helper.waitForElementToBeDisplayed(incidentPage.incidentLocationContainer, 20000)
	});

	it('should select randomly a street and check if all the fields were auto-filled, and submit finally the location', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to create an Incident')
		allureReporter.addDescription('Should be able to select incident location')
		allureReporter.addSeverity('normal')
		await helper.randomLocationSelector()
		await helper.WaitBrowserToFinishLoading(20000)
		await browser.pause(1500)
		let incidentLocationText = await incidentPage.incidentLocationField.getValue()
		chaiExpect(incidentLocationText).to.not.be.empty
	});

	it('should fill all required fields in the linked documents page', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to create an Incident')
		allureReporter.addDescription('Should be forced / able to fill required fields')
		allureReporter.addSeverity('blocker')
		//select randomly a date
		await helper.WaitBrowserToFinishLoading(20000)
		await helper.checkElementIsDisplayedAndClickable(incidentPage.dateSelectorButton)
		await incidentPage.dateSelectorButton.click()
		await helper.waitForElementToBeDisplayed(incidentPage.calendarContainer, 5000)
		await helper.selectRandomlyFromCalender(incidentPage.allMonthDays)
		await helper.clickOnElementByLocation(await incidentPage.approveCalendarSelectionBtn)
		//select an incident type
		await incidentPage.incidentTypeField.click()
		incidentType = await helper.selectRandomlyMatOption()
		await incidentPage.incidentMethodUsedField.click()
		await helper.selectRandomlyMatOption()
		await incidentPage.incidentDescriptionField.setValue(nickName)
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
	});

	// it('should save the incident we have so far and expect hqccc to display a notification of the newly created incident', async () => {
	// 	allureReporter.addFeature('Incident')
	// 	allureReporter.addStory('As a user I should be notified that a new incident was created and access it')
	// 	allureReporter.addDescription('Should be able to receive a notification that a new incident was created')
	// 	allureReporter.addSeverity('normal')
	// 	await browser.pause(2000)
	// 	await incidentPage.saveAndContinueBtn.click()
	// 	await browser.pause(7000)
	// 	await expect(browser).toHaveUrlContaining('https://hqcccqa.sirenanalytics.com/hqcccweb/incident/')
	// 	await browser.pause(3000)
	// 	await expect(incidentPage.incidentNotificationContainer).toBeDisplayed()
	// 	await expect(await incidentPage.incidentNotificationType).toHaveText(incidentType)
	// 	await incidentPage.incidentNotificationCloseAllBtn.click()
	// });

	it('should link at least one incident and check if they were inserted in a table successfully', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to create an Incident')
		allureReporter.addDescription('Should be able to link other incidents to the current one')
		allureReporter.addSeverity('normal')
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
		await incidentPage.importanceLevelBtn[0].scrollIntoView()
		await incidentPage.addLinkedIncidentBtn.click()
		while (await incidentPage.linkedIncidentsCheckBox.length == 0) {
			await browser.pause(2000)
		}
		await helper.waitForElementToBeDisplayed(incidentPage.linkedIncidentContainer, 30000)
		await helper.waitForElementToBeDisplayed(incidentPage.linkedIncidentsCheckBox[0], 30000)
		let numOfSelectedIncidents = await helper.selectRandomlyFromDefinedSizeArrayAndClick(await incidentPage.linkedIncidentsCheckBox, 5)
		await incidentPage.submitLinkedIncidents.click()
		await helper.waitForElementToBeDisplayed(incidentPage.linkedIncidentTable, 10000)
		let linkedIncidentCount = await incidentPage.rowsOfLinkedIncidents.length
		chaiExpect(numOfSelectedIncidents).to.be.equal(linkedIncidentCount)
	});

	it('should add a new person using quick add and expect to not find the added person in the people tab if the user did not save', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a person')
		allureReporter.addDescription('Should add a new person using quick add and expect to not find the added person in the people if the user did not save, should also when navigating between people tab and linked documents tab to not be able to find the added person anymore')
		allureReporter.addSeverity('normal')
		//case of nickname, check if there is no more a required field and also check if data was saved correctly
		await incidentPage.linkedIncidentTable.scrollIntoView()
		await incidentPage.addPeopleQuickAddBtn.click()
		await incidentPage.nickName[0].setValue(`${nickName}`)
		//this is just to verify if * was removed once a nickname was inserted 
		await expect($('mat-label=الإسم')).toBeExisting()
		await expect($('mat-label=الشهرة')).toBeExisting()
		await incidentPage.nickName[0].scrollIntoView()
		await incidentPage.deleteBtnPaperWork.click()
		await browser.pause(2000)
		while (await incidentPage.peopleContainer.isDisplayed()) {
			while (await incidentPage.peopleOptions.length == 0) {
				await browser.pause(10000)
				while (await incidentPage.submitPeopleOptionBtn.isDisplayed()) {
					await incidentPage.submitPeopleOptionBtn.click()
					await browser.pause(5000)
				}
			}
		}
		if (await incidentPage.deleteBtnPaperWork.isDisplayed()) {
			await incidentPage.deleteBtnPaperWork.click()
		}
		await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
		chaiExpect(await incidentPage.peopleTableContainer.isExisting()).to.equal(false)
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
		chaiExpect(await incidentPage.nickName[0].isDisplayed()).to.equal(false)
	});

	it('should add a new person using quick add and check if the person is being filled in parallel in the people tab', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a person')
		allureReporter.addDescription('Should be able to add a person via quick add and expect the added person to be inserted in the people section of the incident')
		allureReporter.addSeverity('normal')
		//case of nickname, check if there is no more a required field and also check if data was saved correctly
		await incidentPage.linkedIncidentTable.scrollIntoView()
		await incidentPage.addPeopleQuickAddBtn.click()
		await incidentPage.nickName[0].setValue(`${nickName}`)
		//this is just to verify if * was removed once a nickname was inserted 
		await expect($('mat-label=الإسم')).toBeExisting()
		await expect($('mat-label=الشهرة')).toBeExisting()
		await incidentPage.nickName[0].scrollIntoView()
		await incidentPage.deleteBtnPaperWork.click()
		await browser.pause(2000)
		while (await incidentPage.peopleContainer.isDisplayed()) {
			while (await incidentPage.peopleOptions.length == 0) {
				await browser.pause(10000)
				while (await incidentPage.submitPeopleOptionBtn.isDisplayed()) {
					await incidentPage.submitPeopleOptionBtn.click()
					await browser.pause(5000)
				}
			}
		}
		if (await incidentPage.deleteBtnPaperWork.isDisplayed()) {
			await incidentPage.deleteBtnPaperWork.click()
		}
		await incidentPage.saveAndContinueBtn.click()
		await browser.pause(5000)
		await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
		await browser.pause(1000)
		chaiExpect(await incidentPage.peopleTableContainer.isDisplayed()).to.equal(true)
		chaiExpect(await incidentPage.nickNameTableData.length).to.equal(1)
		await expect(incidentPage.nickNameTableData[0]).toHaveText(nickName)
	});

	it('should search for a person by its first name and last name and check if the person was successfully added', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a person')
		allureReporter.addDescription('Should be able to find a person via first name and last name, add the found person and expect to be filled in the person section')
		allureReporter.addSeverity('normal')
		//add the person from quick add 
		let foundFullName = false
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
		await incidentPage.addPeopleQuickAddBtn.scrollIntoView()
		await incidentPage.addPeopleQuickAddBtn.click()
		await incidentPage.firstName[1].setValue(firstName)
		await incidentPage.lastName[1].setValue(lastName)
		await incidentPage.fatherName[1].click()
		await helper.waitForElementToBeDisplayed(incidentPage.peopleContainer, 20000)
		await helper.WaitBrowserToFinishLoading(15000)
		while (await incidentPage.peopleOptions.length == 0) {
			await browser.pause(2000)
		}
		let optionNum = await incidentPage.peopleOptions.length
		await incidentPage.peopleOptions[optionNum - 1].click()
		await incidentPage.submitPeopleOptionBtn.click()

		//check if the person data was successfully added
		await helper.WaitBrowserToFinishLoading(5000)
		await browser.pause(5000)
		chaiExpect(await incidentPage.firstName[1].getValue()).to.equal(firstName)
		chaiExpect(await incidentPage.firstName[2].getValue()).to.equal(firstName)
		chaiExpect(await incidentPage.lastName[1].getValue()).to.equal(lastName)
		chaiExpect(await incidentPage.lastName[2].getValue()).to.equal(lastName)
		let sexNum = await incidentPage.sexFields.length
		let identityPaper = await incidentPage.sexFields[sexNum - 2]
		chaiExpect(await identityPaper.getText()).to.not.be.empty
		chaiExpect(await incidentPage.sexFields[sexNum - 1].getValue()).to.equal(await incidentPage.sexFields[sexNum - 3].getValue())

		//check if the person was added in the people table in the people tab
		await incidentPage.saveAndContinueBtn.click()
		await browser.pause(5000)
		await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
		await helper.waitForElementToBeDisplayed(incidentPage.peopleTableContainer, 10000)
		await browser.pause(2000)
		for (let i = 0; i < await incidentPage.personNameTableData.length; i++) {
			if (await incidentPage.personNameTableData[i].getText() == `${firstName} ${lastName}`) {
				foundFullName = true
			}
		}
		chaiExpect(foundFullName).to.equal(true, 'Full Name not found in the users table')
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
	});

	it('Should add a random property via quick add', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a property')
		allureReporter.addDescription('Should be able to add a property via quick add and expect that the property will be filled in property section')
		allureReporter.addSeverity('normal')
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
		await incidentPage.quickAddObjectType.scrollIntoView()
		await incidentPage.quickAddObjectType.click()
		await helper.waitForElementToBeDisplayed(await incidentPage.addObjectOption, 5000)
		await incidentPage.addObjectOption.click()
		properyType = await helper.selectRandomlyMatOptionAndExcludeSpecificOptions(['سيارات / درّاجات', 'أسلحة نارية'])
		await incidentPage.propertyOwnerField[0].click()
		propertyOwner = await helper.selectRandomlyMatOption()
		await incidentPage.crimeMethodField[0].click()
		crimeMethod = await helper.selectRandomlyMatOption()
		await incidentPage.saveAndContinueBtn.click()
		await browser.pause(5000)
	});

	it('should check if the property was successfully added in the property tab ', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a property')
		allureReporter.addDescription('Should be able to add a property via quick add and expect that the property will be filled in property section')
		allureReporter.addSeverity('normal')
		await helper.navigateBetweenTabIncidentPrivilegedInfo(3)
		await helper.waitForElementToBeDisplayed(await incidentPage.propertyTable)
		chaiExpect(await incidentPage.propertyTypeTd.getText()).to.be.equal(properyType)
		chaiExpect(await incidentPage.propertyOwnerTd.getText()).to.be.equal(propertyOwner)
		chaiExpect(await incidentPage.propertyCrimeTd.getText()).to.be.equal(crimeMethod)
	});

	it('should add an object of type vehicles and get its object serial number  ', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a property')
		allureReporter.addDescription('Should be able to add a property in property section')
		allureReporter.addSeverity('normal')
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
		await incidentPage.quickAddObjectType.scrollIntoView()
		await incidentPage.quickAddObjectType.click()
		await helper.waitForElementToBeDisplayed(await incidentPage.addObjectOption, 5000)
		await incidentPage.addObjectOption.click()
		await helper.selectSpecificMatOption("سيارات / درّاجات")
		await incidentPage.searchBtn.click()
		while (await incidentPage.propertyOptions.length == 0) {
			await browser.pause(2000)
		}
		propertySerialNumber = await incidentPage.selectRandomVehicleWeapons(incidentPage.propertyOptionsCheckBox)
		await incidentPage.endSearchPropertyBtn.scrollIntoView()
		await incidentPage.endSearchPropertyBtn.click()
	});
	//verification that the property will not be added cz no save was done
	it('should fill the fields of the added property', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a property')
		allureReporter.addDescription('Should be able to add a property in property section')
		allureReporter.addSeverity('trivial')
		await incidentPage.propertyOwnerField[1].click()
		propertyOwner = await helper.selectRandomlyMatOption()
		await incidentPage.crimeMethodField[1].click()
		crimeMethod = await helper.selectRandomlyMatOption()
	});

	//add verification
	it('should add a vehicle property from property tab', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a property')
		allureReporter.addDescription('Should try to add a vehicle in property section via an already in use vehicle serial number and expect to not find any vehicle as it should be excluded if already in use')
		allureReporter.addSeverity('normal')
		await helper.navigateBetweenTabIncidentPrivilegedInfo(3)
		await incidentPage.addObjectOption.click()
		await helper.selectSpecificMatOption("سيارات / درّاجات")
		await incidentPage.searchBtnInPropertySec.click()
		while (await incidentPage.propertyOptions.length == 0) {
			await browser.pause(2000)
		}
		propertySerialNumber = await incidentPage.selectRandomVehicleWeapons(incidentPage.propertyOptionsCheckBox)
		await incidentPage.endSearchPropertyBtn.click()
		await browser.pause(5000)
		await incidentPage.addPropertyBtn.click()
		await browser.pause(1000)
	});

	it('should research for the same added object by serial num and expect to not find it', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a property')
		allureReporter.addDescription('Should try to add a vehicle in property section via an already in use vehicle serial number and expect to not find any vehicle as it should be excluded if already in use')
		allureReporter.addSeverity('critical')
		await incidentPage.addObjectOption.click()
		await browser.pause(1000)
		await helper.selectSpecificMatOption("سيارات / درّاجات")
		await incidentPage.serialNumInputField.setValue(propertySerialNumber)
		await incidentPage.searchBtnInPropertySec.click()
		await browser.pause(5000)
		await helper.waitForElementToBeDisplayed(incidentPage.referenceNumField, 10000)
		chaiExpect(await incidentPage.referenceNumField.getValue()).to.equal(propertySerialNumber)
		await expect(incidentPage.noDataField).toBeDisplayed()
		chaiExpect(await incidentPage.propertyOptions.length).to.equal(0)
		chaiExpect(await incidentPage.noDataField.getText()).to.equal(`${translator.data_table.no_data}`)
		await incidentPage.closePopupBtn.click()
		await browser.pause(1000)
		await incidentPage.discardPropertyBtn.click()
		await browser.pause(1000)
	});

	it('should search for a property of type weapon and select it randomly', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a property')
		allureReporter.addDescription('Should be able to add a property of type weapons')
		allureReporter.addSeverity('normal')
		await incidentPage.addObjectOption.click()
		await helper.selectSpecificMatOption("أسلحة نارية")
		await incidentPage.searchBtnInPropertySec.click()
		while (await incidentPage.weaponOptions.length == 0) {
			await browser.pause(2000)
		}
		propertySerialNumber = await incidentPage.selectRandomVehicleWeapons(incidentPage.weaponOptionsCheckBox, false)
		await browser.pause(1000)
		await incidentPage.endSearchWeaponBtn.click()
		await browser.pause(3000)
		await incidentPage.addPropertyBtn.click()
		await browser.pause(1000)
	});
	//add validator on number of propertie in tables and in all documents page
	it('should search for the same weapon serial number and expect to be excluded', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to add a property')
		allureReporter.addDescription('Should try to add same weapon by searching for it via his serial number and expect that no weapon will be retrieved as it should be excluded if weapon already was added')
		allureReporter.addSeverity('critical')
		await incidentPage.addObjectOption.click()
		await browser.pause(1000)
		await helper.selectSpecificMatOption("أسلحة نارية")
		await incidentPage.serialNumInputField.setValue(propertySerialNumber)
		await incidentPage.searchBtnInPropertySec.click()
		await browser.pause(5000)
		await helper.waitForElementToBeDisplayed(incidentPage.referenceNumField, 10000)
		chaiExpect(await incidentPage.referenceNumField.getValue()).to.equal(propertySerialNumber)
		await expect(incidentPage.noDataWeaponField).toBeDisplayed()
		chaiExpect(await incidentPage.weaponOptions.length).to.equal(0)
		chaiExpect(await incidentPage.noDataWeaponField.getText()).to.equal(`${translator.data_table.no_data}`)
		await incidentPage.closeWeaponPopupBtn.click()
		await browser.pause(1000)
		await incidentPage.discardPropertyBtn.click()
		await browser.pause(1000)
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
		await incidentPage.saveAndContinueBtn.click()
		await browser.pause(10000)
	});

});