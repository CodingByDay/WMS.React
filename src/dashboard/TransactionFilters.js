import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { useEffect, useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { MdOutlineSearch, MdDateRange } from "react-icons/md";
import Select from 'react-select'

export default function TransactionFilters(props) { 
    let open = false;
    // Definintion of application states
    const [transactionType, setTransactionType] = useState([]);
    const [businessEvent, setBusinessEvent] = useState([]);
    const [transactionOrder, setTransactionOrder] = useState([]);
    const [transactionId, setTransactionId] = useState([]);
    const [transactionStatus, setTransactionStatus] = useState([]);
    const [client, setClient] = useState([]);
    const [ident, setIdent] = useState([]);
    const [identName, setIdentName] = useState([]);
    const [erpKey, setErpKey] = useState([]);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);
    const [user, setUser] = useState([]);
    // Data flow
    useEffect(() => {
        var data =  9;
    }, []);






    // Definition of application states
    // Methods for selection
    const handleSelect = (ranges) => { 
        const { selection } = ranges;
        setState([selection]);
      };

    let navigate = useNavigate();
    

    function onChangeTransactionType(e) {
        setTransactionType(e.target.value);
    }
    function onChangeBusinessEvent(e) {
        setBusinessEvent(e.target.value);
    }
    function onChangeTransactionOrder(e) {
        setTransactionOrder(e.target.value);
    }
    function onChangeTransactionId(e) {
        setTransactionId(e.target.value);
    }
    function onChangeTransactionStatus(e) {
        setTransactionStatus(e.target.value);
    }
    function onChangeClient(e) {
        setClient(e.target.value);
    }
    function onChangeIdent(e) {
        setIdent(e.target.value);
    }
    function onChangeIdentName(e) {
        setIdentName(e.target.value);
    }
    function onChangeErpKey(e) {
        setErpKey(e.target.value);
    }
    function onChangeUser(e) {
        setErpKey(e.target.value);
    }
    function toggleVisibility() {
        open = !open;
    }

    return ( 
        <div>
            <div className="transactionFilters">
                    <div className='columnDivider'>
                    <Select className='select-filters' on placeholder={"Izberite"} onChange={(e) => onChangeTransactionType(e)} options={transactionType} id='transactionType'/>
                    <Select className='select-filters' placeholder={"Izberite"} onChange={(e) => onChangeBusinessEvent(e)} options={businessEvent} id='businessEvent'/>
                    <Select className='select-filters' placeholder={"Izberite"} onChange={(e) => onChangeTransactionOrder(e)} options={transactionOrder} id='transactionOrder'/>
                    </div>
                    <div className='columnDivider'>
                    <Select className='select-filters' placeholder={"Izberite"} onChange={(e) => onChangeTransactionId(e)} options={transactionId} id='transactionId'/>
                    <Select className='select-filters' placeholder={"Izberite"} onChange={(e) => onChangeTransactionStatus(e)} options={transactionStatus} id='transactionStatus'/>
                    <Select className='select-filters' placeholder={"Izberite"} onChange={(e) => onChangeClient(e)} options={client} id='client'/>
                    </div>
                    <div className='columnDivider'>
                    <Select className='select-filters' placeholder={"Izberite"} onChange={(e) => onChangeIdent(e)} options={ident} id='ident'/>
                    <Select className='select-filters' placeholder={"Izberite"} onChange={(e) => onChangeIdentName(e)} options={identName} id='identName'/>
                    <Select className='select-filters' placeholder={"Izberite"} onChange={(e) => onChangeErpKey(e)} options={erpKey} id='erpKey'/>
                    </div>
                    <div className='columnDivider'>
                    <button className="btn btn-primary" placeholder={"Izberite"} onClick={toggleVisibility} id="openRange">
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
                    <Select className='select-filters' placeholder={"Izberite"} onChange={(e) => onChangeUser(e)} options={user} id='documentType'/>
                    </div>
                    </div>

       </div>
    ); 

} 