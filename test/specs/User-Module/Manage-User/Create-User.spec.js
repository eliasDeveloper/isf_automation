const userPage = require('../../../pageobjects/user-module/user-list.page')
const adminModulePage = require('../../../pageobjects/admin.module.page')
const manageUserPage = require('../../../pageobjects/user-module/manage-user.page')
let username = ''
let fullName = ''
let password = ''
let selectedGroup =''

describe('Create a new user, fill all the required fields and check the business logic', async () => {
	it('should be able to Login successfully', async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user')
		allureReporter.addDescription('Should be able to Login successfully')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
		await browser.pause(3000)
	})
	it('Should be able to access the users section in the users module', async() => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user')
		allureReporter.addDescription('Should be able to access the users section in the users module')
		allureReporter.addSeverity('normal')
		await adminModulePage.redirectToUserModule()
		await browser.pause(3000)
		await expect(await userPage.spanOfAddUserButton.getText()).toEqual(`${translator.user.list_user.add_user}`)
		chaiExpect(await userPage.addUserBtn.isExisting())
		chaiExpect(await userPage.searchInput.isExisting())
		await expect(userPage.usersTable).toBeDisplayed()
		await browser.pause(3000)
	})
	it('Should not be able to save if all the required fields were not filled', async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user')
		allureReporter.addDescription('Should be able to access the users section in the users module')
		allureReporter.addSeverity('normal')
		await userPage.addUserBtn.click()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.add_new_user_url}`)
		await expect(await manageUserPage.inputUsername).toBeDisplayed()
		await expect(await manageUserPage.inputFullName).toBeDisplayed()
		await expect(await manageUserPage.lookupGroup).toBeDisplayed()
		await expect(await manageUserPage.inputPassword).toBeDisplayed()
		await manageUserPage.btnSubmit.scrollIntoView()
		await manageUserPage.btnSubmit.click()
		await manageUserPage.inputUsername.scrollIntoView()
		await expect(await manageUserPage.inputUsername).toHaveAttr('aria-required', 'true')
		await expect(await manageUserPage.inputPassword).toHaveAttr('aria-required', 'true')
		await expect(await manageUserPage.inputConfirmPassword).toHaveAttr('aria-required', 'true')
		chaiExpect(await manageUserPage.requiredFields.length).to.equal(4)
		await browser.pause(3000)
	});
	it('should be able to successfully click on the add new user button and create a new user', async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user')
		allureReporter.addDescription('Should be able to create a new user successfully')
		allureReporter.addSeverity('normal')
		await manageUserPage.inputUsername.scrollIntoView()
		//set a random name
		username = await helper.getRandomText(10)
		await manageUserPage.inputUsername.setValue(username)
		//set a random fullname
		fullName = await helper.getRandomText(10)
		await manageUserPage.inputFullName.setValue(fullName)
		//select group
		await manageUserPage.lookupGroup.click()
		await helper.selectRandomlyMatOption()
		await browser.pause(2000)
		selectedGroup = await manageUserPage.lookupGroup.getText()
		//Set a random password
		password = helper.getRandomPassword(12)
		await manageUserPage.inputPassword.setValue(password)
		await browser.pause(2000)
		//expect password rules to be matched
		await expect(await manageUserPage.passwordStrength[0].getText()).toEqual('done')
		await expect(await manageUserPage.passwordStrength[1].getText()).toEqual('done')
		await expect(await manageUserPage.passwordStrength[2].getText()).toEqual('done')
		await expect(await manageUserPage.passwordStrength[3].getText()).toEqual('done')
		await expect(await manageUserPage.passwordStrength[4].getText()).toEqual('done')
		await manageUserPage.inputConfirmPassword.setValue(password)
		await browser.pause(2000)
		//click on add site
		await manageUserPage.btnAddSite.scrollIntoView()
		await manageUserPage.btnAddSite.click()
		//click on edit of first site
		await manageUserPage.btnEditFirstSite.click()
		await browser.pause(2000)
		// select sites' area lookup
		await manageUserPage.siteArea.click()
		await helper.selectRandomlyMatOption()
		await browser.pause(2000)
		//select site's title lookup
		await manageUserPage.siteTitle.click()
		await helper.selectRandomlyMatOption()
		//save site
		await manageUserPage.btnSaveSite.click()
		//submit user
		await manageUserPage.btnSubmit.click()
		//check if user was added
		await userPage.checkIfUserExists(username)
		await browser.pause(3000)
	})
	it('Should check if the user exists in the table of users',async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user')
		allureReporter.addSeverity('normal')
		await browser.refresh()
		await browser.pause(5000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.main_url}`)
		await browser.pause(1000)
		chaiExpect(await userPage.addUserBtn.isExisting())
		await browser.pause(1000)
		chaiExpect(await userPage.searchInput.isExisting())
		await browser.pause(1000)
		await expect(userPage.usersTable).toBeDisplayed()
		await browser.pause(2000)
		// await userPage.inputInSearchField(username)
		await helper.insertStringInFilter(userPage.searchInput, username)
		await expect(await userPage.usersTableRow[0].getText()).toEqual(username)
		await expect(await userPage.usersTableRow[1].getText()).toEqual(fullName)
		await expect(await userPage.usersTableRow[2].getText()).toEqual(selectedGroup)
		await browser.pause(3000)
	})
	it('Should fail to create a new user with same username', async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able to add a new user')
		allureReporter.addSeverity('critical')
		await userPage.addUserBtn.click()
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.add_new_user_url}`)
		await browser.pause(2000)
		//set previously set name
		await manageUserPage.inputUsername.setValue(username)
		//set random fullname
		await helper.waitForElementToBeDisplayed(manageUserPage.inputFullName, 20000)
		await manageUserPage.inputFullName.setValue(helper.getRandomText(10))
		//select group
		await manageUserPage.lookupGroup.click()
		await helper.selectRandomlyMatOption()
		await browser.pause(2000)
		selectedGroup = await manageUserPage.lookupGroup.getText()
		//set random password and confirm password
		password = helper.getRandomPassword(12)
		await helper.waitForElementToBeDisplayed(manageUserPage.inputPassword, 20000)
		await manageUserPage.inputPassword.setValue(password)
		await helper.waitForElementToBeDisplayed(manageUserPage.inputConfirmPassword, 20000)
		await manageUserPage.inputConfirmPassword.setValue(password)
		//click on add site
		await helper.waitForElementToBeDisplayed(manageUserPage.btnAddSite, 20000)
		await manageUserPage.btnAddSite.click()
		//click on edit of first site
		await manageUserPage.btnEditFirstSite.click()
		await browser.pause(1000)
		// select sites' area lookup
		await manageUserPage.siteArea.click()
		await helper.selectRandomlyMatOption()
		await browser.pause(1000)
		//select site's title lookup
		await manageUserPage.siteTitle.click()
		await helper.selectRandomlyMatOption()
		// //save site
		await helper.waitForElementToBeDisplayed(manageUserPage.btnSaveSite, 20000)
		await manageUserPage.btnSaveSite.click()
		//submit user
		await helper.waitForElementToBeDisplayed(manageUserPage.btnSubmit, 20000)
		await manageUserPage.btnSubmit.click()
		//alert dialog should be displayed
		await helper.waitForElementToBeDisplayed(manageUserPage.alertDialgText, 20000)
		await chaiExpect(await manageUserPage.alertDialgText.getText()).to.equal(translator.user.add_user.username_already_exists)
		await manageUserPage.alertDialogClose.click()
		await browser.pause(3000)
		
	})
	it('Should be able to Logout', async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able to login with the new created user')
		allureReporter.addSeverity('critical')
		await helper.LogoutFromHQCCC()
		await browser.pause(3000)
	})
	it('Should be able to login as the new added user', async() => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able to login with the new created user')
		allureReporter.addSeverity('blocker')
		await helper.loginForSpecificUser(username, password, false)
		await browser.pause(3000)
	})
})
