import React, { useState, useEffect } from 'react';
import { Pane, majorScale } from 'evergreen-ui';
import EditPanel from './EditPanel';
import ViewTable from './ViewTable';
import customerData from '../dataSource/customerData';

const TableDashboard = () => {
  const [columnSettings, setColumnSettings] = useState(null);

  useEffect(() => {
    if (customerData && customerData.length) {
      const firstCustomerData = customerData[0];

      const initialColumnSettings = {};

      Object.keys(firstCustomerData).forEach((key) => {
        const value = firstCustomerData[key];
        initialColumnSettings[key] = {
          id: key,
          name: key,
          isFilterable: !Number.isNaN(Number(value)),
          filterOperator: null,
          filterAmount: null,
          isSelected: false,
        };
      });

      setColumnSettings(initialColumnSettings);
    }
  }, [customerData]);

  return (
    <Pane
      height={`calc(100vh - ${majorScale(7)}px)`}
      display="flex"
      background="tint2"
    >
      {columnSettings ? (
        <>
          <EditPanel columnSettings={columnSettings} />
          <ViewTable />
        </>
      ) : null}
    </Pane>
  );
};

export default TableDashboard;
