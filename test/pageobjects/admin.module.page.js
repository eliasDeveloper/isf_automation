const mapPage = require('./main.map.page');
const commonPage = require('./common-module/common.page');
const incidentPage = require('./incident.page');
const privInfoPage = require('./priv-info.page')
const physicalDescription = ['Gender', 'Age Interval', 'Body Structure', 'Height', 'Skin Color', 'Head Shape', 'Beard Shape', 'Eye Shape', 'Nose Shape', 'Mouth Shape', 'Face Shape', 'Lips Shape', 'Eye Brow Shape', 'Eye Color', 'Hair Type', 'Hair Length', 'Hair Color', 'Chin Shape', 'Eye Glasses Type'];
const outfitDescription = ['Lower Clothes', 'Upper Clothes', 'Head Cover', 'Color', 'Shoes Type'];
const personalInformationLookups = ['Health Condition', 'Marital Status', 'Incident Person Status', 'Nationality'];
const incidentMainPage = ['Incident Category', 'Incident Sub Category', 'Incident Type', 'Official Document Type', 'Wasika Type', 'Incident Person Role', 'Incident Occurrence', 'Crime Method', 'Op Call Severity']
class UserModule {
	get adminTabs() { return $$('app-home > mat-sidenav-container > mat-sidenav-content > div > app-admin > nav > div > div > div > a') }
	get lookupOptions() { return $('app-table-config-lookups > div > div > app-single-selection > mat-form-field > div > div > div > mat-select > div > div > span') }
	get addLookupBtn() { return $('app-home > mat-sidenav-container > mat-sidenav-content > div > app-admin > app-table-config-lookups > div.full-width > button') }
	get firstRowOfLookupsTable() { return $$('tbody > tr:nth-child(1) > td') }
	get editButtonOfLookup() { return $('tbody > tr:nth-child(1) > td.openSans > mat-icon') }
	get chosenLookupCheckboxes() { return $$('form > div > div > div > mat-checkbox') }
	get chosenLookupInputs() { return $$('form > div > div > mat-form-field > div > div.mat-form-field-flex > div > input') }
	get saveButton() { return $('tr > td > div > div > button.mat-focus-indicator.save-button.mat-button') }
	get lookupNames() { return $$('tr > td.mat-cell.cdk-column-name') }
	get lookupTableData() { return $$('tr > td') }


	async redirectToUserModule() {
		await helper.waitForElementToBeDisplayed(mapPage.adminModuleIcon, 20000)
		await mapPage.adminModuleIcon.click()
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.admin_module.main_url}`)
	}
	async redirectToUserModuleTab(tabNum, url) {
		await this.adminTabs[tabNum].click()
		await expect(browser).toHaveUrl(url)
	}
	async chooseLookup(lookupType, randomChoice) {
		await this.lookupOptions.click()
		if (!randomChoice) {
			await helper.selectSpecificMatOption(lookupType)
			await browser.pause(2000)
			return null
		}
		else {
			await helper.selectRandomlyMatOption()
			await browser.pause(2000)
			const selectedLookupText = await this.lookupOptions.getText()
			return selectedLookupText
		}
	}
	async validateTheSpecifiedLookup(chosenLookup, nameOfLookup, checkOnSave) {
		let isValid = false
		let found = false
		if (physicalDescription.includes(chosenLookup)) {
			await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
			await incidentPage.personTabs[1].click()
			await commonPage.personDescription[0].scrollIntoView()
			if (chosenLookup === 'Gender') {
				await commonPage.personDescription[0].click()
			}
			else if (chosenLookup === 'Age Interval') {
				await commonPage.personDescription[1].click()
			}
			else if (chosenLookup === 'Body Structure') {
				await commonPage.personDescription[2].click()
			}
			else if (chosenLookup === 'Height') {
				await commonPage.personDescription[3].click()
			}
			else if (chosenLookup === 'Skin Color') {
				await commonPage.personDescription[4].click()
			}
			else if (chosenLookup === 'Head Shape') {
				await commonPage.personDescription[5].click()
			}
			else if (chosenLookup === 'Chin Shape') {
				await commonPage.personDescription[6].click()
			}
			else if (chosenLookup === 'Eye Shape') {
				await commonPage.personDescription[7].click()
			}
			else if (chosenLookup === 'Nose Shape') {
				await commonPage.personDescription[8].click()
			}
			else if (chosenLookup === 'Mouth Shape') {
				await commonPage.personDescription[9].click()
			}
			else if (chosenLookup === 'Face Shape') {
				await commonPage.personDescription[10].click()
			}
			else if (chosenLookup === 'Lips Shape') {
				await commonPage.personDescription[11].click()
			}
			else if (chosenLookup === 'Eye Brow Shape') {
				await commonPage.personDescription[12].click()
			}
			else if (chosenLookup === 'Eye Color') {
				await commonPage.personDescription[13].click()
			}
			else if (chosenLookup === 'Hair Type') {
				await commonPage.personDescription[14].click()
			}
			else if (chosenLookup === 'Hair Length') {
				await commonPage.personDescription[15].click()
			}
			else if (chosenLookup === 'Hair Color') {
				await commonPage.personDescription[16].click()
			}
		}
		else if (outfitDescription.includes(chosenLookup)) {
			await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
			await incidentPage.personTabs[1].click()
			if(chosenLookup === 'Lower Clothes'){
				await browser.pause(1500)
				await commonPage.personClothingDescription[4].scrollIntoView()
				await browser.pause(1500)
				await commonPage.personClothingDescription[4].click()
			}

			else if(chosenLookup === 'Upper Clothes'){
			await browser.pause(1500)
      await commonPage.personClothingDescription[2].scrollIntoView()
      await browser.pause(1500)
      await commonPage.personClothingDescription[2].click()
			}
			else if(chosenLookup === 'Head Cover'){
				await browser.pause(1500)
        await commonPage.personClothingDescription[2].scrollIntoView()
				await browser.pause(1500)
				await commonPage.personClothingDescription[1].click()
			}
			else if(chosenLookup === 'Color'){
				await browser.pause(1500)
				await commonPage.personClothingDescription[4].scrollIntoView()
				await browser.pause(1500)
				await commonPage.personClothingDescription[3].click()
			}
			else if(chosenLookup === 'Shoes Type'){
				await browser.pause(1500)
				await commonPage.personClothingDescription[6].scrollIntoView()
				await browser.pause(1500)
				await commonPage.personClothingDescription[6].click()
			}

		}
		else if (incidentMainPage.includes(chosenLookup)) {
			await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
			await browser.pause(1500)
			if(chosenLookup === 'Incident Category'){
				await browser.pause(1500)
				await incidentPage.incidentDropdownElements[0].click()
			}
			else if(chosenLookup === 'Incident Sub Category'){
				await browser.pause(1500)
				await incidentPage.incidentDropdownElements[1].click()
			}
			else if(chosenLookup ==='Incident Type'){
				await browser.pause(1500)
				await incidentPage.incidentDropdownElements[2].click()
			}
			else if(chosenLookup === 'Crime Method'){
				await browser.pause(1500)
				await incidentPage.incidentDropdownElements[3].click()
			}
			else if (chosenLookup === 'Wasika Type') {
				await incidentPage.incidentDropdownElements[4].scrollIntoView()
				await browser.pause(1500)
				await incidentPage.incidentDropdownElements[4].click()
			}
			else if(chosenLookup ==='Incident Person Role'){
				await browser.pause(1500)
				await incidentPage.incidentDropdownElements[7].scrollIntoView()
				await browser.pause(1500)
				await incidentPage.incidentDropdownElements[7].click()
			}
			else if(chosenLookup === 'Official Document Type'){
				await browser.pause(1500)
				await incidentPage.incidentDropdownElements[8].scrollIntoView()
				await browser.pause(1500)
				await incidentPage.incidentDropdownElements[8].click()
			}
			else if(chosenLookup === 'Op Call Severity'){
				for(let i=0; i<await commonPage.importanceLevelBtn.length; i++){
					await browser.pause(1500)
					if(await commonPage.importanceLevelBtn[i].getText() ==='nameOfLookup'){
						found = true
						break
					}
				}
				await expect(found).toEqual(true)
				isValid = true
				return isValid
			}
			else if (chosenLookup === 'Incident Occurrence') {
				//still not implemented
			}
		}
		else if (personalInformationLookups.includes(chosenLookup)) {
			await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
			if (chosenLookup === 'Nationality') {
				await incidentPage.incidentIdentificationPapers.scrollIntoView()
				await incidentPage.incidentIdentificationPapersDropDowns[2].click()
			}
			else if (chosenLookup === 'Health Condition') {
				await incidentPage.personInfoSection.scrollIntoView()
				await commonPage.personHealthCondition.click()
			}
			else if (chosenLookup === 'Incident Person Status') {
				await incidentPage.incidentDropdownElements[19].scrollIntoView()
				await incidentPage.incidentDropdownElements[20].click()
			}
			else if (chosenLookup === 'Marital Status') {
				await incidentPage.incidentDropdownElements[19].scrollIntoView()
				await incidentPage.incidentDropdownElements[24].click()
			}

		}
		await browser.pause(3000)
		for (let i = 1; i < await commonPage.selectedLookupArrayData.length; i++) {
			if (await commonPage.selectedLookupArrayData[i].getText() === nameOfLookup) {
				found = true
				break
			}
		}
		await expect(found).toEqual(true)
		await browser.pause(3000)
		if (checkOnSave) {
			await helper.selectSpecificMatOption(nameOfLookup)
			if (physicalDescription.includes(chosenLookup) || outfitDescription.includes(chosenLookup)) {
				await commonPage.stepHeaders[2].scrollIntoView()
				await privInfoPage.personPropertyTable[1].click()
				await browser.pause(3000)
				await commonPage.personDescription[0].scrollIntoView()
				await browser.pause(3000)
				await helper.selectSpecificMatOption(nameOfLookup)
				await browser.pause(3000)
				await incidentPage.addPersonBtn.click()
				await browser.pause(3000)
			}
			await incidentPage.saveAndContinueBtn.click()
		}
		if (found) {
			isValid = true
		}
		return isValid

	}
}

module.exports = new UserModule()

