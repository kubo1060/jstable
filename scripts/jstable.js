/*
* Name: Simple JSTable
* Author: Jakub Ondrejkovic - pilot1060@gmail.com
*/

//function GenerateTable(hlightCol, hlightStr, hlightType,tableId, searchFormId, pageSize, jsonApiUrl, paginationSelector, hideCol) {
function CreateTable(myTable) {
    $.getJSON(myTable.tableJsonData, function (jsonData) {
        /*
         * Variables for general properties 
         */

        /*
         * Creating DOM objects and their nested objects including properties, simply creating table, thead, tbody dynamically
         */

        var tableObj = document.createElement("table");
        tableObj.id = myTable.tableId;
        tableObj.className = 'table';

        var tableObjBody = document.createElement("tbody");

        var tableObjHead = document.createElement("thead");

        document.getElementById(myTable.tableDivId).appendChild(tableObj);
        document.getElementById(tableObj.id).appendChild(tableObjHead);

        document.getElementById(tableObj.id).appendChild(tableObjBody);

        //document.getElementById()
        //tableDiv = myTable.tableDivId;
        //var tableDiv = $("#" + myTable.tableDivId)


        $("#" + tableObj.id + " > tbody").empty();
        $("#" + tableObj.id + " > thead").empty();

        /*
        var itemsOnPage = pageSize;
        if (Object.keys(jsonData).length === 0) {
            if ($("#" + tableId + "Div").hasClass("visible") === true && $("#" + tableId + "Div").hasClass("invisible") === false )
            $("#" + tableId + "Div").removeClass('visible');
            $("#" + tableId + "Div").addClass('invisible');
            
        }
        else {
            $("#" + tableId + "Div").removeClass('invisible');
            $("#" + tableId + "Div").addClass('visible');
        }

        if (Object.keys(jsonData).length <= pageSize) {
            $(paginationSelector).removeClass('visible');
            $(paginationSelector).addClass('invisible');
        }

        else
        {
            $(paginationSelector).removeClass('invisible');
            $(paginationSelector).addClass('visible');
        }
        */
        //$("td:eq(" + hideCol +")").hide();
        /*$("#" + tableId + " tr").each(function (index, trow) {
            curRow = $(trow);
            console.log("iterating...");
        });        //console.log(Object.keys(jsonData.result).length);*/

        var json = jsonData; 
        //console.log(json);
        //console.log('Table: ' + tableId + 'SearchFormID: ' + searchFormId + 'paginationSelector: ' + paginationSelector);

        /******** Filter Functions *******/
        /*$("#" + searchFormId + "").on("keyup", function () {
            ClickedPage();
            var value = $(this).val().toLowerCase();
            $("#" + tableObj.id + " tr").not('thead tr').filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });*/

        /******** Table Functions *******/
        //Ziskavam pole sltpcov, aby nazvy stlpcov v tabulke boli dynamicke
        var cols = [];
        var i = 0;
        cols.empty;
        $.each(json.slice(Object.keys(json).length - 1), function (key, value) {
            $.each(value, function (key, value) {
                cols[i] = key;
                i = i + 1;
            });
        });
        console.log("Cols content: " + cols)

        //Appendovanie riadkov do tabulky a dynamickym generovanim stlpcov
        var colsLength = cols.length;
        var tdArrayString = '';
        console.log("Cols size: " + colsLength);
        for (var i = 0; i < colsLength; i++) { tdArrayString += "<th>" + cols[i] + "</th>" };
        $("#" + tableObj.id + " >thead").append("<tr>" + tdArrayString + "</tr>");
        //console.log('String sltpca' + tdArrayString);

        //cyklus for prebehne cez cols pole, kde su nazvy stlpcov a vdaka nim ziska data do prislusnej bunky
        $.each($(json), function (index, value) {
            var tdDataString = '';
            for (var i = 0; i < cols.length; i++) { tdDataString += "<td>" + json[index][cols[i]] + "</td>" };
            //console.log("DataString: " + tdDataString);
            $("#" + tableObj.id + " > tbody:last-child").append("<tr>" + tdDataString + "</tr>");
        });

        //Zvyraznovanie riadku podla stlpca a jeho hodnoty
        /*
        var rowCount = 0;
        $("#" + tableObj.id + " tr").each(function (index, trow) {
            curRow = $(trow);
            var $tds = curRow.find('td');
            rowCount = index;
            if ($.trim(curRow.find("td:eq(" + hlightCol + ")").html()).includes(hlightStr) == true) {
                $(curRow).addClass(hlightType);
            }
        });*/

        /******** Pager Functions ********
         * rowCount = pages cout
         * ClickedPage = function onclick specific page
         * pageNumber = desired page number */
        //var itemsOnPage = pageSize;
        //console.log(itemsOnPage);
        //var paginator = "#selector";

        /*$(function () {
            $(paginationSelector).pagination({
                items: rowCount,
                itemsOnPage: itemsOnPage,
                cssStyle: 'dark-theme',
                onPageClick: ClickedPage,
            });
        });

        var initStopIndex = 0 + itemsOnPage;
        PageShow(tableObj.id, null, 0, initStopIndex);
        function ClickedPage(pageNumber) {
            var pageNumber = $(paginationSelector).pagination('getCurrentPage');
            var startIndex = itemsOnPage * pageNumber - itemsOnPage;
            stopIndex = startIndex + itemsOnPage;

            PageShow(tableObj.id, null, startIndex, stopIndex);
        };

        function PageShow(id, items, fromRow, toRow) {
            var items = $("#" + tableObj.id + " tbody tr");
            items.hide().slice(fromRow, toRow).show();
        };*/
    });
};
//GenerateTable(3, 'false', 'table', 'input', 5);
              /* setInterval(function () {
                   GenerateTable();
                   console.log('Calling Table...');
               }, 5000);*/
