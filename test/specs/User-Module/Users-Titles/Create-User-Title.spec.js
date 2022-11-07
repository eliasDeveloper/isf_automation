const adminModulePage = require('../../../pageobjects/admin.module.page')
const userTitlePage = require('../../../pageobjects/user-module/user-titles-page')
const sitesPage = require('../../../pageobjects/user-module/sites.page')
const groupsPage = require('../../../pageobjects/user-module/groups.page')

let nameOfUserTitle = ''
describe('Add a new site, and check the business logic', async()=>{
    it('Should be able to login successfully', async()=>{
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user title')
		allureReporter.addSeverity('blocker')
        await browser.maximizeWindow()
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
		await browser.pause(3000)
    })
    it('Should be able to access the user module', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user title')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModule()
		await browser.pause(3000)
    });
    it('Should be able to access the user titles section in the user module', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user title')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModuleTab(4,'https://hqcccqa.sirenanalytics.com/hqcccweb/admin/titles')
        await browser.pause(1000)
        await expect(adminModulePage.adminTabs[4]).toHaveAttrContaining('class', 'active-link')
        await expect(userTitlePage.addTitleButton).toBeDisplayed()
        await expect(userTitlePage.addTitleButtonText).toBeDisplayed()
        await expect(await userTitlePage.addTitleButtonText.getText()).toEqual(`${translator.admin.add_title}`)
        await expect(userTitlePage.searchInput).toBeDisplayed()
        await expect(userTitlePage.titlesTable).toBeDisplayed()
        await browser.pause(3000)
    });
    it('Should fail adding a User title without filling the required fields', async () => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user title')
        allureReporter.addSeverity('normal')
        await userTitlePage.addTitleButton.click()
        await browser.pause(3000)
        const length = await userTitlePage.titlesTableRows.length
        await userTitlePage.editButton[length-1].click()
        await userTitlePage.saveButton.click()
        chaiExpect(await userTitlePage.requiredFields.length).to.equal(1)
        await expect(await userTitlePage.name).toHaveAttr('aria-required', 'true')
        await browser.pause(3000)
    });
    it('Should be able to add a new User Title', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user title')
        allureReporter.addSeverity('normal')
        nameOfUserTitle = await helper.getRandomText(10)
        await userTitlePage.name.setValue(nameOfUserTitle)
        await userTitlePage.saveButton.click()
        await browser.pause(3000)
    });
    it('Should find the added user title in the table', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user title')
        allureReporter.addSeverity('normal')
        const length = await userTitlePage.titlesTableRows.length
        let found = false
        for(let i =0; i<length; i++){
            let titleText = await userTitlePage.titlesTableRows[i].getText()
            titleText = titleText.trim()
            if(titleText === nameOfUserTitle){
                found = true
                break
            }
        }
        await expect(found).toEqual(true)
        await browser.pause(3000)
    });
    it('Should be to validate the existence in the sites - transaction rights section',async () => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user title')
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
        await helper.insertStringInFilter(sitesPage.userTitleSearch,nameOfUserTitle)
        const text = await sitesPage.firstOptionOfDropdown.getText()
        await expect(nameOfUserTitle).toEqual(text, { trim : true })
        await userTitlePage.randomClickOnWeb.click()
        await browser.pause(3000)
    });
    it('Should be to validate the existence in the groups section.', async() => {
        allureReporter.addFeature('Users Titles')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user title')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModuleTab(1, `${appSettings.hqccc_urls.admin_module.groups_url}`)
        await browser.pause(3000)
        await helper.insertStringInFilter(groupsPage.searchInput, '01barma')
        await groupsPage.groupsTableRow[0].click()
        await groupsPage.userRole.click()
        await helper.insertStringInFilter(sitesPage.userTitleSearch, nameOfUserTitle)
        const text = await sitesPage.firstOptionOfDropdown.getText()
        await expect(nameOfUserTitle).toEqual(text, { trim : true })
        await userTitlePage.randomClickOnWeb.click()
        
    });

})