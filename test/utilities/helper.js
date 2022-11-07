
const mapPage = require('../pageobjects/main.map.page')
const LoginPage = require('../pageobjects/login.page')
const appSettings = require('../utilities/app-settings.json')
const translator = require('./page-translator.json')
const commonPage = require('../pageobjects/common-module/common.page')
const incidentPage = require('../pageobjects/incident.page')
const userProfile = require('../pageobjects/user.profile.page')
const chaiExpect = require('chai').expect;

//Login helper
export const loginAndCheckIfSuccessful = async () => {
	await LoginPage.open()
	await LoginPage.login(appSettings.users.main_user.username, appSettings.users.main_user.password)
	await WaitBrowserToFinishLoading(10000)
	await browser.pause(10000)
	await expect(browser).toHaveUrl(appSettings.default_page)
	await waitForElementToBeDisplayed(mapPage.map, 20000)
	await popupsAndNotificationsCloser()
}

export const loginForSpecificUser = async (username, password, openLogin) => {
	if (openLogin) {
		await LoginPage.open()
	}
	await LoginPage.login(username, password)
	await WaitBrowserToFinishLoading(10000)
	await browser.pause(10000)
	await expect(browser).toHaveUrl(appSettings.default_page)
	await waitForElementToBeDisplayed(mapPage.map, 20000)
	await popupsAndNotificationsCloser()
}

export const popupsAndNotificationsCloser = async () => {
	await browser.pause(10000)
	if (await mapPage.incidentNotificationsCloseAllBtn.isExisting()) {
		await mapPage.incidentNotificationsCloseAllBtn.click()
	}
	if (await mapPage.probReportNotificationsCloseAllBtn.isExisting()) {
		await mapPage.probReportNotificationsCloseAllBtn.click()
	}
	if (await mapPage.disconnectionPopup.length > 0) {
		for (let i = await mapPage.disconnectionPopup.length - 1; i >= 0; i--) {
			await mapPage.closeDisconnectionPopup[i].click()
			await browser.pause(500)
		}
	}
}
//End of login helper

//Logout helper
export const LogoutFromHQCCC = async () => {
	await mapPage.userProfileButton.click()
	await browser.pause(2000)
	await expect(browser).toHaveUrl(appSettings.hqccc_urls.user_profile.get_user_profile)
	await userProfile.logoutBtn.click()
	await browser.pause(3000)
	await expect(browser).toHaveUrl(appSettings.hqccc_urls.get_login_page)
}

export const changeSiteBranchByName = async (matOptionString) => {
	await mapPage.userProfileButton.click()
	await browser.pause(3000)
	await expect(browser).toHaveUrl(appSettings.hqccc_urls.user_profile.get_user_profile)
	await userProfile.userProfileTabs[1].click()
	await browser.pause(3000)
	await userProfile.siteBranchSelector[0].click()
	await selectSpecificMatOption(matOptionString)
	await userProfile.saveAndExitBtn.click()
}

export const changeSiteBranchByIndex = async (i) => {
	await mapPage.userProfileButton.click()
	await browser.pause(2000)
	await expect(browser).toHaveUrl(appSettings.hqccc_urls.user_profile.get_user_profile)
	await userProfile.userProfileTabs[1].click()
	await browser.pause(1000)
	await userProfile.siteBranchSelector[0].click()
	await userProfile.sitesOptions[i].click()
	await browser.pause(1000)
	await userProfile.saveAndExitBtn.click()
}
//End of logout helper

//select an option randomly helpers generally from any page
export const selectRandomlyMatOptionAndExcludeSpecificOptions = async (arrStrings) => {
	await waitTillOptionsAreAvailable()
	let arr = await commonPage.optionsList
	let optionCount = await arr.length
	let randomNum = Math.floor(Math.random() * optionCount)
	while (randomNum == 0) {
		randomNum = Math.floor(Math.random() * optionCount)
	}
	for (let i = 0; i < arrStrings.length; i++) {
		if (await arr[randomNum].getText() == arrStrings[i]) {
			randomNum = Math.floor(Math.random() * optionCount)
			while (randomNum == 0) {
				randomNum = Math.floor(Math.random() * optionCount)
			}
			i = 0
		}
	}
	const text = await arr[randomNum].getText()
	await arr[randomNum].click()
	return text
}

export const selectRandomlyMatOption = async () => {
	await waitTillOptionsAreAvailable()
	let arr = await commonPage.optionsList
	let optionCount = await arr.length
	let randomNum = Math.floor(Math.random() * optionCount)
	while (randomNum == 0) {
		randomNum = Math.floor(Math.random() * optionCount)
	}
	const optionText = await arr[randomNum].getText()
	await arr[randomNum].click()
	await browser.pause(500)
	return optionText
}

export const waitTillOptionsAreAvailable = async () => {
	while (await commonPage.optionsList.length == 0) {
		await browser.pause(1000)
	}
}

export const selectSpecificMatOption = async (matOptionString) => {
	await waitTillOptionsAreAvailable()
	await browser.pause(1000)
	await $(`span.mat-option-text=${matOptionString}`).click()
}
//end of select an option randomly

//Incident and priv info common functions
export const navigateBetweenTabIncidentPrivilegedInfo = async (tabNum, isIncident = true) => {
	if (isIncident) {
		await $(`span=${translator.incident.add_incident.tooltip_add_incident_btn}`).scrollIntoView()
	}
	if (tabNum == 1) {
		await commonPage.stepHeaders[tabNum - 1].click()
	}
	else if (tabNum == 2) {
		await commonPage.stepHeaders[tabNum - 1].click()
	}
	else if (tabNum == 3) {
		await commonPage.stepHeaders[tabNum - 1].click()
	}
	await browser.pause(1500)
}
//end of Incident and priv info common functions

//Random Map location selector functions
export const randomLocationSelector = async () => {
	await waitForElementToBeDisplayed(incidentPage.searchBtnInputFieldsTrigger, 10000)
	await incidentPage.searchBtnInputFieldsTrigger.click()
	await incidentPage.streetField.click()
	await selectRandomlyMatOption()
	await incidentPage.searchBtnInputFieldsTrigger.click()
	await incidentPage.chooseLocationBtn.click()
}

export const checkLocationFieldWasFilled = async (locationField) => {
	await WaitBrowserToFinishLoading(20000)
	let incidentLocationText = await locationField.getText()
	chaiExpect(incidentLocationText).to.not.be.empty
}
//end of Random location selector function

export const waitForElementToBeDisplayed = async (el, time) => {
	await browser.waitUntil(async () => (await el.isDisplayed()) === true,
		{
			timeout: time,
			timeoutMsg: `expected element to appear after ${time} ms`
		}
	);
}

export const selectRandomIncidentFromIncidentList = async () => {
	let IncidentCount = await mapPage.allIncidents.length
	const randomNum = Math.floor(Math.random() * IncidentCount)
	await mapPage.allIncidents[randomNum].click()
}

export const selectRandomlyFromArrayAndClick = async (arr) => {
	let arrLength = await arr.length
	const randomNum = Math.floor(Math.random() * arrLength)
	await arr[randomNum].click()
	return randomNum
}

export const selectRandomlyFromArray = (arr) => {
	let arrLength = arr.length
	const randomNum = Math.floor(Math.random() * arrLength)
	return arr[randomNum]
}

export const selectRandomlyFromArrayAndReturnSelectionNum = (arr) => {
	let arrLength = arr.length
	const randomNum = Math.floor(Math.random() * arrLength)
	return randomNum
}

export const selectRandomlyFromDefinedSizeArrayAndClick = async (arr, num) => {
	let randomNum = Math.floor(Math.random() * num)
	while (randomNum === 0) {
		randomNum = Math.floor(Math.random() * num)
	}
	let count = 0;
	let arrOfSelected = []
	for (let i = 0; i < randomNum; i++) {
		count = 0
		let newRandomNum = Math.floor(Math.random() * num)
		while (newRandomNum === 0) {
			newRandomNum = Math.floor(Math.random() * num)
		}
		if (arrOfSelected.length == 0) {
			await arr[newRandomNum].click()
			arrOfSelected.push(newRandomNum)
		}
		else {
			for (let j = 0; j < arrOfSelected.length; j++) {
				if (arrOfSelected[j] == newRandomNum) {
					count++
				}
			}
			if (count == 0) {
				await arr[newRandomNum].click()
				arrOfSelected.push(newRandomNum)
			}

		}

	}
	return arrOfSelected.length
}

export const checkElementIsDisplayedAndClickable = async (el) => {
	await expect(el).toBeDisplayed()
	await expect(el).toBeClickable()
}

export const GetDateFromDateTimeFields = async (el) => {

	let fullDate = await el.getValue()
	let dateArr = fullDate.split(',')
	fullDate = dateArr[0]
	return fullDate

}

export const SplitTheDateAndStoreItInAnArray = (Date) => {
	let dateArray = Date.split('/')
	return dateArray
}

export const WaitBrowserToFinishLoading = async (time) => {
	await browser.waitUntil(async () => (await browser.isLoading()) === false,
		{
			timeout: time,
			timeoutMsg: `expected browser to successfully load after ${time} ms`
		}
	);
}

export const selectRandomlyFromCalender = async (arr) => {
	let count = await arr.length
	const randomNum = Math.floor(Math.random() * count)
	await arr[randomNum].click()
}

export const clickOnElementByLocation = async (el) => {
	let xLocation = await el.getLocation('x')
	let yLocation = await el.getLocation('y')
	await el.moveTo({ xLocation, yLocation })
	await el.click()
}

export const getRandomText = (length) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export const getRandomPassword = (length) => {
	let result = '';
	const charactersCaptial = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const charactersLower = 'abcdefghijklmnopqrstuvwxyz';
	const charactersNbrs = '0123456789';
	const charactersSpecial = '-@*&|$%';
	length = length < 4 ? 4 : length; //minimum 4 chars

	while (result.length < length) {
		result += charactersCaptial.charAt(Math.floor(Math.random() * charactersCaptial.length));
		result += charactersLower.charAt(Math.floor(Math.random() * charactersLower.length));
		result += charactersNbrs.charAt(Math.floor(Math.random() * charactersNbrs.length));
		result += charactersSpecial.charAt(Math.floor(Math.random() * charactersSpecial.length));
	}
	return result;
}
export const insertStringInFilter = async (el, usedString) => {
	await el.click()
	await browser.pause(2000)
	const value = [...usedString]
	for (let i = 0; i < value.length; i++) {
		await browser.keys(value[i])
		await browser.pause(500)
	}
}
export const eraseStringInInput = async (el) => {
	await el.click()
	let userName = await el.getValue();
	let userLength = userName.length;
	for (let i = 0; i < userLength; i++) {
		await browser.keys("\uE003");
	}
}

//SM helper to select an incident
export const selectRandomlySMAndReturnSerialNum = async (arr, component) => {
	let num = await arr.length
	while (num === 0) {
		num = await arr.length
	}
	let randomNum = Math.floor(Math.random() * num)
	while (randomNum === 0) {
		randomNum = Math.floor(Math.random() * num)
	}
	await arr[randomNum].click()
	if (component === 'incident') {
		let serialNum = await $$('app-link-incident-popup > div > div.table-view > app-data-table > div > div > table > tbody > tr > td:nth-child(2)')[randomNum].getText();
		return serialNum
	} else {
		let firstName = await $$('html > body > div > div > div > mat-dialog-container > app-link-contact-popup > div > app-data-table > div > div > table > tbody > tr > td.cdk-column-firstName > span')[randomNum].getText();
		return firstName
	}

}
//end of SM helper

