import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import 'devextreme/dist/css/dx.light.css';
import {
  DataGrid,
  Column,
  FilterRow,
  SearchPanel,
  Selection
} from 'devextreme-react/data-grid';
import { auto } from '@popperjs/core';
import { useCallback } from 'react';

export default function OrderHeadsListing(props) { 


  let navigate = useNavigate();

  // This code converts the old api result to the devexpress data array.
  let gridData = [];

  if (props.data && Array.isArray(props.data.Items)) {
      gridData = props.data.Items.map((item, index) => {
          try {
              const properties = item.Properties.Items.reduce((acc, prop) => {
                  acc[prop.Name] = prop.StringValue || prop.IntValue || prop.DoubleValue || prop.BoolValue || prop.DateTimeValue || '';
                  return acc;
              }, {});
              // Add auto-increment id field
              properties.id = index + 1;
              return properties;
          } catch (error) {
              return null; // or any other error handling logic
          }
      }).filter(item => item !== null); // Filter out null values if needed
  } 
  
  
    const selectHeader = useCallback((e) => {
        let chosenHeadDocument = e.selectedRowsData;
        // Communicate to parent component.
        props.communicate("head", "select", chosenHeadDocument[0]);


    }, [])


    return ( 
        <div>

              <DataGrid className="devexpress-grid order"
                        dataSource={gridData}
                        keyExpr={"id"}
                        onSelectionChanged={selectHeader}
                        allowColumnReordering={true}
                        allowColumnResizing={true}          
                        noDataText='Ni podatkov'
                        columnAutoWidth={true}
                        focusedRowEnabled={true}
                        hoverStateEnabled={true}
                      
              >


                    <FilterRow visible={true} />
                    <SearchPanel visible={true} />
                  

                    <Column dataField="Warehouse" caption="Skladišče" />
                    <Column dataField="Consignee" caption="Prejemnik" />
                    <Column dataField="DeliveryDeadline" caption="Rok dobave" />
                    <Column dataField="DocumentType" caption="Tip dokumenta" />
                    <Column dataField="Key" caption="Ključ" />
                    <Column dataField="Receiver" caption="Sprejemnik" />
                    <Selection mode="single" />
              </DataGrid> 
   
       </div>
    ); 
} 