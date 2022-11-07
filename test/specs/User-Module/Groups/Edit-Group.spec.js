const { default: $ } = require('webdriverio/build/commands/browser/$')
const adminModulePage = require('../../../pageobjects/admin.module.page')
const groupsPage = require('../../../pageobjects/user-module/groups.page')
let groupName = ''
let description = ''
let context = ''
let allowSharedModificationDuration = 0
let isChecked = 'false'

describe('Update a group, and check the business logic', async()=>{
    it('Should be able to login successfully', async()=>{
        allureReporter.addFeature('Manage Groups')
		allureReporter.addStory('As an HQCCC user, I should be able to update a group')
		allureReporter.addDescription('Should be able to Login successfully')
		allureReporter.addSeverity('blocker')
        await browser.maximizeWindow()
        await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
		await browser.pause(3000)
    });
    it('Should be able to access the user module', async() => {
        allureReporter.addFeature('Manage Groups')
		allureReporter.addStory('As an HQCCC user, I should be able to update a group')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModule()
		await browser.pause(3000)
    });
    it('Should be able to access the groups section in the user module', async() => {
        allureReporter.addFeature('Manage Groups')
		allureReporter.addStory('As an HQCCC user, I should be able to update a group')
        allureReporter.addSeverity('normal')
        await adminModulePage.redirectToUserModuleTab(1,`${appSettings.hqccc_urls.admin_module.groups_url}`)
        await browser.pause(1000)
        await expect(adminModulePage.adminTabs[1]).toHaveAttrContaining('class', 'active-link')
        await expect(groupsPage.addGroupButton).toBeDisplayed()
        await expect(groupsPage.searchInput).toBeDisplayed()
        await expect(groupsPage.groupsTable).toBeDisplayed()
        await expect(groupsPage.detailedViewToggleButton).toBeDisplayed()
        await browser.pause(3000)
    });
    it('Should be able to choose a group from the table & validate the chosen group', async() => {
        allureReporter.addFeature('Manage Groups')
		allureReporter.addStory('As an HQCCC user, I should be able to update a group')
        allureReporter.addSeverity('normal')
        groupName = await groupsPage.groupsTableRow[4].getText()
        description = await groupsPage.groupsTableRow[5].getText()
        context = await groupsPage.groupsTableRow[6].getText()
        await browser.pause(1000)
        await helper.insertStringInFilter(groupsPage.searchInput, groupName)
        await browser.pause(2000)
        await expect(await groupsPage.groupsTable.length).toEqual(1)
        await browser.pause(2000)
        await groupsPage.groupsTableRow[0].click()
        await browser.pause(3000)
        await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_group_url}`)
        await expect(groupName).toEqual(await groupsPage.name.getValue())
        await expect(description).toEqual(await groupsPage.description.getValue())
        await expect(context).toEqual(await groupsPage.context.getValue())
        await browser.pause(3000)
    });
    it('Should be able to update the selected group and validate the update', async() => {
        allureReporter.addFeature('Manage Groups')
		allureReporter.addStory('As an HQCCC user, I should be able to update a group')
        allureReporter.addSeverity('normal')
        await groupsPage.name.scrollIntoView()
        groupName = await helper.getRandomText(5)
        description = await helper.getRandomText(10)
        context = await helper.getRandomText(2)
        await groupsPage.name.setValue(groupName)
        await groupsPage.description.setValue(description)
        await groupsPage.context.setValue(context)
        allowSharedModificationDuration = Math.floor(Math.random()*99)
        await groupsPage.sharedObjectModificationPeriod.setValue(allowSharedModificationDuration)
        isChecked = await groupsPage.allowSharedModificationObjectInputAttribute.getAttribute('aria-checked')
        if(isChecked == 'false'){
            await groupsPage.allowSharedModificationObjectCheckbox.click()
        }
        await browser.pause(2000)
        await groupsPage.saveButton.scrollIntoView()
        await groupsPage.saveButton.click()
        await browser.pause(5000)
        await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.groups_url}`)
        await helper.insertStringInFilter(groupsPage.searchInput, groupName)
        await expect(groupName).toEqual(await groupsPage.groupsTableRow[0].getText())
        await expect(description).toEqual(await groupsPage.groupsTableRow[1].getText())
        await expect(context).toEqual(await groupsPage.groupsTableRow[2].getText())
        await groupsPage.groupsTableRow[0].click()
        await browser.pause(3000)
        await expect(groupName).toEqual(await groupsPage.name.getValue())
        await expect(description).toEqual(await groupsPage.description.getValue())
        await expect(context).toEqual(await groupsPage.context.getValue())
        await browser.pause(3000)
    });
    it('Should be able to modify the web modules of the selected group & validate in the detailed view mode', async() => {
        allureReporter.addFeature('Manage Groups')
		allureReporter.addStory('As an HQCCC user, I should be able to update a group')
        allureReporter.addSeverity('normal')
        await adminModulePage.adminTabs[1].click()
        await browser.pause(3000)
        await groupsPage.detailedViewToggleButton.click()
        await helper.insertStringInFilter(groupsPage.searchInput, groupName)
        await expect(await groupsPage.groupsTable.length).toEqual(1)
        const classAttribute = await groupsPage.groupsTableRowMatIcon[0].getAttribute('class')
        await browser.pause(2000)
        await groupsPage.detailedViewToggleButton.click()
        await browser.pause(2000)
        await helper.insertStringInFilter(groupsPage.searchInput, groupName)
        await browser.pause(2000)
        await groupsPage.groupsTableRow[0].click()
        await browser.pause(2000)
        await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_group_url}`)
        await groupsPage.webModulesTab.click()
        await expect(groupsPage.groupsTable).toBeDisplayed()
        const length = await groupsPage.webModules.length
        for(let i=0;i<length ;i++){
            let webModuleText =await groupsPage.webModules[i].getText()
            webModuleText = webModuleText.trim()
            webModuleText = webModuleText.toUpperCase()
            if(webModuleText === 'APP_BUILDER_END_USER'){
                await groupsPage.editWebModuleButton[i].click()
                break
            }
        }
        await browser.pause(1000)
        await groupsPage.webModulesDropDown[0].click()
        await browser.pause(1000)
        if(classAttribute.includes('no-access material-icons')){
            //check if it is no-access if so then choose only-read
            await groupsPage.webModuleDropdownOptions[2].click()
        }
        else if(classAttribute.includes('only-read material-icons')){
            //else if it is only-read then choose read-write
            await groupsPage.webModuleDropdownOptions[3].click()
        }
        else{
            //choose no-access
            await groupsPage.webModuleDropdownOptions[1].click() 
        }
        await browser.pause(3000)
        await groupsPage.saveWebModuleChanges.click()
        await browser.pause(3000)
        await groupsPage.saveAllChanges.scrollIntoView()
        await browser.pause(3000)
        await groupsPage.saveAllChanges.click()
        await browser.pause(3000)
        await adminModulePage.adminTabs[1].click()
        await browser.pause(4000)
        await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.groups_url}`)
        await groupsPage.detailedViewToggleButton.click()
        await browser.pause(4000)
        await helper.insertStringInFilter(groupsPage.searchInput, groupName)
        await expect(await groupsPage.groupsTable.length).toEqual(1)
        let grpNameFromTable = await groupsPage.groupsTableRow[0].getText()
        grpNameFromTable = grpNameFromTable.trim()
        await expect(grpNameFromTable).toEqual(`${groupName}`)
        if(classAttribute.includes('no-access material-icons')){
            await expect(groupsPage.groupsTableRowMatIcon[0]).toHaveAttrContaining('class', 'only-read material-icons')
        }
        else if(classAttribute.includes('only-read material-icons')){
            await expect(groupsPage.groupsTableRowMatIcon[0]).toHaveAttrContaining('class', 'read-write material-icons')
        }
        else{
            await expect(groupsPage.groupsTableRowMatIcon[0]).toHaveAttrContaining('class', 'no-access material-icons')
        }
        await browser.pause(3000)
    });
    it('Should not be able to update the allow shared modification duration to a negative value', async() => {
        allureReporter.addFeature('Manage Groups')
		allureReporter.addStory('As an HQCCC user, I should be able to update a group')
        allureReporter.addSeverity('critical')
        await browser.pause(2000)
        await adminModulePage.adminTabs[1].click()
        await browser.pause(1000)
        await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.groups_url}`)
        await browser.pause(1000)
        await groupsPage.detailedViewToggleButton.click()
        await browser.pause(2000)
        await helper.insertStringInFilter(groupsPage.searchInput, groupName)
        await browser.pause(2000)
        await groupsPage.groupsTableRow[0].click()
        const randomNum = Math.floor(Math.random()*-99)
        await browser.pause(2000)
        await groupsPage.sharedObjectModificationPeriod.setValue(randomNum)
        await groupsPage.saveButton.scrollIntoView()
        await browser.pause(2000)
        await groupsPage.saveButton.click()
        await browser.pause(3000)
        await groupsPage.name.scrollIntoView()
        await expect(await groupsPage.sharedObjectModificationPeriod).toHaveAttr('aria-invalid', 'true')
        await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_group_url}`)
        await browser.pause(3000)
    });
    it('Should not be able to update a group without a name', async() => {
        allureReporter.addFeature('Manage Groups')
		allureReporter.addStory('As an HQCCC user, I should be able to update a group')
        allureReporter.addSeverity('critical')
        await browser.pause(2000)
        const randomNum = Math.floor(Math.random()*99)
        await browser.pause(2000)
        await groupsPage.sharedObjectModificationPeriod.setValue(randomNum)
        await helper.eraseStringInInput(groupsPage.name)
        await browser.pause(2000)
        await groupsPage.saveButton.scrollIntoView()
        await browser.pause(2000)
        await groupsPage.saveButton.click()
        await groupsPage.name.scrollIntoView()
        await expect(await groupsPage.name).toHaveAttr('aria-required', 'true')
        await browser.pause(3000)
        await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specified_group_url}`)
        await browser.pause(3000)
    });
    

})