
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




        if(props.document === "Medskladišnica") {
            $("#receiveDiv").toggle();
        }




        document.getElementById("identEntry").value = props.data.ident.value + " "   + props.data.name;

       

        if (! props.data.serial) {

         
            $("#serialEntry").css("display", "none");

        }
        
        if (! props.data.sscc) {

           
            $("#ssccEntry").css("display", "none");

        }

   
       

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

        var headId = parseFloat(props.data.headId);
        var ident = props.data.ident.value;
        var sscc = document.getElementById("ssccEntry").value;
        var units = document.getElementById("unitsEntry").value;
        var serial = document.getElementById("serialEntry").value;
        var qty = parseFloat(props.data.real);
  

        if($('#ssccEntry').is(':visible')){

            if(sscc!=="") {
                window.showAlert("Informacija", "Vnesite pravilno sscc kodo", "success");
            }

        }

        
        if($('#serialEntry').is(':visible')){

            if(serial!=="") {
                window.showAlert("Informacija", "Vnesite pravilno serijsko", "success");
      
            }

        }


        var testObject = {HeadID: headId, Ident: ident, Factor: units, SerialNo: serial, Qty: qty, SSCC: sscc, LinkNo: props.data.no, LinkKey: props.data.key}



        PopupService.commitPosition(testObject).then(response => { 
            // Reload the component LinkNo not correct
            if(typeof response!="object") {
            if(response.startsWith("Exception")) {
                window.showAlert("Informacija", "Prišlo je do napake", "error");
                return;
            }
            } else {
              props.render();  
             } 
        });

    }



    function changeLocation(e) {
        setLocation(e)
    }

    function changeLocationReceived(e) {

    }



    function closePopup(e) { 

       $("#SerialQtyEntry").toggle();

    }



    return ( 
        <div id="SerialQtyEntry" className='serialQtyEntry'>    


                    <div className="header_part" onClick={closePopup}>
                        <h1 id='close_add'>X</h1></div>
                    <div>



                    <div>
                        
            <div className='component-outer'>

                    <div className="insistRow">
                        <label htmlFor="identLocationComponent">Ident</label>
                        <input type="text" className="form-control" id="identEntry" placeholder="Ident" />
                    </div>

                    <div className="insistRow">
                        <label htmlFor="ssccEntry">SSCC koda</label>
                        <input type="text" className="form-control" id="ssccEntry" placeholder="SSCC koda" />
                    </div>

                    <div className="insistRow">
                        <label htmlFor="serialEntry">Serijska številka</label>
                        <input type="text" className="form-control" id="serialEntry" placeholder="Serijska številka" />
                    </div>

                    <div className="insistRow">
                        <label htmlFor="locationEntry">Lokacija</label>


                    <Select
                            placeholder="Lokacija"
                            id='locationsSelect'
                            value={location}
                            onChange={changeLocation}
                            options={locations}
                        
                     />


                    </div>

                    <div className="insistRow" id='receiveDiv'>
                        <label htmlFor="locationsSelectReceive">Prejemna lokacija</label>


                    <Select
                            placeholder="Lokacija"
                            id='locationsSelectReceive'
                            value={location}
                            onChange={changeLocation}
                            options={locations}
                        
                     />


                    </div>

               
              

                    <div className="insistRow">
                        <label htmlFor="unitsEntry">Št. enot</label>
                        <input type="text" className="form-control small" id="unitsEntry" placeholder="Št. enot" />
                    </div>

  
                        <center><span 
                            onClick={commitPositions} className='actions smallerr'id=''>Dodaj      
                            <MdEdit />
                        </span></center>
              

                    
                


                 </div>

              </div>
            </div>

        </div>


    

      
        

    ); 

} 
