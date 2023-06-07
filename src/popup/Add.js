
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

    const [ident, setIdent] = useState({});
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

        setOrderCurrent({label: e.value, value: e.value});
        document.getElementById("positionNumber").value = "";
        document.getElementById("openQty").value = "";
        document.getElementById("deadlineDate").value = "";
        var ident = document.getElementById("identListControl").innerText;
        // Correct data gets to the service
        PopupService.getOrderDataFromIdentAndOrderNumber(e.value, ident).then(response => { 

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
            items.push({value: '', label: ''})

            for(var i = 0; i < response.Items.length;i++) {
                var item = response.Items[i]           
                var key = DataAccess.getData(item, "Key", "StringValue")
                items.push({label: key, value: key})            
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
  
    function CommitPosition(e) {
        var openQty = document.getElementById("openQty").value;
        var realQty = document.getElementById("realQty").value;
        var positionNumber = document.getElementById("positionNumber").value;
        var deadlineDate = document.getElementById("deadlineDate").value;
        var data = {open: openQty, real: realQty, position: positionNumber, deadlineDate: deadlineDate, ident: ident, order: orderData.value, serial: false, name:""};


        // Place to check for the serial number
        PopupService.hasSerialNumberIdent(ident.value).then(response => {           
            data.serial = response.serial;
            data.name = response.name;
            // Multi column place for the data collection //
            props.addVisibility(data, true);
        });
    }
    

    return ( 

        <div className="edit" id='edit'>
     


        <div class="header_part">
            <h1 id='close_add'>X</h1>
        </div>


        <div class="body_part">

        <div class="container py-5">
    <div class="row">



        <div class="col-md-3 mx-auto">

                <div class="form-group row">
                                <label for="transactionId">Transakcija</label>
                                <input type="text" class="form-control" id="transactionIdAdd" disabled />
                </div>
                <div class="form-group row">
                                <label for="inputFirstname">Tip</label>
                                <input type="text" class="form-control" id="typeAdd" disabled/>
                </div>
                
                <div class="form-group row">
                                <label for="inputFirstname">Naročnik</label>
                                <input type="text" class="form-control" id="clientAdd" disabled />
                </div>
                <div class="form-group row">
                                <label for="inputFirstname">Skladišče</label>
                                <input type="text" class="form-control" id="warehouseAdd" disabled />
                </div>


                <div class="form-group row">
                    <div class="col-sm-6">
                  
                    </div>
                    <div class="col-sm-6">


                    </div>
                </div>



                <div className='editable-group'>

                <div class="form-group row">
                    <div class="col-sm-6">
                    <label for="inputFirstname">Ident</label>
                        <Select 
                        placeholder={"Ident"}
                        id='identListControl'
                        options={identList}
                        value={ident}
                        onChange={(e) => onChangeIdent(e)} 
                    />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputAddressLine2">Pozicija</label>
                        <input type="text" class="form-control" id="positionNumber" placeholder="Pozicija" />
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                    <label for="inputCity">Naročilo</label>


                    <Select
                        placeholder="Naročilo"
                        id='orderInformationAdd'
                        options={orderData}
                        value={orderCurrent}
      
                        onChange={onChangeOrder} 
                     />
   
            
                    </div>
                    <div class="col-sm-6">
                        <label for="inputState">Odprta količina</label>
                        <input type="text" class="form-control" id="openQty" placeholder="Količina" />
                    </div>

                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                    <label for="inputContactNumber">Količina</label>
                        <input type='number' class="form-control" id="realQty" placeholder="Količina" />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputWebsite">Datum dobave</label>
                        <input type="text" class="form-control" id="deadlineDate" placeholder="Datum dobave" />
                    </div>
                </div>
                </div>



                <button type="button" class="btn btn-primary px-4 float-right" onClick={CommitPosition} id="addPositionButton">Dodaj poziciju</button>

        </div>
    </div>
</div>



        </div>



        </div>

    ); 

} 
