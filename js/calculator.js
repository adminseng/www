$(document).ready(function () {
    var timer;              //timer object
    var timeInterval = 500; //time interval in ms, 500 = 0.5 second

    //check whether the element exists, as this external scripts will be used by 2 files
    if ($("#calculatorBtn").length) {
        $("#calculatorBtn").click(function () {
            $.fancybox({
                'href': 'pc-games-calculator',
                'type': 'iframe'

            });
        });
    }
    //check whether the element exists, as this external scripts will be used by 2 files
    if ($("#input-field").length) {
        $("#input-field").on('keyup change', function () {
            clearTimeout(timer);
            typingTimer = setTimeout(finishedTyping, timeInterval);
        });
        $("#input-field").on('keydown', function () {
            clearTimeout(timer);
        });
    }
});

function finishedTyping() {

    var valueString = $("#input-field").val();

    if (valueString.match(/^\d+$/)) {   //check whether user input only number
        var number = parseInt(valueString); //input number by user
        var price = 0;  //final price to be display

        var first_state = 4;        //first stage to calculate
        var second_stage = 6;       //second stage to calculate

        var isPromotion = false;        //determine whether u are having a promotion or not
        var promotion_stage_lower = 0;  //included
        var promotion_stage_upper = 0;  //included

        var f_stage_price = 8;          //prices for first stage
        var s_stage_price = 4;          
        var last_stage_price = 6;       //prices for stages range that are not specified
        var p_stage_price = 0;          //promotion price

        for (var cd_index = 1; cd_index <= number; cd_index++) {
            //if there is promotion, promotion price come first
            //when cd number fall out from promotion range, normal price will use instead
            if (isPromotion) {
                if (cd_index >= promotion_stage_lower && cd_index <= promotion_stage_upper) {
                    price += p_stage_price;
                } else if (cd_index < first_state) {
                    price += f_stage_price;
                } else if (cd_index < second_stage) {
                    price += s_stage_price;
                } else {
                    price += last_stage_price;
                }
            //if there are no promotion, normal price used instead
            } else if (cd_index < first_state) {
                price += f_stage_price;
            } else if (cd_index < second_stage) {
                price += s_stage_price;
            } else {
                price += last_stage_price;
            }
        }
        //change the content
        $("#display-price").html("Number of CD : " + number + "<br /> Cost : RM " + price);
    }
    
}