
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
import { MdAdd, MdOutlineMerge, MdOutlineKey, MdOutlineQrCode, MdDeleteOutline} from "react-icons/md";


export default function LocationComponent (props) { 

    const [tableData, setTabledata] = useState([]);
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
    }); 


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
            <div className='right-part'>
            <span className='actions smallerr'id=''>Potrdi
             
             
             <MdAdd />

             </span>  <span className='actions smallerr' id=''>Briši
                   
             <MdDeleteOutline />

             </span>


            </div>

        </div>

        <Table className="location-component_table" data = {tableData} type = "locationComponent" class = "table_responsive_location-component" data = {props.data} /> 


        </div>

      
        

    ); 

} 
