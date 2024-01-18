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

  const showDeleteConfirmation = (data) => {
    var currentDeleteSQL = selectedTable.deleteQuery;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        var theOriginalValue = '@' + key;
        currentDeleteSQL = currentDeleteSQL.replace(theOriginalValue, value);
      }
    }

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
        SettingsService.insertSQLQuery(currentDeleteSQL).then((result) => {
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

  const onEdit = (data) => {
    generatePopupEdit(data, selectedTable);
  };

  const systemColumns = useMemo(
    () => [
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
      },
      {
        Header: 'Vrednost',
        accessor: 'Value',
        className: 'value-column-system',
        type: 'text',
      },
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
            <button className="action-buttons" title="Posodobitev" onClick={() => onEdit(row.original)}>
              <MdEdit />
            </button>
            <button className="action-buttons" title="Brisanje" onClick={() => onDelete(row.original)}>
              <MdDeleteForever />
            </button>
          </div>
        ),
        type: 'nothing',
      },
    ],
    []
  );

  const tablesAssociation = [
    {
      name: 'system',
      value: systemColumns,
      insertQuery: "INSERT INTO uWMSSetting(ID, VALUE) VALUES ('@ID', '@Value');",
      deleteQuery: "DELETE FROM uWMSSetting WHERE ID = '@ID';",
      updateQuery: "UPDATE uWMSSetting SET VALUE = '@Value' WHERE ID = '@ID';",
    },
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
  } = useTable(
    {
      columns: selectedTable ? selectedTable.value : [],
      data: tableData,
    },
    useGlobalFilter,
    usePagination // Add the usePagination hook
  );

  return (
    <div className='global-react-table'>
      





      <Insert refresh={refresh} onClose={onClose} selectedTable={selectedTable} isVisible={isModalOpen} />
      <Update data={editData} refresh={refresh} onClose={onCloseEdit} selectedTable={selectedTable} isVisible={isModalEditOpen} />






   


     <div className="user-settings-table">
        <table {...getTableProps()} className={`react-table-${name}`}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

 {/* Pagination controls */}
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

    </div>
  );
}

export default TableForge;
