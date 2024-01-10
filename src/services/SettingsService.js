import axios from 'axios';


const SettingsService  = {

  async executeSQLQuery(sqlQuery, parameters) {
    const apiUrl = `${process.env.REACT_APP_API_URL}/Services/Device/?mode=sql&type=sel`; 

    try {
      const response = await axios.get(apiUrl, {
    
          "SQL": "select * from uwmssetting"
        
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

    async getSettingsData(url) {
      const response =  await axios.get(process.env.REACT_APP_API_URL + url)   
      return response.data;
    },



}



export default SettingsService