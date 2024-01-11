import axios from 'axios';


const SettingsService  = {

  async executeSQLQuery(sqlQuery, parameters) {
    var dataReturn = [];
    const apiUrl = `${process.env.REACT_APP_API_URL}/Services/Device/?mode=sql&type=sel`; 
      var requestObject = {
        SQL: sqlQuery
      }
      var requestBody = JSON.stringify(requestObject);
      axios.post(apiUrl, requestBody, {
        headers: {
            'Content-Type': 'application/json'
        }
       })
        .then(response => {
          
          if(response.data.Success) {
            var dataPacket = response.data.Rows

            for(var i = 0;i < dataPacket.length;i++) {
                var toAdd = {}
                var item = dataPacket[i].Items;
                for(let key in item) {              
                  if(item.hasOwnProperty(key)) {
                    const value = item[key];
                    toAdd[key] = value;
                  }
                }
                dataReturn.push(toAdd);
                
            }
          } else {
            return []
          }
        })
        .catch(error => {
          return dataReturn;
        });
      
      return dataReturn;
  },

    async getSettingsData(url) {
      const response =  await axios.get(process.env.REACT_APP_API_URL + url)   
      return response.data;
    },



}



export default SettingsService