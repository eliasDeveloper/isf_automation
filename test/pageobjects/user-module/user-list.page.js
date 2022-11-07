class UserListPage {
	get spanOfAddUserButton(){return $('app-user > app-table-user > section > div > span')}
	get addUserBtn(){return $('app-user > app-table-user > section > div > button')}
	get searchInput(){return $('siren-table > div  div > div> input')}
	get usersTable(){return $('app-admin > app-user > app-table-user > div > siren-table > div > div > table')}
	get usersTableRow(){return $$('div > table > tbody > tr > td')}

	get spanFirstUserInList() { return $('div.table-containter > table > tbody > tr:nth-child(1) > td:nth-child(1) > span') }
	get trUserList() { return $$('table > tbody > tr') }
	get inputUsername() { return $('[formControlName="name"]') }
	get spanAllUserInList() { return $$('div.table-containter > table > tbody > tr > td:nth-child(1) > span') }
	get sitesSection(){return $('div > div > form > div > div:nth-child(9) > mat-card')}
	get site(){return $$('tr > td.cdk-column-Sites')}
	get nickname(){return $$('tr > td.cdk-column-epithet')}
	

	async checkIfUserExists(username) {
		await helper.waitForElementToBeDisplayed(this.searchInput, 20000);
		await browser.pause(1000)
		await helper.insertStringInFilter(this.searchInput, username)
		let usersCount = await this.trUserList.length;
		while (await this.trUserList.length > 1) {
			await browser.pause(500)
			usersCount = await this.trUserList.length;
		}
		await chaiExpect(usersCount).to.be.equal(1)
	}

	async getFirstUsernameFromList() {
		await helper.waitForElementToBeDisplayed(this.spanFirstUserInList, 20000);
		return await this.spanFirstUserInList.getText();
	}

	async getRandomUsernameFromTable() {
		await helper.waitForElementToBeDisplayed(this.txtFilterField, 20000);
		let users = await this.spanAllUserInList;
		while (users.length == 0) {
			await browser.pause(1000)
			users = await this.spanAllUserInList;
		}
		return users[Math.floor(Math.random() * users.length)].getText()
	}
	async checkPrivilegedModulesOfUser(groupname){
		//to check the user based on the group
	}
}

module.exports = new UserListPage()