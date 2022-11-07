const adminModulePage = require('../../../pageobjects/admin.module.page')
const sitesPage = require('../../../pageobjects/user-module/sites.page')
const userPage = require('../../../pageobjects/user-module/user-list.page')
const siteName = 'sitename2'
let partyInCharge = ''
let nicknameOfSite = ''
describe('Edit a site, and check the business logic', async()=>{

    it('Should be able to login successfully', async()=>{
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
		allureReporter.addSeverity('blocker')
        await browser.maximizeWindow()
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
		await browser.pause(3000)
    })
    it('Should be able to access the user module', async() => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModule()
		await browser.pause(3000)
    });
    it('Should be able to access the sites section in the user module', async() => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModuleTab(2,`${appSettings.hqccc_urls.admin_module.sites_url}` )
        await browser.pause(1000)
        await expect(adminModulePage.adminTabs[2]).toHaveAttrContaining('class', 'active-link')
        await expect(sitesPage.addSiteButton).toBeDisplayed()
        await expect(sitesPage.searchInput).toBeDisplayed()
        await expect(sitesPage.sitesNestedTree).toBeDisplayed()
        await expect(sitesPage.saveAndSubmit).toBeDisplayed()
        await browser.pause(3000)
    });
    it('Should fail updating a site without filling required fields', async () => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
        allureReporter.addSeverity('normal')
        await helper.insertStringInFilter(sitesPage.searchInput, siteName)
        await sitesPage.siteFromNestedTreeElement.click()
        //set description
        await sitesPage.siteDescription.setValue(await helper.getRandomText(10))
        //set transaction source
        await sitesPage.siteTransactionSource.setValue(await helper.getRandomText(10))
        await browser.pause(3000)
        await helper.eraseStringInInput(sitesPage.siteName)
        await browser.pause(3000)
        await sitesPage.saveAndSubmit.click()
        chaiExpect(await sitesPage.requiredFields.length).to.equal(1)
        await expect(await sitesPage.siteName).toHaveAttr('aria-required', 'true')
        await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.sites_url}`)
        await expect(sitesPage.searchInput.getValue()).toEqual(siteName)
        await browser.pause(3000)
    });
    it('Should be able to update the selected site', async() => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
        allureReporter.addSeverity('normal')
        await sitesPage.siteName.setValue(siteName)
        await browser.pause(2000)
        await sitesPage.partyInCharge.click()
        await helper.selectRandomlyMatOption()
        partyInCharge = await sitesPage.partyInCharge.getText()
        await browser.pause(2000)
        await sitesPage.post.click()
        await helper.selectRandomlyMatOption()
        await browser.pause(2000)
        await sitesPage.company.click()
        await helper.selectRandomlyMatOption()
        await browser.pause(2000)
        await sitesPage.saveAndSubmit.click()
        await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.sites_url}`)
        await browser.pause(3000)
    });
    it('Should fail updating a user to a site without filling the required fields', async() => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
        allureReporter.addSeverity('normal')
        await sitesPage.sitesTabs[1].click()
        await expect(await sitesPage.sitesTabs[1]).toHaveAttr('aria-selected','true')
        await expect(sitesPage.addUser).toBeDisplayed()
        await expect(sitesPage.appEditableDataTable).toBeDisplayed()
        await expect(sitesPage.editButton).toBeDisplayed()
        await expect(sitesPage.deleteButton).toBeDisplayed()
        await sitesPage.editButton.click()
        await sitesPage.userDropDown.click()
        await sitesPage.firstOptionOfDropdown.click()
        await sitesPage.saveButton.click()
        await sitesPage.saveAndSubmit.click()
        await expect(await sitesPage.sitesTabs[1]).toHaveAttr('aria-selected','true')
    });
    it('Should be able to update the user of the selected site.',async () => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
        allureReporter.addSeverity('normal')
        await sitesPage.sitesTabs[1].click()
        await expect(await sitesPage.sitesTabs[1]).toHaveAttr('aria-selected','true')
        await expect(sitesPage.addUser).toBeDisplayed()
        await sitesPage.addUser.click()
        await expect(sitesPage.appEditableDataTable).toBeDisplayed()
        await expect(sitesPage.editButton).toBeDisplayed()
        await expect(sitesPage.deleteButton).toBeDisplayed()
        await sitesPage.editButton.click()
        await sitesPage.userDropDown.click()
        await sitesPage.firstOptionOfDropdown.click()
        await sitesPage.nickname.click()
        await sitesPage.firstOptionOfDropdown.click()
        nicknameOfSite = await sitesPage.nickname.getText()
        await expect(sitesPage.saveButton).toBeDisplayed()
        await expect(sitesPage.cancelButton).toBeDisplayed()
        await sitesPage.saveButton.click()
        await sitesPage.saveAndSubmit.click()

    });
    it('Should fail adding a transaction right without filling the required fields', async () => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
        allureReporter.addSeverity('normal')
        await sitesPage.sitesTabs[2].click()
        await expect(await sitesPage.sitesTabs[2]).toHaveAttr('aria-selected','true')
        await expect(sitesPage.appEditableDataTable).toBeDisplayed()
        await expect(sitesPage.editButton).toBeDisplayed()
        await expect(sitesPage.deleteButton).toBeDisplayed()
        await sitesPage.editButton.click()
        await sitesPage.transactions.click()
        await helper.selectRandomlyMatOption()
        await sitesPage.saveButton.click()
        await sitesPage.saveAndSubmit.click()
        await expect(await sitesPage.sitesTabs[2]).toHaveAttr('aria-selected','true')
    });
    it('Should be able to update the transaction right of the selected site.', async() => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
        allureReporter.addSeverity('normal')
        await sitesPage.sitesTabs[2].click()
        await expect(await sitesPage.sitesTabs[2]).toHaveAttr('aria-selected','true')
        await sitesPage.addTransactionRightsButton.click()
        await expect(sitesPage.appEditableDataTable).toBeDisplayed()
        await expect(sitesPage.editButton).toBeDisplayed()
        await expect(sitesPage.deleteButton).toBeDisplayed()
        await sitesPage.editButton.click()
        await sitesPage.transactions.click()
        await helper.selectRandomlyMatOption()
        await browser.pause(2000)
        await sitesPage.userDropDown.click()
        await helper.selectRandomlyMatOption()
        await browser.pause(2000)
        await sitesPage.nickname.click()
        await helper.selectRandomlyMatOption()
        await browser.pause(2000)
        await sitesPage.rightLevel.click()
        await helper.selectRandomlyMatOption()
        await sitesPage.saveButton.click()
        await sitesPage.saveAndSubmit.click()
        await expect(await sitesPage.sitesTabs[0]).toHaveAttr('aria-selected','true')
    });
    it('Should validate if all data was updated and saved successfully', async() => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new site')
        allureReporter.addSeverity('normal')
        await sitesPage.sitesTabs[1].click()
        const lengthOfTableDataInUsersTab = await sitesPage.nicknameTableData.length
        await sitesPage.sitesTabs[2].click()
        const lengthOfTableDataInTransactionRightsTab = await sitesPage.rightLevelTableData.length
        await sitesPage.sitesTabs[1].click()
        await expect(await sitesPage.nicknameTableData.length).toEqual(lengthOfTableDataInUsersTab)
        await sitesPage.sitesTabs[2].click()
        await expect(await sitesPage.rightLevelTableData.length).toEqual(lengthOfTableDataInTransactionRightsTab)
    });
    it('Should validate the existence of the site to the designated user who belongs to a certain group',async () => {
        allureReporter.addFeature('Sites')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a site')
        allureReporter.addSeverity('normal')
        await adminModulePage.adminTabs[0].click()
        await browser.pause(2000)
        await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.main_url}`)
        await helper.insertStringInFilter(userPage.searchInput, '01barma')
        await userPage.usersTableRow[0].click()
        await browser.pause(2000)
        await userPage.sitesSection.scrollIntoView()
        let found = false
        let length = await userPage.site.length
        for(let i = 0; i <length; i++){
            let site = await userPage.site[i].getText()
            site = site.trim()
            if(site == siteName){
                found = true
                break
            }
        }
        await expect(found).toEqual(true)
        found = false
        for(let i = 0; i <length; i++){
            let nickname = await userPage.nickname[i].getText()
            nickname = nickname.trim()
            if(nickname == nicknameOfSite ){
                found = true
                break
            }
        }
        await expect(found).toEqual(true)
        await browser.pause(3000)
    });
    


})