import { toaster } from 'evergreen-ui';
import produce from 'immer';
import startCase from 'lodash.startcase';
import React, { useEffect, useState } from 'react';
import { NO_OPERATOR_SELECTED } from '../FilterPopover/FilterPopover';
import { Header } from '../Header/';
import { TableDashboard } from '../TableDashboard/';
import { customerDataSource } from '../../dataSource';
import { ColumnSettings, CustomerData } from '../../typeDefs';
// TODO's(For future iterations) :
// - Validate JSON Import(For valid JSON, schema)
// - Instead of importing the data directly, connect to an API
// - Unit tests
// - More styling

export const TableBuilder = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [customerDataList, setCustomerDataList] = useState<CustomerData[]>(
    customerDataSource
  );

  const [columnSettings, setColumnSettings] = useState<ColumnSettings | null>(
    null
  );

  useEffect(() => {
    if (customerDataList && customerDataList.length) {
      const firstCustomerData = customerDataList[0];
      const initialColumnSettings: ColumnSettings = {};

      Object.keys(firstCustomerData).forEach((key) => {
        const value = firstCustomerData[key];
        initialColumnSettings[key] = {
          id: key,
          name: startCase(key),
          isFilterable: !Number.isNaN(Number(value)),
          filterOperator: '',
          filterAmount: 0,
          shouldDisplay: false,
        };
      });

      setColumnSettings(initialColumnSettings);
    }
  }, [customerDataList]);

  const handleColumnToggle = (columnName: string, isSelected: boolean) => {
    // TODO : Fix typings on produce for immer. Cast to 'any' to get it working for now.
    const newState: any = produce(
      (void columnSettings,
      (draftColumnSettings: ColumnSettings) => {
        // Update isSelected
        draftColumnSettings[columnName].shouldDisplay = isSelected;

        // If a column is de-selected, clear out filters
        if (!isSelected) {
          draftColumnSettings[columnName].filterOperator = NO_OPERATOR_SELECTED;
          draftColumnSettings[columnName].filterAmount = 0;
        }
      })
    );

    setColumnSettings(newState);
  };

  const handleApplyFilter = (
    columnName: string,
    filterOperator: string,
    filterAmount: number
  ) => {
    // TODO : Fix typings on produce for immer
    const newState: any = produce(
      (void columnSettings,
      (draftColumnSettings: ColumnSettings) => {
        draftColumnSettings[columnName].filterOperator = filterOperator;
        draftColumnSettings[columnName].filterAmount = filterAmount;
      })
    );
    setColumnSettings(newState);
  };

  const handleImportConfig = (columnSettingsImport: ColumnSettings) => {
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
