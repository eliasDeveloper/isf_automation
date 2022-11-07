const loginPage = require('../../pageobjects/login.page')
const mapPage = require('../../pageobjects/main.map.page')

describe('As a user I should be notified if another login has been made via my account', async () => {
	it('Should be able to login successfully in the first browser', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As an HQCCC user, I should be notified if another login has been made via my account')
		allureReporter.addDescription('Should be able to login successfully in the first browser')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('Should be able to open a new Instance of the browser and login successfully ', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As an HQCCC user, I should be notified if another login has been made via my account')
		allureReporter.addDescription('Should be able to open a new Instance of the browser and login successfully')
		allureReporter.addSeverity('blocker')
		await browser.newWindow(`${appSettings.base_url}/login`, { windowName: 'HQCCC second instance', })
		const handles = await browser.getWindowHandles()
		await browser.switchToWindow(handles[1])
		await browser.pause(2000)
		await loginPage.login(appSettings.users.main_user.username, appSettings.users.main_user.password)
		await browser.pause(10000)
		await expect(browser).toHaveUrl(appSettings.default_page)
	});

	it('Should be notified in the first browser that a successful login has been made via my account', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As an HQCCC user, I should be notified if another login has been made via my account')
		allureReporter.addDescription('Should be notified in the first browser that a successful login has been made via my account')
		allureReporter.addSeverity('normal')
		const handles = await browser.getWindowHandles()
		await browser.switchToWindow(handles[0])
		await browser.pause(2000)
		await expect(mapPage.alertSecondLoginPopup).toBeExisting()
		await expect(mapPage.alertSecondLoginPopup).toBeDisplayed()
		await expect(mapPage.alertSecondLoginMessage).toHaveText(`${translator.common.login_notification}`)
	});
});