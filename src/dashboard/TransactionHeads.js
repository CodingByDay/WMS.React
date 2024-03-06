import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { useEffect, useState, useMemo, useCallback } from "react";
import {
    DataGrid,
    Column,
    SearchPanel,
    FilterRow,
    Selection
  } from 'devextreme-react/data-grid';

export default function TransactionHeads(props) { 


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

   const selectPosition = useCallback((e) => {
    let chosenHeadDocument = e.selectedRowsData;
    // Communicate to parent component.
    props.communicate("position", "select", chosenHeadDocument[0]);
}, [])

    return ( 
        <div className='transcation-heads-dashboard'>

               <DataGrid className="devexpress-grid order-position"
                        dataSource={gridData}
                        onSelectionChanged={selectPosition}
                        keyExpr={"id"}
                        allowColumnReordering={true}
                        allowColumnResizing={true}          
                        noDataText='Ni podatkov'
                        columnAutoWidth={true}
                        focusedRowEnabled={true}                        
                        hoverStateEnabled={true}
              >


                    <FilterRow visible={true} />

                        <Column dataField="DocumentType" caption="Tip" />
                        <Column dataField="Status" caption="Status" />
                        <Column dataField="Key" caption="ERP ključ" />
                        <Column dataField="LinkKey" caption="Nalog za transakcijo" />
                        <Column dataField="Receiver" caption="Stranka" />
                        <Column dataField="Wharehouse" caption="Skladišče" />
                        <Column dataField="Date" dataType='date' caption="Datum" />
                        <Column dataField="ClerkName" caption="Vnesel" />
                        <Column dataField="DateInserted" caption="Datum vnosa" 
                        
                    />

                    <Selection  mode="single"  />

              </DataGrid> 
        </div>
    ); 

} 