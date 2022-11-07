const translator = require('../utilities/page-translator.json')

class IncidentPage {
	//selector on incident main page
	get incidentDropdownElements() { return $$('mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-infix > mat-select') }


	// selectors on linked records page
	get toolbar() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > app-incident > app-add-incident > div > div.form-stepper-section > form > mat-horizontal-stepper > div.mat-horizontal-stepper-header-container.ng-star-inserted') }
	get incidentNumber() { return $('div.card-header-left-section > span:nth-child(2)') }
	get incidentDateField() { return $('#startDate > div > div.mat-form-field-flex> div.mat-form-field-infix > input') }
	get newIncidentButton() { return $('mat-sidenav-container > mat-sidenav-content > div > app-incident > app-add-incident > section > div > button') }
	get newIncidentContainerMessage() { return $('app-add-incident > section > div > span') }
	get requiredFieldsErrorMsg() { return $$('mat-error.mat-error') }
	get incidentLocationField() { return $('[formcontrolname="display"]') }
	get incidentLocationContainer() { return $('mat-dialog-container') }
	get streetFieldIncidentLocation() { return $$('div > div.mat-select-arrow-wrapper') }
	get dateSelectorButton() { return $('.mat-datepicker-toggle-default-icon.ng-star-inserted') }
	get calendarContainer() { return $('ngx-mat-calendar') }
	get allMonthDays() { return $$('[role="gridcell"]') }
	get approveCalendarSelectionBtn() { return $('ngx-mat-datetime-content > div.actions.ng-star-inserted > button') }
	get incidentTypeField() { return $(`span=${translator.incident.add_incident.incident_type}`) }
	get incidentMethodUsedField() { return $(`span=${translator.filter.procedure}`) }
	get incidentDescriptionField() { return $('[formcontrolname="description"]') }
	get importanceLevelBtn() { return $$('.selection-box.full-width.ng-star-inserted') }
	get wasikaTypeField() { return $(`span=${translator.incident.add_incident.type_of_document}`) }
	get involvedPieceField() { return $(`span=${translator.incident.add_incident.concerned_station}`) }
	get addLinkedIncidentBtn() { return $('mat-card:nth-child(4) > mat-card-content > button') }
	get linkedIncidentTable() { return $('app-editable-data-table') }
	get rowsOfLinkedIncidents() { return $$('app-editable-data-table > div > table > tbody > tr.element-row') }
	get saveAndContinueBtn() { return $(`span=${translator.incident.add_incident.save_submit}`) }
	get internalMessageBtn() { return $('app-chat-message-overlay > button') }
	get internalChatTextArea() { return $('#chatTextArea') }
	get sendButtonInternalMessage() { return $('#cdk-overlay-0 > div > button') }

	//New incident notifications selectors
	get incidentNotificationContainer() { return $('body > app-root > ng-snotify > div.snotify.snotify-leftTop') }
	get incidentNotificationType() { return $('body > app-root > ng-snotify > div.snotify.snotify-leftTop.ng-star-inserted > ng-snotify-toast > div > div > div > div > div.title') }
	get incidentNotificationCloseAllBtn() { return $('ng-snotify-button > div > button:nth-child(1)') }

	// selectors on incident location popup
	get searchBtnInputFieldsTrigger() { return $('app-location-search > form > div > div> div > button') }
	get streetField() { return $$(`span=${translator.filter.street}`)[2] }
	get chooseLocationBtn() { return $(`span=${translator.filter.choose}`) }

	//selectors on link incident popup
	get linkedIncidentContainer() { return $('mat-dialog-container') }
	get linkedIncidentsCheckBox() { return $$('label > span.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin') }
	get submitLinkedIncidents() { return $('app-link-incident-popup > div > app-siren-table-wrapper > div > div > button') }

	//selectors for quick add person
	get addPeopleQuickAddBtn() { return $('mat-card:nth-child(6) > mat-card-content > button') }
	get searchPersonBtn() { return $('mat-card:nth-child(6) > mat-card-content > button.search-btns') }
	get personsTable() { return $('app-link-contact-popup > div > siren-table') }
	get nickName() { return $$('[formcontrolname="epithet"]') }
	get firstName() { return $$('[formcontrolname="firstName"]') }
	get lastName() { return $$('[formcontrolname="lastName"]') }
	get fatherName() { return $$('[formcontrolname="fatherName"]') }
	get deleteBtnPaperWork() { return $('app-person-quick-adding-banner > app-single-person-quick-adding > form > div > div > div > div > div > button > span.mat-button-wrapper > mat-icon') }
	get identityPaperType() { return $$(`span=${translator.person.personal_information.id_paper_type}`) }
	get sexFields() { return $$('mat-select.mat-select.ng-star-inserted > div.mat-select-trigger > div.mat-select-value > span.mat-select-value-text') }

	//selectors from quick add person container popup
	get peopleContainer() { return $('app-link-contact-popup > div') }
	get peopleOptions() { return $$('label > span.mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin') }
	get submitPeopleOptionBtn() { return $('app-link-contact-popup > div > app-siren-table-wrapper > div > div > button') }

	//selectors in people tab
	get peopleTabBtn() { return $$('[role="tab"]')[1] }
	get peopleTableContainer() { return $('mat-card > div > div > siren-table') }
	get addPersonBtn() { return $(`span=${translator.person.personal_information.add_person_btn}`) }
	get personInfoSection() { return $('div > div:nth-child(2) > div:nth-child(1) > div.forms-off-white-section') }
	get nickNameTableData() { return $$('tbody > tr > td.siren-table-cell.mat-column-title') }
	get personNameTableData() { return $$('tbody > tr > td.mat-column-theDefinition') }
	get personTabs() { return $$('app-person-component > div > div > form > mat-tab-group > mat-tab-header > div > div > div > div') }
	get appConfirmDialog() { return $('app-confirm-dialog') }
	get confirmUnsavedChanges() { return $(`span=${translator.common.yes}`) }
	get incidentIdentificationPapers() { return $('div > div:nth-child(2) > div.forms-off-white-section > div > div > div > div > div:nth-child(1) > app-single-selection') }
	get incidentIdentificationPapersDropDowns() { return $$('div > div > div > div > div > div > app-single-selection > mat-form-field > div > div > div > mat-select') }
	//selectors for quick add object
	get quickAddObjectType() { return $('mat-card:nth-child(7) > mat-card-content > button') }
	get addObjectOption() { return $(`span=${translator.quick_adding_object.type}`) }
	get propertyOwnerField() { return $$(`span=${translator.quick_adding_object.owner}`) }
	get crimeMethodField() { return $$(`span=${translator.quick_adding_object.crime}`) }
	get searchBtn() { return $('app-single-object-quick-adding > form > div > button.search-btns') }

	//selectors in property popup vehicles
	get propertyContainer() { return $('app-link-vehicle-popup > div') }
	get propertyOptionsCheckBox() { return $$('app-link-vehicle-popup > div > app-siren-table-wrapper > div > siren-table > div:nth-child(2) > div > table > tbody > tr > td > mat-checkbox') }
	get propertyOptions() { return $$('app-link-vehicle-popup > div > app-siren-table-wrapper > div > siren-table > div:nth-child(2) > div > table > tbody > tr') }
	get propertySerialNum() { return $$('app-link-vehicle-popup > div >app-siren-table-wrapper > div > siren-table> div:nth-child(2) > div > table > tbody > tr > td:nth-child(2)') }
	get referenceNumField() { return $('[formcontrolname="ref"]') }
	get searchPropertyOptionBtn() { return $('app-link-vehicle-popup > div > form > div> button.mat-focus-indicator.forms-positive-action-btn.search-btn') }
	get endSearchPropertyBtn() { return $('app-link-vehicle-popup > div > app-siren-table-wrapper > div > div > button') }
	get noDataField() { return $('app-link-vehicle-popup > div > app-siren-table-wrapper > div > siren-table > div:nth-child(2)') }
	get closeObjectPopup() { return $('app-link-vehicle-popup > div > div > mat-icon') }
	get closePopupBtn() { return $('app-link-vehicle-popup > div > div > mat-icon') }

	//selectors in weapons property popup
	get weaponOptions() { return $$('app-link-weapon-popup > div > app-siren-table-wrapper > div > siren-table > div:nth-child(2) > div > table > tbody > tr') }
	get weaponOptionsCheckBox() { return $$('app-link-weapon-popup > div > app-siren-table-wrapper > div > siren-table > div:nth-child(2) > div > table > tbody > tr > td > mat-checkbox') }
	get endSearchWeaponBtn() { return $('app-link-weapon-popup > div > app-siren-table-wrapper > div > div > button') }
	get noDataWeaponField() { return $('app-link-weapon-popup > div > app-siren-table-wrapper > div > siren-table > div:nth-child(2)') }
	get weaponSerialNum() { return $$('app-link-weapon-popup > div > app-siren-table-wrapper > div > siren-table  > div:nth-child(2) > div > table > tbody > tr > td:nth-child(2)') }
	get closeWeaponPopupBtn() { return $('app-link-weapon-popup > div > div > mat-icon') }

	//selectors in property tab
	get propertyTable() { return $('#objects') }
	get propertyTypeTd() { return $('tbody > tr > td.mat-cell.siren-table-cell.cdk-column-propertyTypeName') }
	get propertyOwnerTd() { return $('tbody > tr > td.mat-cell.siren-table-cell.cdk-column-incidentPersonName.mat-column-incidentPersonName') }
	get propertyCrimeTd() { return $('tbody > tr > td.mat-cell.siren-table-cell.cdk-column-incident2Type.mat-column-incident2Type') }
	get searchBtnInPropertySec() { return $('mat-card > div:nth-child(4) > div.forms-off-white-section.ng-star-inserted > div > div:nth-child(1) > button') }
	get addPropertyBtn() { return $('app-add-incident > div > div.form-stepper-section > div > form > div:nth-child(1) > div.form-footer-btns-container > button.forms-positive-action-btn') }
	get discardPropertyBtn() { return $('app-add-incident > div > div.form-stepper-section > div > form > div:nth-child(1) > div.form-footer-btns-container > button.forms-negative-action-btn') }
	get serialNumInputField() { return $('[formcontrolname="ref"]') }
	get saveAllIncidentBtn() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > app-incident > app-add-incident > div > div.form-stepper-section > form > div.form-footer-btns-container.ng-untouched.ng-pristine.ng-valid > div:nth-child(2) > button') }

	//selectors for attachment btns 
	get incidentAttachmentBtn() { return $('mat-card-header > div.forms-card-header-container > div.card-header-left-section > button.attach-btns') }
	get incidentAttachmentBadge() { return $('mat-card-header > div.forms-card-header-container > div.card-header-left-section > button.attach-btns > span:nth-child(4)') }
	get dropFile() { return $('#dropContainer > input') }
	get saveFile() { return $('app-link-attachment-popup > div > form > button') }
	get firstRowOfContactsTable() { return $('mat-card > div.ng-star-inserted > app-data-table > div.table-paginator-container > div > table > tbody > tr.mat-row.cdk-row.element-row.ng-star-inserted') }
	get contactsAttachmentBtn() { return $('div > mat-card-content > div.margin-top-10 > button') }
	get contactsAttachmentBadge() { return $('div > mat-card-content > div.margin-top-10 > button > span:nth-child(4)') }

	get firstRowOfObjectsTable() { return $('#objects > div.table-paginator-container > div > table > tbody > tr:nth-child(1)') }
	get objectsAttachmentBtn() { return $(' mat-card > div.forms-card > div > button') }
	get objectAttachmentBadge() { return $(' mat-card > div.forms-card > div > button > span:nth-child(4)') }

	async selectRandomVehicleWeapons(arr, vehicle = true) {
		let num = await arr.length
		let randomNum = Math.floor(Math.random() * num)
		while (randomNum === 0) {
			randomNum = Math.floor(Math.random() * num)
		}
		await arr[randomNum].click()
		if (vehicle) {
			return this.propertySerialNum[randomNum].getText()
		}
		else {
			return this.weaponSerialNum[randomNum].getText()
		}

	}


}

module.exports = new IncidentPage()