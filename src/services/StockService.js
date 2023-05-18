import axios from 'axios';

const StockService  =  {


    async get() {
       const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=dt&i=web`)
       return response.data;
    },  


    async getWarehouses() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=wh&pars=95&i=web`)
        return response.data;
    },


    async getLocations() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=loc&i=web`)
        return response.data;
    },

    async getIdents() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=loc&i=web`)
        return response.data;
    }
}

export default StockService;