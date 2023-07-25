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




    return ( 
        <div className="filters">

         <span className='actions smallerr' id="addOrder">
              <p>Dodaj</p>
              <MdAdd />
         </span>   

         <span className='actions smallerr' id="editOrder">
              <p>Uredi</p>
              <MdEdit />
         </span>   
         <span className='actions smallerr' id="deleteOrder">
              <p>Pobriši</p>
              <MdDeleteOutline />
         </span>   
         
        </div>


    ); 
} 