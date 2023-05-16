import axios from 'axios';


const SortingService  = {

    async getAllDocumentTypes() {
       const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=dt&pars=E|&i=web`)
       return response.data;
      },



    
}



export default SortingService;