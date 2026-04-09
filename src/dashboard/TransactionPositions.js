import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';

import {
  DataGrid,
  Column,
  FilterRow,
  Selection,
} from 'devextreme-react/data-grid';
import { useTranslation } from 'react-i18next';
import { trHeader } from '../i18n/headerMap';
import { getDxExportRows } from '../utility/devextremeGridInstance';

const TransactionPositions = forwardRef(function TransactionPositions(props, ref) {
  const { t } = useTranslation();
  const gridRef = useRef(null);

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

  useImperativeHandle(
    ref,
    () => ({
      getExportRows: () => getDxExportRows(gridRef, gridData),
    }),
    [gridData],
  );

  const selectPosition = useCallback((e) => {
    const chosenPositionDocument = e.selectedRowsData;
    // Communicate to parent component.
    props.selectPosition(chosenPositionDocument[0]);
  }, []);

  return (
    <div>
      <DataGrid
        ref={gridRef}
        className="devexpress-grid order-position"
        dataSource={gridData}
        onSelectionChanged={selectPosition}
        keyExpr="id"
        allowColumnReordering
        allowColumnResizing
        noDataText={t("common.noData")}
        columnAutoWidth
        focusedRowEnabled
        hoverStateEnabled
      >

        <FilterRow visible />
        <Column dataField="HeadID" caption={trHeader("ID transakcije", t)} />
        <Column dataField="LinkKey" caption={trHeader("Ključ transakcije", t)} />
        <Column dataField="ItemID" caption={trHeader("Številka pozicije", t)} />
        <Column dataField="SerialNo" caption={trHeader("Serijska številka", t)} />
        <Column dataField="Ident" caption={trHeader("Ident", t)} />
        <Column dataField="IdentName" caption={trHeader("Naziv identa", t)} />
        <Column dataField="Qty" caption={trHeader("WMS količina", t)} />
        <Selection mode="single" />

      </DataGrid>
    </div>
  );
});

export default TransactionPositions;
