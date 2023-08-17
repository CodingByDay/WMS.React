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
import AddHeadDocument from '../popup/AddHeadDocument';
import TransactionService from '../services/TransactionService';
import ListingService from '../services/ListingService';


export default function HeaderOrderListing(props) { 

    // States
    const [types, setTypes] = useState([]);
    const [document, setDocument] = useState("")
    const [head, setHead] = useState(false);
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
     ] ); 
    const [open, setOpen] = useState(false);
    const [consignee, setConsignee] = useState("")
    const [client, setClient] = useState("")
    const [warehouse, setWarehouse] = useState("")
    const [documentType, setDocumentType] = useState({value:"",label:""})

    const [isOrder, setIsOrder] = useState(false)
    useEffect(() => {
        var data =  SortingService.getAllDocumentTypes().then(response => { 
        var types = [];
           
            for (var i = 0; i < response.Items.length; i++) {
                      types.push({value: response.Items[i].Properties.Items[0].StringValue, label:response.Items[i].Properties.Items[0].StringValue});                       
            }            
            setTypes(types);
     }); 

        // filter the table
        searchTable();
    }, [documentType, consignee, client, warehouse, document, state]);



  let navigate = useNavigate();

 



 const changeVisibility = (data) => {
      setHead(data)
  }
  function searchTable() { 
    var sorting = {type: documentType.value, document: document, consignee: consignee, client: client, warehouse: warehouse, period: state}
    props.getSortingObject(sorting)
  };

  const toggleVisibility = () => {
    setOpen(!open);
  };

  const handleSelect = (ranges) => { 
 
   
  };

  function onChangeDocument(e) {
    setDocument(e.target.value)
  }

  function onChangeConsignee(e) {
      setConsignee(e.target.value)
  }


  function onChangeWarehouse(e) {
    setWarehouse(e.target.value)
  }

  function onChangeReceiver(e) {

    setClient(e.target.value);

  }


  var reload = false;
  function onChangeType(e) {
    const mutated = {value: e.value, label:e.label}
    setDocumentType (mutated);   
  }

  function openAdd() {
    setHead(!head);
    setIsOrder(!isOrder);

  }


    function changeStatus () {
        props.communicate("status", "", "")
    }



    function deleteOrder() {
      
    }




    return ( 
        <div className="filters">


             <Select className='select-filterss' placeholder={"Tip"}  onChange={(e) => onChangeType(e)} options={types} id='documentType'/>


             <input
              id = "documentSearch"
              type="text"
              onChange={(e)=> onChangeDocument(e)}
              className="form-control mt-1"
              placeholder="Dokument"
             />


             <input
              id = "warehouse"
              type="text"
              onChange={(e)=> onChangeWarehouse(e)}
              className="form-control mt-1"
              placeholder="Skladišče"
            />


     


         {open && (
            <div className="nameModule">

              
          <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="horizontal"
          />


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



          
         <span className='actions smallerr s' onClick={toggleVisibility} id="openRange">
              <p>Izberite</p>
              <MdDateRange />
         </span>   
        <div className="responsive-buttons-order">
         <span className='actions smallerr s' id="addOrder" onClick={openAdd}>
              <p>Dodaj</p>
              <MdAdd />
         </span>   

         <span className='actions smallerr s' id="editOrder" onClick={changeStatus}>
              <p>Uredi</p>
              <MdEdit />
         </span>   
         <span className='actions smallerr s' id="deleteOrder" onClick={deleteOrder}>
              <p>Pobriši</p>
              <MdDeleteOutline />
         </span>   
          </div>
         <AddHeadDocument type={"listing"} order = {isOrder} show = {head} changeVisibility = {changeVisibility}  />
          
        </div>


    ); 
} 