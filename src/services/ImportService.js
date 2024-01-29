import axios from 'axios';



const ImportService  =  {

    
    async  insertSQLQuery(sqlQuery, parameters) {
        parameters = parameters.filter((obj, index, array) => {
          // Check if the index of the current object is the first occurrence of the object with the same 'Name'
          return index === array.findIndex(item => item.Name === obj.Name);
        });
        const apiUrl = `${process.env.REACT_APP_API_URL}/Services/Device/?mode=sql&type=sel`; 
        const requestObject = {
          SQL: sqlQuery,
          Parameters: parameters,
        };
        try {
          const response = await axios.post(apiUrl, JSON.stringify(requestObject), { 
            headers: {
              'Content-Type': 'application/json'
            }
          });

          console.log(response);
          
          if (response.data.Success) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        }   
      },
}

export default ImportService;