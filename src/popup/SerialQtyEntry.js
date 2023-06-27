
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
    const [location, setLocation] = useState("")
    const [locationComponentAdd, setLocationComponentAdd] = useState();
    if (props.show) {

        $(".serialQtyEntry").css("display", "block");
    } else {


        $(".serialQtyEntry").css("display", "none");
    }


    useEffect(() => {

        document.getElementById("identEntry").value = props.data.ident.value + " "   + props.data.name;
        
        alert(props.data.serial)
        alert(props.data.sscc)

        if (! props.data.serial) {

            alert("Please select")
            $("#serialEntry").css("display", "none");

        }
        
        if (! props.data.sscc) {

            alert("Please select")
            $("#ssccEntry").css("display", "none");

        }

       // document.getElementById("neededQtyLocationComponent").value = props.data.real;
       // document.getElementById("differenceLocationComponent").value = parseInt(document.getElementById("neededQtyLocationComponent").value)  - parseInt(document.getElementById("qtyLocationComponent").value) 

        var data =  TransactionService.getLocations(props.data.warehouse).then(response => { 
            var locations = [];

            for (var i = 0; i < response.Items.length; i++) {  
                locations.push({value: response.Items[i].Properties.Items[0].StringValue, label: response.Items[i].Properties.Items[0].StringValue});
            }

            setLocations(locations);     
      });


    },[]); 


    function changeAddLocation(e) {
        setLocationComponentAdd({label: e.value, value: e.value});
    }

    function closePopup(e) {
        $(".SerialQtyEntry").css("display", "none");
    }

    function addLocation(e) {
        var neededQty = document.getElementById("neededQtyLocationComponent").value;
        var qty = document.getElementById("qtyAddLocation").value;  
        var location = locationComponentAdd;
        var items = tableData;

        items.push({Quantity: parseFloat(qty), Location: location.value})

        var qtyCount = parseFloat("0.00");

        for(var i=0; i<items.length; i++) {
            qtyCount += parseFloat(items[i].Quantity)
        }

        if(qtyCount > neededQty) {
            alert(`Količina ne sme presegati ${neededQty}!!!`)
            items.splice(-1,1)
        } else if (qtyCount == neededQty) { 
            alert(`Količina je dosežena!`);
        }
        setTabledata(items);
      
    }


    function commitPositions (e) {
      
        var key = props.old.key;
        var no = props.old.no;
        var transactionHeadID = props.data.transaction;

        for (var i=0; i<tableData.length; i++) {
            var row = tableData[i];
            var location = row.Location;
            var qty = row.Quantity;
            PopupService.commitPosition({LinkKey: parseInt(key), LinkNo: no, Ident: props.data.ident.value, HeadID: transactionHeadID, Location: location, Qty: qty}).then(response => { 
                alert(response)
          });
            
        }
    }

    return ( 
        <div id="SerialQtyEntry" className='serialQtyEntry'>      
                    <div class="header_part" onClick={closePopup}>
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
                        <input type="text" class="form-control" id="ssccEntry" placeholder="Naziv" />
                    </div>

                    <div class="insistRow">
                        <label for="serialEntry">Serijska številka</label>
                        <input type="text" class="form-control" id="serialEntry" placeholder="Potrebna količina" />
                    </div>

                    <div class="insistRow">
                        <label for="locationEntry">Lokacija</label>
                        <input type="text" class="form-control" id="locationEntry" value="0" placeholder="Količina" />
                    </div>

                    <div class="insistRow">
                        <label for="qtyEntry">Količina</label>
                        <input type="text" class="form-control" id="qtyEntry" placeholder="Razlika" />
                    </div>

                    <div class="insistRow">
                        <label for="unitsEntry">Št. enot</label>
                        <input type="text" class="form-control" id="unitsEntry" placeholder="Število enot" />
                    </div>
                
                    <span 
                        onClick={commitPositions} className='actions smallerr'id=''>Dodaj      
                        <MdEdit />
                    </span>


                    </div>

            </div>



           







         

          



            </div>

        </div>


    

      
        

    ); 

} 