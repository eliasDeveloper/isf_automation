const mapPage = require('../main.map.page')

class chatRoom {
	get chatRoomContainer() { return $('app-chat-room-view') }
	get chatRoomTable() { return $('app-table-chat-room') }
	get addChatRoomBtn() { return $('app-chat-room-view > app-table-chat-room > section > div > button') }
	get addChatRoomText() { return $('app-chat-room-view > app-table-chat-room > section > div > span') }
	get quickFilterChatRoom() { return $('[matinput]') }
	get addChatRoomDetailsPopup() { return $('mat-dialog-container') }
	get allChatRoomsInTable() { return $$('tbody > tr') }
	get firstChatRoomInTable() { return $('tbody > tr:nth-child(1)') }
	get firstChatRoomAllDetails() { return $$('tbody > tr:nth-child(1) > td > span') }
	get filterChatRoomsInputField() { return $('siren-table > div > mat-form-field > div > div:nth-child(1) > div:nth-child(2) > input') }
	get deleteFilteredInput() { return $('app-table-chat-room > div > siren-table > div.siren-table-search-container > mat-form-field > div > div.mat-form-field-flex > div.mat-form-field-suffix > button > span.mat-button-wrapper > mat-icon') }

	//selectors in add chat room details popup 
	get chatRoomTitleInputField() { return $('[formcontrolname="title"]') }
	get chatRoomAddUsersSectionTitle() { return $('app-add-edit-chat-room > div > form > div > div.forms-subtitle') }
	get addUserToChatRoomBtn() { return $('app-add-edit-chat-room > div > form > div > div.forms-off-white-section > div > button') }
	get submitChatRoomDetailsBtn() { return $('app-add-edit-chat-room > div > div.choose-btn > button') }
	get userFullNameInputField() { return $$('mat-select.mat-select > div.mat-select-trigger > div > span') }

	//selectors in chat room chat
	get sendMessageBtn() { return $('[aria-label="send"]') }

	async insertRoomNum(roomNum) {
		await this.filterChatRoomsInputField.click()
		await browser.pause(1500)
		const value = [...roomNum]
		for (let i = 0; i < value.length; i++) {
			await browser.keys(value[i])
			await browser.pause(200)
		}
	}
}

module.exports = new chatRoom()