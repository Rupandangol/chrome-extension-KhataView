var contextMenuItem = {
    "id": "expensesId",
    "title": "Expenses",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "expensesId" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(["khata_income_amount", "khata_exp_amount"], function (item) {
                var newExpAmt = 0;
                if (item.khata_exp_amount) {
                    newExpAmt += parseInt(item.khata_exp_amount);
                }
                newExpAmt += parseInt(clickData.selectionText);
                if ((item.khata_income_amount - item.khata_exp_amount) < newExpAmt) {
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "/assets/icon/money_48.png",
                        title: 'Balance is Zero',
                        message: "Uh oh! Looks like your balance is Zero"
                    }
                    chrome.notifications.create('balance0', notifOptions);
                } else {
                    chrome.storage.sync.set({ 'khata_exp_amount': newExpAmt }, function () {
                        var notifExp = {
                            type: "basic",
                            iconUrl: "/assets/icon/money_48.png",
                            title: 'Expenses Added!',
                            message: "Expenses Added ................"
                        }
                        chrome.notifications.create('expAddedId', notifExp);
                    });
                }

            });
        }
    }
});


chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.storage.sync.get(['khata_income_amount', 'khata_exp_amount'], function (item) {

        var data = (changes.khata_income_amount ? changes.khata_income_amount.newValue : item.khata_income_amount) -
            (changes.khata_exp_amount ? changes.khata_exp_amount.newValue : item.khata_exp_amount)
        chrome.browserAction.setBadgeText({ "text": data.toString() });

    })


})