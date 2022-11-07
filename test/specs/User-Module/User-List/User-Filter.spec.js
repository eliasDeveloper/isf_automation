const userPage = require('../../../pageobjects/user-module/user-list.page')
const { loginAndCheckIfSuccessful } = require('../../../utilities/helper')

describe('check the side filter functionality is working', async () => {
	it('should Login successfully', async () => {
		await browser.maximizeWindow();
		loginAndCheckIfSuccessful();
	});

	it('should select random user and filter using it', async () => {
		await userPage.redirectToUserList();
		const username = await userPage.getRandomUsernameFromTable();
		await userPage.checkIfUserExists(username);
	});
});
