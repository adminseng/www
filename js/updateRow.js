function retrieveData () {
    $("#result-table").html("");

    var tempGenre = $(".selectedGenre :selected").text();
    var tempCD = $(".selectedCD :selected").text();
    var tempKeyword = $("#selectedKeyword").val();
    var tempRecord = $(".selectedResult :selected").text();

    if (tempGenre == $(".selectedGenre option:first-child").text()) {
        tempGenre = "%";
    }
    if (tempCD == $(".selectedCD option:first-child").text()) {
        tempCD = "%";
    }

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
                $("#result-table").append("<tr><td>" + i+1 + "</td><td>" + data[i].index +"</td><td>" + data[i].name + "</td><td>" + data[i].genre + "</td><td>" + data[i].cd + "</td></tr>");
            }


        },
        error: function (response) {
            alert("Error: " + response.status + ' ' + response.statusText + ' ');
        }
    });
    return false;
};