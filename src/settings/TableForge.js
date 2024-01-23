import React, { useState, useMemo } from 'react';
import { MdEdit } from 'react-icons/md';
import { IoAddCircleSharp } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import Swal from 'sweetalert2';
import SettingsService from '../services/SettingsService';
import Insert from '../popup/Insert';
import Update from '../popup/Update';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

function TableForge({ refresh, name, tableData }) {





  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [id, setId] = useState({});





  
  const showDeleteConfirmation = (data) => {

    var currentDeleteSQL = selectedTable.deleteQuery;

    var params = [];
    var parameterId = { Name: 'id', Type: 'Int64', Value: data[selectedTable.id]  }
    params.push(parameterId);

    Swal.fire({
      title: 'Ste prepričani?',
      text: 'To dejanje ni mogoče razveljaviti!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Da, izbriši!',
      cancelButtonText: 'Ne',
    }).then((result) => {
      if (result.isConfirmed) {
        SettingsService.insertSQLQuery(currentDeleteSQL, params).then((result) => {
          var data = result;

          if (data) {
            Swal.fire('Izbrisano!', 'Zapis je bil pobrisan.', 'success');
          } else {
            Swal.fire('Napaka!', 'Zapis ni bil pobrisan.', 'error');
          }

          setTimeout(refresh, 1000);
        });
      }
    });
  };

  const onDelete = (data) => {
    setId(data[selectedTable.id])
    showDeleteConfirmation(data);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const generatePopupCreate = () => {
    
    setIsModalOpen(true);
  };

  const generatePopupEdit = (data) => {

    setEditData(data);



    setIsEditModalOpen(true);
  };

  const onAdd = () => {
    generatePopupCreate(selectedTable);
  };

  const onEdit = (row) => {



      var target;
      var current = selectedTable.id;
      target = selectedTable.id;
      setId(row[current])
      generatePopupEdit(row, selectedTable);
  };

  const systemColumns = useMemo(
    () => [
      
      {
        Header: (
          <button className="action-buttons white" title="Vnos" onClick={onAdd}>
            <IoAddCircleSharp />
            Dodaj           
          </button>         
        ),
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <button className="action-buttons" title="Brisanje" onClick={() => onDelete(row.original)}>
              <MdDeleteForever />
            </button>
            <button className="action-buttons" title="Posodobitev" onClick={() => onEdit(row.original)}>
              <MdEdit />
            </button>          
          </div>
        ),
        type: 'nothing',
      },
      {
        Header: 'Naziv',
        accessor: 'ID',
        className: 'name-column-system',
        type: 'dropdown',
        sourceSelect: 'SELECT * FROM uWMSSettingList;',
        columnOrder: ['ID', 'Desc'],
        columnOrderTranslation: ['Naziv', 'Opis'],
        columnOrderWidth: [200, 300],
        dropdownId: 'ID',
        dropdownPlaceholder: '',
        dropdownHelperField: 'Desc',
        dbType: 'String',

      },
      {
        Header: 'Vrednost',
        accessor: 'Value',
        className: 'value-column-system',
        type: 'text',
        dbType: 'String'

      }, 
    
     


    ],
    []
  );





  // This is the configuration for the subject codes // 
  const subjectCodes = useMemo(
    () => [
      
      {
        Header: (
          <button className="action-buttons white" title="Vnos" onClick={onAdd}>
            <IoAddCircleSharp />
            Dodaj
            
          </button>
          
        ),
        accessor: 'actions',

        Cell: ({ row }) => (
          <div>

            <button className="action-buttons" title="Brisanje" onClick={() => onDelete(row.original)}>
              <MdDeleteForever />
            </button>
            <button className="action-buttons" title="Posodobitev" onClick={() => onEdit(row.original)}>
              <MdEdit />
            </button>
           
          </div>
        ),
        type: 'nothing',
      },


      {
        Header: 'Id',
        accessor: 'anQId',
        className: 'name-column-system',
        type: 'nothing',     
      },
      {
        Header: 'Ident',
        accessor: 'acIdent',
        className: 'name-column-system',
        type: 'dropdown',
        sourceSelect: 'SELECT acIdent, acName FROM tHE_SetItem;',
        columnOrder: ['acIdent', 'acName'],
        columnOrderTranslation: ['Ident', 'Naziv'],
        columnOrderWidth: [200, 300],
        dropdownId: 'acIdent',
        dropdownPlaceholder: '',
        dropdownHelperField: 'acName',
        dbType: 'String'
      },
      {
        Header: 'Subjekt',
        accessor: 'acSubject',
        className: 'name-column-system',
        type: 'dropdown',
        sourceSelect: 'SELECT acSubject, acName2, acAddress, acPost, acCountry FROM tHE_SetSubj',
        columnOrder: ['acSubject', 'acName2', 'acAddress', 'acPost', 'acCountry'],
        columnOrderTranslation: ['Subjekt', 'Naziv', 'Naslov', 'Pošta', 'Država'],
        columnOrderWidth: [200, 300, 200, 200, 200],
        dropdownId: 'acSubject',
        dropdownPlaceholder: '',
        dropdownHelperField: 'acName2',
        dbType: 'String'
      },
      {
        Header: 'Črtna koda',
        accessor: 'acCode',
        className: 'name-column-system',
        type: 'text',  
        dbType: 'String'    
      }, 
      {
        Header: 'Število kosov',
        accessor: 'uWMSSerialNoBatch',
        className: 'name-column-system',
        type: 'text',  
        dbType: 'Int64'    
      }

    ],
    []
  );




// This is the configuration for the statuses of documents // 
const statusDocument = useMemo(
  () => [
    
    {
      Header: (
        <button className="action-buttons white" title="Vnos" onClick={onAdd}>
          <IoAddCircleSharp />
          Dodaj
          
        </button>
        
      ),
      accessor: 'actions',

      Cell: ({ row }) => (
        <div>

          <button className="action-buttons" title="Brisanje" onClick={() => onDelete(row.original)}>
            <MdDeleteForever />
          </button>
          <button className="action-buttons" title="Posodobitev" onClick={() => onEdit(row.original)}>
            <MdEdit />
          </button>
         
        </div>
      ),
      type: 'nothing',
    },
    {
      Header: 'Id',
      accessor: 'anQId',
      className: 'name-column-system',
      type: 'nothing',     
    },
    {
      Header: 'Vrsta dokumenta',
      accessor: 'acDocType',
      className: 'name-column-system',
      type: 'dropdown',
      sourceSelect: 'SELECT acDocType, acName FROM tPA_SetDocType;',
      columnOrder: ['acDocType', 'acName'],
      columnOrderTranslation: ['Vrsta dokumenta', 'Naziv'],
      columnOrderWidth: [200, 300],
      dropdownId: 'acDocType',
      dropdownPlaceholder: '',
      dropdownHelperField: 'acName',
      dbType: 'String'
    },
    {
      Header: 'Koda statusa',
      accessor: 'acStatus',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'Naziv statusa',
      accessor: 'acName',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'    
    }, 
    {
      Header: 'Viden',
      accessor: 'uWMSShow',
      className: 'name-column-system',
      type: 'checkbox',  
      dbType: 'Boolean',
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.values.uWMSShow} // Set the checked state based on the value of uWMSShow
          onChange={() => {

          }}
        />
      ),
    }

  ],
  []
);

























// This is the configuration for the statuses of documents // 
const documentTypes = useMemo(
  () => [
    
    {
      Header: (
        <button className="action-buttons white" title="Vnos" onClick={onAdd}>
          <IoAddCircleSharp />
          Dodaj
          
        </button>
        
      ),
      accessor: 'actions',

      Cell: ({ row }) => (
        <div>

          <button className="action-buttons" title="Brisanje" onClick={() => onDelete(row.original)}>
            <MdDeleteForever />
          </button>
          <button className="action-buttons" title="Posodobitev" onClick={() => onEdit(row.original)}>
            <MdEdit />
          </button>
         
        </div>
      ),
      type: 'nothing',
    },
    {
      Header: 'Id',
      accessor: 'anQId',
      className: 'name-column-system',
      type: 'nothing',     
    },
    {
      Header: 'Vrsta',
      accessor: 'acDocType',
      className: 'name-column-system',
      type: 'dropdown',
      sourceSelect: 'SELECT acDocType, acName FROM tPA_SetDocType;',
      columnOrder: ['acDocType', 'acName'],
      columnOrderTranslation: ['Vrsta dokumenta', 'Naziv'],
      columnOrderWidth: [200, 300],
      dropdownId: 'acDocType',
      dropdownPlaceholder: '',
      dropdownHelperField: 'acName',
      dbType: 'String'
    },
    {
      Header: 'Namen',
      accessor: 'acSetOf',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'Varianta',
      accessor: 'acType',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'    
    }, 
    {
      Header: 'Naziv',
      accessor: 'acName',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'    
    }, 
    {
      Header: 'Izdajno',
      accessor: 'acIssuer',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'    
    }, 
    {
      Header: 'Prevzemno',
      accessor: 'acReceiver',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'    
    }, 
    {
      Header: 'Prevzeto',
      accessor: 'acWarehouse',
      className: 'name-column-system',
      type: 'dropdown',
      sourceSelect: `select acSubject, acName2 from tHE_SetSubj where acWarehouse = 'T'`,
      columnOrder: ['acSubject', 'acName2'],
      columnOrderTranslation: ['Subjekt', 'Naziv'],
      columnOrderWidth: [200, 300],
      dropdownId: 'acSubject',
      dropdownPlaceholder: '',
      dropdownHelperField: 'acName2',
      dbType: 'String'
    },
    {
      Header: 'Vrsta prevzema',
      accessor: 'uWMSAcqDocType',
      className: 'name-column-system',
      type: 'dropdown',
      sourceSelect: `SELECT acDocType, acName FROM tPA_SetDocType WHERE acSetOf = 'F AND acType = 'I'`,
      columnOrder: ['acDocType', 'acName'],
      columnOrderTranslation: ['Vrsta dokumenta', 'Naziv'],
      columnOrderWidth: [200, 300],
      dropdownId: 'acDocType',
      dropdownPlaceholder: '',
      dropdownHelperField: 'acName',
      dbType: 'String'
    },
    {
      Header: 'Vrsta izdaje',
      accessor: 'uWMSIssueDocType',
      className: 'name-column-system',
      type: 'dropdown',
      sourceSelect: `SELECT acDocType, acName FROM tPA_SetDocType WHERE acSetOf = 'F' and acType = 'P'`,
      columnOrder: ['acDocType', 'acName'],
      columnOrderTranslation: ['Vrsta dokumenta', 'Naziv'],
      columnOrderWidth: [200, 300],
      dropdownId: 'acDocType',
      dropdownPlaceholder: '',
      dropdownHelperField: 'acName',
      dbType: 'String'
    },
    {
      Header: 'Viden',
      accessor: 'uWMS',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'    
    }, 
    {
      Header: 'Status delno zakl.',
      accessor: 'uWMSPartiallyFinishStatus',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'    
    },
    {
      Header: 'Status zaklj.',
      accessor: 'uWMSFinishStatus',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'    
    }
  ],
  []
);


const subjects = useMemo(
  () => [
    
    {
      Header: (
        <button className="action-buttons white" title="Vnos" onClick={onAdd}>
          <IoAddCircleSharp />
          Dodaj
          
        </button>
        
      ),
      accessor: 'actions',

      Cell: ({ row }) => (
        <div>

          <button className="action-buttons" title="Brisanje" onClick={() => onDelete(row.original)}>
            <MdDeleteForever />
          </button>
          <button className="action-buttons" title="Posodobitev" onClick={() => onEdit(row.original)}>
            <MdEdit />
          </button>
         
        </div>
      ),
      type: 'nothing',
    },
    {
      Header: 'Id',
      accessor: 'anQId',
      className: 'name-column-system',
      type: 'nothing',     
    },
    {
      Header: 'Šifra',
      accessor: 'acSubject',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'Kupec',
      accessor: 'acBuyer',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'Dobavitelj',
      accessor: 'acSupplier',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    }, 
    {
      Header: 'Skladišče',
      accessor: 'acWarehouse',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'Naziv',
      accessor: 'acName2',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String',
    },
    {
      Header: 'Naslov',
      accessor: 'acAddress',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    }, 
    {
      Header: 'Pošta',
      accessor: 'acPost',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'Država',
      accessor: 'acCountry',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'Predpona',
      accessor: 'acVATCodePrefix',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'Dav. št.',
      accessor: 'acCode',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'Mat. št.',
      accessor: 'acRegNo',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'hidden-active',
      accessor: 'acActive',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'hidden-active',
      accessor: 'uWMSStock',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'hidden-active',
      accessor: 'uWMS',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
    {
      Header: 'hidden-active',
      accessor: 'uWMSSubj',
      className: 'name-column-system',
      type: 'text',  
      dbType: 'String'  
    },
  ],
  []
);







const TruncateCell = ({ value, maxCharacters }) => {
  // Truncate the value if it exceeds the specified maximum characters
  const truncatedValue = value.length > maxCharacters ? `${value.slice(0, maxCharacters)}...` : value;

  return <div title={value}>{truncatedValue}</div>;
};































  const tablesAssociation = [
    {
      name: 'system',
      value: systemColumns,
      insertQuery: "INSERT INTO uWMSSetting(ID, VALUE) VALUES (@ID, @Value)",
      deleteQuery: "DELETE FROM uWMSSetting WHERE ID = @ID",
      updateQuery: "UPDATE uWMSSetting SET VALUE = @Value WHERE ID = @anQId",
      id: "ID",
      idType: "String"
    },
    {
      name: 'subject-codes',
      value: subjectCodes,
      insertQuery: `INSERT INTO [dbo].[tHE_SetItemExtItemSubj]
              ([acIdent]
              ,[acSubject]
              ,[acCode]
              ,[anUserIns]
              ,[uWMSSerialNoBatch])
        VALUES
              (@acIdent,
              @acSubject,
              @acCode,
              @user,
              @uWMSSerialNoBatch)`,
      deleteQuery: "DELETE FROM [dbo].[tHE_SetItemExtItemSubj] WHERE [anQId] = @id",
      updateQuery: `UPDATE [dbo].[tHE_SetItemExtItemSubj]
                    SET [acIdent] = @acIdent
                      ,[acSubject] = @acSubject
                      ,[acCode] = @acCode
                      ,[anUserChg] = @user
                      ,[uWMSSerialNoBatch] = @uWMSSerialNoBatch
                  WHERE [anQId] = @anQId;`,
      id: 'anQId',
      idType: "Int64"
    }, {
      name: 'status-document',
      value: statusDocument,
      insertQuery: `INSERT INTO [dbo].[tPA_SetDocTypeStat]
                    ([acDocType]
                    ,[acStatus]
                    ,[acName]
                    ,[anUserIns]
                    ,[uWMSShow])
              VALUES
                    (@acDocType,
                    ,@acStatus, 
                    ,@acName, 
                    ,@user, 
                    ,<@uWMSShow)`,
      deleteQuery: "DELETE FROM [dbo].[tPA_SetDocTypeStat] WHERE [anQId] = @id",
      updateQuery: `UPDATE [dbo].[tPA_SetDocTypeStat]
                    SET [acDocType] = @acDocType
                      ,[acStatus] = @acStatus
                      ,[acName] = @acName
                      ,[anUserChg] = @user
                      ,[uWMSShow] = @uWMSShow
                    WHERE [anQId] = @anQId`,
      id: 'anQId',
      idType: "Int64"
    },
    {
      name: 'type-document',
      value: documentTypes,
      insertQuery: `INSERT INTO [dbo].[tPA_SetDocType]
                    ([acDocType]
                    ,[acSetOf]
                    ,[acType]
                    ,[acName]
                    ,[acIssuer]
                    ,[acReceiver]
                    ,[anUserIns]
                    ,[acWarehouse]
                    ,[uWMSAcqDocType]
                    ,[uWMSIssueDocType]
                    ,[uWMS]
                    ,[uWMSPartiallyFinishStatus]
                    ,[uWMSFinishStatus])
              VALUES
                    (@acDocType
                    ,@acSetOf
                    ,@acType
                    ,@acName
                    ,@acIssuer
                    ,@acReceiver
                    ,@anUserIns
                    ,@acWarehouse
                    ,@uWMSAcqDocType
                    ,@uWMSIssueDocType
                    ,@uWMS
                    ,@uWMSPartiallyFinishStatus
                    ,@uWMSFinishStatus)`,
      deleteQuery: "DELETE FROM [dbo].[tPA_SetDocType] WHERE [anQId] = @id",
      updateQuery: `UPDATE [dbo].[tPA_SetDocType]
                    SET [acDocType] = @acDocType
                      ,[acSetOf] = @acSetOf
                      ,[acType] = @acType
                      ,[acName] = @acName
                      ,[acIssuer] = @acIssuer
                      ,[acReceiver] = @acReceiver
                      ,[anUserChg] = @anUserChg
                      ,[acWarehouse] = @acWarehouse
                      ,[uWMSAcqDocType] = @uWMSAcqDocType
                      ,[uWMSIssueDocType] = @uWMSIssueDocType
                      ,[uWMS] = @uWMS
                      ,[uWMSPartiallyFinishStatus] = @uWMSPartiallyFinishStatus
                      ,[uWMSFinishStatus] = @uWMSFinishStatus
                      WHERE [anQId] = @anQId`,
      id: 'anQId',
      idType: "Int64"
    },
    {
      name: 'subjects',
      value: subjects,
      insertQuery: `INSERT INTO [dbo].[tHE_SetSubj]
                    ([acSubject]
                    ,[acBuyer]
                    ,[acSupplier]
                    ,[acWarehouse]
                    ,[acName2]
                    ,[acAddress]
                    ,[acPost]
                    ,[acCountry]
                    ,[acVATCodePrefix]
                    ,[acCode]
                    ,[acRegNo]
                    ,[acActive]
                    ,[anUserIns]
                    ,[uWMSStock]
                    ,[uWMS]
                    ,[uWMSSubj])
              VALUES
                    (@acSubject
                    ,@acBuyer
                    ,@acSupplier
                    ,@acWarehouse
                    ,@acName2
                    ,@acAddress
                    ,@acPost
                    ,@acCountry
                    ,@acVATCodePrefix
                    ,@acCode
                    ,@acRegNo
                    ,@acActive
                    ,@anUserIns
                    ,@uWMSStock
                    ,@uWMS
                    ,@uWMSSubj)`,
      deleteQuery: "DELETE FROM [dbo].[tHE_SetSubj] WHERE [anQId] = @id",
      updateQuery: `UPDATE [dbo].[tHE_SetSubj]
                    SET [acSubject] = @acSubject
                      ,[acBuyer] = @acBuyer
                      ,[acSupplier] = @acSupplier
                      ,[acWarehouse] = @acWarehouse
                      ,[acName2] = @acName2
                      ,[acAddress] = @acAddress
                      ,[acPost] = @acPost
                      ,[acCountry] = @acCountry
                      ,[acVATCodePrefix] = @acVATCodePrefix
                      ,[acCode] = @acCode
                      ,[acRegNo] = @acRegNo
                      ,[acActive] = @acActive
                      ,[anUserChg] = @anUserChg
                      ,[uWMSStock] = @uWMSStock
                      ,[uWMS] = @uWMS
                      ,[uWMSSubj] = @uWMSSubj
                  WHERE anQid =  @anQId`,
      id: 'anQId',
      idType: "Int64"
    }
  ];

  var selectedTable = tablesAssociation.find((table) => table.name === name);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of 'rows', we use 'page' which represents the currently visible page
    prepareRow,
    state: { globalFilter, pageIndex, pageSize },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
    
  } = useTable (
    {
      columns: selectedTable ? selectedTable.value : [],
      data: tableData,

    },
    useGlobalFilter,
    usePagination // Add the usePagination hook
  );

  return (
    <div className='global-react-table' >
      





      <Insert refresh={refresh} onClose={onClose} selectedTable={selectedTable} isVisible={isModalOpen} />
      <Update id={id} data={editData} refresh={refresh} onClose={onCloseEdit} selectedTable={selectedTable} isVisible={isModalEditOpen} />






   


     <div className="user-settings-table">

     <div className='paginationControls'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}



        <div className="search-container">
      <div className="search-icon" >
        <FaSearch style={{ color: 'white', display: 'flex', alignItems: 'center' }} />
      </div>

        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{
            backgroundColor: '#081A45',
            color: 'white',
            border: 'none', // Remove the white border
            borderRadius: '5px',
            height: '2em',
            padding: '10px',
            transition: 'opacity 2.5s', // Apply a transition for a smooth appearance
          }}
        />

    </div>


        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Stran{' '}
          <strong>
            {pageIndex + 1} od {pageOptions.length}
          </strong>{' '}
        </span>
    
       
      </div>



        <table {...getTableProps()} className={`react-table-${name}`}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (


                  
                  
                  <th {...column.getHeaderProps()}
                  
                  
                  
                  className={column.Header === 'Id' || column.Header === 'hidden-active' ? 'hidden-column' : ''}
                  
                  
                  
                  >{column.render('Header')}</th>
                ))}


                
              </tr>
              
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {


                    return <td {...cell.getCellProps()}
                    
                    
                    
                    className={cell.column.Header === 'Id' || cell.column.Header === 'hidden-active' ? 'hidden-column' : ''}

                    
                    
                    
                    
                    >{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>




    </div>
  );
}

export default TableForge;
