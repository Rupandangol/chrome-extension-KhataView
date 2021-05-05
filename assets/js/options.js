$(function(){
    $('#resetBtn').on('click',()=>{
        chrome.storage.sync.set({'khata_income_amount':0});
        chrome.storage.sync.set({'khata_exp_amount':0});
         var resetNotif ={
            type:"basic",
            iconUrl:"/assets/icon/money_48.png",
            title:'Reset',
            message:'All data are cleared!'
         }
         chrome.notifications.create('resetNotif',resetNotif);
    });
})