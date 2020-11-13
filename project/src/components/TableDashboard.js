/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Pane, majorScale } from 'evergreen-ui';
import { produce } from 'immer';
import EditPanel from './EditPanel';
import ViewTable from './ViewTable';
import customerDataSource from '../dataSource/customerDataSource';

const TableDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [customerData, setCustomerData] = useState(customerDataSource);

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
          shouldDisplay: false,
        };
      });

      setColumnSettings(initialColumnSettings);
    }
  }, [customerData]);

  const handleColumnToggle = (columnName, isSelected) => {
    setColumnSettings(
      produce(
        (columnSettings,
        (draftColumnSettings) => {
          draftColumnSettings[columnName].shouldDisplay = isSelected;
        })
      )
    );
  };

  return (
    <Pane
      height={`calc(100vh - ${majorScale(7)}px)`}
      display="flex"
      background="tint2"
    >
      {columnSettings ? (
        <>
          <EditPanel
            columnSettings={columnSettings}
            onColumnToggle={handleColumnToggle}
          />
          <ViewTable
            columnSettings={columnSettings}
            customerData={customerData}
          />
        </>
      ) : null}
    </Pane>
  );
};

export default TableDashboard;
