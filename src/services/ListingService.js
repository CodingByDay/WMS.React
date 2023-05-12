import axios from 'axios';


const ListingService  = {

    async getAllListings() {
       const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=ooa&i=web`)
       return response.data;
      }
    
}



export default ListingService