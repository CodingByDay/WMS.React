import { useNavigate  } from 'react-router-dom';
import Select from 'react-select'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, addYears, format, isWeekend } from 'date-fns';
import { useEffect, useState } from "react";
import { MdOutlineSearch, MdDateRange,MdDownload, MdOutlineCancel, MdDeleteOutline, MdEdit, MdAdd, MdOutlineMerge, MdOutlineKey, MdOutlineQrCode } from "react-icons/md";
import  SortingService  from '../services/SortingService'
import { flushSync } from 'react-dom';

export default function ListingPositionsButtons(props) { 


    useEffect(() => {
        
    }, []);




    function deleteOrderHead() {
       props.communicate("position", "delete");
    }

   
    function isFloat(n) {
     return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0;
 }
    function editQty() {
     var qty = window.prompt("Spremenite količina. Odprta količina: 100")
     if (isFloat(qty)) 
     {

          alert("Number");


     } else {
          window.showAlert("Informacija", "Morate vpisati pravilno količino", "error")
      //    editQty();
          
     }

    }


    return ( 
        <div className="filters">

         <span className='actions smallerr' id="addOrder">
              <p>Dodaj</p>
              <MdAdd />
         </span>   

         <span className='actions smallerr' id="editOrder" onClick={editQty}>
              <p>Uredi</p>
              <MdEdit />
         </span>   
         <span className='actions smallerr' id="deleteOrder" onClick={deleteOrderHead}>
              <p>Pobriši</p>
              <MdDeleteOutline />
         </span>   
         
        </div>


    ); 
} 