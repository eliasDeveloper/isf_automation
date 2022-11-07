
class ManageUserPage {
	get inputUsername() { return $('[formControlName="name"]') }
	get inputFullName() { return $('[formControlName="fullname"]') }
	get lookupGroup() { return $('form >div > app-single-selection > mat-form-field > div > div > div > mat-select') }
	get passwordStrength () { return $$('mat-password-strength-info > mat-card > mat-card-content > div > mat-icon')}
	get btnAddSite() { return $$('mat-card-content > button')[1] }
	get btnEditFirstSite() { return $(' tbody > tr > td > mat-icon') }
	get siteArea() { return $(`span=${translator.user.add_user.sites}`) }
	get siteTitle() { return $(`span=${translator.user.add_user.title}`) }
	get btnSaveSite() { return $('button.save-button') }
	get btnSubmit() { return $('[type="submit"]') }
	get alertDialgText() { return $('app-alert > h4') }
	get alertDialogClose(){return $('app-alert > div > mat-icon')}
	get inputPassword() { return $$(`[type=password]`)[0]}
	get inputConfirmPassword() { return $$(`[type=password]`)[1]}
	get requiredFields(){return $$('mat-form-field.mat-form-field-invalid')}
}

module.exports = new ManageUserPage()