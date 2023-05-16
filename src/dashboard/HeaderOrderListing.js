import { useNavigate  } from 'react-router-dom';
import Select from 'react-select'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, addYears, format, isWeekend } from 'date-fns';
import { useEffect, useState } from "react";

import { MdOutlineSearch, MdDateRange } from "react-icons/md";
import  SortingService  from '../services/SortingService'

export default function HeaderOrderListing() { 



    useEffect(() => {
        var data =  SortingService.getAllDocumentTypes().then(response => { 




        var types = [];

                for (var i = 0; i < response.Items.length; i++) {
                          types.push(response.Items[i].Properties.Items[0].StringValue); 
                       
                }

        setTypes(types);
     }); 
    }, []);

    const [types, setTypes] = useState([]);


    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);



    const [open, setOpen] = useState(false);


    
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      

  let navigate = useNavigate();
  const searchTable = () => { 
    alert('Search table');
  };


  const toggleVisibility = () => {
    setOpen(!open);
  };


  const handleSelect = (ranges) => { 
    const { selection } = ranges;
    setState([selection]);
  };



    return ( 


        <div className="filters">
             <Select className='select-filters' options={types} id='documentType'/>
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


         <button className="btn btn-primary" onClick={toggleVisibility} id="openRange">
              Izberite
              <MdDateRange />
         </button>   


         {open && (
            <div className="nameModule">
              <DateRangePicker ranges={state}
                          
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              onChange={handleSelect}/>
            </div>
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

         <button className="btn btn-primary" onClick={searchTable} id="search">
              Poiščite
              <MdOutlineSearch />
         </button> 
        </div>


    ); 
} 