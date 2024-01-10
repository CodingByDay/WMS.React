import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import $ from 'jquery'; 
import 'bootstrap';

import { useTable } from 'react-table';

import SettingsService from '../services/SettingsService';
function TableForge({ name, url, init }) {

    const initialUsers = [
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
        {
            id: 1,
            name: 'John',
            surname: 'Doe',
            upName: 'johndoe',
            password: 'secret123',
            active: true,
        },
        {
            id: 2,
            name: 'Jane',
            surname: 'Smith',
            upName: 'janesmith',
            password: 'mypassword',
            active: false,
        },
    ];

    var users = [];



   function getData() {
        // API IMPLEMENTATION //
        /* SettingsService.getSettingsData(url).then(response => { 
            return response.Items;
        }); */
        
        // Dummy data
        users = initialUsers;
        return initialUsers;
    }

        function onEdit(data) {
            alert("test");
            console.log(data);

        }


        function onDelete(data) {
            alert("test");
        }


        function generatePopupContent(data) {
          let content = '<div class="modal-dialog">';
          content += '<div class="modal-content">';
          content += '<div class="modal-header">';
          content += '<h5 class="modal-title">Fields and Types</h5>';
          content += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
          content += '<span aria-hidden="true">&times;</span></button></div>';
          content += '<div class="modal-body"><form>'; // Wrap inputs in a form
        
          for (const key in data) {
            const value = data[key];
            const type = typeof value;
            content += `<div class="form-group">`;
        
            // Create input fields based on type
            if (type === 'string' || type === 'number' || type === 'boolean') {
              content += `<label for="${key}">${key}</label>`;
              content += `<input type="${type === 'boolean' ? 'checkbox' : 'text'}" id="${key}" name="${key}" value="${value}" class="form-control" ${type === 'boolean' && value ? 'checked' : ''}>`;
            } else {
              content += `<p>Unsupported type for ${key}: ${type}</p>`;
            }        
            content += `</div>`;
          }    
          content += '</form></div></div></div>';
          return content;
        }
        


  function onEdit(data) {
    // Generate HTML content for the popup
    const popupContent = generatePopupContent(data);

    // Create a Bootstrap modal element
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.innerHTML = popupContent;

    // Add the modal to the document body
    document.body.appendChild(modal);

    // Show the modal using Bootstrap's modal function
    window.$(modal).modal('show');

    // Clean up the modal after it's closed
    $(modal).on('hidden.bs.modal', function () {
        $(this).remove();
    });

    // Log the data to console
    console.log(data);
}

  // Define your table columns
  const userColumns = React.useMemo(
    () => [
      {
        Header: 'Ime',
        accessor: 'name',
        className: 'name-column-user',
      },
      {
        Header: 'Priimek',
        accessor: 'surname',
        className: 'surname-column-user',
      },
      {
        Header: 'UP ime',
        accessor: 'upName',
        className: 'up-column-user',
      },
      {
        Header: 'Geslo',
        accessor: 'password',
        className: 'password-column-user',
      },
      {
        Header: 'Aktiven',
        accessor: 'active',
        Cell: ({ value }) => <input type="checkbox" checked={value} readOnly />,
        className: 'active-column-user',
      },
      {
        Header: 'Dejanja',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => onEdit(row.original)}><MdEdit /></button>
            <button onClick={() => onDelete(row.original)}><MdDeleteForever /></button>
          </div>
        ),
      },
    ],
    []
  );

    const tablesAssociation = [
        {name: 'users', value: userColumns}
    ]

    const selectedTable = tablesAssociation.find(table => table.name === name);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: selectedTable ? selectedTable.value : [],
    data: getData(),
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
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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