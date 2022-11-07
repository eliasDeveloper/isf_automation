const appSettings = require('../utilities/app-settings.json');
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {

	async open(path) {
		await browser.url(`${appSettings.base_url}/${path}`);
	}
}