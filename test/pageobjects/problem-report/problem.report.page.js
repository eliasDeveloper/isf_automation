class problemReport {
	get openedProblemReportCounter() { return $('#linkReportProblemModule > span > div > span.mat-badge-content') }
	get problemReportTable() { return $('app-report-problem > app-table-report-problem') }
	get addProblemReportBtn() { return $('app-table-report-problem > section > div > button') }
	get addProblemReportMsg() { return $('app-table-report-problem > section > div > span') }
	get problemReportTableFilter() { return $('app-table-report-problem > div > div > div > button > span > mat-icon') }
	get statusFilterField() { return $(`span=${translator.report_problem.add_report_problem.status}`) }
	get filterBtn() { return $('app-table-report-problem > div > div > form > div > button.forms-positive-action-btn.search-btn') }
	get problemReportStatus() { return $$('tr > td.mat-cell.cdk-cell.siren-table-cell.cdk-column-currentStatusDisp.mat-column-currentStatusDisp') }
	get claimProblemReportBtn() { return $(`span=${translator.report_problem.add_report_problem.claim_btn}`) }
	get treatProblemReportBtn() { return $(`span=${translator.report_problem.add_report_problem.treat_btn}`) }
	get closeProblemReportBtn() { return $(`span=${translator.report_problem.add_report_problem.close_btn}`) }
	get reopenProblemReportBtn() { return $(`span=${translator.report_problem.add_report_problem.reopen_btn}`) }

	//details popup
	get problemDetailsPopup() { return $('mat-dialog-container') }
	get problemDetailsPopupFormField() { return $('app-send-message > form > div > mat-form-field') }
	get problemDetailsPopupMessage() { return $('app-send-message > h4') }
	get problemDetailsPopupInputMessage() { return $('[formcontrolname="messageToSend"]') }
	get problemDetailsPopupYesBtn() { return $('app-send-message > form > div > button.dialog-yes-button') }

	//problem report table
	get problemReportsTitlesTD() { return $$('tbody > tr > td.mat-cell.cdk-cell.siren-table-cell.cdk-column-title') }
	get problemReportsUnitNameTD() { return $$('tbody > tr > td.mat-cell.cdk-cell.siren-table-cell.cdk-column-moduleName') }
	get problemReportsImportanceLvlTD() { return $$('tbody > tr > td.mat-cell.cdk-cell.siren-table-cell.cdk-column-importance') }
	get problemTableRangeCount() { return $('div.mat-paginator-range-label') }

	// Create report
	get statusProblemReportField() { return $('[formcontrolname="currentStatusStringDisplay"]') }
	get unitNameDropdown() { return $(`span=${translator.report_problem.add_report_problem.module_name}`) }
	get problemTitleField() { return $('[formcontrolname="title"]') }
	get problemReportDescription() { return $('[formcontrolname="description"]') }
	get problemReportImportanceLvl() { return $$('app-add-report-problem > div > mat-card > mat-card-content > div > form > div > span.selection-box') }
	get stopedFromWorkingLabel() { return $('[formcontrolname="isBlocking"] > label > span') }
	get stopedFromWorkingCheckBox() { return $('[type="checkbox"]') }
	get submitProblemReport() { return $(`span=${translator.report_problem.add_report_problem.report_btn}`) }
	get disabledUnitName() { return $('mat-select> div> div> span > span') }
	get invalidForms() { return $$('.mat-form-field-invalid') }

	//problem report messages
	get messagesProblemReportContainer() { return $('app-report-problem > app-add-report-problem > div > mat-card.mat-card.ng-star-inserted') }
	get messagesContainer() { return $$('mat-card-content > div.ng-star-inserted > mat-card') }
	get messageSenderName() { return $$('mat-card > div > div:nth-child(1) > span') }
	get messageType() { return $$('mat-card > div > div:nth-child(2)') }
	get messageBody() { return $$('mat-card > div > div:nth-child(3) > span') }
	get messageTimeSpam() { return $$('mat-card > div > div:nth-child(4)') }
	get messageInputField() { return $('textarea.message-input') }
	get sendMessageInputBtn() { return $('mat-card-content > div:nth-child(1) > div > button > span.mat-button-wrapper > mat-icon') }

	//opened report
	get claimButton() { return $(`span=${translator.report_problem.add_report_problem.claim_btn}`) }
	get cancelButton() { return $(`span=${translator.report_problem.add_report_problem.cancel_btn}`) }



	async selectProblemReport() {
		let problemReportDetails = new Object({ title: String, unitName: String, status: String })
		await browser.pause(2000)
		const selectionNum = await helper.selectRandomlyFromArrayAndReturnSelectionNum(await this.problemReportsTitlesTD)
		problemReportDetails.title = await this.problemReportsTitlesTD[selectionNum].getText()
		problemReportDetails.unitName = await this.problemReportsUnitNameTD[selectionNum].getText()
		await this.problemReportsTitlesTD[selectionNum].click()
		await browser.pause(4000)
		problemReportDetails.status = await this.statusProblemReportField.getValue()
		await expect(browser).toHaveUrlContaining(appSettings.hqccc_urls.problem_report_module.problem_report)
		await expect(this.disabledUnitName).toHaveText(problemReportDetails.unitName)
		await expect(this.problemTitleField).toHaveValue(problemReportDetails.title)
		return problemReportDetails
	}

	async editOpenedProblemReport(userMessageTxt, statusMessage, systemStatusChangeMessage) {
		let openedMessagesConter = parseInt(await this.openedProblemReportCounter.getText())
		let currentMessagesCount = await this.messagesContainer.length
		await expect(this.claimProblemReportBtn).toBeExisting()
		await this.messageInputField.setValue(userMessageTxt)
		await this.sendMessageInputBtn.click()
		await browser.pause(2000)
		chaiExpect(await this.messagesContainer.length).to.equal(currentMessagesCount + 1)
		currentMessagesCount++
		await expect(this.messageBody[0]).toHaveText(userMessageTxt)
		await expect(this.messageType[0]).toHaveText(statusMessage[0])
		await this.claimProblemReportBtn.click()
		await browser.pause(5000)
		chaiExpect(await this.messagesContainer.length).to.equal(currentMessagesCount + 1)
		await expect(this.messageBody[0]).toHaveText(systemStatusChangeMessage[1])
		await expect(this.messageType[0]).toHaveText(statusMessage[1])
		await expect(this.statusProblemReportField).toHaveValue('In Progress')
		chaiExpect(openedMessagesConter - 1).to.equal(parseInt(await this.openedProblemReportCounter.getText()))
	}

	async editInProgressProblemReport(userMessageTxt, statusMessage, systemStatusChangeMessage, problemDetailsMessages) {
		let currentMessagesCount = await this.messagesContainer.length
		await expect(this.treatProblemReportBtn).toBeExisting()
		await this.messageInputField.setValue(userMessageTxt)
		await this.sendMessageInputBtn.click()
		await browser.pause(2000)
		chaiExpect(await this.messagesContainer.length).to.equal(currentMessagesCount + 1)
		currentMessagesCount++
		await expect(this.messageBody[0]).toHaveText(userMessageTxt)
		await expect(this.messageType[0]).toHaveText(statusMessage[0])
		await this.treatProblemReportBtn.click()
		await browser.pause(2000)
		await expect(this.problemDetailsPopup).toBeExisting()
		await expect(this.problemDetailsPopupMessage).toHaveText(`${translator.report_problem.report_action.message_action}`)
		await this.problemDetailsPopupYesBtn.click()
		await expect(this.problemDetailsPopupFormField).toHaveAttrContaining('class', 'mat-form-field-invalid')
		const treatProblemDetailsMessage = `${problemDetailsMessages[0]} ${helper.getRandomText(10)}`
		await this.problemDetailsPopupInputMessage.setValue(treatProblemDetailsMessage)
		await this.problemDetailsPopupYesBtn.click()
		await browser.pause(2000)
		chaiExpect(await this.messagesContainer.length).to.equal(currentMessagesCount + 2)
		await expect(this.messageBody[0]).toHaveText(treatProblemDetailsMessage)
		await expect(this.messageType[0]).toHaveText(statusMessage[2])
		await expect(this.messageBody[1]).toHaveText(systemStatusChangeMessage[2])
		await expect(this.messageType[1]).toHaveText(statusMessage[1])
		await expect(this.statusProblemReportField).toHaveValue('Treated')
		await expect(this.closeProblemReportBtn).toBeExisting()
		await expect(this.reopenProblemReportBtn).toBeExisting()
	}

	async editTreatedProblemReport(userMessageTxt, statusMessage, systemStatusChangeMessage, problemDetailsMessages) {
		let openedMessagesConter = parseInt(await this.openedProblemReportCounter.getText())
		let currentMessagesCount = await this.messagesContainer.length
		if (this.reopenProblemReportBtn.isExisting()) {
			await expect(this.closeProblemReportBtn).toBeExisting()
			await expect(this.reopenProblemReportBtn).toBeExisting()
			let btnChoices = [this.closeProblemReportBtn, this.reopenProblemReportBtn]
			let choice = await helper.selectRandomlyFromArrayAndReturnSelectionNum(btnChoices)
			if (choice == 0) {
				await this.messageInputField.setValue(userMessageTxt[2])
				await this.sendMessageInputBtn.click()
				await browser.pause(2000)
				chaiExpect(await this.messagesContainer.length).to.equal(currentMessagesCount + 1)
				currentMessagesCount++
				await expect(this.messageBody[0]).toHaveText(userMessageTxt[2])
				await expect(this.messageType[0]).toHaveText(statusMessage[0])
				await this.closeProblemReportBtn.click()
				await browser.pause(2000)
				chaiExpect(await this.messagesContainer.length).to.equal(currentMessagesCount + 1)
				await expect(this.messageBody[0]).toHaveText(systemStatusChangeMessage[3])
				await expect(this.messageType[0]).toHaveText(statusMessage[1])
				await expect(this.statusProblemReportField).toHaveValue('Closed')
			}
			else if (choice == 1) {
				await this.messageInputField.setValue(userMessageTxt[3])
				await this.sendMessageInputBtn.click()
				await browser.pause(2000)
				chaiExpect(await this.messagesContainer.length).to.equal(currentMessagesCount + 1)
				currentMessagesCount++
				await expect(this.messageBody[0]).toHaveText(userMessageTxt[3])
				await expect(this.messageType[0]).toHaveText(statusMessage[0])
				await this.reopenProblemReportBtn.click()
				await browser.pause(2000)
				await expect(this.problemDetailsPopup).toBeExisting()
				await expect(this.problemDetailsPopupMessage).toHaveText(`${translator.report_problem.report_action.message_action}`)
				await this.problemDetailsPopupYesBtn.click()
				await expect(this.problemDetailsPopupFormField).toHaveAttrContaining('class', 'mat-form-field-invalid')
				const treatProblemDetailsMessage = `${problemDetailsMessages[1]} ${helper.getRandomText(10)}`
				await this.problemDetailsPopupInputMessage.setValue(treatProblemDetailsMessage)
				await this.problemDetailsPopupYesBtn.click()
				await browser.pause(2000)
				chaiExpect(await this.messagesContainer.length).to.equal(currentMessagesCount + 2)
				await expect(this.messageBody[0]).toHaveText(treatProblemDetailsMessage)
				await expect(this.messageType[0]).toHaveText(statusMessage[3])
				await expect(this.messageBody[1]).toHaveText(systemStatusChangeMessage[4])
				await expect(this.messageType[1]).toHaveText(statusMessage[1])
				await expect(this.statusProblemReportField).toHaveValue('Opened')
				chaiExpect(openedMessagesConter + 1).to.equal(parseInt(await this.openedProblemReportCounter.getText()))
			}
			else return false
		}
		else {
			await this.cancelButton.click()
			await browser.pause(3000)
			await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.problem_report_module.main_url}`)
		}


	}


}

module.exports = new problemReport()