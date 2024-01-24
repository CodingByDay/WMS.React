import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TransactionService from '../services/TransactionService';
import ListingService from '../services/ListingService';
import { useSelector, useDispatch } from 'react-redux'
import DataAccess from "../utility/DataAccess";
import SettingsService from '../services/SettingsService';
import Swal from 'sweetalert2';

const Insert = (props) => {
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    var isUpdate = props.isVisible;
    if(isUpdate) {
      connectData() 
    }
  }, [props.isVisible]);


  function extractDropdownPairs(data) {
    const dropdownPairs = {};
    data.value.forEach((column) => {
      if (column.type === 'dropdown') {
        dropdownPairs[column.accessor] = column.sourceSelect || '';
      }

    });
  
    return dropdownPairs;
  }
  const getValue = (inputName) => inputValues[inputName] || '';

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

    const connectData = async () => {
      var finalOptions = {};
      if(props.isVisible) {
    
      try {
        var pairs = extractDropdownPairs(props.selectedTable)
        SettingsService.executeSQLQueryBatch(pairs)
        .then(result => {
            var data = result;
       
            for(var i = 0; i < props.selectedTable.value.length; i++) {
                var current = props.selectedTable.value[i];
                var currentData = data[current.accessor];
                var type = current.type;
                var additional = current.additional;
                
                if(type === "dropdown") {

                  
                  const options = currentData.map(item => {
                    const value = current.columnOrder.map(field => item[field]).join('|');
                    const properties = current.columnOrder.map(field => item[field]);
                    const names = current.columnOrderTranslation.map(field => field);
                    const widths = current.columnOrderWidth.map(field => field);                
                    return { value: properties.join('|'), label: properties.join('|'), id: item[current.dropdownId], properties, names, widths, header: false };
                  });
                  var emptyOption = { value: 'Test', label: 'Test', id: '', properties: current.columnOrderTranslation, widths: current.columnOrderWidth, names: current.columnOrderTranslation, header: true }

                  finalOptions[current.accessor] = [emptyOption, ...options];

                }
            }


            setDropdownOptions(finalOptions);
        })
        .catch(error => {

        });

        
      } catch (error) {

      }

    }
    };

    const formatOptionLabel = ({ label, properties, widths, header, id }) => {
      const exists = Object.values(selectedOptions).some(item => item.id === id);
  
      
    
      // Return the component with the processed data
      return (
        <DynamicFormatOptionLabel properties={properties} id={id} label={label} widths={widths} header={header} selected = {exists} />
     );
    };
   
  const DynamicFormatOptionLabel = ({ label, properties, widths, header, selected, id}) => (


    
    <div>
      {properties && properties.length > 0 && !selected ? (
        <div style={{ display: 'flex', margin: '0', padding: '0'  }}>
          {properties.map((property, index) => (
              ( !header ) ? (
              <div key={index} style={{ minWidth: widths[index], paddingLeft: '3px', paddingRight: '3px', fontSize: '80%', color: 'gray', marginRight: '0px', whiteSpace: 'nowrap' }}>
              {property}
              </div>
          ): (
              <div key={index} style={{ fontWeight: '600',  minWidth: widths[index], paddingLeft: '5px', paddingRight: '3px', fontSize: '80%', color: 'black', marginRight: '0px', whiteSpace: 'nowrap' }}>
                {property}
              </div>
            )         
          ))}
        </div>
      ) : (
        <div style={{ fontSize: '100%' }}>
          {id}
        </div>
      )}
    </div>
  );
  
  

  if (!props.isVisible) {
     return null;
  } 

   function onClose() {
    setSelectedOptions({})
    setInputValues({})
    props.onClose();
  }
  const handleSelectChange = (accessor, selected) => {

    var specificObject = dropdownOptions[accessor]
    var insertObject = specificObject.find(item => item.id === selected.id);
    setSelectedOptions({
      ...selectedOptions,
      [accessor]: insertObject
    });
  };



  const sendData = () => {


    var insertQuery = props.selectedTable.insertQuery;
    var columns = props.selectedTable.value;
    var params = [];



    for (let i = 0; i < columns.length; i++) {
        var column = columns[i];
        var type = column.type;
        var accessor = column.accessor;
        
        if(type!="nothing") {
            

          var column = columns[i];
          var type = column.type;
          var accessor = column.accessor;
          var dbType = column.dbType;
          if(type !== "nothing") {
            var theValue = '';
            if(type == "text") {
              theValue = getValue(accessor);
            } else if(type == "dropdown") {
              theValue = selectedOptions[accessor]?.id || "";
            } else if(type == "checkbox") {
              theValue = selectedOptions[accessor] || false;
            } else if(type == "number") {
              theValue = getValue(accessor);
            }
  
  
              var converted = {};
              if(dbType == "Int64") {
                converted = Number(theValue);
              } else if(dbType == "String") {
                converted = theValue;
              } else if(dbType == "Boolean") {
                converted = theValue;
              } 
  
             var parameter = { Name: accessor, Type: dbType, Value: converted  }
  
             params.push(parameter);

          }


        }    
    }

    const userId = localStorage.getItem('name');
    const userIdAsInt = parseInt(userId, 10); 

    var parameterUser = { Name: 'user', Type: 'Int64', Value: userIdAsInt  } 


    params.push(parameterUser);
      SettingsService.insertSQLQuery(insertQuery, params)
      .then(result => {
           props.refresh();
          var data = result;

          if(data) {
              onClose();
          } else {
            Swal.fire(
              'Napaka!',
              'Zapis ni bil zapisan.',
              'error'
            );
            onClose();
          }

         
      })
  };




  return (
    <div className="popup-overlay insert">
      <div className="popup-content insert">
        <div className="popup-header insert">
          <button className="popup-close-btn insert" onClick={onClose} >
            X
          </button>
        </div>
        <div className="popup-body insert">
        {props.selectedTable.value.map((column) => (
           column.type !== 'nothing' && (
            <div key={column.accessor} className="form-group insert">
              <label htmlFor={column.accessor}>{column.Header}:</label>
              {column.type === 'dropdown' ? (

               <Select
               id={column.accessor}
               placeholder={column.dropdownPlaceholder}
               name={column.accessor}
               getOptionLabel={(option) => option.label}
               getOptionValue={(option) => option.value}
               formatOptionLabel={formatOptionLabel}
               options={dropdownOptions[column.accessor] || []}
               value={selectedOptions[column.accessor]}
               onChange={(selected) => handleSelectChange(column.accessor, selected)}
               
             />
            

             
              ) : (
                <input
                type={column.type === 'checkbox' ? 'checkbox' : column.type === 'number' ? 'number' : 'text'}
                id={column.accessor}
                maxLength={column.max}
                name={column.accessor}
                className={column.type === 'checkbox' ? 'form-check-input' : 'form-control'}
                value={getValue(column.accessor)} // Set the value from state
                onChange={handleInputChange} // Update the state on change
              />
              )}
            </div>
           )
          ))}


         
        </div>
        <div className="center-button">
            <center><span onClick={sendData}  className="actions smallerr">
              Dodaj
            </span>
            </center>
          </div>
      </div>
    </div>
  );
};

export default Insert;