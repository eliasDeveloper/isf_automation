const mapPage = require('../../pageobjects/main.map.page')
const incidentPage = require('../../pageobjects/incident.page')
const chatPage = require('../../pageobjects/chat-modules/chat.view.page')
let chatMessage = 'Fady Automated Testing, Message sent from the incident itself'
let notificationIncidentRef = ''

describe('Should be able to send a message internally from an incident', async () => {
	it('Should be able to login successfully', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to send a message from an incident')
		allureReporter.addDescription('Should be able to login to HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('Should select randomly an incident and access it', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As a user I should be able to send a message from an incident')
		allureReporter.addDescription('Should be able to access a random incident')
		allureReporter.addSeverity('blocker')
		await mapPage.selectRandomIncidentAndAccessIt()
	});

	it('Should be able to send a message from the internal incident chat component', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to send a message from an incident')
		allureReporter.addDescription('Should be able to send a message from the internal incident chat component')
		allureReporter.addSeverity('blocker')
		await incidentPage.internalMessageBtn.click()
		await browser.pause(1000)
		await expect(incidentPage.internalChatTextArea).toBeDisplayed()
		await expect(incidentPage.internalChatTextArea).toBeExisting()
		await incidentPage.internalChatTextArea.setValue(chatMessage)
		await browser.pause(1000)
		await incidentPage.sendButtonInternalMessage.click()
		await browser.pause(1000)
		await expect(incidentPage.internalChatTextArea).toHaveValue('')
		await incidentPage.internalMessageBtn.click()
	});

	it('Should be able to observe the sent message in the notification list and expect reference to the incident', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to retrieve a message sent from an incident in the notification list')
		allureReporter.addDescription('Should be able to observe the sent message in the notification list and expect reference to the incident')
		allureReporter.addSeverity('critical')
		await mapPage.notificationButton.click()
		await browser.pause(1000)
		while (await mapPage.notificationListElements.length == 0) {
			await browser.pause(2000)
		}
		await expect(mapPage.notificationElementText[0]).toHaveText(chatMessage)
		notificationIncidentRef = await mapPage.notificationModuleChatRef[0].getText()
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.incident.get_incident_url}/${notificationIncidentRef}`)
	});

	it('Should be able to click on the chat incident notifcation, and should be redirected to the chat module for incidents', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to send a message from an incident')
		allureReporter.addDescription('Should be able to click on the chat incident notifcation, and should be redirected to the chat module for incidents')
		allureReporter.addSeverity('blocker')
		await mapPage.notificationElementText[0].click()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.chat.incident_chat}/${notificationIncidentRef}/0`)
	});

	it('Should be able to observe the sent message of the logged in user (user Fady), with correct direction for sender messages', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to retrieve a sent incident message')
		allureReporter.addDescription('Should be able to observe the sent message, with correct direction for sender messages')
		allureReporter.addSeverity('critical')
		await chaiExpect(await chatPage.chatMessages.length).to.be.above(0, 'message from incident was not received !')
		await browser.pause(2000)
		let chatMessageCount = await chatPage.chatMessages.length
		await expect(chatPage.chatMessageTextContainer[chatMessageCount - 1]).toHaveText(chatMessage)
		await expect(chatPage.chatMessages[chatMessageCount - 1]).toHaveAttrContaining('class', 'chat-list-item-content-this-sender')
	});
});