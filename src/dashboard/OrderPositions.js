import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import 'devextreme/dist/css/dx.light.css';
import {
  DataGrid,
  Column,
  SearchPanel,
  FilterRow,
} from 'devextreme-react/data-grid';

export default function OrderPositions(props) { 


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


    return ( 
        <div>
             <DataGrid className="devexpress-grid order-position"
                        dataSource={gridData}
                        keyExpr={"id"}
                        allowColumnReordering={true}
                        allowColumnResizing={true}          
                        noDataText='Ni podatkov'
                        columnAutoWidth={true}
                        focusedRowEnabled={true}
                        hoverStateEnabled={true}
              >


                    <FilterRow visible={true} />
                    <SearchPanel visible={true} />


                    <Column dataField="Ident" caption="Ident" />
                    <Column dataField="Name" caption="Name" />
                    <Column dataField="No" caption="Št. artikla" />
                    <Column dataField="ItemID" caption="Številka" />
                    <Column dataField="OpenQty" caption="Odprto" />
                    <Column dataField="FullQty" caption="Naročeno" />


              </DataGrid> 
   
       </div>
    ); 

} 