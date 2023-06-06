import DataAccess from "../utility/DataAccess";

import $ from 'jquery'; 
import Select from 'react-select'
import PopupService from '../services/PopupService';
import { useEffect, useState } from "react";
import { MdAdd} from "react-icons/md";

export default function WorkOrder(props) { 
    const [workOrders, setWorkOrders] = useState([]);
    useEffect(() => {
        var orders = [];
        var documentTypes =  PopupService.getAllWorkOrders("I").then(response => { 
            for (var i = 0; i < response.length; i++) { 
                orders.push({label: response[i].Key, value: response[i].Key})
            }
            setWorkOrders(orders);
        }); 
    }, []);
    if(props.show) {
        $("#edit").css("display", "block");
    } else {
        $("#edit").css("display", "none");
    }

    function changeWorkOrder(e) {
        var data =  PopupService.getWorkOrderDetail(e.value).then(response => { 

            var client = DataAccess.getData(response, "Consignee", "StringValue");
            var ident = DataAccess.getData(response, "Ident", "StringValue");
            var name = DataAccess.getData(response, "Name", "StringValue");
            var qty = DataAccess.getData(response, "OpenQty", "DoubleVal");

            alert(client)
            alert(ident)
            alert(name)
            alert(qty)


        }); 
    }

    return ( 

    <div className='add-container-workorder'> 


       <div className='first-row'> 
            <Select className='select-filters' onChange={changeWorkOrder} options={workOrders} placeholder={"Delovni nalog"} id='workOrder' />
       </div>


       <input type="text" id="client" placeholder='Naročnik' class="form-control" />
       <input type="text" id="ident" placeholder='Ident' class="form-control" />
       <input type="text" id="name" placeholder='Naziv' class="form-control" />
       <input type="text" id="openQty" placeholder = 'Odprta količina' class="form-control" />


    </div>
    
    ); 
    };