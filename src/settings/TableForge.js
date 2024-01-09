import React from 'react';
import { useTable } from 'react-table';
import SettingsService from '../services/SettingsService';
function TableForge({ name, url, onDelete, onEdit, onInsert, onSpecial }) {




   function getData() {
        // API IMPLEMENTATION //
        /* SettingsService.getSettingsData(url).then(response => { 
            return response.Items;
        }); */

        
        // Dummy data
        return initialUsers;
    }


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
    ];


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
            <button onClick={() => onEdit(row.original)}>Posodobi</button>
            <button onClick={() => onDelete(row.original)}>Pobriši</button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit]
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
    <div>
      <table {...getTableProps()} className="react-table">
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