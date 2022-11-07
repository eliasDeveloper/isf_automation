class UserTitles{
    get addTitleButton(){return $('section.add-btn > div > button')}
    get addTitleButtonText(){return $('section.add-btn > div > span')}
    get searchInput(){return $('mat-form-field > div > div> div > input')}
    get titlesTable(){return $('div > table')}
    get titlesTableRows(){return $$('tr > td.cdk-column-name')}
    get editButton(){return $$('tbody > tr > td.openSans > mat-icon')}
    get requiredFields(){return $$('mat-form-field.mat-form-field-invalid')}
    get saveButton(){return $('td > div > div > button.save-button')}
    get name(){return $('[formcontrolname="name"]')}
    get randomClickOnWeb() { return $("body") }

}
module.exports = new UserTitles()