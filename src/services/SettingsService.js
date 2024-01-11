import axios from 'axios';


const SettingsService  = {

  async executeSQLQuery(sqlQuery, parameters) {
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

        })
        .catch(error => {

        });
      return 1;
    
  },

    async getSettingsData(url) {
      const response =  await axios.get(process.env.REACT_APP_API_URL + url)   
      return response.data;
    },



}



export default SettingsService