const privInfoPage = require('../../pageobjects/priv-info.page');
const commonpage = require('../../pageobjects/common-module/common.page')
const incidentPage = require('../../pageobjects/incident.page');
const mapPage = require('../../pageobjects/main.map.page')
let urgent = false
let randomSubject = ''
let incidentType = ''
let propertyType = ''
let propertyOwner = ''
let crimeMethod = ''
let nickName = ''
let firstName= ''
let lastName =''
let fatherName = ''
let motherName = ''
let serialNumber = 0

describe('Create new Privileged info and fill the fields specified and check the business logic', async () => {
    
    it('Should be able to login successfully', async() => {
        allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
        allureReporter.addSeverity('blocker')
        await browser.maximizeWindow()
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
        await browser.pause(3000)
    });
	
	it('Should be able to be redirected to the Privileged info module', async () => {
		//Go to Privileged Info Section
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
		allureReporter.addSeverity('normal')
		await privInfoPage.redirectToDocumentsList();
		await privInfoPage.redirectToAddNewPrivilegeInfoSection();
        await browser.pause(3000)
	})
    it('Should be able to specify the emergency of a Privileged info', async () => {
		allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
        allureReporter.addDescription('Should be able to have the option of specifying if the Privileged info is emergent or not')
		allureReporter.addSeverity('normal')
        await expect(incidentPage.saveAndContinueBtn).toBeDisplayed()
        urgent = await Math.random() < 0.5;
        if(urgent){
            await privInfoPage.urgent.click()
        }
        await browser.pause(2000)
    })
    it('Should be able to fill the location details', async() => {
        allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
		allureReporter.addDescription('Should select randomly a street and check if the location field was auto-filled, and submit finally the location')
		allureReporter.addSeverity('normal')
        await helper.selectRandomlyFromArrayAndClick(await commonpage.importanceLevelBtn)
        await helper.clickOnElementByLocation(commonpage.incidentLocationField)
        await browser.pause(2000)
        await helper.randomLocationSelector()
        await browser.pause(2000)
        const incidentLocationInputText = await commonpage.incidentLocationText.getValue()
        chaiExpect(incidentLocationInputText).to.not.be.empty
        await browser.pause(2000)
    });
    it('Should be able to select randomly an incident type', async() => {
        allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
		allureReporter.addSeverity('normal')
        await privInfoPage.addIncidentTypeBtn.click()
        await browser.pause(2000)
        await privInfoPage.eventType.click()
        incidentType = await helper.selectRandomlyMatOption()
        const inputIncidentTypeText = await privInfoPage.eventType.getText()
        await expect(inputIncidentTypeText).toEqual(incidentType)
        await browser.pause(2000)
    });
    it('Should be able to set a subject for the created privileged info', async () => {
        allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
		allureReporter.addDescription('Should be able to create new Privileged info by filling the all the required fields, in this case it is the subject')
		allureReporter.addSeverity('normal')
        randomSubject = await helper.getRandomText(10)
        await privInfoPage.subjectOfPrivInfo.setValue(randomSubject)
        await browser.pause(2000)
        
    });
    it('Should be able to add a person to the created privileged info', async () => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
        allureReporter.addDescription('Should add a person for the created Privileged info with all the docs needed')
		allureReporter.addSeverity('normal')
        await privInfoPage.addPersonQuickBtn.scrollIntoView()
        await browser.pause(2000)
        await privInfoPage.addPersonQuickBtn.click()
        await browser.pause(2000)
        nickName = await helper.getRandomText(5)
        await commonpage.nickName[0].setValue(nickName)
        await browser.pause(2000)
        firstName = await helper.getRandomText(5)
        await commonpage.firstName[0].setValue(firstName)
        await browser.pause(2000)
        lastName = await helper.getRandomText(5)
        await commonpage.lastName[0].setValue(lastName)
        await browser.pause(2000)
        fatherName = await helper.getRandomText(5)
        await commonpage.fatherName[0].setValue(fatherName)
        await browser.pause(2000)
        motherName = await helper.getRandomText(5)
        await commonpage.motherName[0].setValue(motherName)
        await browser.pause(2000)
        await commonpage.personGender.click()
        await browser.pause(2000)
        await helper.selectRandomlyMatOption()
        await browser.pause(2000)
        await commonpage.personRole.click()
        await browser.pause(2000)
        await helper.selectRandomlyMatOption()
        await browser.pause(2000)
        await privInfoPage.papersSection.scrollIntoView()
        await privInfoPage.typeOfDoc.click()
        await helper.selectRandomlyMatOption()
        chaiExpect(await incidentPage.firstName[0].getValue()).to.equal(firstName)
        chaiExpect(await incidentPage.firstName[1].getValue()).to.equal(firstName)
        chaiExpect(await incidentPage.lastName[0].getValue()).to.equal(lastName)
        chaiExpect(await incidentPage.lastName[1].getValue()).to.equal(lastName)
        await privInfoPage.sourceSection.scrollIntoView()
        await browser.pause(1000)
        await commonpage.source[Math.floor(Math.random() * 3)].click()
        await browser.pause(1000)
        await commonpage.sourceType.click()
        await browser.pause(1000)
        await helper.selectRandomlyMatOption()
        await browser.pause(3000)
        await incidentPage.saveAndContinueBtn.click()
        await browser.pause(6000)
        await helper.navigateBetweenTabIncidentPrivilegedInfo(2, false)
        await expect(await privInfoPage.personPropertyTable).toBeDisplayed()
        const fullName = await privInfoPage.personPropertyTable[0].getText()
        chaiExpect(fullName).to.equal(`${firstName} ${lastName}`)
        await browser.pause(6000)
        serialNumber = await privInfoPage.serialNumberOfCreatedPrivInfo.getValue()
        await browser.pause(5000)
    });
    it('Should be able to validate the existence of the added person', async () => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
        allureReporter.addDescription('Should be able to check that the added person exists in persons tab and the info is well organized')
		allureReporter.addSeverity('normal')
        await helper.navigateBetweenTabIncidentPrivilegedInfo(2, false)
        await expect(await privInfoPage.personPropertyTable).toBeDisplayed()
        const fullName = await privInfoPage.personPropertyTable[0].getText()
        chaiExpect(fullName).to.equal(`${firstName} ${lastName}`)
        await expect(await privInfoPage.personPropertyTable[1]).toBeDisplayed()
        chaiExpect(await privInfoPage.personPropertyTable[2].getText()).to.equal(`${nickName}`)
        chaiExpect(await privInfoPage.personPropertyTable[3].getText()).to.equal(`${firstName}`)
        chaiExpect(await privInfoPage.personPropertyTable[4].getText()).to.equal(`${fatherName}`)
        chaiExpect(await privInfoPage.personPropertyTable[5].getText()).to.equal(`${lastName}`)
        await browser.pause(3000)
    });
    it("Should be able to fill all description fields for a person", async () => {
      allureReporter.addFeature("Privileged Information");
      allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
      allureReporter.addDescription("Should be able to describe the person added in details");
      allureReporter.addSeverity("normal");
      await commonpage.personTabs[1].click();
      await browser.pause(2000);
      await privInfoPage.personPropertyTable[1].click();
      let length = await commonpage.personDescription.length;
      for (let i = 1; i < length; i++) {
        if(i>4){
            await commonpage.personDescription[1].scrollIntoView();
        }
        await commonpage.personDescription[i].click();
        await browser.pause(1000);
        await helper.selectRandomlyMatOption();
        await browser.pause(1000);
      }
      length = await commonpage.personClothingDescription.length;
      await commonpage.personClothingDescription[2].scrollIntoView();
      for (let i = 2; i < length; i++) {
        await browser.pause(1000);
        await commonpage.personClothingDescription[i].click();
        await helper.selectRandomlyMatOption();
        await browser.pause(1000);
      }  
    });
    it('Should be able to save the description of the chosen person', async() => {
        allureReporter.addFeature("Privileged Information");
        allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
        allureReporter.addDescription("Should be able to describe the person added in details");
        allureReporter.addSeverity("normal");
        await incidentPage.addPersonBtn.click();
        await browser.pause(1000)
        await expect(privInfoPage.appAlert).toBeDisplayed()
        await browser.pause(1000)
        const text = await privInfoPage.appAlertText.getText()
        await browser.pause(1000)
        await expect(text).toEqual(translator.common.warn_editing_contact)
        await privInfoPage.appAlertClose.click()
        await browser.pause(5000)
    });
    it('Should be able to add the properties and the materials', async () => {
        allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
		allureReporter.addDescription('Should be able to add properties linked to the created Privileged Info')
		allureReporter.addSeverity('normal')
        await mapPage.privilegedInfoIcon.click();
        await browser.pause(3000)
        await privInfoPage.rowsofPrivInfoTable[0].click()
        await browser.pause(2000)
        await privInfoPage.propertiesQuickAddBtn.scrollIntoView()
        await privInfoPage.propertiesQuickAddBtn.click()
        await browser.pause(2000)
        await privInfoPage.addObjectOption.click()
        propertyType = await helper.selectRandomlyMatOptionAndExcludeSpecificOptions(['سيارات / درّاجات', 'أسلحة نارية'])
        await browser.pause(2000)
        await privInfoPage.propertyOwnerField[0].click()
        propertyOwner = await helper.selectRandomlyMatOption()
        await browser.pause(2000)
        await privInfoPage.crimeMethodField[0].click()
        crimeMethod = await helper.selectRandomlyMatOption()
        await browser.pause(2000)
        await incidentPage.saveAndContinueBtn.click()
        await browser.pause(5000)
        
    });
    it('Should be able to validate the added properties and materials', async () => {
        allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
		allureReporter.addDescription('Should be able to validate that the added property is in the properties tab table')
		allureReporter.addSeverity('normal')
        await mapPage.privilegedInfoIcon.click()
        await browser.pause(3000)
        await privInfoPage.rowsofPrivInfoTable[0].click()
        await browser.pause(3000)
        await helper.navigateBetweenTabIncidentPrivilegedInfo(3, false)
        await browser.pause(5000)
        await expect(await privInfoPage.personPropertyTable).toBeDisplayed()
        await browser.pause(2000)
        chaiExpect(propertyType).to.equal(await privInfoPage.personPropertyTable[0].getText())
        await browser.pause(2000)
        chaiExpect(propertyOwner).to.equal(`${firstName} ${fatherName} ${lastName} - ${nickName}`)
        await browser.pause(2000)
        chaiExpect(crimeMethod).to.equal(await privInfoPage.personPropertyTable[2].getText())
        await browser.pause(5000)
    })
    it('Should be able to add a reminder for the Privileged info', async () => {
        allureReporter.addFeature('Privileged Information')
		allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
		allureReporter.addDescription('Should be able to add reminder and check if it appears correctly after some amount of time passed')
		allureReporter.addSeverity('normal')
        await helper.navigateBetweenTabIncidentPrivilegedInfo(1, false)
        await privInfoPage.reminderBtn.click()
        await privInfoPage.reminderSelectBtn.click()
        let i =0;
        while(i<3){
            await privInfoPage.reminderTimeIncreaseBtn.click()
            i++
        }
        await privInfoPage.reminderConfirmTime.click()
        await incidentPage.saveAndContinueBtn.click()
        await browser.pause(180000)
        await expect(await privInfoPage.appReminderDialog).toBeDisplayed()
        await expect(await privInfoPage.appReminderDeleteBtn).toBeDisplayed()
        let serialNumberFromHeader = await privInfoPage.appReminderHeader.getText()
        serialNumberFromHeader = serialNumberFromHeader.slice(0,-19)
        await expect(serialNumberFromHeader).toEqual(serialNumberFromHeader)
        let subjectFromReminder = await privInfoPage.appReminderSubject.getText()
        subjectFromReminder = subjectFromReminder.trim()
        await expect(subjectFromReminder).toEqual(randomSubject)
        await privInfoPage.randomClickOnWeb.click()
        await browser.pause(5000)
        
    });
    it('Should validate the newly created Privileged info in the documents table', async() => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
        allureReporter.addDescription('Should be able to validate that the added property is in the properties tab table')
		allureReporter.addSeverity('normal')
        await mapPage.privilegedInfoIcon.click()
        await browser.pause(3000)
        let latestSerialNumberFromTable = await privInfoPage.serialNumbersFromTable[0].getText()
        await expect(serialNumber).toEqual(latestSerialNumberFromTable)
        await expect(await privInfoPage.documentsTable).toBeDisplayed()
        let subjectFromTable = await privInfoPage.subjectsFromTable[0].getText()
        subjectFromTable = subjectFromTable.trim()
        await expect(subjectFromTable).toEqual(randomSubject)
        if(urgent){
            await expect(privInfoPage.documentsTableIcons[0]).toHaveAttrContaining('class','checked-icon')
        }
        await browser.pause(3000)
    });
    it('Should be able to logout', async() => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to create a detailed privileged info')
        allureReporter.addDescription('Should be able to validate that the added property is in the properties tab table')
		allureReporter.addSeverity('normal')
        await helper.LogoutFromHQCCC();

    })

})