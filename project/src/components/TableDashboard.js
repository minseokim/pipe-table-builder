/* eslint-disable no-param-reassign */
import { majorScale, Pane } from 'evergreen-ui';
import { produce } from 'immer';
import React, { useEffect, useState } from 'react';
import customerDataSource from '../dataSource/customerDataSource';
import EditPanel from './EditPanel';
import ViewTable from './ViewTable';

// TODO : Refactor using Context
//        Disable operatorAmount when 'No Operator' is selected in filter
//        Add color to column when selected
//        Validate JSON Config(Nice-to-have)
//        Styling
//        Unit Tests()

const TableDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [customerDataList, setCustomerDataList] = useState(customerDataSource);

  const [columnSettings, setColumnSettings] = useState(null);

  useEffect(() => {
    if (customerDataList && customerDataList.length) {
      const firstCustomerData = customerDataList[0];

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
  }, [customerDataList]);

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

  const handleApplyFilter = (columnName, filterOperator, filterAmount) => {
    console.log('columnName', columnName, filterOperator, filterAmount);
    setColumnSettings(
      produce(
        (columnSettings,
        (draftColumnSettings) => {
          draftColumnSettings[columnName].filterOperator = filterOperator;
          draftColumnSettings[columnName].filterAmount = filterAmount;
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
            onApplyFilter={handleApplyFilter}
          />
          <ViewTable
            columnSettings={columnSettings}
            customerDataList={customerDataList}
          />
        </>
      ) : null}
    </Pane>
  );
};

export default TableDashboard;
