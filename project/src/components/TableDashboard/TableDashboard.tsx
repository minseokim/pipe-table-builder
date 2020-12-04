import { Pane } from 'evergreen-ui';
import React from 'react';
import { ColumnSettings, CustomerData } from '../../typeDefs';
import { EditPanel } from '../EditPanel';
import { ViewTable } from '../ViewTable';

interface TableDashboardProps {
  columnSettings: ColumnSettings;
  customerDataList: CustomerData[];
  onApplyFilter: (
    columnName: string,
    filterOperator: string,
    filterAmount: number
  ) => void;
  onColumnToggle: (columnName: string, isSelected: boolean) => void;
}

export const TableDashboard = ({
  columnSettings,
  customerDataList,
  onColumnToggle,
  onApplyFilter,
}: TableDashboardProps): JSX.Element => {
  return (
    <Pane display="flex" background="tint2">
      <EditPanel
        columnSettings={columnSettings}
        onColumnToggle={onColumnToggle}
        onApplyFilter={onApplyFilter}
      />
      <ViewTable
        columnSettings={columnSettings}
        customerDataList={customerDataList}
      />
    </Pane>
  );
};
