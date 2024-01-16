import React, { useState, useEffect, memo } from 'react';
import { MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import $ from 'jquery'; 
import 'bootstrap';
import Swal from 'sweetalert2';
import { useTable } from 'react-table';
import { IoAddCircleSharp } from "react-icons/io5";
import { CgExport } from "react-icons/cg";
import SettingsService from '../services/SettingsService';
import Insert from '../popup/Insert';
import Update from '../popup/Update';


function TableForge({ name, tableData }) {
        const [isModalOpen, setIsModalOpen] = useState(false);

    
        const showDeleteConfirmation = () => {
          Swal.fire({
            title: 'Ste prepričani?',
            text: 'To dejanje ni mogoče razveljaviti!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Da, izbriši!',
            cancelButtonText: 'Ne'
          }).then((result) => {
            if (result.isConfirmed) {
              // Obdelajte logiko brisanja tukaj
              Swal.fire(
                'Izbrisano!',
                'Zapis je bil pobrisan.',
                'success'
              );
            }
          });
        }
        

  function onDelete(data) {
    showDeleteConfirmation();
  }


  const onClose = () => {
    setIsModalOpen(false);
  };


  const generatePopupCreate = (data) => {   

    setIsModalOpen(true);
    
  };


  function onAdd() {
      generatePopupCreate(selectedTable);
  }



  function onEdit(data) {
    

  }





  // Define your table columns
  const systemColumns = React.useMemo(
    () => [
      {
        Header: 'Naziv',
        accessor: 'ID',
        className: 'name-column-system',
        type: 'dropdown',
        sourceSelect: 'SELECT * FROM uWMSSettingList;',
        columnOrder: ['ID', 'Desc'],
        dropdownId: 'ID'
      },
      {
        Header: 'Vrednost',
        accessor: 'Value',
        className: 'value-column-system',
        type: 'text',
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>

            <button className="action-buttons" title="Vnos" onClick={() => onAdd()}><IoAddCircleSharp /></button>
            <button className="action-buttons" title="Posodobitev" onClick={() => onEdit(row.original)}><MdEdit /></button>
            <button className="action-buttons" title="Brisanje" onClick={() => onDelete(row.original)}><MdDeleteForever /></button>

          </div>
        ),

        type: 'nothing'
      },
    ],
    []
  );

    const tablesAssociation = [
        {name: 'system', value: systemColumns}
    ]

 


    var selectedTable = tablesAssociation.find(table => table.name === name); 
        // Use the result as needed
        const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
        } = useTable({
          columns: selectedTable ? selectedTable.value : [],
          data: tableData
        });






  return (
    <div>




    <Insert onClose = {onClose} selectedTable={selectedTable} isVisible={isModalOpen} />




    <div class = "user-settings-table">

    


      <table {...getTableProps()} className={`react-table-${name}`}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} disabled>{cell.render('Cell')}</td>
                  );
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