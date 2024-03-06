import { useNavigate } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';

import {
  DataGrid,
  Column,
  SearchPanel,
  FilterRow,
  Selection,
} from 'devextreme-react/data-grid';
import Table from '../table/Table';

export default function TransactionPositions(props) {
  const navigate = useNavigate();

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
    }).filter((item) => item !== null); // Filter out null values if needed
  }

  const selectPosition = useCallback((e) => {
    const chosenPositionDocument = e.selectedRowsData;
    // Communicate to parent component.
    props.selectPosition(chosenPositionDocument[0]);
  }, []);

  return (
    <div>
      <DataGrid
        className="devexpress-grid order-position"
        dataSource={gridData}
        onSelectionChanged={selectPosition}
        keyExpr="id"
        allowColumnReordering
        allowColumnResizing
        noDataText="Ni podatkov"
        columnAutoWidth
        focusedRowEnabled
        hoverStateEnabled
      >

        <FilterRow visible />
        <Column dataField="HeadID" caption="ID transakcije" />
        <Column dataField="LinkKey" caption="Ključ transakcije" />
        <Column dataField="ItemID" caption="Številka pozicije" />
        <Column dataField="SerialNo" caption="Serijska številka" />
        <Column dataField="Ident" caption="Ident" />
        <Column dataField="IdentName" caption="Naziv identa" />
        <Column dataField="Qty" caption="WMS količina" />
        <Selection mode="single" />

      </DataGrid>
    </div>
  );
}
