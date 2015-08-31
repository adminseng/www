$(document).ready(function () {
    var $_GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });
    var keyword = $_GET["q"];
    $.getJSON("result.txt", function (data) {
        $.each(data, function () {
            if (this.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                buildHTMLScript(this);
            }
        });
    });
});

$("#form-search").submit(function () {
    var $_GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });
    var keyword = $_GET["q"];
    $.getJSON("result.txt", function (data) {
        $.each(data, function () {
            if (this.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                buildHTMLScript(this);

            }
        });
    });
});


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