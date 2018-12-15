/*
* Name: Simple JSTable
* Author: Jakub Ondrejkovic - pilot1060@gmail.com
* ToDos 
 * TableName - optional
 * Own column names
 * filter - realtime
*/

function CreateTable(options) {
    $.getJSON(options.jsonUrl, function (data) {
    }).done(function (data) {
        var currPage = [];
        currPage[options.id] = 1;
        var pageSize = [];
        pageSize[options.id] = options.pageSize;

        var pageNumber = 1;
        $("#" + options.divId).append("<input id=\"" + options.id + "-filter\" style=\"border: none; width: 100%; padding: 5px; text-align: center; \" placeholder=\"Search\"></input>");
        $("#" + options.divId).append("<table id=\"" + options.id + "\" class=\"" + options.styleClass + "\"></table>");
        $("#" + options.id).append("<thead></thead>");
        $("#" + options.id).append("<tbody></tbody>");

        /*$("#" + options.id + "-filter").on('change', function (f) {
            console.log("ID: " + this.id + "Value: " + this.value);
            ShowPage(options.id, currPage[options.id], this.value);
        });*/


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

            $.each($(data), function (index, value) { 
                var tdDataString = '';
                for (var i = 0; i < cols.length; i++) {
                    tdDataString += "<td>" + data[index][cols[i]] + "</td>"
                };
                $("#" + options.id + " > tbody:last-child").append("<tr>" + tdDataString + "</tr>");
            });
            CreatePagination();
            //$("#" + options.id).find("tr:gt(0)").hide().slice(range[0], range[1]).show();
            ShowPage(options.id, 1, "");
        };

        function ShowPage(tableid, pageno, filter) {
            var range = [];
            var pageCount = Math.ceil(Object.keys(data).length / pageSize[tableid]);

            if (pageno == "prev" && parseInt(currPage[tableid]) > 1) {
                pageno = parseInt(currPage[tableid]) - 1;
                Number(pageno);
                //console.log("Page Number: " + pageno + ", Curr: " + currPage[tableid]);
            }

            if (pageno == "next" && Number(currPage[tableid]) < pageCount) {
                pageno = parseInt(currPage[tableid]) + 1;
                Number(pageno);
                console.log("Page Number: " + pageno + ", Curr: " + currPage[tableid]);
            }
            else if (pageno == "last") {
                pageno = pageCount;
                Number(pageno);
            };

            if (pageno > 0 && (isNaN(pageno) != true)) {
               $("#" + tableid).find("tr:gt(0)").show();
               // $("#" + tableid + " tr:contains(" + filter + ")").hide();
                
                $("#" + tableid + "-paginator.pagination li").css("color", '');

                range = GetPageRange(pageno, tableid);
                //console.log("ShowPage: " + range[0] + " - " + range[1] + ", Pageno: " + pageno);
                currPage[tableid] = pageno;
                $("#" + tableid + "-paginator.pagination li a.page-link[page=\"" + pageno + "\"][id*='chpage']").parent().css("color", '#66ccff');
                $("#" + tableid + "-paginator.pagination li a.page-link[page=\"" + pageno + "\"][id$='chpage-first']").parent().css("color", '');

                if (filter !== undefined ) {
                    $("#" + tableid).find("tr:gt(0)").hide().slice(range[0], range[1]).show();//.toggle($(this).text().toLowerCase().indexOf(filter) > -1);
                    $("#" + tableid + " tr").not('thead tr').filter(function () {
                        $(this).toggle($(this).text().toLowerCase().indexOf(filter) > -1);
                    });
                    range = GetPageRange(currPage[tableid], tableid);
                    $("#" + tableid).find("tr:contains('" + filter + "')").hide().slice(range[0], range[1]).show();
                    console.log("Filter not empty - " + filter + " Range: " + range[0] + " - " + range[1]);
                }

                else {
                    $("#" + tableid).find("tr:gt(0)").hide().slice(range[0], range[1]).show();
                }
                //$("#" + tableid + " tr:contains(" + filter + ")").hide();
                //Hide page buttons 
                var pageCurr = currPage[tableid];
                //var pagenoHide = 0;
                //Number(pagenoHide);
                Number(pageCurr);
                console.log("pageCurr: " + pageCurr);
                $("[id^=" + tableid + "-chpage-]").show();
                $("[id^=" + tableid + "-chpage-]:not([id^=" + tableid + "-chpage-f],[id^=" + tableid + "-chpage-p],[id^=" + tableid + "-chpage-n],[id^=" + tableid + "-chpage-l],[id=" + tableid + "-chpage-" + pageCurr + "])").hide();
               
            }
        }

        function GetPageRange(page, tableid) {
            var range = [];
            range[0] = pageSize[tableid] * page - pageSize[tableid];
            range[1] = range[0] + pageSize[tableid];
            return range
        };

        function CreatePagination() {
            var pageCount = Math.ceil(Object.keys(data).length / pageSize[options.id] + 1 );
            $("#" + options.divId).append("<ul id=\"" + options.id + "-paginator" + "\" class=\"pagination\"></ul>");
            $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\""+options.id+"-li-1\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"1\" id=\"" + options.id + "-chpage-first\">First</a></li>");
            $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\"" + options.id + "-li-prev\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"prev\" id=\"" + options.id + "-chpage-prev\">Previous</a></li>");
            
            for (var i = 1; i < pageCount; i++) {
                $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\"" + options.id + "-li-" + i + "\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"" + i + "\" id=\"" + options.id + "-chpage-" + i + "\">" + i + "</a></li>");
            }
            $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\"" + options.id +"-li-next\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"next\" id=\"" + options.id + "-chpage-next\">Next</a></li>");
            $("#" + options.id + "-paginator").append("<li class=\"page-item\" id=\"" + options.id + "-li-last\"><a class=\"page-link\" tbl-id=\"" + options.id + "\" page=\"last\" id=\"" + options.id + "-chpage-last\">Last</a></li>");

            $("#" + options.id + "-paginator.pagination li a.page-link").click(function () {
                ShowPage($(this).attr("tbl-id"), $(this).attr("page"));
            }); 
        };

        $("#" + options.id + "-filter").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            ShowPage(this.id.slice(0, this.id.indexOf("-filter")), 1, value);
        });

        ShowData(pageNumber, null);
    });
    
};
