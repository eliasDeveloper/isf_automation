const chaiExpect = require("chai").expect
const { checkElementIsDisplayedAndClickable } = require('../utilities/helper')
class TimeLine {

	get timeLineExpandCollapseButton() { return $('#expandCollapseTimelineId') }
	get timeLineContainer() { return $('#timelineContainer') }
	get timeLineOptionsButton() { return $('#timelineContainer > div > div > div:nth-child(2) > div:nth-child(1) > button > span.mat-button-wrapper > mat-icon') }
	get timeLineDescriptionContainer() { return $('#timelineContainer > div> div > div:nth-child(2) > div:nth-child(1) > span') }
	get timeLineDetailedPresentationButton() { return $('#mat-slide-toggle-1-input') }
	get timeLineDetailedPresentationButtonText() { return $('#mat-slide-toggle-1 > label > span.mat-slide-toggle-content') }
	get timeLineIncidentsContainer() { return $('#vis') }
	get timeLineOptionsContainer() { return $('#timelineContainer > div.ng-trigger.ng-trigger-fadeIn.ng-star-inserted > div.containerHeader> section') }
	get timeLineIncidentStartingDate() { return $('#mat-button-toggle-4-button > span > mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-infix> mat-date-range-input > div > div.mat-date-range-input-start-wrapper > input') }
	get timeLineIncidentEndDate() { return $('#mat-button-toggle-4-button > span > mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-infix > mat-date-range-input > div > div.mat-date-range-input-end-wrapper > input') }
	get timeLineSearchByDateTimeField() { return $('#mat-button-toggle-4') }
	get timeLineDateTimePicker() { return $('div.cdk-overlay-pane.mat-datepicker-dialog') }
	get timeLineDatePickerButton() { return $('mat-calendar-header > div > div > button.mat-focus-indicator.mat-calendar-period-button.mat-button.mat-button-base') }
	get timeLineYearContainer() { return $('mat-multi-year-view > table > tbody.mat-calendar-body') }
	get allYearsDateTimePicker() { return $$('tbody > tr > td> div.mat-calendar-body-cell-content') }
	get allMonthsDateTimePickerContainer() { return $('mat-year-view > table > tbody.mat-calendar-body') }
	get allMonthsDateTimePicker() { return $$('mat-year-view > table > tbody > tr > td> div.mat-calendar-body-cell-preview') }
	get allDaysOfTheMonthDateTimePickerContainer() { return $('mat-month-view > table > tbody') }
	get allDaysOfTheMonthDateTimePicker() { return $$('mat-month-view > table > tbody > tr > td') }

	async SearchAndSelectTheDate(arr) {
		await checkElementIsDisplayedAndClickable(this.timeLineDatePickerButton)
		await this.timeLineDatePickerButton.click()
		await browser.waitUntil(async () => (await this.timeLineYearContainer.isDisplayed()) == true,
			{
				timeout: 10000,
				timeoutMsg: `DateTime picker years did not appear on screen`
			}
		);
		await expect(this.timeLineYearContainer).toBeDisplayed()
		// for (let j = 0; j < arr.length; j++) {
		//     console.log(`the location num ${j} is ${arr[j]}`)
		// }
		for (let i = 0; i < this.allYearsDateTimePicker.length; i++) {
			let year = parseInt(arr[2])
			console.log(`Fady the year is : ${year}`)
			let fromCalendarYear = await this.allYearsDateTimePicker[i].getText()
			console.log(await fromCalendarYear.getText())
			if (year == parseInt(fromCalendarYear)) {
				await this.allYearsDateTimePicker[i].click()
				console.log(`the year that was selected is ${this.allYearsDateTimePicker[i].getText()}`)
			}
		}
		await browser.waitUntil(async () => (await this.allMonthsDateTimePickerContainer.isDisplayed()) == true,
			{
				timeout: 10000,
				timeoutMsg: `DateTime picker months did not appear on screen`
			}
		);

		// await this.allMonthsDateTimePicker[Number(arr[1])].click
		// console.log(`the month selected is the month ${this.allMonthsDateTimePicker[Number(arr[1]) - 1]}`)
		// await browser.waitUntil(async () => (await this.allDaysOfTheMonthDateTimePickerContainer.isDisplayed()) == true,
		//     {
		//         timeout: 10000,
		//         timeoutMsg: `DateTime picker days did not appear on screen`
		//     }
		// );
		// await this.allDaysOfTheMonthDateTimePicker[Number(arr[0])].click()
		// await this.allDaysOfTheMonthDateTimePicker[Number(arr[0])].click()

	}


}

module.exports = new TimeLine()