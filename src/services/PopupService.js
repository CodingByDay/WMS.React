import axios from 'axios';
import { useEffect, useState } from "react";
import DataAccess from '../utility/DataAccess';


const PopupService  =  {
   

    async getAllDocumentTypes() {
       const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=dt&i=web`)
       return response.data;
    }, 
    
    async getAllDocumentTypeOfEvent(event) {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=dt&pars=${event}&i=web`)
        return response.data;
     }, 
    async getWarehouses() {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=wh&pars=95&i=web`)
        return response.data;
    },

    // API call to get all subject - http://wms-petpak-test.in-sist.si/Services/Device/?mode=list&table=su&pars=&device=0005&i=web
    async getSubjects() { 
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=su&pars=&i=web`)
        return response.data;
    },

    // Requires the CORS policy.
    // This is the method for setting the moveHead.
    async setMoveHead(data) { 
        const response =  await axios.post(process.env.REACT_APP_API_URL + `/Services/Device/?mode=setObj&table=mh&i=web`, data)
        return response.data;
    },

  
    async getOrderDataFromIdentAndOrderNumber(order, ident) {
        const response = await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=ook&pars=${order}&i=web`)
        var duplicates = [];
        for (var i = 0; i < response.data.Items.length; i++) {   
            var ident = DataAccess.getData(response.data.Items[i], "Ident", "StringValue");
            if(ident == ident ) {
                duplicates.push(response.data.Items[i]);
            }
        }
        if(duplicates.length <= 0) {
            return {};
        } else {
            // Delete positions with the empty openQty

            for (var i = 0; i < duplicates.length; i++) {   
                var openQty = DataAccess.getData(duplicates[i], "OpenQty", "DoubleValue");
                if (openQty == 0) {
                    duplicates.splice(i, 1);
                }
            }

        }
        if(duplicates.length <= 0) {
            return {};
        } else {
            return duplicates[0];
        }    
    }  
}


export default PopupService;