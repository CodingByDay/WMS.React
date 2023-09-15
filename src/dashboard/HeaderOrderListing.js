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
import PopupService from '../services/PopupService';
import DataAccess from "../utility/DataAccess";

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






     const [documentNumbers, setDocumentNumbers] = useState([]);
     const [warehouses, setWarehouses] = useState([]);
     const [receivers, setReceivers] = useState([]);


     // Variable for the current choice within the different dropdowns

     const [currentType, setCurrentType] = useState(null);
     const [currentDocumentNumber, setCurrentDocumentNumber] = useState(null);
     const [currentReceivers, setCurrentReceivers] = useState(null);






    const [isOrder, setIsOrder] = useState(false)
    useEffect(() => {


                          var data =  SortingService.getAllDocumentTypes().then(response => { 
                          var types = [];
                          
                          types.push({value: "", code: "", label: ""});

                          for (var i = 0; i < response.Items.length; i++) {

                                    var type = DataAccess.getData(response.Items[i], "Code", "StringValue");
                                    var name = DataAccess.getData(response.Items[i], "Name", "StringValue");

                                    var together = type + "|" + name;

                                    types.push({value: together, label:together, code: type});                       
                          }            
                          setTypes(types);
                  }); 



                  var dn = TransactionService.getAllTransactions().then(response=> {
                    var transactions = []
                    transactions.push({value: '', label: ''})
                    for(var i=0;i<response.Items.length;i++) {

                          var field = DataAccess.getData(response.Items[i], "LinkKey", "StringValue");
                          transactions.push({label: field,  value: field});

                          
                    }

                    setDocumentNumbers(transactions.filter((v,i,a)=>a.findIndex(v2=>['value','label'].every(k=>v2[k] ===v[k]))===i))
                  });


                    var subjects =  PopupService.getSubjects().then(response => { 
                      window.subjects = response;
                      var subjectsList = [];   
                      subjectsList.push({value:"", label:""})
                    for(var i = 0; i < response.Items.length; i++) {
                          var field = DataAccess.getData(response.Items[i], "ID", "StringValue");
                          subjectsList.push({value: field, label: field});
                    }
                    setReceivers(subjectsList); 
            });


        // filter the table
        searchTable();
    }, [currentType, currentDocumentNumber, currentReceivers, state]);



  let navigate = useNavigate();

 



 const changeVisibility = (data) => {

      setHead(data)
  }
  function searchTable() { 
    var sorting = {
      type: currentType && currentType.value || "",
      document: currentDocumentNumber && currentDocumentNumber.value || "",
      client: currentReceivers && currentReceivers.value || "",
      period: state || ""
    };
    console.log(sorting)
    props.getSortingObject(sorting)
  };

  const toggleVisibility = () => {
    setOpen(!open);
  };

  const handleSelect = (ranges) => { 
 
   
  };

  function onChangeDocument(e) {
    // testing 
    setDocument(e.target.code)
  }

  function onChangeConsignee(e) {
      setConsignee(e.target.value)
  }


  function onChangeWarehouse(e) {
    setWarehouse(e.target.value)
  }

  function onChangeReceiver(e) {
    if(e.value == "") {
       setCurrentReceivers(null)
    } else {
       setCurrentReceivers({value: e.value, label: e.value})
    }
  }


  var reload = false;

  function onChangeDocumentNumber(e) {
    if(e.value == "") {
        setCurrentDocumentNumber(null)
    } else {
        setCurrentDocumentNumber({ value: e.value, label: e.value })
    }
  }




  function onChangeType(e) {
    if (e.value == "") {
      setCurrentType(null)
    } else {
      const mutated = {value: e.code, label:e.code}
      setCurrentType (mutated);   
    }
  }
  function openAdd() {
    setHead(!head);
    setIsOrder(!isOrder);

  }


    function changeStatus () {
        props.communicate("status", "", "")
    }



    function deleteOrder() {
      props.communicate("head", "delete");
    }


    const renderComponent = () => { 
     props.communicate("head", "render")
    }


    return ( 
        <div className="filters">


             <Select className='select-filterss' placeholder={"Tip"} value={currentType} onChange={(e) => onChangeType(e)} options={types} id='documentType'/>

             <Select className='select-filterss' placeholder={"Številka naročila"} value={currentDocumentNumber} onChange={(e) => onChangeDocumentNumber(e)} options={documentNumbers} id='documentNumbers'/>

             <Select className='select-filterss' placeholder={"Prejemnik"} value={currentReceivers}  onChange={(e) => onChangeReceiver(e)} options={receivers} id='documentNumbers'/>




     


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




      



          
         <span className='actions smallerr s' onClick={toggleVisibility} id="openRange">
              <p>Izberite</p>
              <MdDateRange />
         </span>   
        <div className="responsive-buttons-order">

         <span className='actions smallerr s' id="addOrder" onClick={openAdd}>
              <p>Dodaj</p>
              <MdAdd />
         </span>   

        {/* <span className='actions smallerr s' id="editOrder" onClick={changeStatus}>
              <p>Uredi</p>
              <MdEdit />
         </span>   */}

         <span className='actions smallerr s' id="deleteOrder" onClick={deleteOrder}>
              <p>Pobriši</p>
              <MdDeleteOutline />
         </span>   
         
          </div>

         <AddHeadDocument type={"listing"} render = {renderComponent}  order = {isOrder} show = {head} changeVisibility = {changeVisibility}  />
          
        </div>


    ); 
} 