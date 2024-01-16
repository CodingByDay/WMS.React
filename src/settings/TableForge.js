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


function TableForge({ refresh, name, tableData }) {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isModalEditOpen, setIsEditModalOpen] = useState(false);
        const [editData, setEditData] = useState({});
    
        const showDeleteConfirmation = (data) => {

          

          var currentDeleteSQL = selectedTable.deleteQuery;
          

          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const value = data[key];
              var theOriginalValue = "@" + key;
              currentDeleteSQL = currentDeleteSQL.replace(theOriginalValue, value)
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
            cancelButtonText: 'Ne'
          }).then((result) => {
            if (result.isConfirmed) {         
                SettingsService.insertSQLQuery(currentDeleteSQL)
                .then(result => {
                    
                    var data = result;
          
                    if(data) {
                      Swal.fire(
                        'Izbrisano!',
                        'Zapis je bil pobrisan.',
                        'success'
                      );
                    } else {
                      Swal.fire(
                        'Napaka!',
                        'Zapis ni bil pobrisan.',
                        'error'
                      );
                    }



                    setTimeout(refresh, 1000);
          
                   
                })    
            }
          });
        }
        

  function onDelete(data) {
    showDeleteConfirmation(data);
  }


  const onClose = () => {
    setIsModalOpen(false);
  };

  const onCloseEdit = () => {
    setIsEditModalOpen(false);
  };
  const generatePopupCreate = (data) => {   

    setIsModalOpen(true);
    
  };
  const generatePopupEdit = (data) => {   
    setEditData(data);
    setIsEditModalOpen(true);
    
  };

  
  function onAdd() {
      generatePopupCreate(selectedTable);
  }



  function onEdit(data) {
    generatePopupEdit(data, selectedTable);
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
        dropdownId: 'ID',
        dropdownPlaceholder: ''
      },
      {
        Header: 'Vrednost',
        accessor: 'Value',
        className: 'value-column-system',
        type: 'text',
      },
      {
        Header: <button className="action-buttons white" title="Vnos" onClick={() => onAdd()}><IoAddCircleSharp />Dodaj</button>
        ,
        accessor: 'actions',

        Cell: ({ row }) => (
          <div>

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
        {


        name: 'system', value: systemColumns, 
        insertQuery: "INSERT INTO uWMSSetting(ID, VALUE) VALUES ('@ID', '@Value');", 
        deleteQuery: "DELETE FROM uWMSSetting WHERE ID = '@ID';"
          
      
      
        }
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




    <Insert refresh = {refresh} onClose = {onClose} selectedTable={selectedTable} isVisible={isModalOpen} />
    <Update  data = {editData} refresh = {refresh} onClose = {onCloseEdit} selectedTable={selectedTable} isVisible={isModalEditOpen} />




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