import { useNavigate  } from 'react-router-dom';
import Select from 'react-select'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, addYears, format, isWeekend } from 'date-fns';
import { useEffect, useState } from "react";
import { MdOutlineSearch, MdDateRange } from "react-icons/md";
import  SortingService  from '../services/SortingService'
import { flushSync } from 'react-dom';

export default function HeaderOrderListing(props) { 

    // States
    const [types, setTypes] = useState([]);
    const [document, setDocument] = useState("")
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    const [open, setOpen] = useState(false);
    const [consignee, setConsignee] = useState("")
    const [client, setClient] = useState("")
    const [warehouse, setWarehouse] = useState("")
    const [documentType, setDocumentType] = useState({value:"",label:""})

  
    useEffect(() => {
        var data =  SortingService.getAllDocumentTypes().then(response => { 
            var types = [];
        

        
            for (var i = 0; i < response.Items.length; i++) {
                      types.push({value: response.Items[i].Properties.Items[0].StringValue, label:response.Items[i].Properties.Items[0].StringValue});                       
            }            
            setTypes(types);


     }); 
    }, []);



    let navigate = useNavigate();

  function searchTable() { 
    console.log(documentType)
    //var sorting = {type: documentType.value, document: document, consignee: consignee, client: client, warehouse: warehouse, period: state}
    //props.getSortingObject(sorting)
  };

  const toggleVisibility = () => {
    setOpen(!open);
  };

  const handleSelect = (ranges) => { 
    const { selection } = ranges;
  };

  function onChangeDocument(e) {

    setDocument(e.target.value)
    searchTable()
  }

  function onChangeConsignee(e) {

      setConsignee(e.target.value)
      searchTable()

  }


  
  function onChangeWarehouse(e) {

    setWarehouse(e.target.value)
    searchTable()
  }

  function onChangeReceiver(e) {

    setClient(e.target.value);
    searchTable()
  }

  function onChangeType(e) {
    setDocumentType ({value: e.value, label:e.label});
    searchTable();
  }

    return ( 
        <div className="filters">
             <Select className='select-filters' value={documentType}  onChange={(e) => onChangeType(e)} options={types} id='documentType'/>

             <input
              id = "documentSearch"
              type="text"
              onChange={(e)=> onChangeDocument(e)}
              className="form-control mt-1"
              placeholder="Dokumenta"
             />


             <input
              id = "warehouse"
              type="text"
              onChange={(e)=> onChangeWarehouse(e)}
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
              onChange={(e)=> onChangeReceiver(e)}
              className="form-control mt-1"
              placeholder="Prejemnik"
            />

            <input
              id = "consignee"
              type="text"
              onChange={(e)=> onChangeConsignee(e)}
              className="form-control mt-1"
              placeholder="Naročnik"
            />

         
        </div>


    ); 
} 