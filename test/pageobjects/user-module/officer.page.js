
class OfficerPage{
    get randomClickOnWeb(){return $("body")}

    //officers main page
    get addOfficerButton(){return $('section.add-btn > div > button')}
    get searchInput(){return $('siren-table > div  div > div> input')}
    get filter(){return $('section> div > div > button > span > mat-icon')}
    get officersTable (){return $('table > tbody > tr')}
    get officersTableRow(){return $$('table > tbody > tr > td')}
    get fullNameFromTable(){return $$('table > tbody > tr > td.cdk-column-fullName.mat-column-fullName')}
    

    //officers edit page
    get syncButton(){$('div.person-container > button')}
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    get name(){return $('[formcontrolname="firstName"]')}//required
    get lName(){return $('[formcontrolname="lastName"]')} //required
    get fatherName(){return $('[formcontrolname="fatherName"]')}
    get motherName(){return $('[formcontrolname="motherName"]')}
    get motherLName(){return $('[formcontrolname="motherLastName"]')}
    get militaryIDNumber(){return $$('[formcontrolname="militaryIDNumber"]')[0]}
    get gender(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[0]}
    get role(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[1]}
    get rank(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[2]}
    get militaryPoste(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[3]}//required
    get centerOfServiceOptions(){return $$('div > div > mat-option > span')} //required
    get bloodType(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[4]}
    get maritalStatus(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[5]}
    get healthCondition(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[6]}
    get unrestrictedData(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[7]}
    get checkDateButton(){return $('ngx-mat-datetime-content > div > button')}
    get increaseTimeButton(){return $('tbody > tr:nth-child(1) > td:nth-child(3) > button > span > mat-icon')}
    get fromDate(){return $$('mat-datepicker-toggle > button')[0]}
    get toDate(){return $$('mat-datepicker-toggle > button')[1]}
    get dateOfBirth(){return $$('mat-datepicker-toggle > button')[2]}
    get educationalLevel(){return $('[formcontrolname="educationalLevel"]')}
    get mailBox(){return $('[formcontrolname="pobox"]')}
    get emailAddress(){return $('[formcontrolname="email"]')}
    get phoneNumbers(){return $$('div > div> div.card-header-right-section > button')[0]}
    get phoneNumber(){return $('[formcontrolname="number"]')}
    get phoneType(){return $(`span=${translator.person.personal_information.phone_type}`)}
    get insuranceType(){return $(`span=${translator.person.personal_information.insurance_type}`)}
    get healthInsurance(){return $$('div > div> div.card-header-right-section > button')[1]}
    get addresses(){return $$('div > div> div.card-header-right-section > button')[2]}
    get address(){return $('[formcontrolname="display"]')}
    get professions(){return $$('div > div> div.card-header-right-section > button')[3]}
    get profession(){return $(`span=${translator.person.personal_information.profession}`)}
    get identificationPapers(){return $$('div:nth-child(2) > div> div.card-header-right-section > button')[2]}
    get recordNumber(){return $('[formcontrolname="sejelNo"]')}
    get docGender(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[9]}//required
    get nationality(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[10]}
    get livingAddress(){return $$('mat-form-field > div > div > div>mat-select.mat-select')[11]}
    get addOfficer(){return $$('app-add-officer > div.form-footer-btns-container > button')[0]}
    get requiredFields(){return $$('mat-form-field.mat-form-field-invalid')}

    get appLinkPopUp(){return $('mat-dialog-container > app-link-contact-popup')}
    get appLinkPopUpClose(){return $('mat-dialog-container > app-link-contact-popup > div > div > mat-icon')}
    get appLinkPopUpInput(){return $('app-siren-table-wrapper > div mat-form-field > div > div > div > input')}
    get appLinkPopUpTable(){return $('app-siren-table-wrapper > div > siren-table > div > div > table > tbody > tr')}
    get appLinkPopUpTableRow(){return $('app-siren-table-wrapper  table > tbody > tr > td')}
    get appLinkPopUpCheckbox(){return $('app-siren-table-wrapper  div > div > table > tbody > tr > td > mat-checkbox > label')}
    get appLinkPopUpDoneBtn(){return $('app-siren-table-wrapper  div.submit-container> button')}

    get appAlert(){return $('app-alert')}
    get appAlertText(){return $('app-alert > h4')}
    get appAlertClose(){return $('app-alert > div > mat-icon')}
    get appAlertButton(){return $('app-alert > div > button')}


}

module.exports = new OfficerPage()