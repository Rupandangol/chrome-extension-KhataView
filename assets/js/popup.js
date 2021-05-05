$(function () {

    chrome.storage.sync.get('khata_income_amount', function (item) {
        var khata_income = (item.khata_income_amount) ?? 0;
        $('#incomeTotal').text(khata_income);
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
    })
    $('#incomeAmt').on('keypress', function (e) {
        if (e.keyCode == 13) {
            $('#incomeBtn').click();
        }

    })



})