
import $ from 'jquery'; 
import Select from 'react-select'
import PopupService from '../services/PopupService';
import { useEffect, useState } from "react";
import { MdAdd} from "react-icons/md";


export default function IssuedGoods(props) { 
    // States
    const [documentTypes, setDocumentTypes] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        var documentTypes =  PopupService.getAllDocumentTypes().then(response => { 
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
        alert("test");
        window.subjects = response.Items;                

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

  
    return ( 




        <div className='layout-issued-goods-container'>


        <div className='layout-issued-goods-header-checkbox'>

        <label for="byOrder">Po naročilo</label>
        <input type="checkbox" id='byOrder' />

        </div>






        <div className='layout-issued-goods'>







        <div className='left-column'>


        <Select className='select-filters' placeholder={"Tip dokumenta"} options={documentTypes}  id='documentType'/>
        <Select className='select-filters' placeholder={"Skladišče"} options={warehouses} id='warehouse'  />
        <Select className='select-filters' placeholder={"Kupec"} id='buyer' />
        </div>
        <div id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker" inline="true">



        <input placeholder="Izberite datum" type="date" id="documentDate" class="form-control" />

        </div>


        </div>
        <button className="btn btn-primary">Potrdi
             
             <MdAdd />

             </button>
        </div>


        ); 
} 