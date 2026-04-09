import React from "react";
import { useTable } from "react-table";
import { useTranslation } from "react-i18next";
import { trHeader } from "../i18n/headerMap";
import TableExportButton from "../components/TableExportButton";

function UserTable({ data, onDelete, onEdit, onInsert }) {
  const { t } = useTranslation();
  // Define your table columns
  const columns = React.useMemo(
    () => [
      {
        Header: trHeader("Ime", t),
        accessor: "name",
        className: "name-column-user",
      },
      {
        Header: trHeader("Priimek", t),
        accessor: "surname",
        className: "surname-column-user",
      },
      {
        Header: trHeader("UP ime", t),
        accessor: "upName",
        className: "up-column-user",
      },
      {
        Header: trHeader("Geslo", t),
        accessor: "password",
        className: "password-column-user",
      },
      {
        Header: trHeader("Aktiven", t),
        accessor: "active",
        Cell: ({ value }) => <input type="checkbox" checked={value} readOnly />,
        className: "active-column-user",
      },
      {
        Header: trHeader("Dejanja", t),
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button onClick={() => onEdit(row.original)}>
              {trHeader("Posodobi", t)}
            </button>
            <button onClick={() => onDelete(row.original)}>
              {trHeader("Pobriši", t)}
            </button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit, t],
  );

  // Create a table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <>
      <div className="wms-table-wrap">
        <table {...getTableProps()} className="react-table wms-data-table">
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
      </div>
      <div className="wms-table-toolbar">
        <button type="button" onClick={() => onInsert()}>
          {t("common.add")}
        </button>
        <TableExportButton
          fileBaseName="wms-users"
          columnDefs={userExportColumns}
          getRows={() => rows.map((r) => ({ ...r.original }))}
        />
      </div>
    </>
  );
}

export default UserTable;
