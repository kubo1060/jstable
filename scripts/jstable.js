/*
* Name: Simple JSTable
* Author: Jakub Ondrejkovic - pilot1060@gmail.com
*/

function CreateTable(options) {
    $.getJSON(options.jsonUrl, function (data) {
    }).done(function (data) {
        var pageSize = 5;
        var pageNumber = 0;
        $("#" + options.divId).append("<table id=\"" + options.id + "\" class=\"" + options.styleClass + "\"></table>");
        $("#" + options.id).append("<thead></thead>");
        $("#" + options.id).append("<tbody></tbody>");

        var cols = [], i = 0;
        $.each(data.slice(Object.keys(data).length - 1), function (key, value) { //creating table head
            $.each(value, function (key, value) {
                cols[i] = key;
                i = i + 1;
            });
        });

        var tdArrayString = '';
        for (var i = 0; i < cols.length; i++) { tdArrayString += "<th>" + cols[i] + "</th>" };
        $("#" + options.id + " >thead").append("<tr>" + tdArrayString + "</tr>");

        function ShowData(page, filter) {
            var range = GetPageRange(page);
            console.log(range);
           // $(data).show();

            $.each($(data), function (index, value) { //.hide().slice(range[0],range[1]).show()
                var tdDataString = '';
                for (var i = 0; i < cols.length; i++) {
                    tdDataString += "<td>" + data[index][cols[i]] + "</td>"
                };
                $("#" + options.id + " > tbody:last-child").append("<tr>" + tdDataString + "</tr>");
            });
            $("#" + options.id).find("tr:gt(0)").hide().slice(range[0], range[1]).show();
            CreatePagination();
        };

        function GetPageRange(page) {
            var range = [];
            range[0] = pageSize * pageNumber - pageNumber;
            range[1] = range[0] + pageSize ;
            return range
        };

        function CreatePagination() {
            var pageCount = Math.ceil(Object.keys(data).length / pageSize);
            $("#" + options.divId).append("<ul id=\"" + options.id + "-paginator" + "\" class=\"pagination\"></ul>");
            $("#" + options.id + "-paginator").append("<li class=\"page-item\"><a class=\"page-link\">First</a></li>");
            $("#" + options.id + "-paginator").append("<li class=\"page-item\"><a class=\"page-link\">Previous</a></li>");
            for (var i = 0; i < pageCount; i++) {
                console.log("Heej " + i );
                $("#" + options.id + "-paginator").append("<li class=\"page-item\"><a class=\"page-link\">" + i + "</a></li>");
            }
            $("#" + options.id + "-paginator").append("<li class=\"page-item\"><a class=\"page-link\">Next</a></li>");
            $("#" + options.id + "-paginator").append("<li class=\"page-item\"><a class=\"page-link\">Last</a></li>");
        };
        
        ShowData(pageNumber, null);
    });
    
};
