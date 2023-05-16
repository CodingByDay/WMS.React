import { useNavigate  } from 'react-router-dom';
import Select from 'react-select'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, format, isWeekend } from 'date-fns';
import { useState } from 'react';
import { MdOutlineSearch, MdDateRange } from "react-icons/md";


export default function HeaderOrderListing() { 

    var open = false;

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }

    
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      

  let navigate = useNavigate();

  
    return ( 


        <div className="filters">
             <Select className='select-filters' options={options} id='documentType'/>
             <input
              id = "documentSearch"
              type="text"
              className="form-control mt-1"
              placeholder="Tip dokumenta"
             />

             <input
              id = "warehouse"
              type="text"
              className="form-control mt-1"
              placeholder="Skladišče"
            />


         <button className="btn btn-primary" id="openRange">
              Izberite
              <MdDateRange />
         </button>   


         {open && (
            <DateRangePicker ranges={[selectionRange]}/>
         )}

        


            <input
              id = "receiver"
              type="text"
              className="form-control mt-1"
              placeholder="Prejemnik"
            />
              <input
              id = "consignee"
              type="text"
              className="form-control mt-1"
              placeholder="Naročnik"
            />
  <button className="btn btn-primary" id="search">
              Poiščite
              <MdOutlineSearch />
         </button> 
        </div>


    ); 
} 