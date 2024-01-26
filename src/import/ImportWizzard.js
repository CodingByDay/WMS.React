import { useTable } from 'react-table';
import { useDropzone } from 'react-dropzone';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ImportSheetChoice from './ImportSheetChoice';
const ImportWizard = () => {
  const [fileContent, setFileContent] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [sheetNames, setSheetNames] = useState([]);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  const onChoiceReceived = (sheetName) => {

        const sheetNameString = sheetName;     
        const sheet = workbook.Sheets[sheetNameString];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const headers = excelData[0];
        const tableColumns = headers.map((header) => ({ Header: header, accessor: header }));
        setColumns(tableColumns);
        setFileContent(excelData.slice(1)); // Exclude the header row

  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;   
      // Check if the file is in Excel format
      if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        const workbook = XLSX.read(content, { type: 'array' });
        setSheetNames(workbook.SheetNames)       
      } else if (file.name.endsWith(".txt")){
        // Handle other types of files
        // (You may need to implement logic based on the specific file type)
      }


      
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
});

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: fileContent,
  });

  return (
    <div>


      <ImportSheetChoice sheets={sheetNames} isOpen={isPopupOpen} onClose={closePopup} />


      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a text or Excel file here, or click to select one</p>
      </div>

      {fileContent.length > 0 && (
        <>
          <table {...getTableProps()} style={{ marginTop: '20px' }}>
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
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button onClick={() => console.log('Data Confirmed!')}>Confirm</button>
        </>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ImportWizard;
