// src/DataTable.js
import React from 'react';
import {
  Grid,
  Table,
  TableColumnResizing,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

const columns = [
  { name: '1', title: '1' },
  { name: '2', title: '2' },
  { name: '3', title: '3' },
  { name: '4', title: '4' },
  { name: '5', title: '5' },
];

const data = [
  { 1: 'Data 1-1', 2: 'Data 1-2', 3: 'Data 1-3', 4: 'Data 1-4', 5: 'Data 1-5' },
  { 1: 'Data 2-1', 2: 'Data 2-2', 3: 'Data 2-3', 4: 'Data 2-4', 5: 'Data 2-5' },
  { 1: 'Data 3-1', 2: 'Data 3-2', 3: 'Data 3-3', 4: 'Data 3-4', 5: 'Data 3-5' },
];

const Devices = () => {
  return (
    <Grid
      rows={data}
      columns={columns}
    >
      <Table />
      <TableColumnResizing defaultColumnWidths={[{ columnName: '1', width: 150 }]} />
      <TableHeaderRow />
    </Grid>
  );
};

export default Devices;