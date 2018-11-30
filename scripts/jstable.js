/*
* Name: Simple JSTable
* Author: Jakub Ondrejkovic - pilot1060@gmail.com
*/

//function GenerateTable(hlightCol, hlightStr, hlightType,tableId, searchFormId, pageSize, jsonApiUrl, paginationSelector, hideCol) {
function CreateTable(myTable) {
    $.getJSON(myTable.tableJsonData, function (jsonData) {

        /*
         * 
         * Variables for general properties, e.g pagesize
         * 
         */

        var pageSize = 5;   //Page size default value is 5, if not set explicitly using myTable.tablePageSize
        if (myTable.tablePageSize && myTable.tablePageSize > 0) {
            pageSize = myTable.tablePageSize;
        }

        /*
         * 
         * Creating DOM objects and their nested objects including properties, simply creating table, thead, tbody
         * 
         */

        var filterInput = document.createElement("input");  //Object for input form to perform a filter and its properties
        filterInput.style.backgroundColor = 'transparent';
        filterInput.style.border = 'none';
        filterInput.placeholder = "Search...";

        var paginatorDiv = document.createElement(myTable.tableId + "-paginator");  //paginator id is a tableId+"-paginator"

        var tableObj = document.createElement("table");     //Creating table element in a div specified by myTable.tableId
        tableObj.id = myTable.tableId;                      //Assigning desired div id to a table element
        tableObj.className = myTable.tableStyleClass;       //Applying class

        var tableObjBody = document.createElement("tbody"); //Creating table body
        var tableObjHead = document.createElement("thead"); //Creating table head - this is filled automatically

        document.getElementById(myTable.tableDivId).appendChild(filterInput);
        document.getElementById(myTable.tableDivId).appendChild(tableObj);
        document.getElementById(myTable.tableDivId).appendChild(paginatorDiv);
        document.getElementById(tableObj.id).appendChild(tableObjHead);
        document.getElementById(tableObj.id).appendChild(tableObjBody);

        /*
         * 
         * CreateTable main part - creating column names, rows...
         * 
         */

        var cols = [];
        var tdArrayString = '';
        var i = 0;   
        cols.empty;
        $.each(jsonData.slice(Object.keys(jsonData).length - 1), function (key, value) { //creating table head
            $.each(value, function (key, value) {
                cols[i] = key;
                i = i + 1;
            });
        });

        //Appendovanie riadkov do tabulky a dynamickym generovanim 
        console.log("Cols size: " + cols.length);
        for (var i = 0; i < cols.length; i++) { tdArrayString += "<th>" + cols[i] + "</th>" };
        $("#" + tableObj.id + " >thead").append("<tr>" + tdArrayString + "</tr>");

        FillTable(jsonData);                                //Calling table filling function

        function FillTable(data) {
            $.each($(jsonData), function (index, value) {
                var tdDataString = '';
                for (var i = 0; i < cols.length; i++) { tdDataString += "<td>" + jsonData[index][cols[i]] + "</td>" };
                //console.log("DataString: " + tdDataString);
                $("#" + tableObj.id + " > tbody:last-child").append("<tr>" + tdDataString + "</tr>");
            });
        }

        

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
        

       
        //console.log('String sltpca' + tdArrayString);

        //rows appending
        

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
