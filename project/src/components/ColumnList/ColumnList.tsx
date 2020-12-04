import { majorScale, Pane, UnorderedList } from 'evergreen-ui';
import React from 'react';
import { Column } from '../Column';
import { ColumnSettings } from '../../typeDefs';
interface ColumnListProps {
  columnSettings: ColumnSettings;
  onApplyFilter: (
    columnName: string,
    filterOperator: string,
    filterAmount: number
  ) => void;
  onColumnToggle: (columnName: string, isSelected: boolean) => void;
}

export const ColumnList = ({
  columnSettings,
  onApplyFilter,
  onColumnToggle,
}: ColumnListProps): JSX.Element => {
  const columnIDList = Object.keys(columnSettings);

  return (
    <Pane width="100%">
      <UnorderedList marginLeft={0} paddingLeft={majorScale(1)}>
        {columnIDList.map((columnID) => {
          const columnSetting = columnSettings[columnID];

          return (
            <Column
              key={columnSetting.id}
              id={columnSetting.id}
              name={columnSetting.name}
              isFilterable={columnSetting.isFilterable}
              shouldDisplay={columnSetting.shouldDisplay}
              filterOperator={columnSetting.filterOperator}
              filterAmount={columnSetting.filterAmount}
              onApplyFilter={onApplyFilter}
              onColumnToggle={onColumnToggle}
            />
          );
        })}
      </UnorderedList>
    </Pane>
  );
};
