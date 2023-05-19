import DataAccess from "../utility/DataAccess";

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

    var term = props.sort.type.toLowerCase();
    
    var field = data.Properties?.Items[7]["StringValue"]?.toLowerCase();
    if (!field.includes(term) &&term!="") {
        return false;
    }
        return true; 

}).filter((data) => {
    if(typeof props.sort == "undefined") {
        return true;
    }
    var term = props.sort.document.toLowerCase();;
    var field = data.Properties?.Items[8]["StringValue"]?.toLowerCase();
    if (!field.includes(term) &&term!="") {
        return false;
    }
        return true; 
 }).filter((data) => {
    if(typeof props.sort == "undefined") {
        return true;
    }
    var term = props.sort.warehouse.toLowerCase();
    var field = data.Properties?.Items[1]["StringValue"]?.toLowerCase();
    if (!field.includes(term) &&term!="") {
        return false;
    }
        return true; 
 }).filter((data) => {
    if(typeof props.sort == "undefined") {
        return true;
    }
    var term = props.sort.consignee.toLowerCase();
    var field = data.Properties?.Items[0]["StringValue"]?.toLowerCase();
    if (!field.includes(term) &&term!="") {
        return false;
    }
        return true; 
 }).filter((data) => {

    if(typeof props.sort == "undefined") {
        return true;
    }
    var term = props.sort.client.toLowerCase();
    var field = data.Properties?.Items[13]["StringValue"]?.toLowerCase();

    if (!field.includes(term) && term != "") {
        return false;
    }
        return true; 
 }).filter((data) => {
    if(typeof props.sort == "undefined") {
        return true;
    }
    var term = props.sort.consignee.toLowerCase();

    var field = data.Properties?.Items[13]["StringValue"]?.toLowerCase();


    if (!field.includes(term) && term != "") {
        return false;
    }
        return true; 
 });




    var columns = props.columns;
    var returnRow = props.returnRow;


    function findIndex(array, accesor) {
        for(var i=0;i<array.Properties.Items.length;i++) {
        if(array.Properties.Items[i].Name == accesor) {
            return i;
        }
        }
        return -1;
    }
  
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
      
      
     tableData.map((data, index) => {
       



       return (
        <tr onClick={getColumnData}>
        { columns.map(({ accessor }) => {
        var column = getColumn(accessor);
        
        var tData = ""
        try {

            
            tData = DataAccess.getData(data, column.accessor, column.type);
          
        } catch (e) {
        }
            return <td>{tData}</td>;
         })}
        </tr>
       );




      })}
     </tbody>
    );
   };


   export default TableBody;



   