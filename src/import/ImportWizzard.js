import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { useDropzone } from 'react-dropzone';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ImportSheetChoice from './ImportSheetChoice';
import Locking from './Locking';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import { FaUnlock } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';


const ImportWizard = (props) => {

  const [fileContent, setFileContent] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sheetNames, setSheetNames] = useState([]);
  const [workbook, setWorkbook] = useState({});
  const [columnStatus, setColumnStatus] = useState({});
  const [lockingVisibility, setLocking] = useState(false);
  const [currentLocking, setCurrentLocking] = useState({})
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const toggleColumnStatus = (columnId) => {

    setColumnStatus((prevStatus) => ({
      ...prevStatus,
      [columnId]: prevStatus[columnId] === 'unlocked' ? 'locked' : 'unlocked',
    }));
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  const closePopupLock = () => {
    setLocking(false);
  };

  const handleHeaderCellClick = (columnId) => {

    // Add your custom logic when a header cell is clicked
    if(columnStatus[columnId] == "locked") {
      toggleColumnStatus(columnId)
    }


    var currentColumn = columns.find((table) => table.accessor === columnId);
    setCurrentLocking(currentColumn)
    setLocking(true);

  };

  const onChoiceReceived = (sheetName) => {
        setIsPopupOpen(false)
        const sheetNameString = sheetName;     
        const sheet = workbook.Sheets[sheetNameString];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const headers = excelData[0];
        const tableColumns = headers.map((header) => ({ Header: header, accessor: header }));
        setColumns(tableColumns);

        // Get the maximum number of columns in any row
        const maxColumns = Math.max(...excelData.slice(1).map(row => row.length));

        // Make sure all rows have the same length
        const normalizedData = excelData.map(row => {
            // Pad missing pairs with empty strings
            const paddedRow = Array.from({ length: maxColumns }, (_, index) => row[index] || '');
            // Convert all values to strings
            return paddedRow.map(value => String(value));
        });

        // Transform the normalized data to an array of objects
        const transformedData = normalizedData.slice(1).map(row => {
            return row.reduce((obj, value, index) => {
            obj[headers[index]] = value;
            return obj;
            }, {});
        });


        const initialColumnStatus = {};
        headers.forEach((header) => {
            initialColumnStatus[header] = 'unlocked'; // You can use 'locked' to initialize as locked if needed
        });
        setColumnStatus(initialColumnStatus);


        setFileContent(transformedData); // Exclude the header row
  };





  const onChoiceReceivedLock = (column) => {
    var col = columns;
    col[col.findIndex((element) => element.accessor == column.accessor)] = column;
    setColumns(col);
    setLocking(false)
    toggleColumnStatus(column.accessor)
  };





  const importData = () => {
    var unlocked = false;
    for (const key in columnStatus) {
      if (columnStatus.hasOwnProperty(key)) {

            const value = columnStatus[key];
            if(value == "unlocked") {
              unlocked = true;
            }

      }
    }
    if(unlocked) {
        Swal.fire('Napaka!', 'Morate zakleniti vse podatkovne povezave.', 'error');
    } else {
        // Do the actual method.

        Swal.fire('Uspeh!', 'Uspešno dodani zapisi.', 'success');

        console.log(columns)
    }
  }


  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;   
      // Check if the file is in Excel format
      if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
        const workbook = XLSX.read(content, { type: 'array' });
        setWorkbook(workbook);
        setSheetNames(workbook.SheetNames) 
        openPopup();      
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

   } = useTable({
    columns: columns,
    data: fileContent,
    initialState: {
      pageSize: 5, // Set the initial page size to 5
    },
  },
  
    useGlobalFilter,
    usePagination // Add the usePagination hook
  
  
  
  
  );

  return (
    <div>


      <ImportSheetChoice sheets={sheetNames} onChosen = {onChoiceReceived} isOpen={isPopupOpen} onClose={closePopup} />
      <Locking columns={props.columns} column={currentLocking} onChosen = {onChoiceReceivedLock} isOpen={lockingVisibility} onClose={closePopupLock} />


      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Povlecite in spustite besedilno ali Excel datoteko ali pa kliknite, da jo izberete.</p>
      </div>

      {fileContent.length > 0 && (
        <>

<div className='lower-components'>
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


          <table {...getTableProps()} style={{}} className='react-table-wizzard'>
          <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} onClick={() => handleHeaderCellClick(column.id)}>
                    <div>
                        {column.render('Header')}
                        {columnStatus[column.id] === 'unlocked' ? (
                        <FaUnlock
                            style={{ marginLeft: '5px', cursor: 'pointer', color: 'white'}}
                   
                        />
                        ) : (
                        <FaLock
                            style={{ marginLeft: '5px', cursor: 'pointer', color: 'white' }}
                            
                        />
                        )}
                    </div>
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row) => {
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


           <div className='export-button-div'>
          <button className='actions smallerr' onClick={() => importData()}>Uvozi podatke</button>
          </div>

          </div>

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
