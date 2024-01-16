import axios from 'axios';


const SettingsService  = {

  async  executeSQLQuery(sqlQuery, parameters) {
    const apiUrl = `${process.env.REACT_APP_API_URL}/Services/Device/?mode=sql&type=sel`; 
    const requestObject = {
      SQL: sqlQuery
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
      console.error("Error in executeSQLQuery:", error);
      return [];
    }
  },


async executeSQLQueryBatch(data) {

  var toReturn = {}
  for(const accessor in data) {
    if (data.hasOwnProperty(accessor)) {

        const popupSelect = data[accessor];
        const apiUrl = `${process.env.REACT_APP_API_URL}/Services/Device/?mode=sql&type=sel`; 
        const requestObject = {
          SQL: popupSelect
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
            return toReturn[accessor] == dataReturn;
          } else {
            return toReturn[accessor] == [];

          }
        } catch (error) {
          return toReturn[accessor] == [];
        }
  }}

  
  },










  

    async getSettingsData(url) {
      const response =  await axios.get(process.env.REACT_APP_API_URL + url)   
      return response.data;
    },



}



export default SettingsService