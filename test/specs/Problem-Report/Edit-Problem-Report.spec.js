const mapPage = require('../../pageobjects/main.map.page')
const problemReport = require('../../pageobjects/problem-report/problem.report.page')
let selectProblemReport = new Object({})
const statusArr = ['Opened', 'In Progress', 'Treated', 'Closed']
const messagesOnStatusChange = ['Type : Info', 'Type : Status', 'Type : Treat', 'Type : Re-Open']
const userMessagesBetweenStatusChange = ['Claiming problem report', 'Treating problem report', 'Closing Problem Report', 'Reopening Problem Report']
const systemStatusMessages = ['[System] Status Updated To Opened', '[System] Status Updated From Opened To In Progress', '[System] Status Updated From In Progress To Treated', '[System] Status Updated From Treated To Closed', '[System] Status Updated From Treated To Opened']
const problemDetailsMessages = ['Problem Details Message on treating In progress problem report', 'Problem Details Message on Reopening treated problem report']

describe('As an HQCCC user, I should be able to edit a problem report', async () => {
	it('Should be able to login successfully', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a problem report')
		allureReporter.addDescription('Should be able to login to HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('Should be able to access any problem report needed and validate it', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a problem report')
		allureReporter.addDescription('Should be able to access any problem report needed and validate it')
		allureReporter.addSeverity('normal')
		await mapPage.problemReportIcon.click()
		await browser.pause(2000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.problem_report_module.main_url)
		selectProblemReport = await problemReport.selectProblemReport()
	});

	it('Should be able to edit selected problem report', async () => {
		allureReporter.addFeature('Problem Report')
		allureReporter.addStory('As an HQCCC user, I should be able to edit a problem report')
		allureReporter.addDescription('Should be able to edit selected problem report by changing its status and sending messages')
		allureReporter.addSeverity('normal')
		if (selectProblemReport.status == statusArr[0]) {
			await problemReport.editOpenedProblemReport(userMessagesBetweenStatusChange[0], messagesOnStatusChange, systemStatusMessages)
		}
		else if (selectProblemReport.status == statusArr[1]) {
			await problemReport.editInProgressProblemReport(userMessagesBetweenStatusChange[1], messagesOnStatusChange, systemStatusMessages, problemDetailsMessages)
		}
		else if (selectProblemReport.status == statusArr[2]) {
			await problemReport.editTreatedProblemReport(userMessagesBetweenStatusChange, messagesOnStatusChange, systemStatusMessages, problemDetailsMessages)
		}
		else if (selectProblemReport.status == statusArr[3]) {
			await problemReport.cancelButton.click()
			await browser.pause(3000)
			await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.problem_report_module.main_url}`)
		}
		else return false

	});
});