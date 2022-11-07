class chatPage {

	get chatContainer() { return $('#_messageContainer') }
	get chatMessages() { return $$('#_messageContainer > div > mat-card > div') }
	get chatMessageTextContainer() { return $$('#_messageContainer > div > mat-card > div > div:nth-child(3) > span') }
	get messageInputField() { return $('textarea.message-input') }
	get sendMessageBtn() { return $('#chatRoomContent > div > div > form > button:nth-child(2)') }

}

module.exports = new chatPage()