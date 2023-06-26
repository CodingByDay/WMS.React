
import $ from 'jquery'; 
import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { useEffect, useState } from "react";
import Select from 'react-select'
import _ from 'lodash';
import TransactionService from '../services/TransactionService';
import { Dropdown, Stack } from '@fluentui/react'
import DataAccess from '../utility/DataAccess';
import PopupService from '../services/PopupService';


export default function Add(props) { 

    const [ident, setIdent] = useState([]);
    const [identList, setIdentsList] = useState([]);
    const [transactionData, setTransactionData] = useState({});
    const [orderData, setOrderData] = useState([]);
    const [documentTypeString, setDocumentTypeStringValue] = useState("");
    const [orderCurrent, setOrderCurrent] = useState([]);




    useEffect(() => {

        var idents = TransactionService.getIdents().then(response=> { 

            var identObjects = []
            identObjects.push({value: '', label: ''})
            // This is the place to check if all of the idents are correctly rendered.
            for(var i=0;i<response.data.length;i++) {
              identObjects.push({label: response.data[i],  value: response.data[i]});
            }
            window.identity = identObjects;
            setIdentsList(identObjects);

          });




          if(typeof props.selected.childNodes!== "undefined") {


            // Continue here tomarow.


            var rowProperty = {};

            for(var i=0;i<props.selected.childNodes.length;i++) { 
                rowProperty[`${props.selected.childNodes[i]}`] = props.selected.childNodes[i].innerHTML;
            }    

  

            setTransactionData(rowProperty)


        }






}, [ident]);



    function findValueByClassWithinArray(array, classNameValue) {

        for (var i = 0; i < array.length; i++) {
            var currentObject = array[i];
            if(currentObject.className === classNameValue) {
                return currentObject.innerHTML;
            }
        }
        
        
        return "";
        
    }



    function onChangeIdent(e) {
        document.getElementById("positionNumber").value = "";
        document.getElementById("openQty").value = "";
        document.getElementById("deadlineDate").value = "";
        setIdent({label: e.value, value: e.value });
        updateOrders(e.value);
    }

    function onChangeOrder(e) {
        
        setOrderCurrent({label: e.key + " poz. " + e.no, value: e.key+ " poz. " + e.no, key: e.key, no: e.no, deadline: e.deadline });
        document.getElementById("positionNumber").value = "";
        document.getElementById("openQty").value = "";
        document.getElementById("deadlineDate").value = "";
        var ident = document.getElementById("identListControl").innerText;
        // Correct data gets to the service
        PopupService.getOrderDataFromIdentAndOrderNumber(e.key, ident).then(response => { 
            window.orderTest = response;
            var qty = DataAccess.getData(response, "OpenQty", "DoubleValue");
            var deadline = new Date( DataAccess.getData(response, "DeliveryDeadline", "DateTimeValue")) .toLocaleDateString();
            var no = DataAccess.getData(response, "No", "IntValue");
            document.getElementById("positionNumber").value = no;
            document.getElementById("openQty").value = qty;
            document.getElementById("deadlineDate").value = deadline;


            // Test the result
        });
           
    }

    function updateOrders(ident) { 
        // Continue here.
        var type =  findValueByClassWithinArray(props.selected.childNodes, "DocumentType");
        TransactionService.getOrdersForIdent(ident, type).then(response => { 

            var items = []
            items.push({value: '', label: '', key: ''})

            for(var i = 0; i < response.Items.length;i++) {
                var item = response.Items[i]    
                var key = DataAccess.getData(item, "Key", "StringValue")
                var no = DataAccess.getData(item, "No", "IntValue");
                var deadline = DataAccess.getData(item, "DeliveryDeadline", "DateTimeValue" )



                items.push({label: key + " poz. " + no, value: key+ " poz. " + no, key: key, no: no, deadline: deadline})            
                // Test this

            }             
            setOrderData(items)
            // Multi column place for the data collection //
        });

    }




    if(props.show) {

        
        $("#edit").css("display", "block");

        var rowProperty = {};
        if(typeof props.selected.childNodes!== "undefined") {  
            var headId = findValueByClassWithinArray(props.selected.childNodes, "HeadID");
            var documentType = findValueByClassWithinArray(props.selected.childNodes, "DocumentType");
            // Missing value for String representation of the document.
            var client = findValueByClassWithinArray(props.selected.childNodes, "Receiver");
            var warehouse = findValueByClassWithinArray(props.selected.childNodes, "WharehouseName")
            var transactionIdElement = document.getElementById("transactionIdAdd");
            transactionIdElement.value = headId
            var typeAdd = document.getElementById("typeAdd");
            typeAdd.value = documentType
            var documentTypeAdd = document.getElementById("documentTypeAdd");
            var clientAdd = document.getElementById("clientAdd");
            clientAdd.value = client;
            var warehouseAdd = document.getElementById("warehouseAdd");
            warehouseAdd.value = warehouse;     
        }
    } else {
            $("#edit").css("display", "none");
    }
  

    function CommitPositionSingular(old, data) {



        var key = old.key;
        var no = old.no;
        var transactionHeadID = data.transaction;

      //  alert(transactionHeadID)

        PopupService.commitPosition({LinkKey: parseInt(key), LinkNo: no, Ident: data.ident.value, HeadID: document.getElementById("transactionIdAdd").value, Qty: document.getElementById("realQty").value}).then(response => { 
       //    alert(response)
        });            
        var objectToCommit = {}
    }


    function CommitPosition(e) {
        var openQty = document.getElementById("openQty").value;
        var realQty = document.getElementById("realQty").value;
        var positionNumber = document.getElementById("positionNumber").value;
        var deadlineDate = document.getElementById("deadlineDate").value;
        var warehouse = document.getElementById("warehouseAdd").value;
        var data = {open: openQty, real: realQty, position: positionNumber, deadlineDate: deadlineDate, ident: ident, order: orderData.value, serial: false, name:"", warehouse: warehouse, data: data};
        // getDocumentTypeStringBasedOnCode API call
        PopupService.getDocumentTypeStringBasedOnCode(document.getElementById("typeAdd").value).then(response => {           
            if(response.includes("Prenos")) {
                // Medskladišnica E
            } else if(response.includes("Odpremni")) {
                PopupService.hasSerialNumberIdent(ident.value).then(response => {           
                    data.serial = response.serial;
                    CommitPositionSingular(orderCurrent, data);                   
                });           
            } else if(response.includes("Naročilo")) {
                PopupService.hasSerialNumberIdent(ident.value).then(response => {           
                    data.serial = response.serial;
                    data.name = response.name;
                    data.transaction = document.getElementById("transactionIdAdd").value;
                    // Multi column place for the data collection //
                    props.addVisibility(orderCurrent, data, true);
                });
            } else if(response.includes("Proizvodnja") || response.inlcudes("DN")) {
                // Delovni nalog
            } else if(response.includes("Inventura")) {
                // Inventura N
            }           

        });
        // Place to check for the serial number
        
    }
    

    return ( 

        <div className="edit" id='edit'>
     


        <div className="header_part">
            <h1 id='close_add'>X</h1>
        </div>


        <div className="body_part">

        <div className="container py-5">
    <div className="row">



        <div className="col-md-3 mx-auto">

                <div className="form-group row">
                                <label htmlFor="transactionId">Transakcija</label>
                                <input type="text" className="form-control" id="transactionIdAdd" disabled />
                </div>
                <div className="form-group row">
                                <label htmlFor="inputFirstname">Tip</label>
                                <input type="text" className="form-control" id="typeAdd" disabled/>
                </div>
                
                <div className="form-group row">
                                <label htmlFor="inputFirstname">Naročnik</label>
                                <input type="text" className="form-control" id="clientAdd" disabled />
                </div>
                <div className="form-group row">
                                <label htmlFor="inputFirstname">Skladišče</label>
                                <input type="text" className="form-control" id="warehouseAdd" disabled />
                </div>


                <div className="form-group row">
                    <div className="col-sm-6">
                  
                    </div>
                    <div className="col-sm-6">


                    </div>
                </div>



                <div className='editable-group'>

                <div className="form-group row">
                    <div className="col-sm-6">
                    <label htmlFor="inputFirstname">Ident</label>

                    <Select 
                        placeholder={"Ident"}
                        id='identListControl'
                        options={identList}
                        value={ident.value}
                        onChange={(e) => onChangeIdent(e)} 
                    />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="inputAddressLine2">Pozicija</label>
                        <input type="text" className="form-control" id="positionNumber" placeholder="Pozicija" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                    <label htmlFor="inputCity">Naročilo</label>


                    <Select
                        placeholder="Naročilo"
                        id='orderInformationAdd'
                        options={orderData}
                        value={orderCurrent}
      
                        onChange={onChangeOrder} 
                     />
   
            
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="inputState">Odprta količina</label>
                        <input type="text" className="form-control" id="openQty" placeholder="Količina" />
                    </div>

                </div>
                
                <div className="form-group row">
                    <div className="col-sm-6">
                    <label htmlFor="inputContactNumber">Količina</label>
                        <input type='number' className="form-control" id="realQty" placeholder="Količina" />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="inputWebsite">Datum dobave</label>
                        <input type="text" className="form-control" id="deadlineDate" placeholder="Datum dobave" />
                    </div>
                </div>
                </div>

                <span className='actions smallerr' onClick={CommitPosition} id="addPositionButton" >Dodaj poziciju           
                </span>


        </div>
    </div>
    </div>



        </div>



        </div>

    ); 

} 
