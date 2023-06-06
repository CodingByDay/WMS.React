import DataAccess from "../utility/DataAccess";

import $ from 'jquery'; 
import Select from 'react-select'
import PopupService from '../services/PopupService';
import { useEffect, useState } from "react";
import { MdAdd} from "react-icons/md";

export default function WorkOrder(props) { 




    const [workOrders, setWorkOrders] = useState([]);

    useEffect(() => {
        alert("Test");
    }, []);





    if(props.show) {
        $("#edit").css("display", "block");
    } else {
        $("#edit").css("display", "none");
    }

    return ( 

    <div className='add-container-workorder'> 


       <div className='first-row'> 
            <Select className='select-filters' placeholder={"Delovni nalog"} id='workOrder' />
       </div>


       <input type="text" id="client" placeholder='Naročnik' class="form-control" />
       <input type="text" id="ident" placeholder='Ident' class="form-control" />
       <input type="text" id="name" placeholder='Naziv' class="form-control" />
       <input type="text" id="openQty" placeholder = 'Odprta količina' class="form-control" />


    </div>
    
    ); 
    };