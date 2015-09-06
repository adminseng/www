$(document).ready(function () {
    //retrieve the value inside $_GET
    var $_GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });
    var keyword = $_GET["q"];

    $.getJSON("result.txt", function (data) {
        $("#search-result").html("");
        $.each(data, function () {
            if (this.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                buildHTMLScript(this);
            }
        });
        if ($("#search-result").children().length <= 0) {
            $("#search-result").append("<div class='alert alert-error' align='center'><strong>No Result Found, Please Try Again!</strong></div>");
        }
    });
});

$("#form-search").submit(function () {
    $("#search-result").html("<div align='center'><img alt='Loading' src='/img/sales/db-load.gif'/></div>");
    //retrieve the value inside $_GET
    var $_GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });
    var keyword = $_GET["q"];
    //load a local text file as JSON object into variable "data"
    $.getJSON("result.txt", function (data) {
        $("#search-result").html("");
        $.each(data, function () {
            //compare the keyword with title of data object
            if (this.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                buildHTMLScript(this);
            }
        });
        if ($("#search-result").children().length <= 0) {
            $("#search-result").append("<div class='alert alert-error' align='center'><strong>No Result Found, Please Try Again!</strong></div>");
        }
    });
});

//a function to build the HTML script
function buildHTMLScript(data) {
    $("#search-result").append(
                    "<div class='row'>" +
                    "<div class='span12'>" +
                    "<img class='responsive pull-left img-rounded' alt=" + data.title + " style='width: 300px; height: 160px;margin: 10px 10px 10px 10px;' src='" + data.img + "'> " +
                    "<h2>" + data.title + "</h2>" +
                    "<p>" + data.description + "</p>" +
                    "<a href='" + data.location + "' class=' btn btn-primary'>Go Now</a>" +
                    "</div>" +
                    "</div>" +
                    "<br/>");
}