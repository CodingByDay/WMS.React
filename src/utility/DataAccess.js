

const DataAccess  =  {



    /* Method that searches the json */
    getData(data, name, type) {
        for(var i = 0; i < data.Properties.Items.length; i++) { 
            if(data.Properties.Items[i].Name === name) {
                return data.Properties.Items[i][type];
            }
        }
        return "";
    },

  

    setDataSelected(data,  value) {
        var result = this.getData(data, "Chosen", "StringValue")

        for(var i = 0; i < data.Properties.Items.length; i++) { 
            if(data.Properties.Items[i].Name === "Chosen") {
                data.Properties.Items.splice(i, 1);
            }
        }

        data.Properties.Items.push({Name: "Chosen", StringValue: value}) 
 
        return data;
    }
  
}

export default DataAccess;