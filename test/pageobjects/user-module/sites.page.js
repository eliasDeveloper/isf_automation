
class SitePage{
    get addSiteButton () { return $('app-table-site > div > div > section > div > button')}
    get searchInput(){return $('app-table-site div > div > mat-form-field > div > div> div > input')}
    get sitesNestedTree(){return $('mat-tree > mat-nested-tree-node')}
    get sitesNestedTreePartyInCharge (){return $('mat-tree > mat-nested-tree-node > div > span')}
    get sitesNestedTreeAddedSite(){return $$('mat-tree > mat-nested-tree-node > div > mat-tree-node > div > span')}
    get siteFromNestedTreeElement(){return $(`span=sitename2`)}
    get siteName (){return $('[formcontrolname="name"]')}
    get siteDescription (){return $('[formcontrolname="description"]')}
    get siteTransactionSource (){return $('[formcontrolname="transactionPrefix"]')}
    get partyInCharge(){return $$('mat-form-field > div mat-select.mat-select')[0]}
    get post(){return $$('mat-form-field > div mat-select.mat-select')[1]}
    get company(){return $$('mat-form-field > div mat-select.mat-select')[2]}
    get requiredFields(){return $$('mat-form-field.mat-form-field-invalid')}
    get saveAndSubmit (){return $('[type="submit"]')}
    get sitesTabs(){return $$('mat-tab-group > mat-tab-header > div > div > div > div')}

    //////////////////////////////Users Tab /////////////////////////////////////////////
    get addUser(){return $$('div > section > div > button')[1]}
    get appEditableDataTable (){return $('app-editable-data-table')}
    get editButton(){return $$('tbody > tr > td.mat-cell.cdk-cell.openSans> mat-icon')[0]}
    get deleteButton(){return $$('tbody > tr > td.mat-cell.cdk-cell.openSans> mat-icon')[1]}
    get userDropDown(){return $$('div > mat-select')[0]}
    get nickname(){return $$('div > mat-select')[1]}
    get firstOptionOfDropdown(){return $$('div > mat-option')[1]}
    get saveButton(){return $$('td> div > div:nth-child(2) > button')[0]}
    get cancelButton(){return $$('td> div > div:nth-child(2) > button')[1]}
    get nicknameTableData(){return $$('td.cdk-column-title')}

    //////////////////////////////Transaction Rights Tab ///////////////////////////////
    get addTransactionRightsButton(){return $$('div > section > div > button')[1]}
    get transactions(){return $(`span=${translator.site.add_site.transaction}`)}
    get rightLevel(){return $(`span=${translator.site.add_site.right_level}`)}
    get rightLevelTableData(){return $$('td.mat-column-rightLevel')}
    get userTitleSearch(){return $('span > ngx-mat-select-search > div > input')}
    get userTitle(){return $(`span=${translator.user.add_user.title}`)}
}
module.exports = new SitePage()