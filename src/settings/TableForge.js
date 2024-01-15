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

function TableForge({ name, url, tableData }) {

      

   



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


        function generatePopupContent(data) {
          let content = '<div class="modal-dialog">';
          content += '<div class="modal-content">';
          content += '<div class="modal-header">';
          content += '<h5 class="modal-title">Posodobitev</h5>';
          content += '</div>';
          content += '<div class="modal-body"><form>';
        
          for (const key in data) {
            if(key == "id") {
              continue;
            }
            const value = data[key];
            const type = typeof value;
            content += `<div class="form-group">`;
        
            // Create input fields based on type
            if (type === 'string' || type === 'number' || type === 'boolean') {
              content += `<label for="${key}">${key}</label>`;
              content += `<input type="${type === 'boolean' ? 'checkbox' : 'text'}" id="${key}" name="${key}" value="${value}" class="${type === 'boolean' ? 'form-check-input' : 'form-control'}" ${type === 'boolean' && value ? 'checked' : ''}>`;
            } else {
              content += `<p>Unsupported type for ${key}: ${type}</p>`;
            }
        
            content += `</div>`;
          }
        
          // Add Bootstrap button with save icon
          content += `
            <div class="text-center mt-3">
              <button type="submit" class="btn btn-primary">
                <i class="bi bi-save"></i> Shrani
              </button>
            </div>
          `;
        
          content += '</form></div></div></div>';
          return content;
        }
        
        
    function handleFormSubmit(formData) {
  
    }


    function generatePopupCreate(data) {

      let content = '<div class="modal-dialog">';
      content += '<div class="modal-content">';
      content += '<div class="modal-header">';
      content += '<h5 class="modal-title">Kreiranje pozicije</h5>';
      content += '</div>';
      content += '<div class="modal-body"><form>';
    
      data.value.map(column => {

        const value = "";
        const type = column.type;
        const key = column.Header;
        content += `<div class="form-group">`;
    
        // Create input fields based on type
        if (type === 'text' || type === 'checkbox') {
          content += `<label for="${key}">${key}</label>`;
          content += `<input type="${type === 'checkbox' ? 'checkbox' : 'text'}" id="${key}" name="${key}" class="${type === 'checkbox' ? 'form-check-input' : 'form-control'}" ${type === 'checkbox' && value ? 'checked' : ''}>`;
        } 
    
        content += `</div>`;
      });
    
      // Add Bootstrap button with save icon
      content += `
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-save"></i> Shrani
          </button>
        </div>
      `;
    
      content += '</form></div></div></div>';
      return content;
    }


  function onAdd() {
    // Generate HTML content for the popup
    const popupContent = generatePopupCreate(selectedTable);
    // Create a Bootstrap modal element
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.innerHTML = popupContent;
    

    const form = modal.querySelector('form');
    // Attach a submit event listener to the form
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        // Get form data
        const formData = new FormData(form);
        const formDataObject = {};
        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }
        // Handle the form submission
        handleFormSubmit(formDataObject);
        // Clean up: Hide and remove the modal
        window.$(modal).modal('hide');
        window.$(modal).on('hidden.bs.modal', function () {
          window.$(this).remove();
        });
    });



    document.body.appendChild(modal);
    // Show the modal using Bootstrap's modal function
    window.$(modal).modal('show');
  }



  function onEdit(data) {
    // Generate HTML content for the popup
    const popupContent = generatePopupContent(data);
    // Create a Bootstrap modal element
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.innerHTML = popupContent;
    

    const form = modal.querySelector('form');
    // Attach a submit event listener to the form
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        // Get form data
        const formData = new FormData(form);
        const formDataObject = {};
        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }
        // Handle the form submission
        handleFormSubmit(formDataObject);
        // Clean up: Hide and remove the modal
        window.$(modal).modal('hide');
        window.$(modal).on('hidden.bs.modal', function () {
          window.$(this).remove();
        });
    });



    document.body.appendChild(modal);
    // Show the modal using Bootstrap's modal function
    window.$(modal).modal('show');

}

  // Define your table columns
  const userColumns = React.useMemo(
    () => [
      {
        Header: 'Ident',
        accessor: 'acIdent',
        className: 'name-column-user',
        type: 'text',
      },
      {
        Header: 'Key',
        accessor: 'acKey',
        className: 'surname-column-user',
        type: 'text',

      },
      {
        Header: 'Name',
        accessor: 'acName',
        className: 'up-column-user',
        type: 'text',
      },
      {
        Header: 'Subject',
        accessor: 'acSubject',
        className: 'password-column-user',
        type: 'text',
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>

            <button class="action-buttons" title="Vnos" onClick={() => onAdd()}><IoAddCircleSharp /></button>
            <button class="action-buttons" title="Posodobitev" onClick={() => onEdit(row.original)}><MdEdit /></button>
            <button class="action-buttons" title="Brisanje" onClick={() => onDelete(row.original)}><MdDeleteForever /></button>

          </div>
        ),

        type: 'nothing'
      },
    ],
    []
  );

    const tablesAssociation = [
        {name: 'users', value: userColumns}
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
  );
}

export default TableForge;