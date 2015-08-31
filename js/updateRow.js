function retrieveData() {
    //clear the previous content if any
    $("#result-table").html("");

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
            for (var i = 0 ; i < data.length ; i++) {
                $("#result-table").append("<tr><td>" + parseInt(i+1) + "</td><td>" + data[i].code +"</td><td>" + data[i].name + "</td><td>" + data[i].genre + "</td><td>" + data[i].cd + "</td><td><button type='button' onclick='orderNowBtn();'>Order Now!</button></td></tr>");
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