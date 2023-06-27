
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


export default function SerialQtyEntry (props) { 

    const [openOrder, setOpenOrder] = useState([]);
    const [locations, setLocations] = useState([])
    const [tableData, setTabledata] = useState([]);
    const [location, setLocation] = useState()
    const [locationComponentAdd, setLocationComponentAdd] = useState();

    if (props.show) {

        $(".serialQtyEntry").css("display", "block");
    } else {


        $(".serialQtyEntry").css("display", "none");
    }


    useEffect(() => {

        document.getElementById("identEntry").value = props.data.ident.value + " "   + props.data.name;

       

        if (! props.data.serial) {

         
            $("#serialEntry").css("display", "none");

        }
        
        if (! props.data.sscc) {

           
            $("#ssccEntry").css("display", "none");

        }

        var lQty = document.getElementById("qtyLabel")

        lQty.innerHTML = "Količina" + " (" + props.data.open + ") "
       

        document.getElementById("unitsEntry").value = "1"



        // document.getElementById("differenceLocationComponent").value = parseInt(document.getElementById("neededQtyLocationComponent").value)  - parseInt(document.getElementById("qtyLocationComponent").value) 

        var data =  TransactionService.getLocations(props.data.warehouse).then(response => { 
            var locations = [];

            for (var i = 0; i < response.Items.length; i++) {  
                locations.push({value: response.Items[i].Properties.Items[0].StringValue, label: response.Items[i].Properties.Items[0].StringValue});
            }

            setLocations(locations);     
        });


         TransactionService.getNextSSCC().then(response => {

           document.getElementById("ssccEntry").value = DataAccess.getData(response, "SSCC", "StringValue");


        });



    },[]); 


    function commitPositions (e) {

        var headId = props.data.headId;
        var ident = document.getElementById("identEntry").value
        var sscc = document.getElementById("ssccEntry").value
        var units = document.getElementById("unitsEntry").value
        var serial = document.getElementById("serialEntry").value
        var qty = document.getElementById("qtyEntry").value

        var testObject = {headID: headId, Ident: ident, Factor: units, SerialNo: serial, Qty: qty, SSCC: sscc, LinkNo: props.data.no, LinkKey: props.data.key}

        PopupService.commitPosition(testObject).then(response => { 
            alert(response)
        });

    }



    function changeLocation(e) {
        setLocation(e)
    }


    return ( 
        <div id="SerialQtyEntry" className='serialQtyEntry'>      
                    <div class="header_part" >
                    <h1 id='close_add'>X</h1></div>
                    <div>
                    <div>
                        
            <div className='component-outer'>

                    <div class="insistRow">
                        <label for="identLocationComponent">Ident</label>
                        <input type="text" class="form-control" id="identEntry" placeholder="Ident" />
                    </div>

                    <div class="insistRow">
                        <label for="ssccEntry">SSCC koda</label>
                        <input type="text" class="form-control" id="ssccEntry" placeholder="SSCC koda" />
                    </div>

                    <div class="insistRow">
                        <label for="serialEntry">Serijska številka</label>
                        <input type="text" class="form-control" id="serialEntry" placeholder="Serijska številka" />
                    </div>

                    <div class="insistRow">
                        <label for="locationEntry">Lokacija</label>


                    <Select
                            placeholder="Lokacije"
                            id='locationsSelect'
                            value={location}
                            onChange={changeLocation}
                            options={locations}
                        
                     />


                    </div>

                    <div class="insistRow">
                        <label for="qtyEntry" id="qtyLabel">Količina</label>
                        <input type="text" class="form-control" id="qtyEntry" placeholder="Količina" />
                    </div>

                    <div class="insistRow">
                        <label for="unitsEntry">Št. enot</label>
                        <input type="text" class="form-control" id="unitsEntry" placeholder="Št. enot" />
                    </div>

                    <div class="insistRow">
                        <span 
                            onClick={commitPositions} className='actions smallerr'id=''>Dodaj      
                            <MdEdit />
                        </span>
                    </div>
                


                 </div>

              </div>
            </div>

        </div>


    

      
        

    ); 

} 
