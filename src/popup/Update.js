import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';

import TransactionService from '../services/TransactionService';
import ListingService from '../services/ListingService';
import { useSelector, useDispatch } from 'react-redux'
import DataAccess from "../utility/DataAccess";
import SettingsService from '../services/SettingsService';
import Swal from 'sweetalert2';

const Update = (props) => {
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [dropdownLayouts, setDropdownLayouts] = useState({});
  const [inputValues, setInputValues] = useState({});

 
  useEffect(() => {

    var isUpdate = props.isVisible;

    if(isUpdate) {

      connectData() 

      connectSelections()




     
    }

  }, [props.isVisible]);

  useEffect(() => {

      connectData() 
    
  }, []);

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
    if(event.target.type =="checkbox") {
      setInputValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: !inputValues[event.target.name],
      }));

    } else {
    const { name, value } = event.target;
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
  }
  };

    const connectData = async () => {
      var finalOptions = {};
 
      try {
        var pairs = extractDropdownPairs(props.selectedTable)
        SettingsService.executeSQLQueryBatch(pairs)
        .then(result => {
            var data = result;
            for(var i = 0; i < props.selectedTable.value.length; i++) {
                var current = props.selectedTable.value[i];
                var currentData = data[current.accessor];
                var type = current.type;
                if(type === "dropdown") {
                  const options = currentData.map(item => {
                    const properties = current.columnOrder.map(field => item[field]);
                    const names = current.columnOrderTranslation.map(field => field);
                    const widths = current.columnOrderWidth.map(field => field);                
                    return { value: properties.join('|'), label: properties.join('|'), id: item[current.dropdownId], properties, names, widths, header: false, helper: item[current.dropdownHelperField]  };
                  });
                  
       
                  var emptyOption = { value: 'Test', label: 'Test', id: '', properties: current.columnOrderTranslation, widths: current.columnOrderWidth, helper: '', names: current.columnOrderTranslation, header: true }

                  finalOptions[current.accessor] = [emptyOption, ...options];

                }
            }

   
            setDropdownOptions((prevOptions) => {
              return {
                ...prevOptions,
                ...finalOptions,
              };
            });
            
       


        })
        .catch(error => {
        });

        
      } catch (error) {

      }

    
    };



  function connectSelections() {



    var table = props.selectedTable.value;
      var prevData = props.data;
      for (const key in prevData) {

        if (prevData.hasOwnProperty(key)) {
          const value = prevData[key];
          const found = table.find(item => item.accessor === key);
          if(!found) {
            continue;
          }
          const structureType = found.type;
          if(structureType === "dropdown") {
            if(found.dropdownId === key) {
      
              var specificObject = dropdownOptions[key]
              var insertObject = specificObject.find(item => item.id === value);



              setSelectedOptions(prevSelectedOptions => ({
                ...prevSelectedOptions,
                [key]: insertObject
              }));
  

      
          }
          } else if (structureType === "text") {


  
            setInputValues((prevValues) => ({
              ...prevValues,
              [key]: value,
            }));


          } else if (structureType === "checkbox") {
            



            setInputValues((prevValues) => ({
              ...prevValues,
              [key]: value,
            }));





        } else if (structureType === "number") {
            



          setInputValues((prevValues) => ({
            ...prevValues,
            [key]: value,
          }));





      }

        
      }
    }



  }

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
  const options = [
    { label: 'Column 1', options: [{ value: 'Value 1', label: 'Label 1' }, /* ... */] },
    { label: 'Column 2', options: [{ value: 'Value 2', label: 'Label 2' }, /* ... */] },
    // Dodajte več stolpcev po potrebi
  ];

  const formatGroupLabel = data => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <strong>{data.label}</strong>
    </div>
  );

  function detectSQLInjection(input) {
    // Define common SQL injection patterns
    const sqlInjectionPatterns = [
      /(\b(union|select|drop|alter|create|delete|insert|update)\b)/i,
      /(\b(\/\*|\*\/|;|--|\|)\b)/i,
      /(\b(exec xp_cmdshell|xp_cmdshell)\b)/i,
      /(\b(declare|cast|convert)\b)/i,
      /(\b(and|or)\b\s*[\d]+\s*=\s*[\d]+)/i,
    ];
  
    // Check if input matches any of the SQL injection patterns
    for (const pattern of sqlInjectionPatterns) {
      if (pattern.test(input)) {
        // Potential SQL injection detected
        return true;
      }
    }
  
    // No SQL injection patterns detected
    return false;
  }



  function resolveDynamicQuery() {
    var counter = 0;
    var sql = "";
    var foundData = [];
    const propertyCount = Object.keys(inputValues).length + Object.keys(selectedOptions).length;
    for (const [key, value] of Object.entries(inputValues)) {

      counter += 1;

 

      
      if(counter == propertyCount) {
        
        if(props.selectedTable.updateHasUser) {
          if(key!=props.selectedTable.id)  {
          sql += `[${key}] = @${key},`;
          }else {
            sql = sql.slice(0, -1)
          }
          sql += `[${props.selectedTable.updateUserId}] = @${props.selectedTable.updateUserId}`;
          sql += ` WHERE [${props.selectedTable.id}] = @${props.selectedTable.id}`;         
      } else {
          if(key!=props.selectedTable.id)  {
          sql += `[${key}] = @${key}`;
          }else {
            sql = sql.slice(0, -1)
          }
          sql += ` WHERE [${props.selectedTable.id}] = @${props.selectedTable.id}`;         
      }
      } else {
        if(key!=props.selectedTable.id)  {

         sql += `[${key}] = @${key},`;
        }
        else {
          sql = sql.slice(0, -1)
        }
      }
      
      foundData.push(key)

    }

    for (const [key, value] of Object.entries(selectedOptions)) {

      counter += 1;

   

      
      if(counter == propertyCount) {
        
        if(props.selectedTable.updateUserId) {
          if(key!=props.selectedTable.id)  {

            sql += `[${key}] = @${key},`;

          }
          else {
            sql = sql.slice(0, -1)
          }
            sql += `[${props.selectedTable.updateUserId}] = @${props.selectedTable.updateUserId}`;
            sql += ` WHERE [${props.selectedTable.id}] = @${props.selectedTable.id}`;         
        } else {
            if(key!=props.selectedTable.id)  {

            sql += `[${key}] = @${key}`;

            }
            else {
              sql = sql.slice(0, -1)
            }
            sql += ` WHERE [${props.selectedTable.id}] = @${props.selectedTable.id}`;         
        }
      } else {
        if(key!=props.selectedTable.id)  {

        sql += `[${key}] = @${key},`;

        } else {
          sql = sql.slice(0, -1)
        }
      }
      
      foundData.push(key)

    }

    return [sql, foundData]
  }



  const sendData = () => {

    var dynamic = resolveDynamicQuery();




    var updateQuery = props.selectedTable.updateQuery;



    updateQuery = updateQuery.replace("#update", dynamic[0])

    var columns = props.selectedTable.value;
    var idType = props.selectedTable.idType;
    var params = [];


    for (let i = 0; i < columns.length; i++) {
        var column = columns[i];
        var type = column.type;
        var accessor = column.accessor;
        var dbType = column.dbType;
        if(type !== "nothing" && dynamic[1].includes(accessor)) {
          var theValue = '';
          if(type == "text") {
            theValue = getValue(accessor);
          } else if(type == "dropdown") {
            theValue = selectedOptions[accessor].id;          
          } else if(type == "checkbox") {
            theValue = getValue(accessor);  
          } else if(type == "number") {
            theValue = getValue(accessor);       
          }

            var converted = {};
            if(dbType == "Int64") {
              converted = Number(theValue);
            } else if(dbType == "String") {
              converted = theValue;
            } else if(dbType == "Boolean") {
              if(theValue == "") {
                converted = false;
              } else {
                converted = theValue;
              }
            }



           var parameter = { Name: accessor, Type: dbType, Value: converted  }
           params.push(parameter);     
        }
    }

      const userId = localStorage.getItem('name');
      const userIdAsInt = parseInt(userId, 10); 

      if(props.selectedTable.updateUserId!="") {
       var parameterUser = { Name: props.selectedTable.updateUserId, Type: 'Int64', Value: userIdAsInt  } 
       params.push(parameterUser);

      }
      var parameterId = { Name: props.selectedTable.id, Type: idType, Value: props.id  }


      params.push(parameterId);

    

      SettingsService.insertSQLQuery(updateQuery, params)
      .then(result => {

          props.refresh();

          var data = result;

          if(data) {

              onClose();

          } else {

            Swal.fire(
              'Napaka!',
              'Zapis ni bil posodobljen.',
              'error'
            );

            onClose();
          }         
      })
   
  };



  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    sendData();
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
  
  
  

  const formatOptionLabel = ({ label, properties, widths, header, id }) => {
    const exists = Object.values(selectedOptions).some(item => item.id === id);

    
  
    // Return the component with the processed data
    return (
      <DynamicFormatOptionLabel properties={properties} id={id} label={label} widths={widths} header={header} selected = {exists} />
   );
  };
  

  return (
    <div className="popup-overlay insert">
      <div className="popup-content insert">
        <div className="popup-header insert">
          <button className="popup-close-btn insert" onClick={onClose} >
            X
          </button>
        </div>
        <form className="form-insert" onSubmit={handleSubmit}>

        <div className="popup-body insert">
        {props.selectedTable.value.map((column) => (
           column.type !== 'nothing' && (
            <div key={column.accessor} className="form-group insert">


              <label htmlFor={column.accessor}>
                {column.Header}: {((selectedOptions[column.accessor] && selectedOptions[column.accessor].helper) || '').substring(0, 20)}
              </label>              
              
              {column.type === 'dropdown' ? (
              <div className='complete select'>

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
              required={false}
              />

        

            </div>
              ) : (
               <input
                  type={column.type === 'checkbox' ? 'checkbox' : column.type === 'number' ? 'number' : 'text'}
                  id={column.accessor}
                  name={column.accessor}
                  required={false}
                  className={column.type === 'checkbox' ? 'form-check-input' : 'form-control'}
                  {...(column.type !== 'checkbox' ? { value: getValue(column.accessor) } : {checked: getValue(column.accessor)})}
                  onChange={handleInputChange} // Update the state on change
                
              />

              )}
            </div>
           )
          ))}       
        </div>





        <div className="center-button">
            <center><button type='submit' className="actions smallerr">
              Posodobi
            </button>            
            </center>
        </div>

        </form>

      </div>
    </div>
  );
};

export default Update;