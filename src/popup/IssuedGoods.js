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

    const [byOrder, setByOrder] = useState(true);
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
                $("#buyer").css("display", "none");
            } else {
                $("#buyer").css("display", "block");
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
    
      var objectForAPI = {};

      if (!byOrder) {
            objectForAPI = {DocumentType: documentData, Type: "P", WhareHouse: warehouseData, ByOrder: byOrder, LinkKey: "", Receiver: client}
      } else {
            objectForAPI = {DocumentType: documentData, Type: "P", WhareHouse: warehouseData, ByOrder: byOrder, LinkKey: ""}
      }



       if(window.confirm('Ali želite kreirati dokument')) {
            var data =  PopupService.setMoveHead(objectForAPI).then(response => { 
            props.close();
            props.render();    
        }); 
       }


    }


    function toggleCheck() {
       setByOrder(!byOrder)
    }

    return ( 




        <div className='layout-issued-goods-container'>


        <div className='layout-issued-goods-header-checkbox'>

        <label htmlFor="byOrder">Po naročilo</label>
        <input type="checkbox" onChange={toggleCheck} checked={byOrder} id='byOrder' />

        </div>

        <div className='layout-issued-goods'>
        <div className='left-column'>


        <Select className='select-filters-add' onChange={(e) => onChangeType(e)} placeholder={"Tip dokumenta"} options={documentTypes}  id='documentType'/>
        <Select className='select-filters-add' onChange={(e) => onChangeWarehouse(e)} placeholder={"Skladišče"} options={warehouses} id='warehouse'  />
        <Select className='select-filters-add' onChange={(e) => onChangeBuyer(e)} placeholder={"Kupec"} options={buyer} id='buyer' />
     
        </div>
        <div id="date-picker-example" onChange={(e) => onDateChange(e)}  className="md-form md-outline input-with-post-icon datepicker" inline="true">



        <input placeholder="Izberite datum" type="date" id="documentDate" class="form-control" />

        </div>


        </div>


       <center><span className='actions smallerr' onClick={createHeadDocument} id='createDocument'>          
             <p>Potrdi</p>
             <MdAdd />
             </span></center> 


  
        </div>


        ); 
} 