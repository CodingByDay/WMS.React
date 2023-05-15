const TableBody = (props) => {

    var tableData = props.tableData;

    try {
        var len = tableData.Items.length;
    } catch (e) {
        return null;
    }

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
      {tableData.Items.map((data) => {
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



   