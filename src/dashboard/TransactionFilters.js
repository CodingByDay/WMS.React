import { useNavigate } from 'react-router-dom'
import Table from '../table/Table'
import { useEffect, useState, useRef } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { MdOutlineSearch, MdDateRange } from 'react-icons/md'
import Select from 'react-select'
import { Dropdown, Stack } from '@fluentui/react'
import _ from 'lodash'
import { HiChevronDown } from 'react-icons/hi'
import TransactionService from '../services/TransactionService'
import $ from 'jquery'
import DataAccess from '../utility/DataAccess'

export default function TransactionFilters(props) {
  // Definintion of application states
  const [transactionType, setTransactionType] = useState([])
  const [businessEvent, setBusinessEvent] = useState([])
  const [transactionOrder, setTransactionOrder] = useState([])
  const [transactionId, setTransactionId] = useState([])
  const [transactionStatus, setTransactionStatus] = useState([])
  const [client, setClient] = useState([])
  const [ident, setIdent] = useState([])
  const [identName, setIdentName] = useState([])
  const [erpKey, setErpKey] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('')
  const [order, setOrder] = useState('')
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])

  // Reset values to placeholder

  const [transactionTypeSelected, setTransactionTypeSelected] = useState(null)
  const [transactionOrderSelected, setTransactionOrderSelected] = useState(null)
  const [businessEventSelected, setBusinessEventSelected] = useState(null)
  const [clientSelected, setClientSelected] = useState(null)
  const [transactionIdSelected, setTransactionIdSelected] = useState(null)
  const [userSelected, setUserSelected] = useState(null)
  const [erpKeySelected, setErpKeySelected] = useState(null)
  const [transactionStatusSelected, setTransactionStatusSelected] =
    useState(null)
  const targetElementRef = useRef(null)

  const dateRangePickerRef = useRef(null)

  // Place for the selected states

  const [selectedTransationType, setSelectedTransationType] = useState('')
  const [selectedBusinessEvent, setSelectedBusinessEvent] = useState('')
  const [selectedWorkOrder, setSelectedWorkOrder] = useState('')
  const [selectedTransactionId, setSelectedTransactionId] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedIdent, setSelectedIdent] = useState('')
  const [selectedErpKey, setSelectedErpKey] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [ids, setIds] = useState([])
  // Place for the selected states
  // Place for the selected states
  let now = new Date()
  const backdate = new Date(now.setDate(now.getDate() - 15))
  const future = new Date(now.setDate(now.getDate() + 15))

  const [state, setState] = useState([
    {
      startDate: backdate,
      endDate: future,
      key: 'selection',
    },
  ])
  function isDescendant(parent, child) {
    let node = child.parentNode

    while (node != null) {
      if (node === parent) {
        return true
      }
      node = node.parentNode
    }

    return false
  }
  function uniqueAndNotEmpty(value, arrayify) {
    if (arrayify.length === 1) {
      return true
    }

    for (var i = 0; i < arrayify.length; i++) {
      if (arrayify[i].value === value || arrayify[i].value === '') {
        return false
      }
    }
    return true
  }

  const [user, setUser] = useState([])

  // Data flow
  useEffect(() => {
    window.document.addEventListener('mousedown', handleClickOutside)

    function handleMouseDown(event) {
      const targetElement = targetElementRef.current

      if (targetElement && !isDescendant(targetElement, event.target)) {
        // Click occurred outside the target element
        toggleVisibility()
      }
    }

    var ids = []

    var dn = TransactionService.getAllTransactions().then((response) => {
      var transactions = []
      transactions.push({ value: '', label: '' })
      ids.push({ value: '', label: '' })
      for (var i = 0; i < response.Items.length; i++) {
        var id = DataAccess.getData(response.Items[i], 'HeadID', 'IntValue')
        var field = DataAccess.getData(
          response.Items[i],
          'LinkKey',
          'StringValue',
        )
        transactions.push({ label: field, value: field })
        ids.push({ value: id, label: id })
      }
      setIds(ids)
      setTransactionOrder(
        transactions.filter(
          (v, i, a) =>
            a.findIndex((v2) =>
              ['value', 'label'].every((k) => v2[k] === v[k]),
            ) === i,
        ),
      )
    })
    if (selectedEvent != '') {
      $('#businessEvent-option').text(selectedEvent)
    }
    setTransactionType([
      { value: '', label: '' },
      { value: 'Izdaja blaga', label: 'Izdaja blaga' },
      { value: 'Prevzem blaga', label: 'Prevzem blaga' },
      { value: 'Medskladišnica', label: 'Medskladišnica' },
      { value: 'Delovni nalog', label: 'Delovni nalog' },
      { value: 'Inventura', label: 'Inventura' },
    ])
    var data = TransactionService.getAllDocumentTypes().then((response) => {
      var types = []
      types.push({
        value: '',
        label: '',
        code: '',
        properties: [],
        header: true,
      })

      for (var i = 0; i < response.type.length; i++) {
        var properties = [response.type[i], response.names[i]]
        types.push({
          value: ' | ' + response.type[i] + ' | ' + response.names[i] + ' | ',
          label: ' | ' + response.type[i] + ' | ' + response.names[i] + ' | ',
          code: response.type[i],
          header: false,
          properties: properties,
        })
      }

      setBusinessEvent(types)
    })

    setTransactionStatus([
      { value: '', label: '' },
      { value: 'Odprt', label: 'Odprt' },
      { value: 'Zaključen', label: 'Zaključen' },
    ])
    var erp = TransactionService.getErpKeys().then((response) => {
      var erps = []
      erps.push({
        erpKey: '',
        client: '',
        warehouse: '',
        label: '',
        value: '',
        properties: [],
        header: true,
        code: '',
      })

      for (var i = 0; i < response.Items.length; i++) {
        var erpKey = DataAccess.getData(response.Items[i], 'Key', 'StringValue')
        var client = DataAccess.getData(
          response.Items[i],
          'Client',
          'StringValue',
        )
        var warehouse = DataAccess.getData(
          response.Items[i],
          'Warehouse',
          'StringValue',
        )

        var properties = [erpKey, warehouse]

        erps.push({
          label: ' | ' + erpKey + ' | ' + warehouse + ' | ',
          value: ' | ' + erpKey + ' | ' + warehouse + ' | ',
          header: false,
          properties: properties,
          code: erpKey,
        })
      }
      setErpKey(erps)
    })
    // Filling the clients table

    var clients = TransactionService.getClients().then((response) => {
      var clients = []
      clients.push({ value: '', label: '' })

      for (var i = 0; i < response.Items.length; i++) {
        var field = DataAccess.getData(response.Items[i], 'ID', 'StringValue')
        clients.push({ label: field, value: field })
      }
      setClient(clients)
    })

    var idents = TransactionService.getIdents().then((response) => {
      var identObjects = []
      identObjects.push({ value: '', label: '' })

      // This is the place to check if all of the idents are correctly rendered.
      for (var i = 0; i < response.data.length; i++) {
        identObjects.push({ label: response.data[i], value: response.data[i] })
      }

      setIdent(identObjects)
    })

    var users = TransactionService.getUsers().then((response) => {
      var users = []
      users.push({ label: '', value: '' })
      for (var i = 0; i < response.Items.length; i++) {
        var user = DataAccess.getData(
          response.Items[i],
          'Subject',
          'StringValue',
        )
        users.push({ label: user, value: user })
      }
      setUsers(users)
    })

    props.bringBackFilters({
      selectedTransationType: selectedTransationType,
      selectedBusinessEvent: selectedBusinessEvent,
      selectedTransactionId: selectedTransactionId,
      selectedWorkOrder: selectedWorkOrder,
      transactionId: transactionId,
      selectedStatus: selectedStatus,
      selectedClient: selectedClient,
      selectedIdent: selectedIdent,
      selectedErpKey: selectedErpKey,
      selectedUser: selectedUser,
      period: state,
    })
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [
    selectedEvent,
    selectedTransationType,
    selectedBusinessEvent,
    selectedTransactionId,
    selectedWorkOrder,
    transactionId,
    selectedStatus,
    selectedClient,
    selectedIdent,
    selectedErpKey,
    selectedUser,
    state,
  ])

  // Definition of application states
  // Methods for selection

  const handleSelect = (ranges) => {
    const { selection } = ranges
    setState([selection])
  }

  let navigate = useNavigate()

  function onChangeTransactionType(e) {
    setSelectedTransationType(e.value)
    if (e.value == '') {
      setTransactionTypeSelected(null)
    } else {
      setTransactionTypeSelected({ value: e.value, label: e.value })
    }
  }

  function onChangeBusinessEvent(e) {
    setSelectedBusinessEvent(e.code)

    if (e.code == '') {
      setBusinessEventSelected(null)
    } else {
      setBusinessEventSelected(e)
    }
  }

  function onChangeTransactionOrder(e) {
    setSelectedWorkOrder(e.value)
    if (e.value == '') {
      setTransactionOrderSelected(null)
    } else {
      setTransactionOrderSelected({ value: e.value, label: e.value })
    }
  }

  function onChangeTransactionId(e) {
    setSelectedTransactionId(e.value)
    if (e.value == '') {
      setTransactionIdSelected(null)
    } else {
      setTransactionIdSelected({ value: e.value, label: e.value })
    }
  }

  function onChangeTransactionStatus(e) {
    setSelectedStatus(e.value)
    if (e.value == '') {
      setTransactionStatusSelected(null)
    } else {
      setTransactionStatusSelected({ value: e.value, label: e.value })
    }
  }

  function onChangeClient(e) {
    setSelectedClient(e.value)
    if (e.value == '') {
      setClientSelected(null)
    } else {
      setClientSelected({ value: e.value, label: e.value })
    }
  }

  function onChangeIdent(e) {
    setSelectedIdent(e.value)
  }

  function onChangeErpKey(e) {
    setSelectedErpKey(e.code)
    if (e.value == '') {
      setErpKeySelected(null)
    } else {
      setErpKeySelected(e)
    }
  }

  function onChangeUser(e) {
    setSelectedUser(e.value)
    if (e.value == '') {
      setUserSelected(null)
    } else {
      setUserSelected({ value: e.value, label: e.value })
    }
  }
  const handleClickOutside = (event) => {
    if (dateRangePickerRef.current && document.addEventListener) {
      if (!dateRangePickerRef.current.contains(event.target)) {
        // Click occurred outside of the date range picker
        setOpen(false)
      }
    }
  }
  function toggleVisibility() {
    setOpen(!open)
  }

  function onKeyDownBusinessEvent(e) {}

  const DynamicFormatOptionLabelErp = ({
    label,
    properties,
    header,
    code,
    exists,
  }) => (
    <div>
      {properties && properties.length && !exists ? (
        <div style={{ display: 'flex', margin: '0', padding: '0' }}>
          {properties.map((property, index) =>
            !header ? (
              <div
                key={index}
                style={{
                  minWidth: '300',
                  paddingLeft: '3px',
                  paddingRight: '3px',
                  fontSize: '80%',
                  color: 'gray',
                  marginRight: '0px',
                  whiteSpace: 'nowrap',
                }}
              >
                {property}
              </div>
            ) : (
              <div
                key={index}
                style={{
                  fontWeight: '600',
                  minWidth: '300',
                  paddingLeft: '5px',
                  paddingRight: '3px',
                  fontSize: '80%',
                  color: 'black',
                  marginRight: '0px',
                  whiteSpace: 'nowrap',
                }}
              >
                {property}
              </div>
            ),
          )}
        </div>
      ) : (
        <div style={{ fontSize: '100%' }}>{code}</div>
      )}
    </div>
  )

  const customStyles = {
    control: (base) => ({
      ...base,
      width: '22em', // Width of the control
    }),
    menu: (base) => ({
      ...base,
      width: '22em', // Width of the dropdown menu
    }),
    option: (provided) => ({
      ...provided,
      whiteSpace: 'nowrap', // Prevent line breaks
      overflow: 'hidden', // Hide overflowing text
      textOverflow: 'ellipsis', // Display ellipsis for overflowed text
    }),
  }

  const formatOptionLabelErp = ({ label, properties, header, code }) => {
    var exists = false

    if (code && erpKeySelected) {
      exists = erpKeySelected.code === code || false
    }

    // Return the component with the processed data
    return (
      <DynamicFormatOptionLabelErp
        properties={properties}
        exists={exists}
        label={label}
        code={code}
        header={header}
      />
    )
  }

  const DynamicFormatOptionLabel = ({
    label,
    properties,
    header,
    code,
    exists,
  }) => (
    <div>
      {properties && properties.length && !exists ? (
        <div style={{ display: 'flex', margin: '0', padding: '0' }}>
          {properties.map((property, index) =>
            !header ? (
              <div
                key={index}
                style={{
                  minWidth: '300',
                  paddingLeft: '3px',
                  paddingRight: '3px',
                  fontSize: '80%',
                  color: 'gray',
                  marginRight: '0px',
                  whiteSpace: 'nowrap',
                }}
              >
                {property}
              </div>
            ) : (
              <div
                key={index}
                style={{
                  fontWeight: '600',
                  minWidth: '300',
                  paddingLeft: '5px',
                  paddingRight: '3px',
                  fontSize: '80%',
                  color: 'black',
                  marginRight: '0px',
                  whiteSpace: 'nowrap',
                }}
              >
                {property}
              </div>
            ),
          )}
        </div>
      ) : (
        <div style={{ fontSize: '100%' }}>{code}</div>
      )}
    </div>
  )

  const formatOptionLabel = ({ label, properties, header, code }) => {
    var exists = false

    if (code && businessEventSelected) {
      exists = businessEventSelected.code === code || false
    }

    // Return the component with the processed data
    return (
      <DynamicFormatOptionLabel
        properties={properties}
        exists={exists}
        label={label}
        code={code}
        header={header}
      />
    )
  }

  return (
    <div>
      <div className='transactionFilters'>
        <div className='columnDivider'>
          <Select
            styles={customStyles}
            className='select-filters'
            value={transactionTypeSelected}
            placeholder={'Tip transakcije'}
            onChange={(e) => onChangeTransactionType(e)}
            options={transactionType}
            id='transactionType'
          />
          <Select
            styles={customStyles}
            className='select-filters'
            value={transactionOrderSelected}
            placeholder={'Nalog za transakcijo'}
            options={transactionOrder}
            onChange={(e) => onChangeTransactionOrder(e)}
            id='transactionOrder'
          />
          <Select
            styles={customStyles}
            getOptionLabel={(option) => option.code}
            getOptionValue={(option) => option.code}
            formatOptionLabel={formatOptionLabel}
            title={props.title}
            placeholder='Poslovni dogodek'
            id='businessEvent'
            value={businessEventSelected}
            onKeyDown={(e) => onKeyDownBusinessEvent(e)}
            options={businessEvent}
            onChange={(e) => onChangeBusinessEvent(e)}
          />
        </div>

        <div className='columnDivider'>
          <Select
            styles={customStyles}
            className='select-filters'
            placeholder={'Status transakcije'}
            value={transactionStatusSelected}
            onChange={(e) => onChangeTransactionStatus(e)}
            options={transactionStatus}
            id='transactionStatus'
          />

          <Select
            styles={customStyles}
            value={clientSelected}
            placeholder={'Stranka'}
            id='client'
            options={client}
            onChange={(e) => onChangeClient(e)}
          />

          <Select
            styles={customStyles}
            id='idTransaction'
            type='text'
            value={transactionIdSelected}
            options={ids}
            placeholder={'ID transakcije'}
            onChange={(e) => onChangeTransactionId(e)}
          />
        </div>

        <div className='columnDivider'>
          <span
            className='actions smallerr filter'
            styles={customStyles}
            placeholder={'Izberite'}
            onClick={toggleVisibility}
            id='openRangeTransaction'
          >
            <p>Izberite</p>
            <MdDateRange />
          </span>

          <Select
            styles={customStyles}
            placeholder={'Uporabnik'}
            value={userSelected}
            onChange={(e) => onChangeUser(e)}
            options={users}
            id='userSelect'
          />

          <Select
            styles={customStyles}
            placeholder={'ERP ključ'}
            value={erpKeySelected}
            id='erpKey'
            getOptionLabel={(option) => option.code}
            getOptionValue={(option) => option.code}
            formatOptionLabel={formatOptionLabelErp}
            options={erpKey}
            onChange={(e) => onChangeErpKey(e)}
          />
        </div>

        <div className='columnDivider'>
          {open && (
            <div className='nameModule' ref={dateRangePickerRef}>
              <DateRangePicker
                styles={customStyles}
                className='dateRangePicker'
                onChange={(item) => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                direction='horizontal'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
