const mapPage = require('../../pageobjects/main.map.page')
const incidentPage = require('../../pageobjects/incident.page');
const path = require('path');
const appSettings = require('../../utilities/app-settings.json')
const imageArr = ['crime.jpg', 'murder.jpg', 'suicide.png']
let filePath


let currentNumOfAttachment = 0
let currentNumOfAttachmentForContatcs = 0
let currentNumOfAttachmentFOrObjects = 0

describe('upload attachments to a specific incident', async () => {
	it('should Login successfully', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As a user I should be able to upload an attachement for an incident')
		allureReporter.addDescription('Should be able to login to HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('should be able to access any incident', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As a user I should be able to upload an attachement for an incident')
		allureReporter.addDescription('Should be able to access a random incident')
		allureReporter.addSeverity('blocker')
		await helper.selectRandomIncidentFromIncidentList()
		await mapPage.incidentIcon.click()
		while (await mapPage.map.isDisplayed()) {
			await browser.pause(2000)
		}
		if (await incidentPage.incidentAttachmentBadge.getText()) {
			currentNumOfAttachment = await incidentPage.incidentAttachmentBadge.getText()
		}
		await incidentPage.incidentAttachmentBtn.click()
	});

	it('Should be able to upload an incident attachment', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As a user I should be able to upload an attachement for an incident')
		allureReporter.addDescription('Should be able to upload an incident attachment')
		allureReporter.addSeverity('normal')
		filePath = path.join(appSettings.remote_images_path, helper.selectRandomlyFromArray(imageArr));
		await incidentPage.dropFile.setValue(filePath)
		await incidentPage.saveFile.click()
		await browser.pause(2000)
		await incidentPage.saveAndContinueBtn.click()
		await browser.pause(5000)
		await helper.WaitBrowserToFinishLoading(10000)
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1)
		chaiExpect(parseInt(await incidentPage.incidentAttachmentBadge.getText())).to.equal(parseInt(currentNumOfAttachment) + 1)
	});

	it('should upload attachment for a contact', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As a user I should be able to upload an attachement for a person')
		allureReporter.addDescription('Should be able to upload a person attachment')
		allureReporter.addSeverity('normal')
		await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
		if (await incidentPage.peopleTableContainer.isExisting()) {
			await incidentPage.firstRowOfContactsTable.click()
			await browser.pause(3000)
			if (await incidentPage.contactsAttachmentBtn.isExisting()) {
				if (await incidentPage.contactsAttachmentBadge.getText()) {
					currentNumOfAttachmentForContatcs = await incidentPage.contactsAttachmentBadge.getText()
				}
				filePath = path.join(appSettings.remote_images_path, helper.selectRandomlyFromArray(imageArr));
				await incidentPage.contactsAttachmentBtn.click()
				await incidentPage.dropFile.setValue(filePath)
				await incidentPage.saveFile.click()
				await browser.pause(1000)
				await incidentPage.addPersonBtn.click()
				await browser.pause(2000)
				await incidentPage.saveAndContinueBtn.click()
				await browser.pause(5000)
				await helper.navigateBetweenTabIncidentPrivilegedInfo(2)
				await incidentPage.firstRowOfContactsTable.click()
				await browser.pause(4000)
				chaiExpect(parseInt(await incidentPage.contactsAttachmentBadge.getText())).to.equal(parseInt(currentNumOfAttachmentForContatcs) + 1)
				await browser.pause(2000)
			}
		}
	});

	it('Should be able to upload attachment for objects', async () => {
		allureReporter.addFeature('Incident')
		allureReporter.addStory('As a user I should be able to upload an attachement for an object')
		allureReporter.addDescription('Should be able to upload a property attachment')
		allureReporter.addSeverity('normal')
		await helper.navigateBetweenTabIncidentPrivilegedInfo(3)
		if (await incidentPage.propertyTable.isExisting()) {
			await incidentPage.firstRowOfObjectsTable.click()
			await browser.pause(3000)
			if (await incidentPage.objectsAttachmentBtn.isExisting()) {
				if (await incidentPage.objectAttachmentBadge.getText()) {
					currentNumOfAttachmentFOrObjects = await incidentPage.objectAttachmentBadge.getText()
				}
				filePath = path.join(appSettings.remote_images_path, helper.selectRandomlyFromArray(imageArr));
				await incidentPage.objectsAttachmentBtn.click()
				await incidentPage.dropFile.setValue(filePath)
				await incidentPage.saveFile.click()
				await browser.pause(3000)
				await incidentPage.addPropertyBtn.click()
				await browser.pause(2000)
				await incidentPage.saveAndContinueBtn.click()
				await browser.pause(5000)
				await helper.navigateBetweenTabIncidentPrivilegedInfo(3)
				await incidentPage.firstRowOfObjectsTable.click()
				await browser.pause(3000)
				chaiExpect(parseInt(await incidentPage.objectAttachmentBadge.getText())).to.equal(parseInt(currentNumOfAttachmentFOrObjects) + 1)
			}
		}
	});
});