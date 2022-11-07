const helper = require('../../utilities/helper')
const mapPage = require('../../pageobjects/main.map.page')
const privInfoPage = require('../../pageobjects/priv-info.page');
const chaiExpect = require('chai').expect;
const path = require('path');
const filePath = path.join('C:/Users/JadAlArab/Downloads', 'password-icon.png');
const privInfoNum = '00125'
let currentNumOfAttachment
let currentNumOfAttachmentForContatcs
let currentNumOfAttachmentFOrObjects

describe('upload attachments to priv-info ', async () => {
	it('should Login successfully', async () => {
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it(' should go to the required priv-info', async () => {
		await helper.waitForElementToBeDisplayed(mapPage.incidentIcon, 15000)
		await helper.WaitBrowserToFinishLoading(5000)
		await mapPage.privilegedInfoIcon.click()
		await helper.WaitBrowserToFinishLoading(5000)
		await privInfoPage.expandSearchBtn.click()
		await browser.maximizeWindow()
		await privInfoPage.privInfoNumberField.setValue(privInfoNum)
		await privInfoPage.searchFilterBtn.click()
		await helper.WaitBrowserToFinishLoading(5000)
		await privInfoPage.firstRowofPrivInfo.click()
		await helper.WaitBrowserToFinishLoading(3000)
	});

	it('should upload required Attacment', async () => {
		currentNumOfAttachment = await privInfoPage.wasikaAttachmentBadge.getText()
		console.log(`${currentNumOfAttachment}`)
		await privInfoPage.wasikaAttachmentBtn.click()
		await privInfoPage.dropFile.setValue(filePath)
		await privInfoPage.saveFile.click()
		await helper.WaitBrowserToFinishLoading(1000)
		await privInfoPage.saveAndContinueBtn.click()
		await helper.WaitBrowserToFinishLoading(5000)
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1, false)
		await chaiExpect(parseInt(await privInfoPage.wasikaAttachmentBadge.getText())).to.equal(parseInt(currentNumOfAttachment) + 1)
	})

	it('should upload required Attachments for Contatcs', async () => {
		await helper.navigateBetweenTabIncidentPrivilegedInfo(2, false)
		await privInfoPage.firstRowinContacts.click()
		await helper.WaitBrowserToFinishLoading(1000)
		await browser.maximizeWindow()
		currentNumOfAttachmentForContatcs = await privInfoPage.contactsAttachmentBadge.getText()
		console.log(currentNumOfAttachmentForContatcs)
		await privInfoPage.wasikaContactsAttachmentsBtn.click()
		await privInfoPage.dropFile.setValue(filePath)
		await privInfoPage.saveFile.click()
		await browser.pause(1500)
		await helper.WaitBrowserToFinishLoading(10000)
		await privInfoPage.saveAndContinueBtn.click()
		await helper.WaitBrowserToFinishLoading(5000)
		await helper.navigateBetweenTabIncidentPrivilegedInfo(2, false)
		await helper.WaitBrowserToFinishLoading(50000)
		await privInfoPage.firstRowinContacts.click()
		await browser.maximizeWindow()
		await chaiExpect(parseInt(await privInfoPage.contactsAttachmentBadge.getText())).to.equal(parseInt(currentNumOfAttachmentForContatcs) + 1)
	});

	it('should upload required Attachments for Objects', async () => {
		await helper.WaitBrowserToFinishLoading(1000)
		await helper.navigateBetweenTabIncidentPrivilegedInfo(1, false)
		await helper.navigateBetweenTabIncidentPrivilegedInfo(3, false)
		await helper.WaitBrowserToFinishLoading(5000)
		await browser.maximizeWindow()
		await privInfoPage.firstRowObjects.click()
		await helper.WaitBrowserToFinishLoading(1000)
		await browser.maximizeWindow()
		currentNumOfAttachmentFOrObjects = await privInfoPage.objectsAttachmentBadge.getText()
		await privInfoPage.wasikaObjectsAttachmentBtn.click()
		await browser.maximizeWindow()
		await privInfoPage.dropFile.setValue(filePath)
		await privInfoPage.saveFile.click()
		await browser.pause(1500)
		await privInfoPage.saveAndContinueBtn.click()
		await helper.WaitBrowserToFinishLoading(5000)
		await privInfoPage.firstRowObjects.click()
		await chaiExpect(parseInt(await privInfoPage.objectsAttachmentBadge.getText())).to.equal(parseInt(currentNumOfAttachmentFOrObjects) + 1)
	})
})

