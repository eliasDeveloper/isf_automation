const privInfoPage = require('../../pageobjects/priv-info.page');
const translator = require('../../utilities/page-translator.json')
const arrayOfSites=[translator.site_names.beirut_police,translator.site_names.gendarmerie_command, translator.site_names.car_power_unit, translator.site_names.embassies_security_unit, translator.site_names.judicial_police_unit];
let returnedObjectOfCreatedPrivInfo = null
let latestSerialNumberFromTable = ''
let pendingDocsTabText = ''
let pendingDocumentsNumber = 0
let isValid = false
let arrayOfSelectedSites = []
let arraySitesPendingDocsCount=[]
const acceptOrRevoke = ['accept', 'revoke']
describe('Create a new Privileged Info, fill all its fields and check business logic', async () => {
    
	it('Should be able to login as any site user', async () => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to send the privileged information to multiple sites')
        allureReporter.addDescription('Should be able to login as the any site user')
        allureReporter.addSeverity('blocker')
        await browser.maximizeWindow()
        await helper.loginForSpecificUser(appSettings.users.multi_site_user.username, appSettings.users.multi_site_user.password, true)
        await browser.pause(4000)
    });
    it('Should be able to go to profile page and change site to any site branch', async()=>{
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to send the privileged information to multiple sites')
        allureReporter.addSeverity('normal')
        for(let i=0; i<arrayOfSites.length; i++){
            let sitePendingDocsCount =[]
            await helper.changeSiteBranchByName(arrayOfSites[i])
            await browser.pause(4000)
            await expect(browser).toHaveUrl(appSettings.hqccc_urls.get_login_page)
            await helper.loginForSpecificUser(appSettings.users.multi_site_user.username, appSettings.users.multi_site_user.password, false)
            await browser.pause(3000)
            await privInfoPage.redirectToDocumentsList()
            await browser.pause(3000)
            isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
            await expect(isValid).toEqual(true)
            await privInfoPage.documentsTab[1].click()
            await browser.pause(3000)
            isValid =await privInfoPage.getSelectedTabAriaSelectionProperty(1)
            await expect(isValid).toEqual(true)
            await browser.pause(3000)
            pendingDocsTabText = await privInfoPage.documentsTabTexts[1].getText()
            pendingDocumentsNumber= await privInfoPage.getPendingDocumentsNumber(pendingDocsTabText)
            sitePendingDocsCount.push(arrayOfSites[i])
            sitePendingDocsCount.push(pendingDocumentsNumber)
            arraySitesPendingDocsCount.push(sitePendingDocsCount)
        }
        await browser.pause(4000)
    })
    it('Should be able to switch to modiriyye user',async() => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to send the privileged information to multiple sites')
        allureReporter.addSeverity('normal')
        await helper.changeSiteBranchByIndex(arrayOfSites.length+1)//choose مديرية عامة
        await browser.pause(4000)
        await expect(browser).toHaveUrl(appSettings.hqccc_urls.get_login_page)
        await browser.pause(4000)
    });
    it('Should be able to access priv info module and create a new privileged information',async () => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to send the privileged information to multiple sites')
        allureReporter.addDescription('Should be able to access priv info module and create a new privileged information as المديرية العامة user')
        allureReporter.addSeverity('normal')
        await helper.loginForSpecificUser(appSettings.users.multi_site_user.username, appSettings.users.multi_site_user.password, false)
        await browser.pause(3000)
		await privInfoPage.redirectToDocumentsList();
        await browser.pause(3000)
		await privInfoPage.redirectToAddNewPrivilegeInfoSection();
        await browser.pause(4000)
    });
    it('Should be able to access priv info module and create a new privileged information',async () => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to send the privileged information to multiple sites')
        allureReporter.addSeverity('normal')
		returnedObjectOfCreatedPrivInfo = await privInfoPage.createNewPrivilegedInformation()
        await browser.pause(3000)
		latestSerialNumberFromTable = await privInfoPage.serialNumbersFromTable[0].getText()
        await browser.pause(3000)
		let latestSubjectFromTable = await privInfoPage.subjectsFromTable[0].getText()
        await browser.pause(3000)
		latestSubjectFromTable = latestSubjectFromTable.replace(/^\s+|\s+$/gm,'')
        await browser.pause(3000)
		chaiExpect(latestSerialNumberFromTable.trim()).to.be.equal(returnedObjectOfCreatedPrivInfo.serialNumber)
		chaiExpect(latestSubjectFromTable).to.be.equal(returnedObjectOfCreatedPrivInfo.subject)
		await browser.pause(4000)
    });
    it('Should be able to send the newly created priv info to multiple sites',async () => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to send the privileged information to multiple sites')
        allureReporter.addSeverity('normal')
        await privInfoPage.rowsofPrivInfoTable[0].click() //Access to the priv info section and click on the previously created priv info
        await browser.pause(4000)
		await expect(browser).toHaveUrl(returnedObjectOfCreatedPrivInfo.linkOfCreatedPrivInfo)
        await browser.pause(4000)
		chaiExpect(await privInfoPage.documentCorrespondence.isExisting()).to.equal(false)
        await browser.pause(4000)
		chaiExpect(await privInfoPage.documentCorrespondenceDataTable.isExisting()).to.equal(false)
        await browser.pause(4000)
        arrayOfSelectedSites = await privInfoPage.sendDocumentAsTransfer('internal', true, Math.floor(Math.random()*3 +2) )
    });
    it('Should be able to validate that the selected site(s) dont exist anymore in the table of sites', async()=>{
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to send the privileged information to multiple sites')
        allureReporter.addSeverity('normal')
        await privInfoPage.sendDocument.click()
		await browser.pause(3000)
		await privInfoPage.internalTransferButton.click()
		await browser.pause(4000)
        if(arrayOfSelectedSites.length <arrayOfSites.length){
            await expect(privInfoPage.sitesDataTable).toBeDisplayed()
            const sitesNamesArrayLength = await privInfoPage.sitesNames.length
            for(let i=0; i<sitesNamesArrayLength; i++){
                for(let j=0; j<arrayOfSelectedSites.length; j++){
                    const selectedSite = arrayOfSelectedSites[j].toString()
                    chaiExpect(await privInfoPage.sitesNames[i].getText()).to.not.equal(selectedSite)
                    await browser.pause(3000)
                }
            }
        }
        else{
            await browser.pause(3000)
            await expect(await privInfoPage.noSitesDataTableData.getText()).toEqual(translator.data_table.no_data)
        }
        await browser.pause(5000)
		await privInfoPage.closeSitesDataTable.click()
        await browser.pause(4000)
    })
    it('Should validate that the selected sent sites exist in the toggled button with cross sign', async () => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to send the privileged information to multiple sites')
        allureReporter.addSeverity('normal')
        await browser.back()
        await browser.pause(3000)
        chaiExpect(await privInfoPage.toggleButtons[0].isExisting())
        await browser.pause(3000)
        await privInfoPage.toggleButtons[0].click()
        await browser.pause(3000)
        const lengthOfAllToggleBtnText = await privInfoPage.insideAllToggledBtnText.length
        await browser.pause(3000)
        const lengthOfAllToggleBtnIcon = await privInfoPage.insideAllToggledBtnIcon.length
        await browser.pause(3000)
        await expect(lengthOfAllToggleBtnText).toEqual(lengthOfAllToggleBtnIcon)
        await expect(lengthOfAllToggleBtnText/2).toEqual(arrayOfSelectedSites.length)
        let i =0       
        for(i = 0; i<arrayOfSelectedSites.length; i++){
            let found = false
            for(let j =0; j<lengthOfAllToggleBtnText/2; j++){
                await expect(privInfoPage.insideAllToggledBtnIcon[j]).toHaveAttributeContaining('class', 'unchecked-label')
                const textInsideToggleBtn = await privInfoPage.insideAllToggledBtnText[i].getText()
                if(arrayOfSelectedSites[j] === textInsideToggleBtn){
                    found = true
                    break
                }
            }
            await expect(found).toEqual(true)
            found = false
        }
        await privInfoPage.randomClickOnWeb.click()
    });
    it('Should be able to login as police site user, access priv info module and randomly accept/revoke the sent document', async () => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to send the privileged information to multiple sites')
        allureReporter.addDescription('Should be able to login as police site user')
        allureReporter.addSeverity('normal')
        for(let i = 0; i<arrayOfSelectedSites.length; i++){
            //switch to the selected site and login using this site in order to either accept or revoke
            await helper.changeSiteBranchByName(arrayOfSelectedSites[i])
            await browser.pause(3000)
            await expect(browser).toHaveUrl(appSettings.hqccc_urls.get_login_page)
            await helper.loginForSpecificUser(appSettings.users.multi_site_user.username, appSettings.users.multi_site_user.password, false)
            await browser.pause(3000)
            await privInfoPage.redirectToDocumentsList();
            await browser.pause(3000)
            isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
            await expect(isValid).toEqual(true)
            await privInfoPage.documentsTab[1].click()
            await browser.pause(3000)
            isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(1)
            await expect(isValid).toEqual(true)
            pendingDocsTabText = await privInfoPage.documentsTabTexts[1].getText()
            const newPendingDocsNumber = await privInfoPage.getPendingDocumentsNumber(pendingDocsTabText)
            let found = false
            let pendingDocOfSite = 0
            for(let j=0; j<arraySitesPendingDocsCount.length; j++){
                let siteText = arraySitesPendingDocsCount[j][0]
                if(siteText === arrayOfSelectedSites[i]){
                    pendingDocOfSite = arraySitesPendingDocsCount[j][1]
                    found = true
                    break
                }
            }
            await expect(found).toEqual(true)
            chaiExpect(pendingDocOfSite).to.equal(newPendingDocsNumber -1)
            await privInfoPage.insertDocSerialNumber(returnedObjectOfCreatedPrivInfo.serialNumber)
            // await privInfoPage.searchFieldForTable.setValue(returnedObjectOfCreatedPrivInfo.serialNumber)
            await browser.pause(4000)
            const serialNumberFromTable = await privInfoPage.dataFromPendingDocsTable[0].getText()
            const subjectFromTable = await privInfoPage.dataFromPendingDocsTable[7].getText()
            chaiExpect(serialNumberFromTable).to.be.equal(returnedObjectOfCreatedPrivInfo.serialNumber)
            chaiExpect(subjectFromTable.trim()).to.be.equal(returnedObjectOfCreatedPrivInfo.subject)
            await browser.pause(3000)
            await expect(privInfoPage.acceptSendDocumentButton[0]).toBeDisplayed()
            const randomAcceptRevoke = Math.floor(Math.random() * 2)
            if(acceptOrRevoke[randomAcceptRevoke] === 'accept'){
                await privInfoPage.acceptSendDocumentButton[0].click()
                await browser.pause(3000)
                const handles = await browser.getWindowHandles()
                await browser.switchToWindow(handles[1])
                await browser.pause(3000)
                const serialNumber=await privInfoPage.serialNumberOfCreatedPrivInfo.getValue()
                await chaiExpect(serialNumber).to.equal(returnedObjectOfCreatedPrivInfo.serialNumber)
                await browser.pause(3000)
                await expect(browser).toHaveUrl(returnedObjectOfCreatedPrivInfo.linkOfCreatedPrivInfo)
                await browser.pause(4000)
                await expect(await privInfoPage.serialNumberOfCreatedPrivInfo.getValue()).toEqual(returnedObjectOfCreatedPrivInfo.serialNumber)
                await browser.switchWindow(appSettings.hqccc_urls.privileged_information.get_privileged_information_url)
                await browser.pause(3000)
                await expect(await privInfoPage.noPendingDocsDataTable.getText()).toEqual(translator.data_table.no_data)
            }
            await helper.changeSiteBranchByIndex(arrayOfSites.length+1)// choose مديرية عامة
            await browser.pause(4000)
            await expect(browser).toHaveUrl(appSettings.hqccc_urls.get_login_page)
            await browser.pause(3000)
            await helper.loginForSpecificUser(appSettings.users.multi_site_user.username, appSettings.users.multi_site_user.password, false)
            await browser.pause(3000)
            await privInfoPage.redirectToDocumentsList();
            await browser.pause(3000)
            if(acceptOrRevoke[randomAcceptRevoke] === 'accept'){
                //should check if the accepted document is in the document correspondence
                isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
                await expect(isValid).toEqual(true)
                await browser.pause(4000)
                const serialNumberOfCreatedPrivInfo = await privInfoPage.serialNumbersFromTable[0].getText()
                chaiExpect(returnedObjectOfCreatedPrivInfo.serialNumber).to.equal(serialNumberOfCreatedPrivInfo)
                chaiExpect(await privInfoPage.serialNumbersFromTable[0].getText()).to.equal(latestSerialNumberFromTable)
                await browser.pause(3000)
                chaiExpect(await privInfoPage.toggleButtons[0].isExisting())
                await privInfoPage.toggleButtons[0].click()
                const lengthOfAllToggleBtnText = await privInfoPage.insideAllToggledBtnText.length
                await browser.pause(3000)
                const lengthOfAllToggleBtnIcon = await privInfoPage.insideAllToggledBtnIcon.length
                await browser.pause(3000)
                await expect(lengthOfAllToggleBtnText).toEqual(lengthOfAllToggleBtnIcon)
                await expect(lengthOfAllToggleBtnText/2).toEqual(arrayOfSelectedSites.length)
                let found = false;
                for (let j = 0; j < lengthOfAllToggleBtnText / 2; j++) {
                    await expect(privInfoPage.insideAllToggledBtnIcon[j]).toHaveAttributeContaining("class", "checked-label");
                    const textInsideToggleBtn =await privInfoPage.insideAllToggledBtnText[i].getText();
                    if (arrayOfSelectedSites[j] === textInsideToggleBtn) {
                        found = true;
                        break;
                    }
                }
                await expect(found).toEqual(true);
                await privInfoPage.randomClickOnWeb.click()
                await browser.pause(3000)
                await privInfoPage.rowsofPrivInfoTable[0].click()
                await browser.pause(3000)
                await privInfoPage.documentCorrespondenceDataTable.scrollIntoView()
                chaiExpect(await privInfoPage.documentCorrespondence.isExisting())
                chaiExpect(await privInfoPage.documentCorrespondenceDataTable.isExisting())
                await expect(privInfoPage.acceptIconOfCreatedPrivInfos[i]).toBeDisplayed()               
            }
            else{
                let revokedSite = ''
                await privInfoPage.rowsofPrivInfoTable[0].click()
                await browser.pause(3000)
                const transferTargetLength = await privInfoPage.transferTarget.length
                let index = 0
                while(index< transferTargetLength){
                    const transferTarget =   await privInfoPage.transferTarget[index].getText()
                    if(arrayOfSelectedSites[i] === transferTarget){
                        revokedSite = transferTarget
                        await privInfoPage.deleteBtnInLinkedTransfers[index].scrollIntoView()
                        await browser.pause(3000)
                        await privInfoPage.deleteBtnInLinkedTransfers[index].click()
                        await browser.pause(3000)
                        if(await privInfoPage.documentCorrespondence.isExisting()){
                            chaiExpect(await privInfoPage.deleteBtnInLinkedTransfers[index].isExisting()).to.equal(false)
                            chaiExpect(await privInfoPage.transferTarget[index].getText().isExisting()).to.equal(false)
                        }
                        else{
                            chaiExpect(await privInfoPage.documentCorrespondence.isExisting()).to.equal(false)
                        }
                        break
                    }
                    index++
                }
                await helper.changeSiteBranchByName(revokedSite)
                await browser.pause(4000)
                await expect(browser).toHaveUrl(appSettings.hqccc_urls.get_login_page)
                await helper.loginForSpecificUser(appSettings.users.multi_site_user.username, appSettings.users.multi_site_user.password, false)
                await browser.pause(3000)
                await privInfoPage.redirectToDocumentsList();
                isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
                await expect(isValid).toEqual(true)
                await privInfoPage.documentsTab[1].click()
                await browser.pause(3000)
                isValid =await privInfoPage.getSelectedTabAriaSelectionProperty(1)
                await expect(isValid).toEqual(true)
                await browser.pause(3000)
                pendingDocsTabText = await privInfoPage.documentsTabTexts[1].getText()
                const newPendingDocsNumber = await privInfoPage.getPendingDocumentsNumber(pendingDocsTabText)
                let found = false
                let pendingDocOfSite = 0
                for(let j=0; j<arraySitesPendingDocsCount.length; j++){
                    let siteText = arraySitesPendingDocsCount[j][0]
                    if(siteText === arrayOfSelectedSites[i]){
                        pendingDocOfSite = arraySitesPendingDocsCount[j][1]
                        found = true
                        break
                    }
                }
                await expect(found).toEqual(true)
                chaiExpect(pendingDocOfSite).to.equal(newPendingDocsNumber)
                const serialNumberFromTable = await privInfoPage.dataFromPendingDocsTable[0].getText()
                chaiExpect(pendingDocsTabText).to.not.equal(privInfoPage.documentsTabTexts[1].getText())
                chaiExpect(serialNumberFromTable).to.not.equal(returnedObjectOfCreatedPrivInfo.serialNumber)        
            }
        }
    });
})