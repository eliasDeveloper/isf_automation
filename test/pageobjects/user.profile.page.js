const translator = require('../utilities/page-translator.json')

class userProfile {
	get logoutBtn() { return $(`span=${translator.user_profile.logout}`) }
	get dropDownTexts(){return $$('div > mat-card > form > div > app-single-selection > mat-form-field > div > div> div >mat-select > div > div > span > span')}
	get siteBranchSelector(){return $$('div > mat-card > form > div > app-single-selection > mat-form-field > div > div > div > mat-select > div > div')}
	get userProfileTabs(){return $$('mat-tab-header > div  > div > div > div')}
	get userProfileTabsText(){return $$('mat-tab-header > div  > div > div > div > div')}
	get saveAndExitBtn() { return $(`span=${translator.user_profile.save_and_exit}`)}
	get searchDropDownField(){return $('div > mat-card > form > div> button')}
	get sitesOptions(){return $$('div> div> mat-option')}
	
}

module.exports = new userProfile()