const incidentPage = require('./incident.page')

class MapPage {
	get map() { return $('#map') }
	get fenixLogo() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > mat-toolbar > div:nth-child(2) > div.fenix-logo > img') }
	get isfLogo() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > mat-toolbar > div.isf-toolbar-section > img') }
	get isfGreetingMsg() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > mat-toolbar > div.isf-toolbar-section > div') }
	get userProfileButton() { return $('.user-image') }
	get notificationButton() { return $('mat-sidenav-container > mat-sidenav-content > mat-toolbar > div:nth-child(2) > div') }
	get colorMapButton() { return $('mat-sidenav-content > mat-toolbar > div:nth-child(2) > img') }
	get incidentCheckBoxButton() { return $('app-map:nth-child(2) > section > div > mat-checkbox > label > span > input') }
	get mapIcon() { return $('#linkMapModule') }
	get incidentChatIcon() { return $('#linkChatModule') }
	get incidentIcon() { return $('#linkIncidentModule') }
	get privilegedInfoIcon() { return $('#linkPrivModule') }
	get adminModuleIcon() { return $('#linkAdminModule') }
	get groupChatIcon() { return $('#linkGroupChatModule') }
	get problemReportIcon() { return $('#linkReportProblemModule') }
	get timeLineButton() { return $('div.mapTimelineBtn > button') }
	get zoomInMapButton() { return $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div > a.leaflet-control-zoom-in') }
	get zoomOutMapButton() { return $('#map > div.leaflet-control-container > div.leaflet-top.leaflet-left > div > a.leaflet-control-zoom-out') }
	get incidentList() { return $('.incidents-list-body') }
	get allIncidents() { return $$('div.incident-container') }
	get selectedIncidentNameField() { return $('.selected-incident div div:nth-of-type(2) div.incident-type') }
	get filterButton() { return $('body > app-root > app-home > mat-sidenav-container > mat-sidenav-content > div > button') }
	get filterContainer() { return $('.filter-body') }
	get filterIncidentNumberField() { return $('.filter-body div.incidents-type > div > mat-form-field > div > div > div:nth-of-type(3) > input') }
	get filterSearchButton() { return $('.filter-body > div.filter-div-btn > button') }
	get filterDeleteSearchButton() { return $('.filter-body > div.filter-div-btn > button:nth-of-type(2)') }
	get securityMeasuresIcon() { return $('mat-nav-list > app-side-menu-item:nth-child(10) > a > div') }
	get notificationListElements() { return $$('div.mat-menu-panel > div > div') }
	get notificationElementText() { return $$('div.notification-message') }
	get notificationModuleChatRef() { return $$('div.notification-item > div > div> span.linkObjectRef') }

	//selectors for patrol disconnection popup
	get disconnectionPopup() { return $$('mat-dialog-container') }
	get closeDisconnectionPopup() { return $$('app-alert > div:nth-child(3) > button') }

	//selector To notify another login has been made via same user credentials
	get alertSecondLoginPopup() { return $('mat-dialog-container') }
	get alertSecondLoginMessage() { return $('app-alert > h4') }

	//selectors for notifications popups
	get incidentNotificationsCloseAllBtn() { return $('ng-snotify > div.snotify.snotify-leftTop > ng-snotify-toast:nth-child(1) > div > ng-snotify-button > div > button:nth-child(1)') }
	get probReportNotificationsCloseAllBtn() { return $('ng-snotify > div.snotify.snotify-rightTop > ng-snotify-toast:nth-child(1) > div > ng-snotify-button > div > button:nth-child(1)') }

	async selectRandomIncidentAndAccessIt() {
		await helper.selectRandomIncidentFromIncidentList()
		await browser.pause(1500)
		await this.incidentIcon.click()
		await browser.pause(5000)
		await helper.waitForElementToBeDisplayed(incidentPage.incidentNumber, 25000)
	}
}

module.exports = new MapPage()