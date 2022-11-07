const userPage = require('../../../pageobjects/user-module/user-list.page');
const appSettings = require('../../../utilities/app-settings.json');
const chaiExpect = require('chai').expect;
const helper = require('../../../utilities/helper');

describe('check redirecting to the manage user page on user click or add new user ', async () => {
	it('should Login successfully', async () => {
		await browser.maximizeWindow();
		helper.loginAndCheckIfSuccessful();
	});

	it('should click on create new user and redirect', async () => {
		await userPage.redirectToUserList();
        await userPage.btnAddUser.click();
        await expect(browser).toHaveUrl(`${appSettings.base_url}/user/add-user`)
	});

    
	it('should select a user from the list and redirect, then compare the usernames to check if it redirected to the correct user', async () => {
		await userPage.redirectToUserList();
        const firstUsername = await userPage.getFirstUsernameFromList();
        await userPage.trFirstUser.click();
        await helper.WaitBrowserToFinishLoading(10000);
        await helper.waitForElementToBeDisplayed(userPage.inputUsername, 20000);
        await chaiExpect(await userPage.inputUsername.getValue()).to.equal(firstUsername);
	});
});
