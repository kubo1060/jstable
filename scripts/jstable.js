/*
* Name: Simple JSTable
* Author: Jakub Ondrejkovic - pilot1060@gmail.com
*/

function CreateTable(myTable) {
    $.getJSON(myTable.tableJsonData, function (jsonData) {

        /*************************************************
         * 
         * Variables for general properties, e.g pagesize
         * 
         ************************************************/

        var pageSize = 5;   //Page size default value is 5, if not set explicitly using myTable.tablePageSize
        if (myTable.tablePageSize && myTable.tablePageSize > 0) {
            pageSize = myTable.tablePageSize;
        }

        var currentPage = 0;

        /*************************************************
         * 
         * Creating DOM objects and their nested objects including properties, simply creating table, thead, tbody
         * 
         ************************************************/

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

        document.getElementById(myTable.tableDivId).appendChild(filterInput);   //Filter form append
        document.getElementById(myTable.tableDivId).appendChild(tableObj);  //table created from defined tableObj.id
        document.getElementById(myTable.tableDivId).appendChild(paginatorDiv);  //Appending paginator div
        document.getElementById(tableObj.id).appendChild(tableObjHead); //Table head
        document.getElementById(tableObj.id).appendChild(tableObjBody); //Table body

        
        /*************************************************
         * 
         * CreateTable main part - creating column names, rows...
         * 
         ************************************************/

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

        FillTable(jsonData);    //Filling table with data in jsonData object array

        /*************************************************
         * 
         * Functions 
         * 
         ************************************************/

        function ShowPage(pageNumber) {
            console.log("Showing Page: " + pageNumber);
        };
        ShowPage(5);
        function FillTable(data) {
            $.each($(jsonData), function (index, value) {
                var tdDataString = '';
                for (var i = 0; i < cols.length; i++) { tdDataString += "<td>" + jsonData[index][cols[i]] + "</td>" };
                //console.log("DataString: " + tdDataString);
                $("#" + tableObj.id + " > tbody:last-child").append("<tr>" + tdDataString + "</tr>");
            });
            CreatePagination(pageSize);
        }


        function CreatePagination(pageSize) {
            var pageCount = Math.ceil(Object.keys(jsonData).length / pageSize);
            console.log("Length of jsonData: " + pageCount);

            Clear(paginatorDiv);

            var buttonDiv = document.createElement("tablePagdiv");
            paginatorDiv.appendChild(buttonDiv);

            var buttonFirst = document.createElement("button");
            buttonFirst.id = "buttonFirst";
            buttonFirst.textContent = "First";

            var buttonPrev = document.createElement("button");
            buttonPrev.id = "buttonPrev";
            buttonPrev.textContent = "Prev";

            buttonDiv.appendChild(buttonFirst);
            buttonDiv.appendChild(buttonPrev);

            var buttons = "";
            for (i = 1; i <= pageCount; i++) {
                var button = document.createElement("button");
                button.id = "button-p-" + i;
                button.textContent = i;
                button.className = "btn";
                buttonDiv.appendChild(button);
                //buttons += "<button id=\"button" + i + "\">" + i + "</button>";
            }
            //buttonDiv.innerHTML += buttons;
            var buttonNext = document.createElement("button");
            buttonNext.id = "buttonNext";
            buttonNext.textContent = "Next";
            buttonDiv.appendChild(buttonNext);

            var buttonLast = document.createElement("button");
            buttonLast.id = "buttonLast";
            buttonLast.textContent = "Last"
            buttonDiv.appendChild(buttonLast);
        }

        function Clear(element) {
            //document.getElementById(element).innerHTML = "";
        }
    });
};

