import axios from "axios";
import SettingsService from "./SettingsService";

/**
 * Same seven data columns as legacy grid (+ acKey for positions API).
 * Add acStatus to the SELECT when your view exposes it, then map stays in sync.
 */
const LISTING_OPEN_ORDERS_SQL = `
SELECT acKey, acWarehouse, acConsignee, adDeliveryDeadline, acDocType, acReceiver
FROM uvWMSOpenOrder
`.trim();

const ListingService = {
  async getAllListings() {
    const rows = await SettingsService.executeSQLQuery(
      LISTING_OPEN_ORDERS_SQL,
      [],
    );
    window.items = { rows, fromSql: true };
    return { rows: Array.isArray(rows) ? rows : [], fromSql: true };
  },

  async deleteHeadDocumentOrder(id) {
    //  Brisanje dokumenta.
    const response = await axios.get(
      process.env.REACT_APP_API_URL +
        `/Services/Device/?mode=deleteOrder&key=${id}`,
    );
    return response;
  },

  async createOrder(data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + `/Services/Device/?mode=createOrder`,
      data,
    );
    return response.data;
  },

  async deletePosition(id) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL +
        `/Services/Device/?mode=deleteOrderItem&itemID=${id}`,
    );
    return response.data;
  },

  async createPosition(data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + `/Services/Device/?mode=setOrderItem`,
      data,
    );
    return response.data;
  },

  async updatePosition(data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + `/Services/Device/?mode=setOrderItem`,
      data,
    );
    return response.data;
  },

  async changeStatus(orderNumber, status, user) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL +
        `/Services/Device/?mode=setOrderStatus&key=${orderNumber}&status=${status}&clerk=${user}`,
    );
    return response.data;
  },
  async getAllPositions(order) {
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );

    const response = await axios.get(
      process.env.REACT_APP_API_URL +
        `/Services/Device/?mode=list&table=ook&pars=${order}&i=web`,
    );

    return response.data;
  },
};

export default ListingService;
