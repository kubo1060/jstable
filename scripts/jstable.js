/*
* Name: Simple JSTable
* Author: Jakub Ondrejkovic - pilot1060@gmail.com
*/

function CreateTable(options) {
    $.getJSON(options.jsonUrl, function (data) {
    }).done(function (data) {
        //var pageSize = 5;
        var pageSize = [];
        pageSize[options.id] = options.pageSize;
        //console.log(pageSize["table-1"])

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
            var range = GetPageRange(page, options.id);
            console.log(range);

            $.each($(data), function (index, value) { 
                var tdDataString = '';
                for (var i = 0; i < cols.length; i++) {
                    tdDataString += "<td>" + data[index][cols[i]] + "</td>"
                };
                $("#" + options.id + " > tbody:last-child").append("<tr>" + tdDataString + "</tr>");
            });
            $("#" + options.id).find("tr:gt(0)").hide().slice(range[0], range[1]).show();
            CreatePagination();
        };

        function ShowPage(tableid, pageno) {
            $("#" + tableid).find("tr:gt(0)").show();
            var range = [];
            //tableRowsCount = $("#" + tableid + " tr").length;
            var pageCount = Math.ceil(Object.keys(data).length / pageSize[tableid]);
            console.log(pageCount);
            if (pageno == "prev") { pageno = pageno - 1 }
            if (pageno == "next") { pageno = pageno + 1 }
            if (pageno == "last") { pageno = pageCount }

            if (pageno >= 0 && pageno <= pageCount ) {
                range = GetPageRange(pageno, tableid);
                $("#" + tableid).find("tr:gt(0)").hide().slice(range[0], range[1]).show();
            }
            console.log("In Show Page--------");
            console.log("ID: " + tableid + ", Page: " + pageno + ", Pages: " + range[0] + "-" + range[1]);
        }

        function GetPageRange(page, tableid) {
            var range = [];
            range[0] = pageSize[tableid] * page - page;
            range[1] = range[0] + pageSize[tableid];
            console.log(pageSize[tableid]);
            /*
            range[0] = pageSize * page - page;
            range[1] = range[0] + pageSize;*/
            console.log("GetPageRange returned: " + range[0] + " - " + range[1])
            return range
        };

        function CreatePagination() {
            var pageCount = Math.ceil(Object.keys(data).length / pageSize[options.id]);
            $("#" + options.divId).append("<ul id=\"" + options.id + "-paginator" + "\" class=\"pagination\"></ul>");
            $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\""+options.id+"-li-0\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"0\" id=\"" + options.id + "-chpage-0\">First</a></li>");
            $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\"" + options.id + "-li-prev\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"prev\" id=\"" + options.id + "-chpage-prev\">Previous</a></li>");
            for (var i = 0; i < pageCount; i++) {
                $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\"" + options.id + "-li-" + i + "\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"" + i + "\" id=\"" + options.id + "-chpage-" + i + "\">" + i + "</a></li>");
            }
            $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\"" + options.id +"-li-next\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"next\" id=\"" + options.id + "-chpage-next\">Next</a></li>");
            $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\"" + options.id + "-li-last\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"last\" id=\"" + options.id + "-chpage-last\">Last</a></li>");

            $("#" + options.id + "-paginator.pagination li a.page-link").click(function () {
                $(this).parent().addClass("active");
                console.log("You clicked element: " + this.id + ", data-content: " + $(this).attr("page") + " for table: " + $(this).attr("tbl-id"));
                ShowPage($(this).attr("tbl-id"), $(this).attr("page"));
            }); 
        };

        ShowData(pageNumber, null);
    });
    
};
