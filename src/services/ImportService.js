import axios from 'axios';



const ImportService  =  {


      async getAllDocumentTypes() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=dt&i=web`)
        return response.data;
      },  


      
    async getWarehouses() {
      const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=wh&i=web`)
      return response.data;
    },


    async  executeSQLQuery(sqlQuery, parameters) {
      const apiUrl = `${process.env.REACT_APP_API_URL}/Services/Device/?mode=sql&type=sel`; 
      const requestObject = {
        SQL: sqlQuery,
        Parameters: parameters
      };
    
      try {

        const response = await axios.post(apiUrl, JSON.stringify(requestObject), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    

        if (response.data.Success) {
          const dataPacket = response.data.Rows;
          const dataReturn = dataPacket.map(item => {
            const toAdd = {};
            for (const key in item.Items) {
              if (item.Items.hasOwnProperty(key)) {
                const value = item.Items[key];
                toAdd[key] = value;
              }
            }
            return toAdd;
          });       
          return dataReturn;
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    },

    
    async  insertSQLQuery(sqlQuery, parameters) {
        parameters = parameters.filter((obj, index, array) => {
          // Check if the index of the current object is the first occurrence of the object with the same 'Name'
          return index === array.findIndex(item => item.Name === obj.Name);
        });
        const apiUrl = `${process.env.REACT_APP_API_URL}/Services/Device/?mode=sql&type=sel`; 
        const requestObject = {
          SQL: sqlQuery,
          Parameters: parameters,
        };
        try {
          const response = await axios.post(apiUrl, JSON.stringify(requestObject), { 
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.data.Success) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }   
      },
}

export default ImportService;