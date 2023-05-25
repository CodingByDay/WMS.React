import axios from 'axios';


const TransactionService  = {

     async getCorrectDataBusinessEvents (arr) {
           var type = []
           var names = []
           var columnNames = ['Code', 'Name']
           for (var j = 0;j<arr.Items.length;j++) {
               var code = arr.Items[j].Properties.Items[0].StringValue
               var name = arr.Items[j].Properties.Items[1].StringValue
               type.push(code)
               names.push(name)
            }
        return {type: type, names: names}
   },


   async getAllDocumentTypes() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=dt&i=web`)
        return await this.getCorrectDataBusinessEvents( response.data );
    },  



    async getAllDocumentTypes() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=dt&i=web`)
        return await this.getCorrectDataBusinessEvents( response.data );
    },  

    async getAllTransactions() {

        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=mh&i=web`)
        


        return response.data;
    },

    async getPositionsByHeadId(headId) {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=mi&pars=${headId}&i=web`)
        return response.data;
    },
    
    async getClients() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=su&i=web`)
        return response.data;
    },
 

    async getErpKeys() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=erp&i=web`)
        return response.data;
    },


    async getIdents()
    {

        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=idx&i=web`)
        return response;
    }

}



export default TransactionService;