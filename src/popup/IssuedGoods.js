import DataAccess from "../utility/DataAccess";
import { useSelector, useDispatch } from 'react-redux'

import $ from 'jquery'; 
import Select from 'react-select'
import PopupService from '../services/PopupService';
import { useEffect, useState } from "react";
import { MdAdd} from "react-icons/md";
import ListingService from "../services/ListingService";


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
    const [date, setDate] = useState(new Date().toLocaleDateString())


    var bufferElements = [];
    const userId = useSelector((state) => state.user.userId)
  


    useEffect(() => {
        var documentTypes =  PopupService.getAllDocumentTypeOfEvent("P").then(response => { 
            var types = [];
            for (var i = 0; i < response.Items.length; i++) {
                var type = DataAccess.getData(response.Items[i], "Code", "StringValue");
                var name = DataAccess.getData(response.Items[i], "Name", "StringValue");
                var together = type + "|" + name;
                types.push({value: together, label:together, code: type});                }     
                setDocumentTypes(types);
        }); 

        var warehouses =  PopupService.getWarehouses(userId).then(response => {  
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


    



    function onlyWarehouses(data) { 
        var returnArray = [];

        for (var i = 0; i < data.Items.length; i++) {  
            returnArray.push({value: data.Items[i].Properties.Items[0].StringValue, label: data.Items[i].Properties.Items[0].StringValue});           
        }

        return returnArray;
    }

  

    function onChangeType(e) {
     
        setDocument(e.code)
    }


    function onChangeWarehouse(e) {
 
        setWarehouse(e.value)
    }



    function onChangeBuyer(e) {

        setClient(e.value)
    }


    function onDateChange(e) {
        console.log(e.target.value)
        setDate(e.target.value)
    }



    async function createHeadDocument ()  {

    // date
    var dateValue = date;




    if(!props.order) {
      var documentData = document;
      var warehouseData = warehouse;
      var objectForAPI = {};
      if (!byOrder) {
            objectForAPI = {DocumentType: documentData, Date: dateValue, Type: "P", WhareHouse: warehouseData, ByOrder: byOrder, LinkKey: "", Receiver: client}
      } else {
            objectForAPI = {DocumentType: documentData, Date: dateValue, Type: "P", WhareHouse: warehouseData, ByOrder: byOrder, LinkKey: ""}
      }
       if(window.confirm('Ali želite kreirati dokument?')) {
            var data =  PopupService.setMoveHead(objectForAPI).then(response => { 
            props.close();

        }); 
       }
    } else {

    /*  "DocumentType": "0150",
        "Key": "0",
        "LinkKey": "034758475",
        "Type":  "BW",
        "Status": "BW",
        "Clerk": 23    */





        var documentData = document;
        var warehouseData = warehouse;
        var objectForAPI = {};
        var note = $('#acNote').val();


        var order = ""


        objectForAPI = {
            
            
       
            DocumentType: documentData, 
            Type: "P",
            WhareHouse: warehouseData,  
            LinkKey: "0", 
            Receiver: client,
            Note: note,
            Status: "1",
            Key: "1111111",
            Date: dateValue,

        }
   




         if(window.confirm('Ali želite kreirati dokument')) {
              var data =  ListingService.createOrder(objectForAPI).then(response => { 
                props.close();
                props.render();
          }); 
         }
     
    } 

    }


    function toggleCheck() {
       setByOrder(!byOrder)
    }

    function getCheckBox() {
        if(!props.order) {
            return <div><label htmlFor="byOrder">Po naročilo</label>
            <input type="checkbox" onChange={toggleCheck} checked={byOrder} id='byOrder' /></div>
        }
    }


    function getClient() {
        if(props.order) {
            return   <Select className='select-filters-add' onChange={(e) => onChangeBuyer(e)} placeholder={"Kupec"} options={buyer} id='buyer' />
        }
    }

    function getNote() {
        if(props.order) {
            return  <div class="form-group2">
                    <label for="acNote">Opomba</label>
                    <textarea class="form-control" id="acNote" rows="3"></textarea>
            </div>
        }
    }









    return ( 

        <div className='layout-issued-goods-container'>
        <div className='layout-issued-goods-header-checkbox'>
            {getCheckBox()}
        </div>
        <div className='layout-issued-goods'>



        <div className='left-column'>
        <Select className='select-filters-add' onChange={(e) => onChangeType(e)} placeholder={"Tip"} options={documentTypes}  id='documentType'/>
        <Select className='select-filters-add' onChange={(e) => onChangeWarehouse(e)} placeholder={"Skladišče"} options={warehouses} id='warehouse'  />
        </div>
        <div className='right-column'>


        <div id="date-picker-example" onChange={(e) => onDateChange(e)}  className="md-form md-outline input-with-post-icon datepicker" inline="true">
    
        <input placeholder="Izberite datum" type="date" id="documentDate" class="form-control" />

        </div>

        

        {getClient()}
        </div>
        
        </div>


        {getNote()}


       <center><span className='actions smallerr' onClick={createHeadDocument} id='createDocument'>          
             <p>Potrdi</p>
             <MdAdd />
             </span>
        </center> 




  
        </div>


        ); 
} 