const mapPage = require('../../pageobjects/main.map.page')
const incidentPage = require('../../pageobjects/incident.page')

describe('check the side filter functionality is working', async () => {
	it('should Login successfully', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to filter for a specific Incident')
		allureReporter.addDescription('Should be able to login succesfully')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('should select randomly an incident and check its id, then put that id in the filter and check if it fetches the correct incident', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to filter for a specific Incident')
		allureReporter.addDescription('Should be able to filter by incident id and expect incident list to be reduced to 1 incident only')
		allureReporter.addSeverity('critical')
		await helper.waitForElementToBeDisplayed(mapPage.map, 25000)
		await helper.selectRandomIncidentFromIncidentList()
		await browser.waitUntil(async () => (await mapPage.userProfileButton.isClickable()) == true,
			{
				timeout: 10000,
				timeoutMsg: `List was not reduced to 1 element`
			}
		);
		await mapPage.incidentIcon.click()
		await helper.waitForElementToBeDisplayed(incidentPage.incidentNumber, 20000)
		const incident_selected_name = await mapPage.selectedIncidentNameField.getText()
		const incidentNum = await incidentPage.incidentNumber.getText()
		console.log(`this is my incident number: ${incidentNum}, with name: ${incident_selected_name}`)
		await mapPage.filterButton.click()
		await helper.waitForElementToBeDisplayed(mapPage.filterContainer, 10000)
		await mapPage.filterIncidentNumberField.setValue(incidentNum)
		await mapPage.filterSearchButton.click()
		await helper.WaitBrowserToFinishLoading(5000)
		await helper.waitForElementToBeDisplayed(incidentPage.incidentNumber, 10000)
		await expect(mapPage.selectedIncidentNameField).toHaveText(incident_selected_name)
		await expect(incidentPage.incidentNumber).toHaveText(incidentNum)
		//needs to be changed again to == 1
		await browser.waitUntil(async () => (await mapPage.allIncidents.length) === 1,
			{
				timeout: 10000,
				timeoutMsg: `List was not reduced to 1 element`
			}
		);
		chaiExpect(await mapPage.allIncidents.length).to.be.equal(1)
		await helper.waitForElementToBeDisplayed(mapPage.selectedIncidentNameField, 10000)
	});

	it('Should click on delete search button and all the incidents will be loaded back to the incident list', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As an HQCCC user, I should be able to filter for a specific Incident')
		allureReporter.addDescription('Should be able to delete search and expect all incidents to be retrieved')
		allureReporter.addSeverity('normal')
		await helper.WaitBrowserToFinishLoading(20000)
		await browser.pause(5000)
		await helper.checkElementIsDisplayedAndClickable(mapPage.filterButton)
		await mapPage.filterButton.click()
		await browser.pause(3000)
		await mapPage.filterDeleteSearchButton.click()
		await browser.waitUntil(async () => (await mapPage.allIncidents.length) > 1,
			{
				timeout: 20000,
				timeoutMsg: `all incidents was not reloaded when delete search was clicked`
			}
		);
	});

});
