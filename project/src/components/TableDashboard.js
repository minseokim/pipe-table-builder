import React from 'react';
import { Pane, majorScale } from 'evergreen-ui';
import EditPanel from './EditPanel';
import ViewTable from './ViewTable';

const TableDashboard = () => {
  return (
    <Pane
      height={`calc(100vh - ${majorScale(7)}px)`}
      display="flex"
      background="tint2"
    >
      <EditPanel />
      <ViewTable />
    </Pane>
  );
};

export default TableDashboard;
