import axios from 'axios';


const ListingService  = {

    async getAllListings() {

    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
        }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
        });

        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=ooa&i=web`)

        window.items = response.data;
        return response.data;
        
      },

    async getAllPositions(order) {

        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
          }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
          
        const response = await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=ook&pars=${order}&i=web`)

        

        return response.data;      

    }  
}



export default ListingService