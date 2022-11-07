const privInfoPage = require('../../pageobjects/priv-info.page');
let isValid = false;

describe('Click on tabs of priv-info and validate the existing elements', async () => {
    it('Should be able to login successfully', async () => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to validate the business flow in the privileged information module')
        allureReporter.addSeverity('blocker')
        await browser.maximizeWindow()
        await helper.loginForSpecificUser(appSettings.users.main_user_2.username, appSettings.users.main_user_2.password, true)
    });
    it('Should be able to access privileged information module', async() => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to validate the business flow in the privileged information module')
        allureReporter.addSeverity('normal')
        await privInfoPage.redirectToDocumentsList()
    });
    it('Should be able to validate the business flow in the documents section.', async()=>{
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to validate the business flow in the privileged information module')
        allureReporter.addSeverity('normal')
        isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(0)
        await expect(isValid).toEqual(true)
        await expect(privInfoPage.addDocumentBtn).toBeDisplayed()
        await expect(await privInfoPage.addDocumentText.getText()).toEqual(translator.privileged_information.add_privilged_information.add_priv_info)
        await expect(privInfoPage.uploadButton).toBeDisplayed()
        await expect(privInfoPage.searchInput).toBeDisplayed()
        await expect(privInfoPage.filterButton).toBeDisplayed()
        await browser.pause(3000)
    })
    it('Should be able to validate the business flow in the pending documents section.', async()=>{
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to validate the business flow in the privileged information module')
        allureReporter.addSeverity('normal')
        await privInfoPage.documentsTab[1].click()
        isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(1)
        await browser.pause(3000)
        await expect(isValid).toEqual(true)
        let pendingDocsTabText = await privInfoPage.documentsTabTexts[1].getText()
        await browser.pause(3000)
        const pendingDocsNumber = await privInfoPage.getPendingDocumentsNumber(pendingDocsTabText)
        if(pendingDocsNumber ===0){
            await expect(await privInfoPage.noDataTextFromPendingDocs.getText()).toEqual(translator.data_table.no_data)
            await browser.pause(3000)
        }
        else{
            await expect(privInfoPage.sitesDataTable).toBeDisplayed()
        }
        await browser.pause(3000)
    })
    it('Should be to validate the business flow in the Documents Sent section.', async()=>{
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to validate the business flow in the privileged information module')
        allureReporter.addSeverity('normal')
        await privInfoPage.documentsTab[2].click()
        isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(2)
        await expect(isValid).toEqual(true)
        await expect(privInfoPage.searchInput).toBeDisplayed()
        await expect(privInfoPage.filterButton).toBeDisplayed()
        await browser.pause(3000)
    })
    it('Should be to validate the business flow in the Follow-Up Operations section.', async()=>{
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to validate the business flow in the privileged information module')
        allureReporter.addSeverity('normal')
        await privInfoPage.documentsTab[3].click()
        isValid = await privInfoPage.getSelectedTabAriaSelectionProperty(3)
        await expect(await privInfoPage.tooltipAddOppBtn).toBeDisplayed()
        await expect(await privInfoPage.tooltipAddOppBtnText.getText()).toEqual(translator.privileged_information.operation.tooltip_add_opp_btn)
        await expect(privInfoPage.sitesDataTable).toBeDisplayed()
    });
    it('Should be able to logout', async() => {
        allureReporter.addFeature('Privileged Information')
        allureReporter.addStory('As an HQCCC user, I should be able to logout')
        allureReporter.addSeverity('normal')
        await helper.LogoutFromHQCCC();
    });
})