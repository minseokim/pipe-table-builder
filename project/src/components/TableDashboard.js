import React from 'react';
import { Pane, majorScale } from 'evergreen-ui';

const TableDashboard = () => {
  return (
    <Pane
      height={`calc(100vh - ${majorScale(7)}px)`}
      display="flex"
      background="tint2"
    />
  );
};

export default TableDashboard;
