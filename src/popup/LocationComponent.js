
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
import { MdAdd, MdOutlineMerge, MdEdit, MdOutlineKey, MdOutlineQrCode, MdDeleteOutline} from "react-icons/md";


export default function LocationComponent (props) { 
    const [openOrder, setOpenOrder] = useState([]);
    const [locations, setLocations] = useState([])
    const [tableData, setTabledata] = useState([]);
    const [location, setLocation] = useState("")
    const [locationComponentAdd, setLocationComponentAdd] = useState({});
    if (props.show) {
        $(".locationComponent").css("display", "block");
    } else {
        $(".locationComponent").css("display", "none");
    }


    useEffect(() => {

        document.getElementById("identLocationComponent").value = props.data.ident.value;
        document.getElementById("nameLocationComponent").value = props.data.name;
        document.getElementById("neededQtyLocationComponent").value = props.data.real;
        document.getElementById("differenceLocationComponent").value = parseInt(document.getElementById("neededQtyLocationComponent").value)  - parseInt(document.getElementById("qtyLocationComponent").value)
       

        var data =  TransactionService.getLocations(props.data.warehouse).then(response => { 
            var locations = [];

            for (var i = 0; i < response.Items.length; i++) {  
                locations.push({value: response.Items[i].Properties.Items[0].StringValue, label: response.Items[i].Properties.Items[0].StringValue});
            }

            setLocations(locations);     
      });


    }); 


    function changeAddLocation(e) {
        setLocationComponentAdd({label: e.value, value: e.value});
    }


    function addLocation(e) {
        var qty = document.getElementById("qtyAddLocation").value;   
    }




    return ( 
        <div id="locationComponent" className='locationComponent'>      
            <div class="header_part">
            <h1 id='close_add'>X</h1></div>
            <div className='outer_container'>
            <div className="bodyLocationComponent">
            <div className='left-part'>

            <div class="col-sm-6">
                <input type="text" class="form-control" id="identLocationComponent" placeholder="Ident" />
                    </div>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="nameLocationComponent" placeholder="Naziv" />
                    </div>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="neededQtyLocationComponent" placeholder="Potrebna količina" />
                    </div>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="qtyLocationComponent" value="0" placeholder="Količina" />
                    </div>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="differenceLocationComponent" placeholder="Razlika" />
                </div>
            </div>

            </div>



            <div className='add-location-container'>

                <Select     options={locations}
                            placeholder={"Lokacija"}
                            onChange={changeAddLocation}
                            value={locationComponentAdd}
                            id='locationSelect'
                />



                <input 
                            placeholder = "qty"
                            id='qtyAddLocation'
                            className='form-control'
                />



            <span className='actions smallerr' onClick={addLocation} id=''>Dodaj           
             <MdAdd />
             </span>
            </div>






            <div className='right-part'>

             <span className='actions smallerr'id=''>Potrdi         
             <MdEdit />
             </span> 

          

             <span className='actions smallerr' id=''>Briši               
             <MdDeleteOutline />
             </span>


            </div>

        </div>

        <Table className="location-component_table" data = {tableData} type = "locationComponent" class = "table_responsive_location-component" data = {props.data} /> 


        </div>

      
        

    ); 

} 
