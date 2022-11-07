const mapPage = require('../../pageobjects/main.map.page')
const chatPage = require('../../pageobjects/chat-modules/chat.view.page')
const loginPage = require('../../pageobjects/login.page')
let initialMessagesCounter = 0
let senderMessage = 'Hello this is fady automated testing, sender side message'
let receiverMessage = 'Got the message fady, receiver message'
let notificationIncidentRef = ''

describe('As a user I should be able to exchange messages for an incident', async () => {
	it('Should be able to login successfully', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to login to HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('Should be able to access a random incident chat view and validate correct redirection', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to access a random incident')
		allureReporter.addSeverity('blocker')
		await helper.selectRandomIncidentFromIncidentList()
		await mapPage.incidentChatIcon.click()
		await browser.pause(2000)
		await expect(browser).toHaveUrlContaining(`${appSettings.hqccc_urls.chat.incident_chat}`)
	});

	it('Should be able to send a message from the incident chat and validate receiver form', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to send a message from the incident chat and validate receiver form')
		allureReporter.addSeverity('critical')
		if (await chatPage.chatContainer.isExisting() == false) {
			await browser.pause(3000)
		}
		initialMessagesCounter = await chatPage.chatMessages.length
		console.log(`messages count: ${initialMessagesCounter}`)
		await browser.pause(1000)
		await chatPage.messageInputField.setValue(senderMessage)
		await browser.pause(1000)
		await chatPage.sendMessageBtn.click()
		await browser.pause(7000)
		chaiExpect(await chatPage.chatMessages.length).to.be.equal(initialMessagesCounter + 1, 'Sent message is being duplicated')
		initialMessagesCounter++
		await expect(chatPage.chatMessageTextContainer[initialMessagesCounter - 1]).toHaveText(senderMessage)
		await expect(chatPage.chatMessages[initialMessagesCounter - 1]).toHaveAttrContaining('class', 'chat-list-item-content-this-sender')
	});

	it('Should be able to logout from sender message account', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to logout from sender message account')
		allureReporter.addSeverity('normal')
		await helper.LogoutFromHQCCC()
	});

	it('Should be able to login from receiver account', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to login from receiver account')
		allureReporter.addSeverity('critical')
		await loginPage.login(appSettings.users.u0_user.username, appSettings.users.u0_user.password)
		await expect(browser).toHaveUrl(appSettings.default_page)
		await helper.waitForElementToBeDisplayed(mapPage.map, 20000)
		await browser.pause(10000)
		if (await mapPage.disconnectionPopup.length > 0) {
			for (let i = await mapPage.disconnectionPopup.length - 1; i >= 0; i--) {
				await mapPage.closeDisconnectionPopup[i].click()
				await browser.pause(500)
			}
		}
	});

	it('Should be able to observe the sent message in the notification list on the receiver side', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to observe the sent message in the notification list on the receiver side')
		allureReporter.addSeverity('critical')
		await mapPage.notificationButton.click()
		await browser.pause(1000)
		while (await mapPage.notificationListElements.length == 0) {
			await browser.pause(2000)
		}
		await expect(await mapPage.notificationElementText[0]).toHaveText(senderMessage)
		await browser.pause(1000)
		notificationIncidentRef = await mapPage.notificationModuleChatRef[0].getText()
		while (notificationIncidentRef == 0) {
			notificationIncidentRef = await mapPage.notificationModuleChatRef[0].getText()
			await browser.pause(2000)
		}
		await browser.pause(1000)
	});

	it('Should be able to retrieve sent message from receiver side, in the chat view module', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to retrieve sent message from receiver side, in the chat view module')
		allureReporter.addSeverity('critical')
		await mapPage.notificationElementText[0].click()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.chat.incident_chat}/${notificationIncidentRef}/0`)
		chaiExpect(await chatPage.chatMessages.length).to.equal(initialMessagesCounter)
		await expect(chatPage.chatMessageTextContainer[initialMessagesCounter - 1]).toHaveText(senderMessage)
		await expect(chatPage.chatMessages[initialMessagesCounter - 1]).toHaveAttrContaining('class', 'chat-list-item-content-other-sender')
	});

	it('Should be able to send message from receiver side on the same incident chat view', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to send message from receiver side on the same incident chat view')
		allureReporter.addSeverity('critical')
		if (await chatPage.chatContainer.isExisting() == false) {
			await browser.pause(3000)
		}
		await browser.pause(1000)
		await chatPage.messageInputField.setValue(receiverMessage)
		await browser.pause(1000)
		await chatPage.sendMessageBtn.click()
		await browser.pause(7000)
		chaiExpect(await chatPage.chatMessages.length).to.be.equal(initialMessagesCounter + 1, 'Sent message is being duplicated')
		initialMessagesCounter++
		await expect(chatPage.chatMessageTextContainer[initialMessagesCounter - 1]).toHaveText(receiverMessage)
		await expect(chatPage.chatMessages[initialMessagesCounter - 1]).toHaveAttrContaining('class', 'chat-list-item-content-this-sender')
	});

	it('Should be able to logout from receiver message account', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to logout from receiver message account')
		allureReporter.addSeverity('normal')
		await helper.LogoutFromHQCCC()
	});

	it('Should be able to login to sender message account', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to login to sender message account')
		allureReporter.addSeverity('normal')
		await loginPage.login(appSettings.users.main_user.username, appSettings.users.main_user.password)
		await expect(browser).toHaveUrl(appSettings.default_page)
		await helper.waitForElementToBeDisplayed(mapPage.map, 20000)
		await browser.pause(10000)
		if (await mapPage.disconnectionPopup.length > 0) {
			for (let i = await mapPage.disconnectionPopup.length - 1; i >= 0; i--) {
				await mapPage.closeDisconnectionPopup[i].click()
				await browser.pause(500)
			}
		}
	});


	it('Should be able to observe the sent message from receiver account in the notification list on the sender side', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to observe the sent message from receiver account in the notification list on the sender side')
		allureReporter.addSeverity('critical')
		await mapPage.notificationButton.click()
		await browser.pause(1000)
		while (await mapPage.notificationListElements.length == 0) {
			await browser.pause(2000)
		}
		await expect(await mapPage.notificationElementText[0]).toHaveText(receiverMessage)
		await browser.pause(1000)
		notificationIncidentRef = await mapPage.notificationModuleChatRef[0].getText()
		while (notificationIncidentRef == 0) {
			notificationIncidentRef = await mapPage.notificationModuleChatRef[0].getText()
			await browser.pause(2000)
		}
		await browser.pause(1000)
	});

	it('Should be able to retrieve sent message from receiver account, in the chat view module', async () => {
		allureReporter.addFeature('Incident Chat')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages concerning an incident, in the incident chat view')
		allureReporter.addDescription('Should be able to retrieve sent message from receiver account, in the chat view module')
		allureReporter.addSeverity('critical')
		await mapPage.notificationElementText[0].click()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.chat.incident_chat}/${notificationIncidentRef}/0`)
		chaiExpect(await chatPage.chatMessages.length).to.equal(initialMessagesCounter)
		await expect(chatPage.chatMessageTextContainer[initialMessagesCounter - 1]).toHaveText(receiverMessage)
		await expect(chatPage.chatMessages[initialMessagesCounter - 1]).toHaveAttrContaining('class', 'chat-list-item-content-other-sender')
		await expect(chatPage.chatMessages[initialMessagesCounter - 2]).toHaveAttrContaining('class', 'chat-list-item-content-this-sender')

	});
});