

const DataAccess  =  {



    /* Method that searches the json */
    getData(data, index, name, type) {
        var pool = data.Items[index];
        for(var i = 0; i < pool.Properties.Items.length; i++) { 
            if(pool.Properties.Items[i].Name == name) {
                return pool.Properties.Items[i][type];
            }
        }
        return "";
    }
}

export default DataAccess;