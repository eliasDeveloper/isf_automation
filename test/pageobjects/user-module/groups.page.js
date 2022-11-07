
class GroupsPage{
    get addGroupButton(){return $('div > div.add-view > button')}
    get searchInput(){return $('siren-table > div  div > div> input')}
    get groupsTable (){return $$('table > tbody')}
    get groupsTableRow(){return $$('table > tbody > tr > td')}
    get groupsTableRowMatIcon(){return $$('table > tbody > tr > td > div > mat-icon')}
    get detailedViewToggleButton(){return $('div >mat-slide-toggle > label > span')}

    //inside the group page
    get name(){return $('[formcontrolname="name"]')}//required
    get description(){return $('[formcontrolname="descrip"]')}
    get userRole(){return $('div > mat-select')}
    get context(){return $('[formcontrolname="dashboardContext"]')}
    get sharedObjectModificationPeriod(){return $('[formcontrolname="sharedObjectModifPeriod"]')}
    get saveButton(){return $('button.forms-positive-action-btn.search-btn')}

    ///////////////////////////////////Main Checkboxes //////////////////////////////////////
    get allowSharedModificationObjectCheckbox(){return $$('span.mat-checkbox-inner-container')[3]}
    get allowSharedModificationObjectInputAttribute() {return $$("[type = checkbox]")[3]}

    //////////////////////////////////Web Modules ////////////////////////////////////////////
    get webModulesTab() { return $$('mat-tab-header > div > div > div > div')[1]}
    get editWebModuleButton(){return $$('table > tbody > tr > td > mat-icon')}
    get webModulesDropDown(){return $$('mat-select > div > div > span')}
    get webModuleDropdownOptions(){return $$('div > mat-option')}
    get saveWebModuleChanges(){return $$('td > div > div:nth-child(2) > button')[0]}
    get saveAllChanges(){return $$('mat-tab-body div > div > div > button')[0]}
    get webModules() { return $$('tbody > tr > td.cdk-column-moduleName > span')}
    get requiredFields(){return $$('mat-form-field.mat-form-field-invalid')}
}
module.exports = new GroupsPage()