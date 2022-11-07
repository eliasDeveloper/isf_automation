const Page = require('./page');
const appSettings = require('../utilities/app-settings.json');

class LoginPage extends Page {

	get verifiedUsername() { return $('#username-textfield') }
	get verifiedPassword() { return $('#password-textfield') }
	get verifiedLoginBtn() { return $('#sign-in-button') }
	get username() { return $('[formcontrolname="username"]') }
	get password() { return $('[formcontrolname="password"]') }
	get btnLogin() { return $('body app-root app-login div form button') }
	get imageContainer() { return $('body app-root app-login div div') }
	get policeImage() { return $('body app-root app-login div div img') }
	get FenixImage() { return $('body > app-root > app-login > div > div > div.fenix-logo > img') }
	get policeGreetingMessage() { return $('.welcome-label') }
	get loginTitle() { return $('.login-title') }
	get policeInstruction() { return $('.instruction') }
	get errorPopup() { return $('.mat-simple-snackbar') }

	async verifiedLogin(username, password) {
		await this.verifiedUsername.setValue(username)
		await this.verifiedPassword.setValue(password)
		await this.verifiedLoginBtn.click()
	}

	async login(username, password) {
		await this.username.waitForExist({ timeout: 30000 });
		await this.username.setValue(username);
		await this.password.setValue(password);
		await this.btnLogin.click();
	}

	async open() {
		await super.open('login');

		if (appSettings.include_verified_login) {
			await this.verifiedLogin('fady.c', 'F@d33CHQccc765')
		}
	}
}

module.exports = new LoginPage();