import axios from "axios";

const StockService = {
  async executeSQLQuery(sqlQuery, parameters) {
    const apiUrl = `${process.env.REACT_APP_API_URL}/Services/Device/?mode=sql&type=sel`;
    const requestObject = {
      SQL: sqlQuery,
      Parameters: parameters,
    };

    try {
      const response = await axios.post(apiUrl, JSON.stringify(requestObject), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.Success) {
        const dataPacket = response.data.Rows;
        const dataReturn = dataPacket.map((item) => {
          const toAdd = {};
          for (const key in item.Items) {
            if (item.Items.hasOwnProperty(key)) {
              const value = item.Items[key];
              toAdd[key] = value;
            }
          }
          return toAdd;
        });
        return dataReturn;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },

  async getStock(params) {
    const response = await axios.get(
      process.env.REACT_APP_API_URL +
        `/Services/Device/?mode=list&table=str&pars=${params}&i=web`,
    );
    return response.data;
  },

  async getWarehouses() {
    const response = await axios.get(
      process.env.REACT_APP_API_URL +
        `/Services/Device/?mode=list&table=wh&i=web`,
    );
    return response.data;
  },

  async getLocations(warehouse) {
    const response = await axios.get(
      process.env.REACT_APP_API_URL +
        `/Services/Device/?mode=list&table=lo&pars=${warehouse}&i=web`,
    );
    return response.data;
  },

  async getIdents() {
    const response = await axios.get(
      process.env.REACT_APP_API_URL +
        `/Services/Device/?mode=list&table=idx&i=web`,
    );
    return response.data;
  },
};

export default StockService;
