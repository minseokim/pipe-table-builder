import { Heading, majorScale, Pane } from 'evergreen-ui';
import React from 'react';
import COLORS from '../../colors';
import { ColumnSettings } from '../../typeDefs';
import { ColumnList } from '../ColumnList';

interface EditPanelProps {
  columnSettings: ColumnSettings;
  onApplyFilter: (
    columnName: string,
    filterOperator: string,
    filterAmount: number
  ) => void;
  onColumnToggle: (columnName: string, isSelected: boolean) => void;
}

export const EditPanel = ({
  columnSettings,
  onApplyFilter,
  onColumnToggle,
}: EditPanelProps): JSX.Element => {
  return (
    <Pane flex={1} background="tint2" border="default" borderTop="muted">
      <Pane display="flex" flexDirection="column" alignItems="flex-start">
        <Heading
          size={400}
          color={COLORS.blue.base}
          marginTop={majorScale(2)}
          marginBottom={majorScale(2)}
          paddingLeft={majorScale(2)}
          className="edit-panel--heading"
        >
          Edit Panel
        </Heading>
        <ColumnList
          columnSettings={columnSettings}
          onApplyFilter={onApplyFilter}
          onColumnToggle={onColumnToggle}
        />
      </Pane>
    </Pane>
  );
};
