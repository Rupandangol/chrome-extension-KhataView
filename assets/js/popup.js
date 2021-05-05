$(function () {

    chrome.storage.sync.get(['khata_income_amount', 'khata_exp_amount'], function (item) {
        var khata_income = (item.khata_income_amount) ?? 0;
        var khata_exp = (item.khata_exp_amount) ?? 0;
        $('#incomeTotal').text(khata_income);
        $('#expTotal').text(khata_exp);
        var total = khata_income - khata_exp;
        $('#total').text(total);

    });


    $('#incomeBtn').on('click', function () {
        var incomeAmount = parseInt($('#incomeAmt').val());
        if (incomeAmount != '') {

            chrome.storage.sync.get('khata_income_amount', function (item) {
                var khata_income = parseInt((item.khata_income_amount) ?? 0);
                khata_income += incomeAmount;

                chrome.storage.sync.set({ 'khata_income_amount': khata_income }, function () {
                    $('#incomeTotal').text(khata_income);
                })

            });
        }
        $('#incomeAmt').val('');
    });

    $('#incomeAmt').on('keypress', function (e) {
        if (e.keyCode == 13) {
            $('#incomeBtn').click();
        }

    });

    $('#expBtn').on('click', function () {
        var ExpAmt = parseInt($('#expAmt').val());
        if (ExpAmt != '') {
            chrome.storage.sync.get('khata_exp_amount', function (item) {
                var khata_exp = parseInt(item.khata_exp_amount??0);
                chrome.storage.sync.get('khata_income_amount', function (item) {
                    var khata_income = parseInt(item.khata_income_amount??0);
                    var total = khata_income - khata_exp;
                    if (ExpAmt <= total) {
                        khata_exp += ExpAmt;
                        var newTotal= khata_income - khata_exp;
                    } else {
                        var notifOptions={
                            type:'basic',
                            iconUrl:'/assets/icon/money_48.png',
                            title:'Balance is Zero',
                            message:"Uh oh! Looks like your balance is Zero"
                        };
                        chrome.notifications.create('limitNotif',notifOptions);
                    }


                    chrome.storage.sync.set({ 'khata_exp_amount': khata_exp }, function () {
                        $('#expTotal').text(khata_exp);
                        $('#total').text(newTotal);
                    });
                })
            })
        }
        $('#expAmt').val('');
    })

    $('#expAmt').on('keypress', (e) => {
        if (e.keyCode == 13) {
            $('#expBtn').click();
        }
    })




})