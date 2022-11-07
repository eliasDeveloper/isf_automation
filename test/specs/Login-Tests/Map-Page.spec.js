const mapPage = require('../../pageobjects/main.map.page')
const timeLine = require('../../pageobjects/timeLine')
const translator = require('../../utilities/page-translator.json')

describe('check the functionality of all elements on the map page', async () => {
	it('should login successfully', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As a user I should be able to see a clean UI')
		allureReporter.addDescription('Should be able to reach the home page of HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('should check that all default setups are correct on map page', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As a user I should be able to see a clean UI')
		allureReporter.addDescription('Should be able to see default settings setup on map page')
		allureReporter.addSeverity('normal')
		await expect(mapPage.fenixLogo).toBeDisplayed()
		await expect(mapPage.fenixLogo).toHaveAttrContaining('src', 'assets/images/fenix-logo.svg')
		await expect(mapPage.isfLogo).toBeDisplayed()
		await expect(mapPage.isfLogo).toHaveAttrContaining('src', 'assets/images/isf-logo.svg')
		await expect(mapPage.isfGreetingMsg).toBeDisplayed()
		await expect(mapPage.isfGreetingMsg).toHaveText(translator.toolbar.title)
		helper.checkElementIsDisplayedAndClickable(mapPage.userProfileButton)
		helper.checkElementIsDisplayedAndClickable(mapPage.notificationButton)
		await expect(mapPage.colorMapButton).toHaveAttr('src', 'assets/images/dark-mode.svg')
		await expect(mapPage.incidentCheckBoxButton).toHaveAttr('aria-checked', 'true')
		await helper.checkElementIsDisplayedAndClickable(mapPage.mapIcon)
		// await expect(mapPage.mapIcon).toHaveAttrContaining('class', 'active-section')
		await helper.checkElementIsDisplayedAndClickable(mapPage.incidentChatIcon)
		await helper.checkElementIsDisplayedAndClickable(mapPage.incidentIcon)
		await helper.checkElementIsDisplayedAndClickable(mapPage.privilegedInfoIcon)
		// await helper.checkElementIsDisplayedAndClickable(mapPage.normalChatIcon)
		await helper.checkElementIsDisplayedAndClickable(mapPage.filterButton)
		await helper.checkElementIsDisplayedAndClickable(mapPage.timeLineButton)
		await helper.checkElementIsDisplayedAndClickable(mapPage.zoomInMapButton)
		await expect(mapPage.zoomOutMapButton).toBeDisplayed()
		await expect(mapPage.zoomOutMapButton).toHaveAttrContaining('class', 'leaflet-disabled')
		await expect(mapPage.incidentList).toBeDisplayed()
	});

	it('should click on the timeline button and check if it opens', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As a user I should be able to see a clean UI')
		allureReporter.addDescription('Should be able to open the timeline')
		allureReporter.addSeverity('minor')
		await mapPage.timeLineButton.click()
		await expect(timeLine.timeLineContainer).toBeDisplayed()
	});

	it('should check that default timeLine configurations are available', async () => {
		allureReporter.addFeature('Login')
		allureReporter.addStory('As a user I should be able to see a clean UI')
		allureReporter.addDescription('Should be able to see default settings of the timeline')
		allureReporter.addSeverity('minor')
		await helper.checkElementIsDisplayedAndClickable(timeLine.timeLineExpandCollapseButton)
		await helper.checkElementIsDisplayedAndClickable(timeLine.timeLineOptionsButton)
		await timeLine.timeLineOptionsButton.click()
		await expect(timeLine.timeLineDescriptionContainer).toHaveText(translator.timeline.note1)
		await expect(timeLine.timeLineDetailedPresentationButton).toHaveAttr('aria-checked', 'false')
		await expect(timeLine.timeLineDetailedPresentationButtonText).toHaveText(translator.timeline.detailedView)
	});
});
