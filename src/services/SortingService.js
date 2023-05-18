import axios from 'axios';


const StockService  = {
    async getAllDocumentTypes() {
       const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=dt&i=web`)
       return response.data;
    },  
}


export default StockService;