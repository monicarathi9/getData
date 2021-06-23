(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "CustomerID",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "CompanyName",
            dataType: tableau.dataTypeEnum.string
        }, 
                {
            id: "ContactName",
            dataType: tableau.dataTypeEnum.string
        }, 
        {
            id: "ContactTitle",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "Address",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "City",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "Region",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "PostalCode",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "Country",
            alias: "Country",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "Phone",
            alias: "Phone",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Fax",
            alias: "fax",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "Customers",
            alias: "Customers Data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://services.odata.org/V3/Northwind/Northwind.svc/Customers?$format=json", function(resp) {
            var feat = resp.value,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "CustomerID": feat[i].CustomerID,
                    "CompanyName": feat[i].CompanyName,
                    "ContactName": feat[i].ContactName,
                    "ContactTitle": feat[i].ContactTitle,
                    "Address": feat[i].Address,
                    "City": feat[i].City,
                    "Region": feat[i].Region,
                    "PostalCode": feat[i].PostalCode,
                    "Country": feat[i].Country,
                    "Phone": feat[i].Phone,
                    "Fax": feat[i].Fax
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Customers Data"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
