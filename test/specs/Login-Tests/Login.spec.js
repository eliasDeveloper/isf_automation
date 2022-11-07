const loginPage = require('../../pageobjects/login.page')
const { WaitBrowserToFinishLoading } = require('../../utilities/helper')
const translator = require('../../utilities/page-translator.json')
const appSettings = require('../../utilities/app-settings.json')

describe('Login to HQCCC', async () => {
	it('should go to the login page and check the title and the image of the police logo is available and visible', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As a user I should be able to login successfully if I provide valid credentials, else I should be blocked')
		allureReporter.addDescription('Should be able to reach the home page of HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await loginPage.open()
		await expect(browser).toHaveTitle('Hqccc')
		await expect(loginPage.imageContainer).toBeDisplayed()
		await expect(loginPage.policeImage).toHaveAttr('src', 'assets/images/isf-logo-login.svg')
		await expect(loginPage.FenixImage).toHaveAttr('src', 'assets/images/fenix-logo.svg')
		await expect(loginPage.policeImage).toBeDisplayed()
	});

	it('should check that all the greeting fields and sentence are visible on the screen', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As a user I should be able to login successfully if I provide valid credentials, else I should be blocked')
		allureReporter.addDescription('Should be able to see all greeting fields and default logos')
		allureReporter.addSeverity('minor')
		await expect(loginPage.policeGreetingMessage).toBeDisplayed()
		await expect(loginPage.policeGreetingMessage).toHaveText(translator.login.welcome_label)
		await expect(loginPage.loginTitle).toBeDisplayed()
		await expect(loginPage.loginTitle).toHaveText(translator.login.login_label)
		await expect(loginPage.policeInstruction).toBeDisplayed()
		await expect(loginPage.policeInstruction).toHaveText(translator.login.login_instruction)
	});

	it('should check placeholder for username and password and loginbtn to be clickable and have the right value and link', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As a user I should be able to login successfully if I provide valid credentials, else I should be blocked')
		allureReporter.addDescription('Should be able to see all greeting fields and default logos')
		allureReporter.addSeverity('minor')
		await expect(loginPage.username).toHaveAttr('placeholder', translator.login.username_placeholder)
		await expect(loginPage.password).toHaveAttr('placeholder', translator.login.password_placeholder)
		await expect(loginPage.btnLogin).toBeClickable()
		await expect(loginPage.btnLogin).toHaveText(translator.login.login_label)
	});

	it('should fill a wrong username and password and get an error message', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As a user I should be able to login successfully if I provide valid credentials, else I should be blocked')
		allureReporter.addDescription('Should be blocked if invalid credentials were inserted')
		allureReporter.addSeverity('normal')
		await loginPage.login('fail', 'fail')
		await expect(loginPage.errorPopup).toBeDisplayed()
	});

	it('fill username and password and make sure that login was successful', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As a user I should be able to login successfully if I provide valid credentials, else I should be blocked')
		allureReporter.addDescription('Should be redirected to Map Page if I entered valid credentials')
		allureReporter.addSeverity('critical')
		await loginPage.login(appSettings.users.main_user.username, appSettings.users.main_user.password)
		await WaitBrowserToFinishLoading(10000)
		await browser.pause(5000)
		await expect(browser).toHaveUrl(appSettings.default_page)
	})


});