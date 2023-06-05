import DataAccess from "../utility/DataAccess";

import $ from 'jquery'; 
import Select from 'react-select'
import PopupService from '../services/PopupService';
import { useEffect, useState } from "react";
import { MdAdd} from "react-icons/md";


export default function IssuedGoods(props) { 
    // States

    const [documentTypes, setDocumentTypes] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [buyer, setBuyer] = useState([]);

    // Chosen states

    const [document, setDocument] = useState("")
    const [warehouse, setWarehouse] = useState("")
    const [client, setClient] = useState("")
    const [date, setDate] = useState("")


    useEffect(() => {
        var documentTypes =  PopupService.getAllDocumentTypeOfEvent("P").then(response => { 
            var types = [];
            for (var i = 0; i < response.Items.length; i++) {
                types.push({value: response.Items[i].Properties.Items[0].StringValue, label:response.Items[i].Properties.Items[0].StringValue});                       
            }     
            setDocumentTypes(types);
        }); 

        var warehouses =  PopupService.getWarehouses().then(response => {  
        var warehouses = onlyWarehouses(response);
        setWarehouses(warehouses); 

    }); 


    var subjects =  PopupService.getSubjects().then(response => { 
            window.subjects = response;
            var subjectsList = [];   
       for(var i = 0; i < response.Items.length; i++) {
            var field = DataAccess.getData(response.Items[i], "ID", "StringValue");
            subjectsList.push({value: field, label: field});
       }
       setBuyer(subjectsList); 
    });




}, []);


    $(function() {

        $("#byOrder").change(function() {

            if($(this).is(":checked")) {
                $("#buyer").css("display", "block");
            } else {
                $("#buyer").css("display", "none");
            }

        });

    });



    function onlyWarehouses(data) { 
        var returnArray = [];

        for (var i = 0; i < data.Items.length; i++) {  
            returnArray.push({value: data.Items[i].Properties.Items[0].StringValue, label: data.Items[i].Properties.Items[0].StringValue});           
        }

        return returnArray;
    }

  

    function onChangeType(e) {
     
        setDocument(e.value)
    }


    function onChangeWarehouse(e) {
 
        setWarehouse(e.value)
    }



    function onChangeBuyer(e) {

        setClient(e.value)
    }


    function onDateChange(e) {
        setDate(e.target.value)
    }



    async function createHeadDocument ()  {

      var documentData = document;
      var warehouseData = warehouse;
      var clientData = client;
      var dateData = date;
      var byClient = false;

      if($('#byOrder').is(":checked"))
        {
            byClient = true;
        }

       if(window.confirm('Ali želite kreirati dokument')) {
            var data =  PopupService.setMoveHead({DocumentType: documentData, Type: "P", WhareHouse: warehouseData, ByOrder: byClient, LinkKey: ""}).then(response => { 
            props.close();
            props.render();            
        }); 
       }


    }

    return ( 




        <div className='layout-issued-goods-container'>


        <div className='layout-issued-goods-header-checkbox'>

        <label for="byOrder">Po naročilo</label>
        <input type="checkbox" checked id='byOrder' />

        </div>

        <div className='layout-issued-goods'>
        <div className='left-column'>


        <Select className='select-filters' onChange={(e) => onChangeType(e)} placeholder={"Tip dokumenta"} options={documentTypes}  id='documentType'/>
        <Select className='select-filters' onChange={(e) => onChangeWarehouse(e)} placeholder={"Skladišče"} options={warehouses} id='warehouse'  />
        <Select className='select-filters' onChange={(e) => onChangeBuyer(e)} placeholder={"Kupec"} options={buyer} id='buyer' />
        <button className="btn btn-primary" onClick={createHeadDocument} id="createDocument">Potrdi     
             <MdAdd />
        </button>
        </div>
        <div id="date-picker-example" onChange={(e) => onDateChange(e)}  className="md-form md-outline input-with-post-icon datepicker" inline="true">



        <input placeholder="Izberite datum" type="date" id="documentDate" class="form-control" />

        </div>


        </div>
    
        </div>


        ); 
} 