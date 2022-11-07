const translator = require('../../utilities/page-translator.json');
const helper = require('../../utilities/helper');
const chaiExpect = require('chai').expect;
class ManageSecurityMeasuresPage {
    get inputSecMeasDate() { return $('[formcontrolname="date"]')}
    get lookupFileType() { return $(`span=${translator.security_measures.documentType}`)}
    get btnAddIncident() { return $('html > body > div > div > div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body mat-card:nth-child(2) > mat-card-content > div > button.mat-focus-indicator.mat-raised-button')}
    get linkedIncidentArr() { return $$('app-link-incident-popup > div > div.table-view > app-data-table > div > div > table > tbody > tr > td > mat-checkbox')}
    get linkedIncidentFinishBtn() { return $('app-link-incident-popup > div > div > app-data-table > div > button')}
    get linkedIncidentNumb() { return $('html> body > div > div > div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body > div > mat-card > mat-card-content > div > mat-form-field > div > div > div > input')}
    get smStartDateBtn() { return $('#mat-tab-content-1-0 > div > mat-card:nth-child(3) > mat-card-content > div > div:nth-child(1) > mat-form-field > div > div > div> mat-datepicker-toggle > button')}
    get smSetDateBtn() { return $('html > body > div > div > div >ngx-mat-datetime-content > div > button')}
    get lookupImportanceScale() { return $(`span=${translator.security_measures.alertDegree}`) }
    get smFinishBtn() { return $('form > div > div > button')} 
    get SourcesTabBtn() { return $('mat-tab-group > mat-tab-header > div > div > div > div:nth-child(2)')}
    get addSourceBody() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-1')}
    get addSourceBtn() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-1 >  div > div > button')} 
    get addSourceBodyRow() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-1 > div > div > div.body')} 
    get sourceLookup() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-1 > div > div > div.body > div > div > div:nth-child(1) > app-single-selection')}
    get inputSourceType() { return $('[formcontrolname="sourceType"]')}
    get personsTabBtn() { return $('mat-tab-group > mat-tab-header > div > div > div > div:nth-child(3)')}
    get personsComponent() { return $('mat-tab-body > div > div > app-person-component')}
    get searchPersonsBtn() { return $('mat-tab-body > div > div:nth-child(2) > div > div:nth-child(1) > div > button')}
    get personsDialogContainer() { return $('mat-tab-body > div > div:nth-child(2) > div > div:nth-child(1) > div > button')}
    get personCheckboxArr() { return $$('html > body > div > div > div > mat-dialog-container > app-link-contact-popup > div > app-data-table > div > div > table > tbody > tr > td > mat-checkbox')}
    get personCompFinishBtn() { return $('html > body > div > div > div > mat-dialog-container > app-link-contact-popup > div > app-data-table > div > button')}
    get personCompTabBody() { return $('mat-tab-group > div > mat-tab-body#mat-tab-content-1-0')}  
    get inputPersonName() { return $('[formcontrolname="firstName"]')}
    get inputPersonLastName() { return $('[formcontrolname="lastName"]')}
    get personRow() { return $('html > body > div > div > div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body >  div > div > app-person-component > div >  div > app-data-table > div > div > table > tbody > tr')}
    get personsComponentAddBtn() { return $(`span=${translator.person.personal_information.add_person_btn}`) }
    get invitingPartyTabBtn() { return $('mat-tab-group > mat-tab-header > div > div > div > div:nth-child(4)')}
    get addInvitingPartyBtn() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-3 >  div > div > button')} 
    get addInvitingPartyBodyRow() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-3 > div > div > div.body')} 
    get invitingPartyLookup() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body > div > div > div.body > div > div > div:nth-child(1) > app-single-selection')}
    get lookupTargetClassification() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body > div > div > div.body > div > div > div:nth-child(4) > app-single-selection')}
    get lookupMissionType() { return $('mat-tab-body > div > div > app-single-selection:nth-child(4)')}
    get situationField() { return $('[formcontrolname="situation"]')}
    get measurePlan() { return $('mat-tab-body > div > div > mat-form-field > div > div > div > textarea')}
    get addPlanBtn() { return $('html > body > div > div > div > mat-dialog-container > app-measures-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body > div > mat-card > div > div > div > button')}
    get addPlanBody() { return $('html > body > div > div > div > mat-dialog-container > app-measures-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body > div > mat-card > mat-card-content')}
    get ideaLookup() { return $$('html > body > div > div > div > mat-dialog-container > app-measures-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body > div > mat-card > mat-card-content > div > div.body > div > div > div:nth-child(1) > app-single-selection')}
    get threatsMeasuresTabBtn() { return $('mat-tab-group > mat-tab-header > div > div > div > div:nth-child(5)')}
    get addThreatsMeasuresBtn() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-4 >  div > div > button')}
    get addThreatsMeasuresBodyRow() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-4 > div > div > div.body')}
    get threatsMeasuresLookup() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body > div > div > div.body > div > div > div:nth-child(1) > app-single-selection')}
    get measuresExpectedLookup() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body > div > div > div.body > div > div > div:nth-child(2) > app-single-selection')}
    get measuresThreatLookup() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body > div > div > div.body > div > div > div:nth-child(3) > app-single-selection')}
    get addMeasuresBtn() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-4 >  div > div:nth-child(3) > button')}
    get addMeasuresBodyRow() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-4 > div > div:nth-child(4) > div.body')}
    get measuresInput() { return $('[formcontrolname="arrangement"]')}
    get informationTabBtn() { return $('mat-tab-group > mat-tab-header > div > div > div > div:nth-child(6)')}
    get addInformationBtn() { return $('html > body > div > div >  div > mat-dialog-container > app-situation-security-measures-dialog > form > div > mat-tab-group > div > mat-tab-body#mat-tab-content-1-5 >  div > div > button')}
    get informationInput() { return $('[formcontrolname="information"]')}
    get sourceInfoInput() { return $('[formcontrolname="sourceInfo"]')}
    
    // Selects a person randomly from person quick search popup
    async selectRandomPerson() {
       let  personRow = await this.personRow.isExisting();
		// In case Person was not added for missing required fields other than first name, choose another one
		while (!personRow) { 
			await this.personsComponent.scrollIntoView();
			await this.searchPersonsBtn.click();
			await helper.WaitBrowserToFinishLoading(5000);
			await helper.waitForElementToBeDisplayed(this.personsDialogContainer, 5000);
			while (await this.personCheckboxArr.length == 0) {
				await browser.pause(1000);
			}
			let personFirstName = '';
			// If first Name is empty select another one
			while (personFirstName == '' ) {
				personFirstName = await helper.selectRandomlySMAndReturnSerialNum(await this.personCheckboxArr, 'person');
			}
			await this.personCompFinishBtn.click();
			await helper.WaitBrowserToFinishLoading(10000);
			await helper.waitForElementToBeDisplayed(this.personCompTabBody, 10000);
			await browser.pause(3000);
			await chaiExpect((await this.inputPersonName.getValue()).trim()).to.equal(personFirstName);
			await this.personsComponentAddBtn.click();
			personRow = await this.personRow.isExisting();
		}
    }
}

module.exports = new ManageSecurityMeasuresPage()