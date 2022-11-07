const mapPage = require('../../pageobjects/main.map.page')
const problemReport = require('../../pageobjects/problem-report/problem.report.page')

let unitName = ''
let problemTitle = 'New problem report title from fady automated testing'
let problemDescription = 'New problem report description from fady automated testing'
let importanceLvl = -1
let random_boolean = Math.random() < 0.5;
let OpenedProblemsCounter = 0
const messagesTypes = ['Type : Info', 'Type : Status']
const messagesStatusBody = ['[System] Status Updated To Opened']

describe('As an HQCCC user, I should be able to create a problem report', async () => {
	it('Should be able to login successfully', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new problem report')
		allureReporter.addDescription('Should be able to login to HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('Should be able to access the create a new problem report module', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new problem report')
		allureReporter.addDescription('Should be access and validate the create a new problem report module and check all elements are visible on screen')
		allureReporter.addSeverity('normal')
		await mapPage.problemReportIcon.click()
		await browser.pause(2000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.problem_report_module.main_url)
		await problemReport.addProblemReportBtn.click()
		await browser.pause(2000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.problem_report_module.add_report)
		OpenedProblemsCounter = parseInt(await problemReport.openedProblemReportCounter.getText())
	});

	it('Should have a clean UI for create a problem report module', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new problem report')
		allureReporter.addDescription('Should have a clean UI for create a problem report module, should check that all elements exist on the UI')
		allureReporter.addSeverity('normal')
		await expect(problemReport.statusProblemReportField).toBeExisting()
		await expect(problemReport.statusProblemReportField).toHaveText('')
		await expect(problemReport.unitNameDropdown).toBeExisting()
		await expect(problemReport.problemTitleField).toBeExisting()
		await expect(problemReport.problemReportDescription).toBeExisting()
		chaiExpect(await problemReport.problemReportImportanceLvl.length).to.equal(3)
		await expect(problemReport.stopedFromWorkingLabel).toBeExisting()
		await expect(problemReport.submitProblemReport).toBeExisting()
		chaiExpect(await problemReport.messagesProblemReportContainer.isExisting()).to.equal(false)
	});

	it('Should not be able to save the problem report if required fields were not filled', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new problem report')
		allureReporter.addDescription('Should not be able to save the problem report if required fields were not filled, should validate the highlighter on the required fields')
		allureReporter.addSeverity('normal')
		await problemReport.submitProblemReport.click()
		chaiExpect(await problemReport.invalidForms.length).to.equal(3)
	});

	it('Should be able to successfully create a problem report', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new problem report')
		allureReporter.addDescription('Should be able to successfully create a problem report by filling required fields')
		allureReporter.addSeverity('normal')
		await problemReport.unitNameDropdown.click()
		unitName = await helper.selectRandomlyMatOption()
		problemTitle += await helper.getRandomText(20)
		await problemReport.problemTitleField.setValue(problemTitle)
		problemDescription += await helper.getRandomText(20)
		await problemReport.problemReportDescription.setValue(problemDescription)
		importanceLvl = await helper.selectRandomlyFromArrayAndClick(problemReport.problemReportImportanceLvl)
		if (random_boolean) {
			await problemReport.stopedFromWorkingLabel.click()
		}
		chaiExpect(await problemReport.invalidForms.length).to.equal(0)
		await problemReport.submitProblemReport.click()
	});

	it('Should validate that a new problem report was created successfully', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new problem report')
		allureReporter.addDescription('Should validate that a new problem report was created successfully, by checking if previously inserted data was saved correctly and message and status has changed')
		allureReporter.addSeverity('normal')
		await expect(browser).toHaveUrlContaining(appSettings.hqccc_urls.problem_report_module.problem_report)
		await expect(problemReport.messagesProblemReportContainer).toBeExisting()
		await expect(problemReport.statusProblemReportField).toHaveValue('Opened')
		await expect(problemReport.disabledUnitName).toHaveText(unitName)
		await expect(problemReport.problemTitleField).toHaveValue(problemTitle)
		await expect(problemReport.problemReportDescription).toHaveValue(problemDescription)
		for (let i = 0; i < await problemReport.problemReportImportanceLvl.length; i++) {
			if (i == importanceLvl) {
				await expect(problemReport.problemReportImportanceLvl[i]).toHaveAttrContaining('class', 'selected-colored')
			}
		}
		if (random_boolean) {
			await expect(problemReport.stopedFromWorkingCheckBox).toHaveAttr('aria-checked', 'true')
		}
		else {
			await expect(problemReport.stopedFromWorkingCheckBox).toHaveAttr('aria-checked', 'false')
		}
		chaiExpect(await problemReport.messagesContainer.length).to.equal(1)
		await expect(problemReport.messageSenderName).toHaveText(appSettings.users.main_user.username)
		await expect(problemReport.messageType[0]).toHaveText(messagesTypes[1])
		await expect(problemReport.messageBody[0]).toHaveText(messagesStatusBody[0])
		chaiExpect(await problemReport.messageTimeSpam[0].getText()).to.be.not.empty
		await expect(problemReport.messageInputField).toBeExisting()
		await expect(problemReport.claimButton).toBeExisting()
		await expect(problemReport.cancelButton).toBeExisting()
		await browser.pause(3000)
		chaiExpect(parseInt(await problemReport.openedProblemReportCounter.getText())).to.equal(OpenedProblemsCounter + 1)
	});

	it('Should validate that recently created problem report is found the all problem reports table', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to create a new problem report')
		allureReporter.addDescription('Should validate that recently created problem report is found the all problem reports table ')
		allureReporter.addSeverity('normal')
		await mapPage.problemReportIcon.click()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.problem_report_module.main_url)
		await browser.pause(1000)
		await expect(problemReport.problemReportsTitlesTD[0]).toHaveText(problemTitle)
		await expect(problemReport.problemReportsUnitNameTD[0]).toHaveText(unitName)
	});
});