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
     
    async getWarehouses(user) {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=wh&pars=${user}&i=web`)
        console.log(response);
        return response.data;
    },

    // API call to get all subject - http://wms-petpak-test.in-sist.si/Services/Device/?mode=list&table=su&pars=&device=0005&i=web
    async getSubjects() { 
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=su&pars=&i=web`)
        return response.data;
    },

    async getAllWorkOrders() { 
        var orders = [];
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=wox&i=web`)
        window.orders = response.data;
        return response.data;
    },


    async hasSerialNumberIdent(ident)
    {
        var ret = {};
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=getObj&table=id&id=${ident}&i=web`)
        var serialNumber = DataAccess.getData(response.data, "HasSerialNumber", "BoolValue")
        var sscc = DataAccess.getData(response.data, "isSSCC", "BoolValue")
        var identName = DataAccess.getData(response.data, "Name", "StringValue");
        if (typeof serialNumber !== "undefined")
        {
            if (serialNumber) {
                ret.serial = true              
            }   else {
                ret.serial = false
            }

         
        } else {
            ret.serial = false;
            
        }

        if (typeof sscc !== "undefined")
        {
            if (sscc) {

                ret.sscc = true     

            } else {

                ret.serial = false

            }

         
        } else {
            
            ret.sscc = false;
            
        }
       
      
        ret.name = identName;
        return ret;

    },



    async getDocumentTypeStringBasedOnCode(code) {
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=list&table=dt&pars=E;I;P;W;WI;N;NI;NP&i=web`)



        var data = response.data;

        for(var i = 0; i < data.Items.length; i++) {
            var currect = data.Items[i];
            var codeInternal = DataAccess.getData(currect, "Code", "StringValue")
            if (codeInternal == code ) {
                var returnString = DataAccess.getData(currect, "Name", "StringValue");
                return returnString;
            }
        }

        return "";
    },




    async commitPosition(data) {
        const response =  await axios.post(process.env.REACT_APP_API_URL + `/Services/Device/?mode=setObj&table=mi&i=web`, data)
        return response.data;
    },

    async getWorkOrderDetail(workOrder) { 
        var orders = [];
        const response =  await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=getObj&table=wo&id=${workOrder}&i=web`)
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