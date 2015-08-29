function retrieveData () {
    $("#result-table").html("");

    var tempGenre = $(".selectedGenre :selected").val();
    var tempCD = $(".selectedCD :selected").val();
    var tempKeyword = $("#selectedKeyword").val();
    var tempRecord = $(".selectedResult :selected").val();


    var data = {
        "genre": tempGenre,
        "cd": tempCD,
        "keyword": tempKeyword,
        "numberRecords": tempRecord

    };
        
    data = $(this).serialize() + "&" + $.param(data);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/php/pc-games-db-connect.php",
        data: data,
        success: function (data) {
            for (var i = 0 ; i < data.length ; i++) {
                $("#result-table").append("<tr><td>" + i+1 + "</td><td>" + data[i].code +"</td><td>" + data[i].name + "</td><td>" + data[i].genre + "</td><td>" + data[i].cd + "</td><td><button type='button' onclick='orderNowBtn();'>Order Now!</button></td></tr>");
            }


        },
        error: function (response) {
            alert("Error: " + response.status + ' ' + response.statusText + ' ');
        }
    });
    return false;
};

function orderNowBtn() {
    window.location = "/sales/form/pc-games-booking";
}