const adminModulePage = require('../../../pageobjects/admin.module.page')
const officerPage = require('../../../pageobjects/user-module/officer.page')
const groupsPage = require('../../../pageobjects/user-module/groups.page')
let officerName = ''
let officerLName = ''
let officerFatherName = ''
let officerMotherName = ''
let officerMotherLName = ''
let officerGender = ''
let officerRank = ''
let officerRole = ''
let officerMilitaryPost = ''
let isModifiable = 'false'
let officerMaritalStatus = ''
let officerEducationalLevel = ''
let officerBloodType = ''
let officerUnrestrictedData = ''


describe('Edit an existing officer, and check the business logic', async () => {
    it('Should be able to login successfully', async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addSeverity('blocker')
        await browser.maximizeWindow()
        await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
        await browser.pause(3000)
    });
    it('Should be able to access the user module', async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModule()
        await browser.pause(3000)
    });
    it("Should be able to know the status of the allow shared modification object", async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        await adminModulePage.redirectToUserModuleTab(1,`${appSettings.hqccc_urls.admin_module.groups_url}`)
        await expect(adminModulePage.adminTabs[1]).toHaveAttrContaining('class', 'active-link')
        await expect(groupsPage.addGroupButton).toBeDisplayed()
        await expect(groupsPage.searchInput).toBeDisplayed()
        await expect(groupsPage.groupsTable).toBeDisplayed()
        await browser.pause(3000)
        await helper.insertStringInFilter(groupsPage.searchInput, '01barma')
        await browser.pause(3000)
        await officerPage.officersTableRow[0].click()
        await browser.pause(3000)
        await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_group_url}`)
        await browser.pause(3000)
        await expect(await groupsPage.allowSharedModificationObjectCheckbox).toBeDisplayed()
        await browser.pause(3000)
        isModifiable = await groupsPage.allowSharedModificationObjectCheckbox.getAttribute('aria-checked')
        await browser.pause(3000)
    });
    it('Should be able to access the officers section in the user module', async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModuleTab(5,`${appSettings.hqccc_urls.admin_module.officers_url}`)
        await browser.pause(3000)
        await expect(adminModulePage.adminTabs[5]).toHaveAttrContaining('class', 'active-link')
        await expect(officerPage.addOfficerButton).toBeDisplayed()
        await expect(officerPage.searchInput).toBeDisplayed()
        await expect(officerPage.filter).toBeDisplayed()
        await expect(officerPage.officersTable).toBeDisplayed()
        await browser.pause(3000)
    });
    it('Should be able to choose an officer from the officers list', async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addSeverity('normal')
        allureReporter.addDescription('Should also validate that the full name selected matches the one of selected')
        await officerPage.officersTableRow[0].click()
        await browser.pause(3000)
        await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_officer_url}`)
        await expect(await officerPage.syncButton).toBeDisplayed()
        await browser.pause(3000)
    });
    it('Should be able to update an officer if the allow shared modification object is enabled', async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addSeverity('critical')
        if (isModifiable == 'true') {
            allureReporter.addDescription('Should now be able to update since the allow shared modification object is true')
            officerName = await helper.getRandomText(10);
            officerLName = await helper.getRandomText(10);
            officerFatherName = await helper.getRandomText(10);
            officerMotherName = await helper.getRandomText(10);
            officerMotherLName = await helper.getRandomText(10);
            officerEducationalLevel = await helper.getRandomText(10);
            await officerPage.name.setValue(officerName);
            await browser.pause(1000);
            await officerPage.lName.setValue(officerLName);
            await browser.pause(1000);
            await officerPage.fatherName.setValue(officerFatherName);
            await browser.pause(1000);
            await officerPage.motherName.setValue(officerMotherName);
            await browser.pause(1000);
            await officerPage.motherLName.setValue(officerMotherLName);
            await officerPage.gender.click();
            await browser.pause(1000);
            await helper.selectRandomlyMatOption();
            await browser.pause(1000);
            officerGender = await officerPage.gender.getText();
            officerRank = await officerPage.rank.getText();           
            // await officerPage.militaryPoste.click();
            // await browser.pause(1000);
            // const randomNumber = Math.floor(Math.random() *5+1)
            // await browser.pause(1000);
            // await officerPage.centerOfServiceOptions[1].click()
            // await helper.selectRandomlyMatOption()
            // await browser.pause(1000);
            officerMilitaryPost = await officerPage.militaryPoste.getText();
            await officerPage.bloodType.click();
            await browser.pause(1000);
            await helper.selectRandomlyMatOption();
            await browser.pause(1000);
            officerBloodType = await officerPage.unrestrictedData.getText();
            await browser.pause(1000);
            await officerPage.maritalStatus.click();
            await browser.pause(1000);
            await helper.selectRandomlyMatOption();
            await browser.pause(1000);
            officerMaritalStatus = await officerPage.maritalStatus.getText();
            await browser.pause(1000);
            await browser.pause(1000);
            await helper.selectRandomlyMatOption();
            await browser.pause(1000);
            await officerPage.unrestrictedData.click();
            await browser.pause(1000);
            await helper.selectRandomlyMatOption();
            await browser.pause(1000);
            officerUnrestrictedData = await officerPage.unrestrictedData.getText();
            await officerPage.educationalLevel.setValue(officerEducationalLevel);
            await officerPage.addOfficer.scrollIntoView();
            await expect(officerPage.identificationPapers).toBeDisplayed();
            await officerPage.identificationPapers.click();
            await browser.pause(1000);
            await helper.selectRandomlyMatOption();
            await browser.pause(2000);
            await expect(await officerPage.addOfficer).toBeDisplayed();
            await officerPage.addOfficer.click();
            await browser.pause(3000);
            await expect(officerPage.appAlert).toBeDisplayed();
            await expect(officerPage.appAlertText).toBeDisplayed();
            await expect(officerPage.appAlertButton).toBeDisplayed();
            await expect(officerPage.appAlertClose).toBeDisplayed();
            const alerText = await officerPage.appAlertText.getText()
            await expect(alerText).toEqual(`${translator.common.warn_editing_contact}`);
            await officerPage.appAlertButton.click();
            await browser.pause(3000);
            await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.officers_url}`);
        }
        else {
            allureReporter.addDescription('Should now not be able to update since the allow shared modification object was set to false')
            await expect(officerPage.name).not.toBeEnabled()
            await expect(officerPage.lName).not.toBeEnabled()
            await expect(officerPage.fatherName).not.toBeEnabled()
            await expect(officerPage.motherName).not.toBeEnabled()
            await expect(officerPage.motherLName).not.toBeEnabled()
            await expect(officerPage.militaryIDNumber).not.toBeEnabled()
            await expect(officerPage.rank).not.toBeEnabled()
            await expect(officerPage.role).not.toBeEnabled()
            await expect(officerPage.gender).not.toBeEnabled()
            await expect(officerPage.bloodType).not.toBeEnabled()
            await expect(officerPage.dateOfBirth).not.toBeEnabled()
            await expect(officerPage.toDate).not.toBeEnabled()
            await expect(officerPage.fromDate).not.toBeEnabled()
            await officerPage.toDate.scrollIntoView()
            await expect(officerPage.maritalStatus).not.toBeEnabled()
            await expect(officerPage.educationalLevel).not.toBeEnabled()
            await expect(officerPage.unrestrictedData).not.toBeEnabled()
            await expect(officerPage.phoneNumbers).not.toBeEnabled()
            await expect(officerPage.healthInsurance).not.toBeEnabled()
            await expect(officerPage.addresses).not.toBeEnabled()
            await expect(officerPage.professions).not.toBeEnabled()
            await expect(officerPage.identificationPapers).not.toBeEnabled()
        }
    });
    it('Should validate the update of the selected officer based on the allow sharted modification object', async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addSeverity('normal')
        if (isModifiable == 'true') {
            //search by the updated name
            await helper.insertStringInFilter(officerPage.searchInput, officerName)
            if(officerRank){
                await expect(await officerPage.fullNameFromTable[0].getText()).toEqual(`${officerRank} ${officerName} ${officerFatherName} ${officerLName}`)
            }
            else{
                await expect(await officerPage.fullNameFromTable[0].getText()).toEqual(`${officerName} ${officerFatherName} ${officerLName}`)
            }
            await officerPage.officersTableRow[0].click()
            await browser.pause(3000)
            await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_officer_url}`)
            await expect(officerPage.name.getValue()).toEqual(officerName)
            await expect(officerPage.lName.getValue()).toEqual(officerLName)
            await expect(officerPage.fatherName.getValue()).toEqual(officerFatherName)
            await expect(officerPage.gender.getText()).toEqual(officerGender)
            await expect(officerPage.rank.getText()).toEqual(officerRank)
            await expect(officerPage.militaryPoste.getText()).toEqual(officerMilitaryPost)
            await expect(officerPage.educationalLevel.getValue()).toEqual(officerEducationalLevel)
            await expect(officerPage.maritalStatus.getText()).toEqual(officerMaritalStatus)
            await expect(officerPage.bloodType.getText()).toEqual(officerBloodType)
            await expect(officerPage.unrestrictedData.getText()).toEqual(officerUnrestrictedData)
            await officerPage.addOfficer.scrollIntoView()
            await expect(officerPage.identificationPapers).toBeDisplayed()
        }
        else {
            allureReporter.addDescription('No Update occured, so there is no need to check the update')
            await expect(officerPage.name).not.toBeEnabled()
            await expect(officerPage.lName).not.toBeEnabled()
            await expect(officerPage.fatherName).not.toBeEnabled()
            await expect(officerPage.motherName).not.toBeEnabled()
            await expect(officerPage.motherLName).not.toBeEnabled()
            await expect(officerPage.militaryIDNumber).not.toBeEnabled()
            await expect(officerPage.rank).not.toBeEnabled()
            await expect(officerPage.role).not.toBeEnabled()
            await expect(officerPage.gender).not.toBeEnabled()
            await expect(officerPage.bloodType).not.toBeEnabled()
            await expect(officerPage.dateOfBirth).not.toBeEnabled()
            await expect(officerPage.toDate).not.toBeEnabled()
            await expect(officerPage.fromDate).not.toBeEnabled()
            await officerPage.toDate.scrollIntoView()
            await expect(officerPage.maritalStatus).not.toBeEnabled()
            await expect(officerPage.educationalLevel).not.toBeEnabled()
            await expect(officerPage.unrestrictedData).not.toBeEnabled()
            await expect(officerPage.phoneNumbers).not.toBeEnabled()
            await expect(officerPage.healthInsurance).not.toBeEnabled()
            await expect(officerPage.addresses).not.toBeEnabled()
            await expect(officerPage.professions).not.toBeEnabled()
            await expect(officerPage.identificationPapers).not.toBeEnabled()
        }
    });
    it('Should not be able to update an officer while missing the required fields', async() => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addSeverity('critical')
        if(isModifiable == 'true'){
            await officerPage.name.scrollIntoView()
            await helper.eraseStringInInput(officerPage.name)
            await browser.pause(1000)
            await helper.eraseStringInInput(officerPage.lName)
            await officerPage.addOfficer.scrollIntoView()
            await officerPage.addOfficer.click()
            await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_officer_url}`)
            await expect(officerPage.name).toHaveAttr('aria-required', 'true')
            await expect(officerPage.lName).toHaveAttr('aria-required', 'true')
            await expect(officerPage.militaryPoste).toHaveAttr('aria-required', 'true')
            await expect(officerPage.gender).toHaveAttr('aria-required', 'true')
            await officerPage.addOfficer.scrollIntoView()
            await officerPage.identificationPapers.click()
        }
        else{
            allureReporter.addDescription('No Update is allowed, so there is no need to check the update')
        }
    });
    it('Should be able to edit the information of an officer from an existing person', async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addSeverity('normal')
        if (isModifiable == 'true') {
            await adminModulePage.adminTabs[5].click()
            await browser.pause(4000)
            await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.officers_url}`)
            await helper.insertStringInFilter(officerPage.searchInput, officerName)
            await officerPage.officersTableRow[0].click()
            await browser.pause(3000)
            await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_officer_url}`)
            await officerPage.name.setValue(officerName)
            await officerPage.randomClickOnWeb.click()
            await browser.pause(4000)
            await expect(officerPage.appLinkPopUp).toBeDisplayed()
            await expect(officerPage.appLinkPopUpClose).toBeDisplayed()
            await expect(officerPage.appLinkPopUpInput).toBeDisplayed()
            await expect(officerPage.appLinkPopUpTable).toBeDisplayed()
            await expect(officerPage.appLinkPopUpTableRow).toBeDisplayed()
            await expect(officerPage.appLinkPopUpDoneBtn).toBeDisplayed()
            await browser.pause(2000)
            await expect(officerPage.appLinkPopUpCheckbox).toBeDisplayed()
            await officerPage.appLinkPopUpCheckbox.click()
            await browser.pause(2000)
            await officerPage.appLinkPopUpDoneBtn.click()
            await browser.pause(3000)
            await expect(officerPage.name.getValue()).toEqual(officerName)
            await expect(officerPage.lName.getValue()).toEqual(officerLName)
            await expect(officerPage.fatherName.getValue()).toEqual(officerFatherName)
            await expect(officerPage.gender.getText()).toEqual(officerGender)
            await expect(officerPage.rank.getText()).toEqual(officerRank)
            await expect(officerPage.militaryPoste.getText()).toEqual(officerMilitaryPost)
            await expect(officerPage.educationalLevel.getValue()).toEqual(officerEducationalLevel)
            await expect(officerPage.maritalStatus.getText()).toEqual(officerMaritalStatus)
            await expect(officerPage.bloodType.getText()).toEqual(officerBloodType)
            await expect(officerPage.unrestrictedData.getText()).toEqual(officerUnrestrictedData)
            await officerPage.role.click()
            await browser.pause(1000);
            await helper.selectRandomlyMatOption()
            await browser.pause(1000)
            officerRole = await officerPage.role.getText()
            await officerPage.fromDate.click()
            await officerPage.checkDateButton.click()
            await officerPage.toDate.click()
            await officerPage.increaseTimeButton.click()
            await officerPage.checkDateButton.click()
            await officerPage.addOfficer.scrollIntoView()
            await expect(officerPage.identificationPapers).toBeDisplayed()
            await officerPage.addOfficer.click()
            await browser.pause(3000)
            await expect(officerPage.appAlert).toBeDisplayed()
            await expect(officerPage.appAlertText).toBeDisplayed()
            await expect(officerPage.appAlertButton).toBeDisplayed()
            await expect(officerPage.appAlertClose).toBeDisplayed()
            await expect(officerPage.appAlertText.getText()).toEqual(`${translator.common.warn_editing_contact}`)
            await officerPage.appAlertButton.click()
            await browser.pause(3000)
            await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.officers_url}`)
            await browser.pause(3000)
        }
        else {
            allureReporter.addDescription('No Update is allowed since the allow shared modification object was set to false')
        }
    });
    it("Should be able to update the entire officer's information", async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addDescription('since allow shared modification object was checked')
        allureReporter.addSeverity('normal')
        if (isModifiable == 'true') {
            await helper.insertStringInFilter(officerPage.searchInput, officerName)
            await officerPage.officersTableRow[0].click()
            await browser.pause(3000)
            await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_officer_url}`)
            await officerPage.name.setValue(officerName)
            await officerPage.lName.setValue(officerLName)
            await officerPage.randomClickOnWeb.click()
            await browser.pause(4000)
            await expect(officerPage.appLinkPopUp).toBeDisplayed()
            await expect(officerPage.appLinkPopUpClose).toBeDisplayed()
            await expect(officerPage.appLinkPopUpInput).toBeDisplayed()
            await expect(officerPage.appLinkPopUpTable).toBeDisplayed()
            await expect(officerPage.appLinkPopUpTableRow).toBeDisplayed()
            await expect(officerPage.appLinkPopUpDoneBtn).toBeDisplayed()
            await browser.pause(2000)
            await expect(officerPage.appLinkPopUpCheckbox).toBeDisplayed()
            await officerPage.appLinkPopUpCheckbox.click()
            await browser.pause(2000)
            await officerPage.appLinkPopUpDoneBtn.click()
            await expect(officerPage.role.getText()).toEqual(officerRole)
            officerName = await helper.getRandomText(10)
            officerLName = await helper.getRandomText(10)
            officerFatherName = await helper.getRandomText(10)
            officerMotherName = await helper.getRandomText(10)
            officerMotherLName = await helper.getRandomText(10)
            await officerPage.name.setValue(officerName)
            await browser.pause(1000)
            await officerPage.lName.setValue(officerLName)
            await browser.pause(1000)
            await officerPage.fatherName.setValue(officerFatherName)
            await officerPage.motherName.setValue(officerMotherName)
            await officerPage.motherLName.setValue(officerMotherLName)
            await officerPage.gender.click()
            await browser.pause(1000);
            await helper.selectRandomlyMatOption()
            officerGender = await officerPage.gender.getText()
            // await officerPage.militaryPoste.click()
            // await officerPage.centerOfServiceOptions[Math.floor(Math.random()*6)+1].click()
            // await helper.selectRandomlyMatOption()
            officerMilitaryPost = await officerPage.militaryPoste.getText()
            await officerPage.addOfficer.scrollIntoView()
            await expect(officerPage.identificationPapers).toBeDisplayed()
            await officerPage.identificationPapers.click()
            await browser.pause(1000);
            await helper.selectRandomlyMatOption()
            await browser.pause(2000)
            await expect(await officerPage.addOfficer).toBeDisplayed()
            await officerPage.addOfficer.click()
            await browser.pause(3000)
            await expect(officerPage.appAlert).toBeDisplayed()
            await expect(officerPage.appAlertText).toBeDisplayed()
            await expect(officerPage.appAlertButton).toBeDisplayed()
            await expect(officerPage.appAlertClose).toBeDisplayed()
            await expect(officerPage.appAlertText.getText()).toEqual(`${translator.common.warn_editing_contact}`)
            await officerPage.appAlertButton.click()
            await browser.pause(3000)
            await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.officers_url}`)
        }
        else{
            allureReporter.addDescription('No update is allowed since the allow shared modification object was set to false')
        }
    });
    it('Should validate the update of the selected officer', async () => {
        allureReporter.addFeature('Officers Section')
        allureReporter.addStory('As an HQCCC user, I should be able to update an existing officer')
        allureReporter.addSeverity('normal')
        if (isModifiable == 'true') {
            //search by the updated name
            await helper.insertStringInFilter(officerPage.searchInput, officerName)
            await expect(await officerPage.fullNameFromTable[0].getText()).toEqual(`${officerName} ${officerFatherName} ${officerLName}`)
            await officerPage.officersTableRow[0].click()
            await browser.pause(3000)
            await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_officer_url}`)
            await expect(officerPage.name.getValue()).toEqual(officerName)
            await expect(officerPage.lName.getValue()).toEqual(officerLName)
            await expect(officerPage.fatherName.getValue()).toEqual(officerFatherName)
            await expect(officerPage.gender.getText()).toEqual(officerGender)
            await expect(officerPage.rank.getText()).toEqual(officerRank)
            await expect(officerPage.militaryPoste.getText()).toEqual(officerMilitaryPost)
            await expect(officerPage.educationalLevel.getValue()).toEqual(officerEducationalLevel)
            await expect(officerPage.maritalStatus.getText()).toEqual(officerMaritalStatus)
            await expect(officerPage.bloodType.getText()).toEqual(officerBloodType)
            await expect(officerPage.unrestrictedData.getText()).toEqual(officerUnrestrictedData)
            await officerPage.addOfficer.scrollIntoView()
            await expect(officerPage.identificationPapers).toBeDisplayed()
        }
        else {
            allureReporter.addDescription('No update was done since the allow shared modification object was set to false')
        }
    });
})