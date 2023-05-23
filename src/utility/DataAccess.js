

const DataAccess  =  {



    /* Method that searches the json */
    getData(data, name, type) {
        alert("data access")
        for(var i = 0; i < data.Properties.Items.length; i++) { 
            if(data.Properties.Items[i].Name == name) {
                return data.Properties.Items[i][type];
            }
        }
        return "";
    }
}

export default DataAccess;