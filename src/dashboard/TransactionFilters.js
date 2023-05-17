import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { useEffect, useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { MdOutlineSearch, MdDateRange } from "react-icons/md";
import Select from 'react-select'
import { Dropdown, Stack } from '@fluentui/react'
import _ from 'lodash';
import { HiChevronDown } from "react-icons/hi";
import TransactionService from '../services/TransactionService';
import $ from 'jquery'; 




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
    const [selectedEvent, setSelectedEvent] = useState("");
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
         setTransactionType([{value: 'Izdaja blaga', label: 'Izdaja blaga'}, {value: 'Prevzem blaga', label: 'Prevzem blaga'},{value: 'Medskladišnica', label: 'Medskladišnica'},{value: 'Delovni nalog', label: 'Delovni nalog'},{value: 'Inventura', label: 'Inventura'}]);
         var data =  TransactionService.getAllDocumentTypes().then(response => { 


            var types = [];  
            
            for(var i = 0; i < response.type.length;i++) {
                types.push({code: response.type[i], type: response.names[i]});
            }
            setBusinessEvent(types);
         }); 
         setTransactionStatus([{value: 'Odprt', label: 'Odprt'}, {value: 'Prenesen', label: 'Prenesen'}]);
     
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

        $("#businessEvent-option").text(e.code)
        

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

    function onKeyDownBusinessEvent (e) {
        console.log(e);
    }

    const onRenderOptionBusinessEvent = item => {
        return (
          <table>
            <tbody>
              <tr>
                <td style={{ width: 150 }}>{item.code}</td>
                <td style={{ width: 50 }} />
                <td> {_.get(item, 'type', '').length > 60
              ? `${item.type.substring(0, 55)}...`
              : item.type}</td>
              </tr>
            </tbody>
          </table>
        );
      };


      const onRenderTransactionOrder = item => {
        return (
          <table>
            <tbody>
              <tr>
                <td>{item.order}</td>
                <td>{item.client}</td>
              </tr>
            </tbody>
          </table>
        );
      }

      const onRenderTransactionId = item => {
        return (
          <table>
            <tbody>
              <tr>
                <td>{item.id}</td>
                <td>{item.erpKey}</td>
                <td>{item.order}</td>
                <td>{item.businessEvent}</td>
                <td>{item.date}</td>
              </tr>
            </tbody>
          </table>
        );
      }
      const onRenderClient = item => {
        return (
          <table>
            <tbody>
              <tr>
                <td>{item.name}</td>
                <td>{item.longName}</td>
              </tr>
            </tbody>
          </table>
        );
      }
      const onRenderIdent = item => {
        return (
          <table>
            <tbody>
              <tr>
                <td>{item.ident}</td>
                <td>{item.name}</td>
              </tr>
            </tbody>
          </table>
        );
      }
  
      const onRenderErpKey = item => {
        return (
          <table>
            <tbody>
              <tr>
                <td>{item.erpKey}</td>
                <td>{item.client}</td>
                <td>{item.warehouse}</td>
                <td>{item.date}</td>
              </tr>
            </tbody>
          </table>
        );
      }

    return ( 
        <div>
            <div className="transactionFilters">
                    <div className='columnDivider'>
                   
                    <Select className='select-filters'  placeholder={"Tip transakcije"} onChange={(e) => onChangeTransactionType(e)} options={transactionType} id='transactionType'/>
                    <Dropdown
                        title={props.title}
                        placeholder="Poslovni dogodek"

                        id='businessEvent'
                        onKeyDown={(e) => onKeyDownBusinessEvent(e)}
                        options={businessEvent}
                        onRenderLabel={props.selectedValue}
                        onChange={(action, item) => onChangeBusinessEvent(item)}
                        onRenderOption={onRenderOptionBusinessEvent}                
                    />
                      <Dropdown
                        title={props.title}
                        placeholder={"Nalog za transakcijo"}
                        id='transactionOrder'
                        options={transactionOrder}                  
                        onRenderLabel={props.selectedValue}
                        onChange={(e) => onChangeTransactionOrder(e)}
                        onRenderOption={onRenderTransactionOrder}                
                    />
                    </div>
                    <div className='columnDivider'>
                    <Dropdown
                        title={props.title}
                        placeholder={"ID transakcije"} 
                        id='transactionId'
                        options={transactionId}
                        selectedKey={props.value}
                        onRenderLabel={props.selectedValue}
                        onChange={(e) => onChangeTransactionId(e)} 
                        onRenderOption={onRenderTransactionId}                
                    />
                    <Select className='select-filters' placeholder={"Status transakcije"} onChange={(e) => onChangeTransactionStatus(e)} options={transactionStatus} id='transactionStatus'/>


                    <Dropdown
                        title={props.title}
                        placeholder={"Stranka"}
                        id='client'
                        options={client}
                        selectedKey={props.value}
                        onRenderLabel={props.selectedValue}
                        onChange={(e) => onChangeClient(e)} 
                        onRenderOption={onRenderClient}                
                    />
                    </div>
                    <div className='columnDivider'>
                    <Dropdown
                        title={props.title}
                        placeholder={"Ident"}
                        id='ident'
                        options={ident}
                        selectedKey={props.value}
                        onRenderLabel={props.selectedValue}
                        onChange={(e) => onChangeIdent(e)} 
                        onRenderOption={onRenderIdent}                
                    />
                    <Select className='select-filters' placeholder={"Naziv identa"} onChange={(e) => onChangeIdentName(e)} options={identName} id='identName'/>
                    <Dropdown
                        title={props.title}
                        placeholder={"ERP ključ"}
                        id='erpKey'
                        options={erpKey}
                        selectedKey={props.value}
                        onRenderLabel={props.selectedValue}
                        onChange={(e) => onChangeErpKey(e)} 
                        onRenderOption={onRenderErpKey}                
                    />
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
                    <Select className='select-filters' placeholder={"Uporabnik"} onChange={(e) => onChangeUser(e)} options={user} id='documentType'/>
                    </div>
                    </div>

       </div>
    ); 

} 