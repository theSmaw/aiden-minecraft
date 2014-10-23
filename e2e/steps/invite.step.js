var WAIT = 15000;

function inviteNewBySMS(mobile, browser) {

    console.log('STEP: Invite.inviteNewBySMS');

    browser
        .waitForElementVisible('.icon-invite', WAIT)
        .pause(1000)
        .click('.icon-invite')
        .waitForElementVisible('label[value="mobile"]', WAIT)
        .click('label[value="mobile"]')
        .waitForElementVisible('#mobile', WAIT)
        .setValue('#mobile', '15151515')
        .waitForElementVisible('.checkbox-profile-business', WAIT)
        .click('.checkbox-profile-business')
        .waitForElementVisible('#invite', WAIT)
        .click('#invite')
        .pause(1000)
        .waitForElementNotVisible('.popup', WAIT)
        .waitForElementVisible('#close', WAIT)
        .click('#close')
}

module.exports = {
    inviteNewBySMS: inviteNewBySMS
};