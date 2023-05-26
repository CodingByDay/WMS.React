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
import DataAccess from "../utility/DataAccess";




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
    const [order, setOrder] = useState("");











    // Place for the selected states 

    const [selectedTransationType, setSelectedTransationType] = useState("");
    const [selectedBusinessEvent, setSelectedBusinessEvent] = useState("");
    const [selectedWorkOrder, setSelectedWorkOrder] = useState("");
    const [selectedTransactionId, setSelectedTransactionId] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedIdent, setSelectedIdent] = useState("");
    const [selectedErpKey, setSelectedErpKey] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    // Place for the selected states 




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



        var dn = TransactionService.getAllTransactions().then(response=> {
            var transactions = []
            transactions.push({value: '', label: ''})
            for(var i=0;i<response.Items.length;i++) {
                var field = DataAccess.getData(response.Items[i], "LinkKey", "StringValue");
                transactions.push({label: field,  value: field});
            }
            setTransactionOrder(transactions)
          });

            if(selectedEvent!="") {
               $("#businessEvent-option").text(selectedEvent);
            }
            setTransactionType([{value: '', label: ''},{value: 'Izdaja blaga', label: 'Izdaja blaga'}, {value: 'Prevzem blaga', label: 'Prevzem blaga'},{value: 'Medskladišnica', label: 'Medskladišnica'},{value: 'Delovni nalog', label: 'Delovni nalog'},{value: 'Inventura', label: 'Inventura'}]);
            var data =  TransactionService.getAllDocumentTypes().then(response => { 
            var types = [];  
            types.push({value: '', label: ''})

            for(var i = 0; i < response.type.length;i++) {
                types.push({code: response.type[i], type: response.names[i]});
            }
            setBusinessEvent(types);
         }); 
         setTransactionStatus([{value: '', label: ''},{value: 'Odprt', label: 'Odprt'}, {value: 'Zaključen', label: 'Zaključen'}]);



         var erp = TransactionService.getErpKeys().then(response=> {
          var erps = [];
          erps.push({erpKey: "", client: "", warehouse: ""})

          for(var i=0;i<response.Items.length;i++) {
          var erpKey = DataAccess.getData(response.Items[i], "Key", "StringValue");
          var client = DataAccess.getData(response.Items[i], "Client", "StringValue");
          var warehouse = DataAccess.getData(response.Items[i], "Warehouse", "StringValue");

          erps.push({erpKey: erpKey, client: client, warehouse: warehouse});
          }
          setErpKey(erps)
        });
         // Filling the clients table


        var clients = TransactionService.getClients().then(response=> {
            var clients = []
            clients.push({value: '', label: ''})

            for(var i=0;i<response.Items.length;i++) {
                var field = DataAccess.getData(response.Items[i], "ID", "StringValue");
                clients.push({label: field,  value: field});
            }
            setClient(clients)
          });


          var idents = TransactionService.getIdents().then(response=> {

    
            var identObjects = []
            identObjects.push({value: '', label: ''})

            // This is the place to check if all of the idents are correctly rendered.
            for(var i=0;i<response.data.length;i++) {
              identObjects.push({label: response.data[i],  value: response.data[i]});
            }



            window.identity = identObjects;
            setIdent(identObjects)
          });

          props.bringBackFilters({selectedTransationType: selectedTransationType, selectedBusinessEvent:selectedBusinessEvent,selectedWorkOrder:selectedWorkOrder,setSelectedTransactionId:setSelectedTransactionId,selectedStatus:selectedStatus, selectedClient:selectedClient,selectedIdent:selectedIdent,selectedErpKey:selectedErpKey, selectedUser:selectedUser})

    }, [selectedEvent, selectedTransationType, selectedBusinessEvent, selectedWorkOrder, setSelectedTransactionId, selectedStatus, selectedClient, selectedIdent, selectedErpKey, selectedUser]);

    // Definition of application states
    // Methods for selection

    const handleSelect = (ranges) => { 
        const { selection } = ranges;
        setState([selection]);
      };

    let navigate = useNavigate();
    

    function onChangeTransactionType(e) {
      console.log(e);
       setSelectedTransationType(e.value)
    }


    function onChangeBusinessEvent(e) {
        console.log(e);
        setSelectedBusinessEvent(e.code);
    }


    function onChangeTransactionOrder(e) {
        console.log(e);
        setSelectedWorkOrder(e.value);
    }

    function onChangeTransactionId(e) {
        console.log(e);
        setSelectedTransactionId(e.value);
    }

    function onChangeTransactionStatus(e) {
        console.log(e);
        setSelectedStatus(e.value);
    }

    function onChangeClient(e) {
        console.log(e);
        setSelectedClient(e.value);
    }

    function onChangeIdent(e) {
        console.log(e);
        setSelectedIdent(e.value);
    }

    function onChangeErpKey(e) {
      console.log(e);
      setSelectedErpKey(e.value);
    }
    function onChangeUser(e) {
      console.log(e);
      setSelectedUser(e.value);
    }
    function toggleVisibility() {
        open = !open;
    }

    function onKeyDownBusinessEvent (e) {
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
   
  
      const onRenderErpKey = item => {
        return (
          <table>
            <tbody>
              <tr>
                <td style={{ width: 150 }}>{item.erpKey}</td>
                <td style={{ width: 150 }}>{item.client}</td>
                <td style={{ width: 150 }}>{item.warehouse}</td>
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
                        onChange={(action, item) => onChangeBusinessEvent(item)}
                        onRenderOption={onRenderOptionBusinessEvent}                
                    />


                    <Select className='select-filters'  placeholder={"Nalog za transakcijo"} options={transactionOrder} onChange={(e) => onChangeTransactionOrder(e)} id='transactionOrder'/>


                    </div>

                    <div className='columnDivider'>


        
                     <input
                      id = "receiver"
                      type="text"
                      placeholder={"ID transakcije"} 
                      onChange={(e) => onChangeTransactionId(e)} 
                      className="form-control mt-1"
                      />


                    <Select className='select-filters' placeholder={"Status transakcije"} onChange={(e) => onChangeTransactionStatus(e)} options={transactionStatus} id='transactionStatus'/>


                    <Select
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


                    <Select 
                        placeholder={"Ident"}
                        id='ident'
                        options={ident}
                        onChange={(e) => onChangeIdent(e)} 
                    />

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

                    <Select className='select-filters' placeholder={"Uporabnik"} onChange={(e) => onChangeUser(e)} options={user} id='documentType'/>

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
                    </div>
                    </div>

       </div>
    ); 

} 