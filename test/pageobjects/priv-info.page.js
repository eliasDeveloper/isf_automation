const mapPage = require('./main.map.page');
const translator = require('../utilities/page-translator.json')
const incidentPage = require('./incident.page');
const subject = 'The subject of the Privileged Information by Elias Automation Master'
const arrayOfSites = [translator.site_names.beirut_police, translator.site_names.gendarmerie_command, translator.site_names.car_power_unit, translator.site_names.embassies_security_unit, translator.site_names.judicial_police_unit];

class PrivInfoClass {
	//general section inside Privileged information
	get greetingSpan() { return $('div > section > div > span') }

	//inside priv info main page
	get addDocumentBtn() { return $('section button.add-incident-btn') }
	get documentsTable() { return $('div > div > siren-table') }
	get documentsTableIcons() { return $$('tr > td > mat-icon') }
	get documentsTab() { return $$('mat-tab-header > div  > div > div > div') }
	get documentsTabTexts() { return $$('mat-tab-header > div  > div > div > div > div') }
	get rowsofPrivInfoTable() { return $$('tbody > tr') }
	get serialNumbersFromTable() { return $$('tr > td.cdk-column-code>span') }
	get subjectsFromTable() { return $$('tr > td.cdk-cell.cdk-column-information> span') }
	get dataFromPendingDocsTable() { return $$('tr> td.mat-cell.cdk-cell > span') }
	get toggleButtons() { return $$('tr > td> div > button > span') }
	get insideAllToggledBtnText() { return $$('div.cdk-overlay-connected-position-bounding-box span') }
	get insideAllToggledBtnIcon() { return $$('div.cdk-overlay-connected-position-bounding-box mat-icon') }
	get randomClickOnWeb() { return $("body") }
	get searchFieldForTable() { return $('siren-table >div > mat-form-field input') }
	get noPendingDocsDataTable() { return $('siren-table > div.ng-star-inserted') }
	get addDocumentText() { return $('section > div > span') }
	get uploadButton() { return $('button.mat-menu-trigger') }
	get filterButton() { return $('button.open-filter-btn') }
	get searchInput() { return $('siren-table > div div > input') }
	get noDataTextFromPendingDocs() { return $$('siren-table > div')[1] }


	// inside the created priv info
	get subjectOfPrivInfo() { return $('[formcontrolname=information]') }
	get serialNumberOfCreatedPrivInfo() { return $('[formcontrolname="code"]') }
	get sendDocument() { return $(`span=${translator.privileged_information.add_privilged_information.transfer_btn}`) }
	get internalTransferButton() { return $(`button=${translator.privileged_information.add_privilged_information.internal_transfer}`) }
	get externalTransferButton() { return $(`button=${translator.privileged_information.add_privilged_information.external_transfer}`) }
	get documentCorrespondence() { return $(`span=${translator.privileged_information.add_privilged_information.linked_transfers}`) }
	get documentCorrespondenceDataTable() { return $('mat-card-content > siren-table') }
	get deleteBtnInLinkedTransfers() { return $$('tbody > tr > td.mat-cell.cdk-cell > div > button') }
	get elementsInLinkedTransfersTable() { return $$('tbody > tr > td.mat-cell > span') }
	get acceptIconOfCreatedPrivInfos() { return $$('tbody > tr > td.siren-table-cell > mat-icon') }
	get transferTarget() { return $$('tbody > tr > td.mat-column-transferTarget > span') }

	get addIncidentTypeBtn() { return $('#ekhbareye > button')}
	get eventType(){return $('#incidentType > mat-form-field > div > div > div > mat-select')}
	get reminderBtn () { return $('div > mat-card > mat-card-content > div > mat-card > mat-card-header > div > div > button')}
	get reminderSelectBtn (){return $('#dateTime > div > mat-form-field mat-datepicker-toggle > button')}
	get reminderTimeIncreaseBtn() { return $('tr:nth-child(1) > td:nth-child(3) > button > span > mat-icon')}
	get reminderConfirmTime(){return $('ngx-mat-datetime-content > div.actions > button')}
	get appReminderDialog(){return $('app-reminder-dialog > div > mat-card')}
	get appReminderHeader(){return $('app-reminder-dialog > div > mat-card > mat-card-content > mat-card > mat-card-header > div > div > mat-card-title > span')}
	get appReminderSubject(){return $('app-reminder-dialog > div > mat-card > mat-card-content > mat-card > mat-card-content > div > div.reminder-details > div:nth-child(3)')}
	get appReminderDeleteBtn(){return $('app-reminder-dialog > div > mat-card > mat-card-content > mat-card > mat-card-content > div > div.reminder-action > button')}
	get addPersonQuickBtn(){return $('mat-card-content > mat-card:nth-child(4) > mat-card-header > div.forms-card-header-container > div > button')}
	get addPersonFromList(){return $('mat-card.mat-card.mat-focus-indicator.forms-card > mat-card-content > mat-card:nth-child(4) > mat-card-content > div:nth-child(2) > button')}
	get choosePersonFromList(){return $$('label > span.mat-checkbox-inner-container-no-side-margin')}
	get doneFromChoosingPerson(){return $('app-siren-table-wrapper > div > div  button')}
	get personInfoSectionInPersonTab(){return $('div > mat-card-content > div > div:nth-child(1) > div.forms-off-white-section')}
	get personHealthCondition(){return $('div:nth-child(1) > div:nth-child(2) > div > app-single-selection:nth-child(4) > mat-form-field > div > div > div > mat-select')}
	get urgent(){return $('[formcontrolname="urgent"]')}
	get sourceSection(){return $('mat-drawer-content div > div mat-card > mat-card-header > div.forms-card-header-container  mat-card-title')}
	get papersSection(){return $('app-single-person-quick-adding > form > div> div:nth-child(2) > div.forms-subtitle')}
	get typeOfDoc (){ return $(`span=${translator.person.personal_information.id_paper_type}`)}
	get propertiesQuickAddBtn(){return $('mat-card-content > mat-card:nth-child(5) > mat-card-header button')}

	get addObjectOption() { return $(`span=${translator.quick_adding_object.type}`) }
	get propertyOwnerField() { return $$(`span=${translator.quick_adding_object.owner}`) }
	get crimeMethodField() { return $$(`span=${translator.quick_adding_object.crime}`) }
	//inside the person tab in the created priv info
	get personPropertyTable(){return $$('tr > td')}
	get personTabs(){return $$('mat-card > mat-tab-group > mat-tab-header > div > div > div > div')}
	//get addPersonBtn(){return (`span = ${translator.person.personal_information.add_person_btn}`)}
	get addPersonBtn() { return $('div.form-footer-btns-container > div > button.forms-positive-action-btn> span.mat-button-wrapper') }
	get appAlert() { return $('app-alert') }
	get appAlertText() { return $('app-alert > h4') }
	get appAlertClose() { return $('app-alert > div > mat-icon') }


	////////////////////////////////////////////////////////////////////////////****************************************************************************** */
	//inside the pending documents tab
	get acceptSendDocumentButton() { return $$('tbody > tr > td > button > span > mat-icon') }

	//inside the follow-up operations
	get tooltipAddOppBtn() { return $('div > section > div > button') }
	get tooltipAddOppBtnText() { return $('section > div >span') }
	get searchAndClearSearchButtons() { return $$('div > form > div > div > button') }
	get followUpOperationsPopUpTitle() { return $('form > div > div > div > span') }
	get ekhabryeCodeInFollowUpOperations() { return $$('tbody > tr > td.cdk-cell.mat-column-ekhbaryeCode> span') }
	get saveRegenerateAddButtons() { return $$('app-operation-follow-up > div > form > div > button') }
	get datePicker() { return $('form > div > mat-form-field > div > div > div > mat-datepicker-toggle > button') }
	get datePickerSelectToday() { return $('table > tbody > tr > td> button > div.mat-calendar-body-today') }
	get followUpConfirmDialog() { return $('app-confirm-dialog') }
	get confirmEditFollowUpOperation() { return $(`span=${translator.common.yes}`) }
	//

	//police sites
	get sitesOptions() { return $$('span.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin') }
	get sitesNames() { return $$('tbody > tr> td.cdk-column-name > span') }
	get sitesDataTable() { return $('div > siren-table >div >div >table') }
	get noSitesDataTableData() { return $('app-link-internal-wasika-transfer > div > siren-table > div.ng-star-inserted') }
	get closeSitesDataTable() { return $('app-link-internal-wasika-transfer >div > div > mat-icon') }
	get siteSelectionConfirmDialog() { return $('app-confirm-dialog') }
	get warnWasikaTransferCreationPopUp() { return $('app-confirm-dialog > h4') }
	get doneFromSelectingSite() { return $('div > siren-table > div > button') }
	get confirmPoliceSiteSelection() { return $(`span=${translator.common.yes}`) }

	// for attachments upload
	get privInfoNumberField() { return $('#code') }
	get searchFilterBtn() { return $('div > div > form > div > div > button.mat-focus-indicator.forms-positive-action-btn.search-btn.force-margin-right-10.mat-raised-button.mat-button-base') }
	get wasikaAttachmentBtn() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > app-privileged-information > app-add-priv-info > div > div.form-stepper-section > form > div.form-footer-btns-container.submit-footer > div.display-inline > button.mat-focus-indicator.mat-badge.margin-right-15.attach-btns.mat-mini-fab.mat-button-base.mat-accent.mat-badge-warn.mat-badge-overlap.mat-badge-above.mat-badge-before.mat-badge-small') }
	get wasikaAttachmentBadge() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > app-privileged-information > app-add-priv-info > div > div.form-stepper-section > form > div.form-footer-btns-container.submit-footer > div.display-inline > button.mat-focus-indicator.mat-badge.margin-right-15.attach-btns.mat-mini-fab.mat-button-base.mat-accent.mat-badge-warn.mat-badge-overlap.mat-badge-above.mat-badge-before.mat-badge-small > span:nth-child(4)') }
	get dropFile() { return $('#dropContainer > input') }
	get saveFile() { return $('app-link-attachment-popup > div > form > button') }
	get saveAndExitBtn() { return $(`span=${translator.privileged_information.add_privilged_information.save_and_exit}`) }
	get firstRowinContacts() { return $('#personsTable > div.table-paginator-container > div > table > tbody > tr') }
	get wasikaContactsAttachmentsBtn() { return $('div > mat-card-content > div.margin-top-15 > button') }
	get contactsAttachmentBadge() { return $('div > mat-card-content > div.margin-top-15 > button > span:nth-child(4)') }
	get firstRowObjects() { return $('#objectsTable > div.table-paginator-container > div > table > tbody > tr') }
	get wasikaObjectsAttachmentBtn() { return $('mat-card > div.forms-card> button') }
	get objectsAttachmentBadge() { return $('mat-card > div.forms-card> button > span:nth-child(4)') }


	async redirectToDocumentsList() {
		await helper.waitForElementToBeDisplayed(mapPage.privilegedInfoIcon, 20000);
		await mapPage.privilegedInfoIcon.click();
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.privileged_information.get_privileged_information_url}`);
		await expect(this.documentsTable).toBeDisplayed()
		await helper.waitForElementToBeDisplayed(this.greetingSpan, 20000);
	}

	async redirectToAddNewPrivilegeInfoSection() {
		await this.addDocumentBtn.click()
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.privileged_information.add_privileged_information_url}`)
	}
	async createNewPrivilegedInformation() {
		await browser.pause(3000)
		await this.subjectOfPrivInfo.setValue(subject)
		await expect(incidentPage.saveAndContinueBtn).toBeDisplayed()
		await incidentPage.saveAndContinueBtn.click()
		await browser.pause(4000)
		const linkOfCreatedPrivInfo = await browser.getUrl()
		await browser.pause(4000)
		const serialNumberOfCreatedPrivInfo = await this.serialNumberOfCreatedPrivInfo.getValue()
		let obj = {
			serialNumber: serialNumberOfCreatedPrivInfo,
			subject: subject,
			linkOfCreatedPrivInfo: linkOfCreatedPrivInfo,
		};
		await this.saveAndExitBtn.click()
		await browser.pause(4000)
		await expect(this.documentsTable).toBeDisplayed()
		return obj;
	}
	async sendDocumentAsTransfer(typeOfTransfer, multipleChoice, numChoice) {
		await expect(this.sendDocument).toBeDisplayed()
		await this.sendDocument.click()
		await expect(this.internalTransferButton).toBeDisplayed();
		await expect(this.externalTransferButton).toBeDisplayed();
		if (typeOfTransfer === "internal") {
			await this.internalTransferButton.click();
			await expect(this.sitesDataTable).toBeDisplayed();
			for (let i = 0; i < arrayOfSites.length; i++) {
				chaiExpect(await this.sitesNames[i].getText()).to.equal(arrayOfSites[i]);
			}
			if (multipleChoice === false) {
				//Expect to have the sites in arrayOfSites in the row:
				await this.sitesOptions[numChoice].click();
				await browser.pause(3000);
				await this.doneFromSelectingSite.click();
				await browser.pause(3000);
				await expect(this.warnWasikaTransferCreationPopUp).toBeDisplayed();
				await expect(this.siteSelectionConfirmDialog).toBeDisplayed();
				await browser.pause(3000);
				await this.confirmPoliceSiteSelection.click(); //click on yes btn
				chaiExpect(await this.documentCorrespondence.isExisting());
				await browser.pause(3000);
				chaiExpect(await this.documentCorrespondenceDataTable.isExisting()); //Expect to have a table created
				await browser.pause(3000)
				return [];
			}
			else if (multipleChoice === true) {
				await browser.pause(3000);
				const result = await this.selectRandomlyFromSitesArray(numChoice)
				await browser.pause(3000);
				await this.doneFromSelectingSite.click();
				await browser.pause(3000);
				await expect(this.warnWasikaTransferCreationPopUp).toBeDisplayed();
				await expect(this.siteSelectionConfirmDialog).toBeDisplayed();
				await browser.pause(3000);
				await this.confirmPoliceSiteSelection.click(); //click on yes btn
				await browser.pause(3000);
				chaiExpect(await this.documentCorrespondence.isExisting());
				await browser.pause(3000);
				chaiExpect(await this.documentCorrespondenceDataTable.isExisting()); //Expect to have a table created
				await browser.pause(3000)
				return result;
			}
		}
	}
	async getPendingDocumentsNumber(pendingDocsTabText) {
		pendingDocsTabText = await pendingDocsTabText.replace(translator.privileged_information.wasika.pendingList, '')
		pendingDocsTabText = await pendingDocsTabText.replace('(', '')
		pendingDocsTabText = await pendingDocsTabText.replace(')', '')
		const pendingDocumentsNumber = await parseInt(pendingDocsTabText)
		return pendingDocumentsNumber
	}
	async getSelectedTabAriaSelectionProperty(selectedTabIndex) {
		let isValid = false;
		if (selectedTabIndex === 0) {
			await expect(this.documentsTab[selectedTabIndex]).toHaveAttr('aria-selected', 'true')
			await expect(this.documentsTab[selectedTabIndex + 1]).toHaveAttr('aria-selected', 'false')
			await expect(this.documentsTab[selectedTabIndex + 2]).toHaveAttr('aria-selected', 'false')
			isValid = true
		}
		else if (selectedTabIndex === 1) {
			await expect(this.documentsTab[selectedTabIndex - 1]).toHaveAttr('aria-selected', 'false')
			await expect(this.documentsTab[selectedTabIndex]).toHaveAttr('aria-selected', 'true')
			await expect(this.documentsTab[selectedTabIndex + 1]).toHaveAttr('aria-selected', 'false')
			isValid = true
		}
		else if (selectedTabIndex === 2) {
			await expect(this.documentsTab[selectedTabIndex - 2]).toHaveAttr('aria-selected', 'false')
			await expect(this.documentsTab[selectedTabIndex - 1]).toHaveAttr('aria-selected', 'false')
			await expect(this.documentsTab[selectedTabIndex]).toHaveAttr('aria-selected', 'true')
			isValid = true
		}
		else {
			await expect(this.documentsTab[selectedTabIndex]).toHaveAttr('aria-selected', 'true')
		}
		return isValid

	}
	async selectRandomlyFromSitesArray(randomSelector) {
		let arrayOfSelectedSites = []
		let arrayOfRandomIntegers = []
		if (randomSelector === 0 || randomSelector === arrayOfSites.length) {
			await this.sitesOptions[0].click();
			for (let i = 0; i < arrayOfSites.length; i++) {
				const siteText = await this.sitesNames[i].getText()
				arrayOfSelectedSites.push(siteText);
			}
		}
		else {
			let i = 0;
			let randomInt = Math.floor(Math.random() * 6 + 1)
			await browser.pause(2000)
			while (i < randomSelector) {
				if (i > 0) {
					while (arrayOfRandomIntegers.includes(randomInt)) {
						randomInt = Math.floor(Math.random() * 5) + 1
					}
				}
				await this.sitesOptions[randomInt].click();
				const siteText = await this.sitesNames[randomInt - 1].getText()
				if (!arrayOfSelectedSites.includes(siteText)) {
					arrayOfSelectedSites.push(siteText);
				}
				if (!arrayOfSelectedSites.includes(randomInt)) {
					arrayOfRandomIntegers.push(randomInt);
				}
				i++;
			}
		}
		return arrayOfSelectedSites
	}
	async insertDocSerialNumber(serialNum) {
		await this.searchInput.click()
		await browser.pause(2000)
		const value = [...serialNum]
		for (let i = 0; i < value.length; i++) {
			await browser.keys(value[i])
			await browser.pause(500)
		}
	}
}

module.exports = new PrivInfoClass()