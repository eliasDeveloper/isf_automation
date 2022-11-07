const mapPage = require('../../pageobjects/main.map.page')
const chatRoom = require('../../pageobjects/chat-modules/chat.room.page')
const chatView = require('../../pageobjects/chat-modules/chat.view.page')
const appSettings = require('../../utilities/app-settings.json')
const arrayOfUsers = [appSettings.users.main_user.username, appSettings.users.u0_user.username, appSettings.users.u1_user.username]
let arrLength = 0
let chatTitle = ''
let chatRoomDetailsLength = 0
let numberOfUnreadMessages = 0
let chatRoomSerialNumber = 0
let initialMessagesCounter = 0
let senderMessage = 'Hello this is fady automated testing, sender side message in chat room'
let u0Message = 'Got the message fady, u0 message'
let u1Message = 'Got messages from Fady and U0, u1 message'
let notificationIncidentRef = ''


describe('Should be able to create a chat room and exchange messages only between selected users', async () => {
	it('Should be able to login successfully', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to create a chat room')
		allureReporter.addDescription('Should be able to login to HQCCC')
		allureReporter.addSeverity('blocker')
		await browser.maximizeWindow()
		await helper.loginAndCheckIfSuccessful()
	});

	it('Should be able to access the chat room module successfully and Should have a clean chat room UI', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to create a chat room')
		allureReporter.addDescription('Should be able to access the chat room module successfully')
		allureReporter.addSeverity('blocker')
		await mapPage.groupChatIcon.click()
		await browser.pause(3000)
		await helper.waitForElementToBeDisplayed(chatRoom.chatRoomContainer, 10000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.chat.chat_room)
		await expect(chatRoom.chatRoomContainer).toBeDisplayed()
		await helper.checkElementIsDisplayedAndClickable(chatRoom.addChatRoomBtn)
		chaiExpect(await chatRoom.addChatRoomText.getText()).to.have.string(`${translator.chat_room.tooltip_add_chat_room_btn}`, 'Invalid add chat room message')
		await expect(chatRoom.quickFilterChatRoom).toBeExisting()
		await expect(chatRoom.chatRoomTable).toBeExisting()
		await expect(chatRoom.chatRoomTable).toBeDisplayed()
	});

	it('Should be able to create a new chat room and Should have a clean create chat room UI', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to create a chat room')
		allureReporter.addDescription('should be able to create a chat room')
		allureReporter.addSeverity('blocker')
		await chatRoom.addChatRoomBtn.click()
		await browser.pause(3000)
		await expect(chatRoom.addChatRoomDetailsPopup).toBeDisplayed()
		await expect(chatRoom.chatRoomTitleInputField).toBeDisplayed()
		chaiExpect(await chatRoom.chatRoomAddUsersSectionTitle.getText()).to.have.string(`${translator.chat_room.users_in_chat_room}`)
		await helper.checkElementIsDisplayedAndClickable(chatRoom.addUserToChatRoomBtn)
		await helper.checkElementIsDisplayedAndClickable(chatRoom.submitChatRoomDetailsBtn)
	});

	it('Should be able to fill the needed data to create the chat room', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to create a chat room')
		allureReporter.addDescription('Should be able to fill the needed data to create the chat room')
		allureReporter.addSeverity('critical')
		chatTitle = `Fady Automated testing ${helper.getRandomText(20)} ${helper.getRandomText(10)}`
		await chatRoom.chatRoomTitleInputField.setValue(chatTitle)
		await browser.pause(1000)
		for (let i = 1; i < arrayOfUsers.length; i++) {
			arrLength = await chatRoom.userFullNameInputField.length
			await chatRoom.addUserToChatRoomBtn.click()
			await browser.pause(1000)
			await chatRoom.userFullNameInputField[arrLength].click()
			await helper.selectSpecificMatOption(arrayOfUsers[i])
			await browser.pause(1500)
		}
		await chatRoom.submitChatRoomDetailsBtn.click()
		await browser.pause(2000)
		chaiExpect(await chatRoom.addChatRoomDetailsPopup.isExisting()).to.be.equal(false)
	});

	it('Should be able to find the recently created chat room in the chat room table', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to create a chat room')
		allureReporter.addDescription('Should be able to find the recently created chat room in the chat room table')
		allureReporter.addSeverity('blocker')
		chatRoomDetailsLength = await chatRoom.firstChatRoomAllDetails.length
		chatRoomSerialNumber = await chatRoom.firstChatRoomAllDetails[0].getText()
		chaiExpect(await chatRoom.firstChatRoomAllDetails[0].getText()).to.not.be.empty
		chaiExpect(await chatRoom.firstChatRoomAllDetails[1].getText()).to.not.be.empty
		chaiExpect(await chatRoom.firstChatRoomAllDetails[2].getText()).to.be.empty
		chaiExpect(await chatRoom.firstChatRoomAllDetails[3].getText()).to.be.empty
		chaiExpect(parseInt(await chatRoom.firstChatRoomAllDetails[4].getText())).to.equal(numberOfUnreadMessages, 'Default Number of unread messages is not set correctly to 0 ')
		chaiExpect(await chatRoom.firstChatRoomAllDetails[5].getText()).to.equal(chatTitle, 'Chat title was not saved correctly')
		await expect(chatRoom.firstChatRoomAllDetails[6]).toHaveTextContaining([appSettings.users.main_user.username, appSettings.users.u0_user.username, appSettings.users.u1_user.username])

	});

	it('Should be able to open the chat for the recently created chat room and send a message', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be able to open the chat for the recently created chat room and send a message from my current user (Fady)')
		allureReporter.addSeverity('critical')
		await chatRoom.firstChatRoomAllDetails[0].click()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.chat.chat_room_chat}/${chatRoomSerialNumber}`)
		if (await chatView.chatContainer.isExisting() == false) {
			await browser.pause(3000)
		}
		initialMessagesCounter = await chatView.chatMessages.length
		console.log(`messages count: ${initialMessagesCounter}`)
		await browser.pause(1000)
		await chatView.messageInputField.setValue(senderMessage)
		await browser.pause(1000)
		await chatRoom.sendMessageBtn.click()
		await browser.pause(7000)
		chaiExpect(await chatView.chatMessages.length).to.be.equal(initialMessagesCounter + 1, 'Sent message is being duplicated')
		initialMessagesCounter++
		await expect(chatView.chatMessageTextContainer[initialMessagesCounter - 1]).toHaveText(senderMessage)
		await expect(chatView.chatMessages[initialMessagesCounter - 1]).toHaveAttrContaining('class', 'chat-list-item-content-this-sender')
	});

	it('Should be able to login as u0 and access the previously created chat room', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be able to login as u0 and access the previously created chat room')
		allureReporter.addSeverity('blocker')
		await helper.LogoutFromHQCCC()
		await browser.pause(2000)
		await helper.loginForSpecificUser(appSettings.users.u0_user.username, appSettings.users.u0_user.password, false)
		await mapPage.notificationButton.click()
		await browser.pause(1000)
		while (await mapPage.notificationListElements.length == 0) {
			await browser.pause(2000)
		}
		await expect(await mapPage.notificationElementText[0]).toHaveText(senderMessage)
		await expect(await mapPage.notificationModuleChatRef[0]).toHaveText(chatRoomSerialNumber)
		await browser.pause(1000)
	});

	it('Should be redirected correctly to the created chat room', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be redirected correctly to the created chat room and validate the chat messages')
		allureReporter.addSeverity('critical')
		await mapPage.notificationElementText[0].click()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.chat.chat_room_chat}/${chatRoomSerialNumber}`)
		chaiExpect(await chatView.chatMessages.length).to.equal(initialMessagesCounter)
		for (let i = 0; i < initialMessagesCounter; i++) {
			await expect(chatView.chatMessages[i]).toHaveAttrContaining('class', 'chat-list-item-content-other-sender')
		}
	});

	it('Should be able to send a message from u0', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be able to send a message from u0')
		allureReporter.addSeverity('normal')
		await browser.pause(1000)
		await chatView.messageInputField.setValue(u0Message)
		await browser.pause(1000)
		await chatRoom.sendMessageBtn.click()
		await browser.pause(7000)
		chaiExpect(await chatView.chatMessages.length).to.be.equal(initialMessagesCounter + 1, 'Sent message is being duplicated')
		initialMessagesCounter++
		for (let i = 0; i < initialMessagesCounter; i++) {
			if (i == initialMessagesCounter - 1) {
				await expect(chatView.chatMessageTextContainer[i]).toHaveText(u0Message)
				await expect(chatView.chatMessages[i]).toHaveAttrContaining('class', 'chat-list-item-content-this-sender')
			}
			else {
				await expect(chatView.chatMessages[i]).toHaveAttrContaining('class', 'chat-list-item-content-other-sender')
			}
		}
	});

	it('Should be able to find the previously created chat in u0 chat room module', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be able to find the previously created chat in u0 chat room module')
		allureReporter.addSeverity('normal')
		await mapPage.groupChatIcon.click()
		await browser.pause(3000)
		await helper.waitForElementToBeDisplayed(chatRoom.chatRoomContainer, 10000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.chat.chat_room)
		await expect(chatRoom.chatRoomTable).toBeDisplayed()
		await chatRoom.insertRoomNum(chatRoomSerialNumber)
		await browser.pause(3000)
		chaiExpect(await chatRoom.allChatRoomsInTable.length).to.equal(1)
		await browser.pause(1000)
		await expect(chatRoom.deleteFilteredInput).toBeExisting()
		await chatRoom.deleteFilteredInput.click()
		await browser.pause(3000)
		chaiExpect(await chatRoom.deleteFilteredInput.isExisting()).to.equal(false)
		chaiExpect(await chatRoom.allChatRoomsInTable.length).to.be.above(1, "did not retrieve again all chat rooms")
	});

	it('Should be able to login as u1 and access the previously created chat room', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be able to login as u1 and access the previously created chat room')
		allureReporter.addSeverity('critical')
		await helper.LogoutFromHQCCC()
		await browser.pause(2000)
		await helper.loginForSpecificUser(appSettings.users.u1_user.username, appSettings.users.u1_user.password, false)
		await mapPage.notificationButton.click()
		await browser.pause(1000)
		while (await mapPage.notificationListElements.length == 0) {
			await browser.pause(2000)
		}
		await expect(await mapPage.notificationElementText[0]).toHaveText(u0Message)
		await expect(await mapPage.notificationModuleChatRef[0]).toHaveText(chatRoomSerialNumber)
		await browser.pause(1000)
	});

	it('Should be redirected correctly to the created chat room', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be redirected correctly to the created chat room and validate the chat messages')
		allureReporter.addSeverity('blocker')
		await mapPage.notificationElementText[0].click()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(`${appSettings.hqccc_urls.chat.chat_room_chat}/${chatRoomSerialNumber}`)
		chaiExpect(await chatView.chatMessages.length).to.equal(initialMessagesCounter)
		for (let i = 0; i < initialMessagesCounter; i++) {
			await expect(chatView.chatMessages[i]).toHaveAttrContaining('class', 'chat-list-item-content-other-sender')
		}
	});

	it('Should be able to send a message from u1', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be able to send a message from u1')
		allureReporter.addSeverity('normal')
		await browser.pause(1000)
		await chatView.messageInputField.setValue(u1Message)
		await browser.pause(1000)
		await chatRoom.sendMessageBtn.click()
		await browser.pause(7000)
		chaiExpect(await chatView.chatMessages.length).to.be.equal(initialMessagesCounter + 1, 'Sent message is being duplicated')
		initialMessagesCounter++
		for (let i = 0; i < initialMessagesCounter; i++) {
			if (i == initialMessagesCounter - 1) {
				await expect(chatView.chatMessageTextContainer[i]).toHaveText(u1Message)
				await expect(chatView.chatMessages[i]).toHaveAttrContaining('class', 'chat-list-item-content-this-sender')
			}
			else {
				await expect(chatView.chatMessages[i]).toHaveAttrContaining('class', 'chat-list-item-content-other-sender')
			}
		}
	});

	it('Should be able to find the previously created chat in u1 chat room module', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be able to find the previously created chat in u0 chat room module')
		allureReporter.addSeverity('normal')
		await mapPage.groupChatIcon.click()
		await browser.pause(3000)
		await helper.waitForElementToBeDisplayed(chatRoom.chatRoomContainer, 10000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.chat.chat_room)
		await expect(chatRoom.chatRoomTable).toBeDisplayed()
		await chatRoom.insertRoomNum(chatRoomSerialNumber)
		await browser.pause(3000)
		chaiExpect(await chatRoom.allChatRoomsInTable.length).to.equal(1)
		await browser.pause(1000)
		await expect(chatRoom.deleteFilteredInput).toBeExisting()
		await chatRoom.deleteFilteredInput.click()
		await browser.pause(3000)
		chaiExpect(await chatRoom.deleteFilteredInput.isExisting()).to.equal(false)
		chaiExpect(await chatRoom.allChatRoomsInTable.length).to.be.above(1, "did not retrieve again all chat rooms")
	});

	it('Should be able to login as an unauthorised user and check if the user can access the created chat room, And Should not be able to access the unauthorized chat room', async () => {
		allureReporter.addFeature('Chat Room')
		allureReporter.addStory('As an HQCCC user, I should be able to exchange messages in the chat room module between only selected users')
		allureReporter.addDescription('Should be able to login as an unauthorised user and check if the user can access the created chat room (Elias user)')
		allureReporter.addSeverity('critical')
		await helper.LogoutFromHQCCC()
		await browser.pause(2000)
		await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, false)
		await mapPage.notificationButton.click()
		await browser.pause(1000)
		while (await mapPage.notificationListElements.length == 0) {
			await browser.pause(2000)
		}
		chaiExpect(await mapPage.notificationElementText[0].getText()).to.not.equal(u1Message)
		chaiExpect(await mapPage.notificationModuleChatRef[0].getText()).to.not.equal(chatRoomSerialNumber)
		await (await $("body")).click()
		await browser.pause(1000)
		await mapPage.groupChatIcon.click()
		await browser.pause(3000)
		await expect(browser).toHaveUrl(appSettings.hqccc_urls.chat.chat_room)
		await expect(chatRoom.chatRoomTable).toBeDisplayed()
		await chatRoom.insertRoomNum(chatRoomSerialNumber)
		await browser.pause(5000)
		chaiExpect(await chatRoom.allChatRoomsInTable.length).to.equal(0)
		await browser.pause(1000)
		await expect(chatRoom.deleteFilteredInput).toBeExisting()
		await chatRoom.deleteFilteredInput.click()
		await browser.pause(3000)
	});



});