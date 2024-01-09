import axios from 'axios';


const SettingsService  = {

    
    async getSettingsData(url) {
      const response =  await axios.get(process.env.REACT_APP_API_URL + url)   
      return response.data;
    },



}



export default SettingsService