import React from "react";
import { useTable } from "react-table";

function UserTable({ data, onDelete, onEdit, onInsert }) {
  // Define your table columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Ime",
        accessor: "name",
        className: "name-column-user",
      },
      {
        Header: "Priimek",
        accessor: "surname",
        className: "surname-column-user",
      },
      {
        Header: "UP ime",
        accessor: "upName",
        className: "up-column-user",
      },
      {
        Header: "Geslo",
        accessor: "password",
        className: "password-column-user",
      },
      {
        Header: "Aktiven",
        accessor: "active",
        Cell: ({ value }) => <input type="checkbox" checked={value} readOnly />,
        className: "active-column-user",
      },
      {
        Header: "Dejanja",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => onEdit(row.original)}>Posodobi</button>
            <button onClick={() => onDelete(row.original)}>Pobriši</button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit],
  );

  // Create a table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div>
      <table {...getTableProps()} className="react-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => onInsert()}>Dodaj</button>
      </div>
    </div>
  );
}

export default UserTable;
