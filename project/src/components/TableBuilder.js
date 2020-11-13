/* eslint-disable no-param-reassign */
import { toaster } from 'evergreen-ui';
import produce from 'immer';
import { startCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import customerDataSource from '../dataSource/customerDataSource';
import { NO_OPERATOR_SELECTED } from './FilterPopover';
import Header from './Header';
import TableDashboard from './TableDashboard';

const TableBuilder = () => {
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
          name: startCase(key),
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
          console.log('columnName :', columnName);

          // Update isSelected
          draftColumnSettings[columnName].shouldDisplay = isSelected;

          // If a column is de-selected, clear out filters
          if (!isSelected) {
            draftColumnSettings[
              columnName
            ].filterOperator = NO_OPERATOR_SELECTED;
            draftColumnSettings[columnName].filterAmount = null;
          }
        })
      )
    );
  };

  const handleApplyFilter = (columnName, filterOperator, filterAmount) => {
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

  const handleImportConfig = (columnSettingsImport) => {
    setColumnSettings(columnSettingsImport);
  };

  const handleExportConfig = () => {
    const exportJSONConfig = JSON.stringify(columnSettings);
    navigator.clipboard.writeText(exportJSONConfig);

    toaster.success('Table Settings', {
      description: `Table Settings Copied to Clipboard Successfully`,
    });
  };

  return (
    <>
      {columnSettings ? (
        <>
          <Header
            onImportConfig={handleImportConfig}
            onExportConfig={handleExportConfig}
          />
          <TableDashboard
            columnSettings={columnSettings}
            customerDataList={customerDataList}
            onColumnToggle={handleColumnToggle}
            onApplyFilter={handleApplyFilter}
          />
        </>
      ) : null}
    </>
  );
};

export default TableBuilder;
