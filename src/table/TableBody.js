const TableBody = (props) => {
   
    var tableData = props.tableData;

    try {

        var len = tableData.Items.length;

    } catch (e) {

        return null;

    }

tableData = tableData.Items.filter((data) => {

    if(typeof props.sort == "undefined") {
        return true;
    }

    var term = props.sort.type.toLowerCase();;
    var field = data.Properties.Items[7]["StringValue"].toLowerCase();
    if (!field.includes(term) &&term!="") {
        return false;
    }
        return true; 

}).filter((data) => {
    if(typeof props.sort == "undefined") {
        return true;
    }
    var term = props.sort.document.toLowerCase();;
    var field = data.Properties.Items[8]["StringValue"].toLowerCase();
    if (!field.includes(term) &&term!="") {
        return false;
    }
        return true; 
 }).filter((data) => {
    if(typeof props.sort == "undefined") {
        return true;
    }
    var term = props.sort.warehouse.toLowerCase();
    var field = data.Properties.Items[1]["StringValue"].toLowerCase();
    if (!field.includes(term) &&term!="") {
        return false;
    }
        return true; 
 }).filter((data) => {
    if(typeof props.sort == "undefined") {
        return true;
    }
    var term = props.sort.consignee.toLowerCase();
    var field = data.Properties.Items[0]["StringValue"].toLowerCase();
    if (!field.includes(term) &&term!="") {
        return false;
    }
        return true; 
 }).filter((data) => {
    console.log(data);
    if(typeof props.sort == "undefined") {
        return true;
    }
    var term = props.sort.client.toLowerCase();
    var field = data.Properties.Items[13]["StringValue"].toLowerCase();
    if (!field.includes(term) && term != "") {
        return false;
    }
        return true; 
 });




    var columns = props.columns;
    var returnRow = props.returnRow;

    function getColumn(accessor) {
        for(var i = 0; i < columns.length; i++) {
            if(columns[i].accessor == accessor) {
                return columns[i];
            }
        }
    }

    const getColumnData = event => {
        var parent = event.target.parentElement;
        returnRow(parent);
    }

    return (
     <tbody>
      {
      
      
     tableData.map((data) => {

       



       return (
        <tr onClick={getColumnData}>
        { columns.map(({ accessor }) => {
        var column = getColumn(accessor);
        var type = "StringValue";  
        if (column.type=== "string") {
            type = "StringValue";
        } else if (column.type=== "int") {
            type = "IntValue";
        } else if (column.type=== "date") {
            type = "DoubleValue";
        } else if (column.type=== "double") {
            type = "DoubleValue";
        } else if (column.type=== "bool") {
            type = "BoolValue";
        }
        var tData = ""
        try {
            tData = data.Properties.Items[column.id][type];
        } catch (e) {}
            return <td>{tData}</td>;
         })}
        </tr>
       );




      })}
     </tbody>
    );
   };


   export default TableBody;



   