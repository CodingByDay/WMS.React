import axios from 'axios';

const StockService  =  {

    async getStock(params) {
       const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=str&pars=${params}&i=web`)
       return response.data;
    },  


    async getWarehouses() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=wh&pars=95&i=web`)
        return response.data;
    },


    async getLocations(warehouse) {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=lo&pars=${warehouse}&i=web`)
        return response.data;
    },

    async getIdents() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=idx&i=web`)
        return response.data;
    }
}

export default StockService;