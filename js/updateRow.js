function retrieveData() {
    //display loading screen
    $("#result-table").html("<tr><td colspan='6'><div align='center'><img alt='Loading' src='/img/sales/db-load.gif'/></div></td></tr>");

    //get the value of required criteria for searching purpose
    var tempGenre = $(".selectedGenre :selected").val();
    var tempCD = $(".selectedCD :selected").val();
    var tempKeyword = $("#selectedKeyword").val();

    //form an JSON object
    var data = {
        "genre": tempGenre,
        "cd": tempCD,
        "keyword": tempKeyword

    };
       
    //parse value of an objects into a string
    data = $(this).serialize() + "&" + $.param(data);
    //use ajax to retrieve data from database
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/php/pc-games-db-connect.php",
        data: data,
        //if success in retrieving data, add into the div
        success: function (data) {
            //clear the previous content if any
            $("#result-table").html("");
            for (var i = 0 ; i < data.length ; i++) {
                $("#result-table").append("<tr><td><strong>" + parseInt(i + 1) + "</strong></td><td><strong>" + data[i].code + "</strong></td><td><strong>" + data[i].name + "</strong></td><td><strong>" + data[i].genre + "</strong></td><td><strong>" + data[i].cd + "</strong></td><td><button type='button' onclick='orderNowBtn();'>Order Now!</button></td></tr>");
            }
        },
        //inform user something goes wrong
        error: function (response) {
            alert("Error: " + response.status + ' ' + response.statusText + ' ');
        }
    });
    return false;
};

//redirect user to order form page
function orderNowBtn() {
    window.location = "/sales/form/pc-games-booking";
}