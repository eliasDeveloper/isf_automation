const mapPage = require('../../pageobjects/main.map.page')
const problemReport = require('../../pageobjects/problem-report/problem.report.page')

describe('As an HQCCC user, I should have a clean problem report UI', async () => {
	it('Should be able to login successfully', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should have a clean problem report UI')
		allureReporter.addDescription('Should be able to login to HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('Should be able to access the problem report module', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should have a clean problem report UI')
		allureReporter.addDescription('Should be able to access the problem report module')
		allureReporter.addSeverity('normal')
		await mapPage.problemReportIcon.click()
		await browser.pause(2000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.problem_report_module.main_url)
		await expect(problemReport.problemReportTable).toBeExisting()
		await expect(problemReport.problemReportTable).toBeDisplayed()
		await helper.checkElementIsDisplayedAndClickable(problemReport.problemReportTableFilter)
		await helper.checkElementIsDisplayedAndClickable(problemReport.addProblemReportBtn)
		await expect(problemReport.addProblemReportMsg).toHaveText(translator.report_problem.add_report_problem.report_problem)
	});

	it('Should validate open problem report counter', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should have a correct problem report counter')
		allureReporter.addDescription('Should validate open problem report counter')
		allureReporter.addSeverity('normal')
		await problemReport.problemReportTableFilter.click()
		await problemReport.statusFilterField.click()
		await helper.selectSpecificMatOption('Opened')
		await problemReport.filterBtn.click()
		await browser.pause(5000)
		for (let i = 0; i < await problemReport.problemReportStatus.length; i++) {
			await expect(problemReport.problemReportStatus[i]).toHaveText('Opened')
		}
		await browser.pause(2000)
		let tableRangeText = await problemReport.problemTableRangeCount.getText()
		let tableRangeConverted = tableRangeText.split(',').map(function (tableRangeText) {
			return tableRangeText.split('ن').pop();
		});
		tableRangeConverted = parseInt(tableRangeConverted[0])
		if (await problemReport.problemReportStatus.length < tableRangeConverted) {
			chaiExpect(tableRangeConverted).to.equal(parseInt(await problemReport.openedProblemReportCounter.getText()))
		}
		else {
			chaiExpect(await problemReport.problemReportStatus.length).to.equal(parseInt(await problemReport.openedProblemReportCounter.getText()))
		}
	});
});