const adminModulePage = require('../../../pageobjects/admin.module.page')
const userTitlePage = require('../../../pageobjects/user-module/user-titles-page')
const sitesPage = require('../../../pageobjects/user-module/sites.page')
const groupsPage = require('../../../pageobjects/user-module/groups.page')

let nameOfUpdatedUserTitle = ''
let nameOfSelectedUserTitle = ''
describe('Add a new site, and check the business logic', async()=>{
    it('Should be able to login successfully', async()=>{
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a user title')
		allureReporter.addSeverity('blocker')
        await browser.maximizeWindow()
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
		await browser.pause(3000)
    })
    it('Should be able to access the user module', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a user title')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModule()
		await browser.pause(3000)
    });
    it('Should be able to access the user titles section in the user module', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a user title')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModuleTab(4,'https://hqcccqa.sirenanalytics.com/hqcccweb/admin/titles')
        await browser.pause(1000)
        await expect(adminModulePage.adminTabs[4]).toHaveAttrContaining('class', 'active-link')
        await expect(userTitlePage.addTitleButton).toBeDisplayed()
        await expect(userTitlePage.addTitleButtonText).toBeDisplayed()
        await expect(userTitlePage.searchInput).toBeDisplayed()
        await expect(userTitlePage.titlesTable).toBeDisplayed()
        await expect(await userTitlePage.addTitleButtonText.getText()).toEqual(`${translator.admin.add_title}`)
        await browser.pause(3000)
    });
    it('Should fail editing a User title without filling the required fields', async () => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a user title')
        allureReporter.addSeverity('normal')
        await browser.pause(3000)
        const length = await userTitlePage.titlesTableRows.length
        const randomNumber = Math.floor(Math.random() *length-1 +1)
        nameOfSelectedUserTitle =  await userTitlePage.titlesTableRows[length-randomNumber].getText()
        nameOfSelectedUserTitle = nameOfSelectedUserTitle.trim()
        await userTitlePage.editButton[length-randomNumber].click()
        await helper.eraseStringInInput(userTitlePage.name)
        await userTitlePage.saveButton.click()
        chaiExpect(await userTitlePage.requiredFields.length).to.equal(1)
        await expect(await userTitlePage.name).toHaveAttr('aria-required', 'true')
        await browser.pause(3000)
    });
    it('Should be able to edit a user Title', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a user title')
        allureReporter.addSeverity('normal')
        nameOfUpdatedUserTitle = await helper.getRandomText(10)
        await userTitlePage.name.setValue(nameOfUpdatedUserTitle)
        await userTitlePage.saveButton.click()
        await browser.pause(3000)
    });
    it('Should find the edited user title in the table', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a user title')
        allureReporter.addSeverity('normal')
        const length = await userTitlePage.titlesTableRows.length
        let found = false
        for(let i =0; i<length; i++){
            let titleText = await userTitlePage.titlesTableRows[i].getText()
            titleText = titleText.trim()
            if(titleText === nameOfUpdatedUserTitle){
                found = true
                break
            }
        }
        await expect(found).toEqual(true)
        await browser.pause(3000)
    });
    it('Should be to validate the existence in the sites - transaction rights section',async () => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a user title')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModule()
        await browser.pause(4000)
        await adminModulePage.redirectToUserModuleTab(2,`${appSettings.hqccc_urls.admin_module.sites_url}`)
        await browser.pause(5000)
        await helper.insertStringInFilter(sitesPage.searchInput, 'sitename2')
        await sitesPage.sitesNestedTreeAddedSite[5].click()
        await browser.pause(2000)
        await sitesPage.sitesTabs[2].click()
        await browser.pause(2000)
        await sitesPage.editButton.click()
        await browser.pause(2000)
        await sitesPage.userTitle.click()
        await helper.insertStringInFilter(sitesPage.userTitleSearch,nameOfUpdatedUserTitle)
        const text = await sitesPage.firstOptionOfDropdown.getText()
        await expect(nameOfUpdatedUserTitle).toEqual(text, { trim : true })
        await userTitlePage.randomClickOnWeb.click()
        await browser.pause(3000)
    });
    it('Should be to validate the existence in the groups section.', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a user title')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModuleTab(1, `${appSettings.hqccc_urls.admin_module.groups_url}`)
        await browser.pause(3000)
        await helper.insertStringInFilter(groupsPage.searchInput, '01barma')
        await groupsPage.groupsTableRow[0].click()
        await groupsPage.userRole.click()
        await helper.insertStringInFilter(sitesPage.userTitleSearch, nameOfUpdatedUserTitle)
        const text = await sitesPage.firstOptionOfDropdown.getText()
        await expect(nameOfUpdatedUserTitle).toEqual(text, { trim : true })
        await userTitlePage.randomClickOnWeb.click()
        
    });

})