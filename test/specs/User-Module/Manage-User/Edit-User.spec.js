const userPage = require('../../../pageobjects/user-module/user-list.page');
const manageUserPage = require('../../../pageobjects/user-module/manage-user.page');
const adminModulePage = require('../../../pageobjects/admin.module.page')
let newUserFullName=''
let newGroupName = '';


describe('Check updating a user and validate the business flow', async () => {
	it('Should be able to Login successfully', async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able edit a user from the users list')
		allureReporter.addDescription('Should be able to Login successfully')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow();
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
		await browser.pause(3000)
	});
	it('Should be able to access the users section in the users module', async() => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able edit a user from the users list')
		allureReporter.addSeverity('normal')
		await adminModulePage.redirectToUserModule()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.main_url}`)
		await expect(await userPage.spanOfAddUserButton.getText()).toEqual(`${translator.user.list_user.add_user}`)
		chaiExpect(await userPage.addUserBtn.isExisting())
		chaiExpect(await userPage.searchInput.isExisting())
		await expect(userPage.usersTable).toBeDisplayed()
		await browser.pause(3000)
	})
	it('Should be able to search for a user in the users list', async() => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able edit a user from the users list')
		allureReporter.addSeverity('normal')
		await helper.insertStringInFilter(userPage.searchInput, 'userfor')
		await expect(await userPage.trUserList.length).toEqual(1)
	});
	it('Should be able to click on the found user', async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able edit a user from the users list')
		allureReporter.addSeverity('normal')
		await userPage.usersTableRow[0].click()
		await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specific_user_url}`)
	});
	it("Should be able to successfully edit the user's data", async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able edit a user from the users list')
		allureReporter.addSeverity('normal')
		await helper.waitForElementToBeDisplayed(await manageUserPage.inputFullName, 20000);
		newUserFullName = await helper.getRandomText(10)
		await manageUserPage.inputFullName.setValue(newUserFullName);
		await helper.waitForElementToBeDisplayed(await manageUserPage.lookupGroup, 20000);
		await manageUserPage.lookupGroup.click()
		await browser.pause(5000)
		await helper.selectRandomlyMatOption()
		newGroupName = await manageUserPage.lookupGroup.getText()
		//submit user
		await helper.waitForElementToBeDisplayed(manageUserPage.btnSubmit, 20000);
		await manageUserPage.btnSubmit.scrollIntoView()
		await manageUserPage.btnSubmit.click()
		await browser.pause(2000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.main_url}`)
	});
	it('Should be able to validate the newly updated information', async() => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able edit a user from the users list')
		allureReporter.addSeverity('critical')
		await helper.insertStringInFilter(userPage.searchInput, newUserFullName)
		await expect(await userPage.trUserList.length).toEqual(1)
		await expect(await userPage.usersTableRow[1].getText()).toEqual(newUserFullName, { trim: true })
		await expect(await userPage.usersTableRow[2].getText()).toEqual(newGroupName, { trim: true})
		await browser.pause(3000)
	});
	it('Should fail to update a user if missing filling the required fields.', async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able edit a user from the users list')
		allureReporter.addSeverity('critical')
		await adminModulePage.adminTabs[1].click()
		await browser.pause(3000)
		await adminModulePage.adminTabs[0].click()
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.main_url}`)
		await helper.insertStringInFilter(userPage.searchInput, newUserFullName)
		await expect(await userPage.trUserList.length).toEqual(1)
		await expect(await userPage.usersTableRow[1].getText()).toEqual(newUserFullName, { trim: true })
		await userPage.usersTableRow[0].click();
		await helper.eraseStringInInput(manageUserPage.inputUsername)
		await manageUserPage.inputFullName.click()
		await manageUserPage.btnSubmit.scrollIntoView();
		await helper.waitForElementToBeDisplayed(manageUserPage.btnSubmit, 20000);
		await manageUserPage.btnSubmit.click();
		await browser.pause(1000)
		await manageUserPage.inputFullName.scrollIntoView()
		await expect(await manageUserPage.inputUsername).toHaveAttr('aria-required', 'true')
		await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.admin_module.specific_user_url}`)
		chaiExpect(await manageUserPage.requiredFields.length).to.equal(1)
		
	});
	it('should fail to update a user if the username already exists.', async () => {
		allureReporter.addFeature('Manage Users')
		allureReporter.addStory('As an HQCCC user, I should be able edit a user from the users list')
		allureReporter.addSeverity('critical')
		await adminModulePage.adminTabs[0].click()
		await browser.pause(5000)
		const firstUsername = await userPage.usersTableRow[0].getText()
		const secondUser = await userPage.trUserList[1];
		await secondUser.click();
		await helper.WaitBrowserToFinishLoading(10000);
		//set name from another user
		await helper.waitForElementToBeDisplayed(manageUserPage.inputUsername, 20000);
		await manageUserPage.inputUsername.setValue(firstUsername);
		//set random fullname
		await helper.waitForElementToBeDisplayed(manageUserPage.inputFullName, 20000);
		await manageUserPage.inputFullName.setValue(helper.getRandomText(10));
		//submit user
		await manageUserPage.btnSubmit.scrollIntoView();
		await helper.waitForElementToBeDisplayed(manageUserPage.btnSubmit, 20000);
		await manageUserPage.btnSubmit.click();
		//alert dialog should be displayed
		await helper.waitForElementToBeDisplayed(manageUserPage.alertDialgText, 20000);
		await chaiExpect(await manageUserPage.alertDialgText.getText()).to.equal(`${translator.user.add_user.username_already_exists}`);
	});
	
});
