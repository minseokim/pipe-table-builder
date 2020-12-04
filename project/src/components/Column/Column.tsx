import {
  Badge,
  Button,
  Checkbox,
  ListItem,
  majorScale,
  minorScale,
  Pane,
  Pill,
  Popover,
  Text,
} from 'evergreen-ui';
import React from 'react';
import './Column.css';
import { FilterPopover } from '../FilterPopover';

interface ColumnProps {
  id: string;
  name: string;
  isFilterable: boolean;
  filterOperator: string;
  filterAmount: number;
  shouldDisplay: boolean;
  onApplyFilter: (
    columnName: string,
    filterOperator: string,
    filterAmount: number
  ) => void;
  onColumnToggle: (columnName: string, isSelected: boolean) => void;
}
export const Column = ({
  id,
  name,
  isFilterable,
  filterOperator,
  filterAmount,
  onApplyFilter,
  onColumnToggle,
  shouldDisplay,
}: ColumnProps): JSX.Element => {
  const handleCheckboxChange = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // Be sure to pass id here, instead of name
    // ex) key : 'termLength', name: 'Term Length'
    onColumnToggle(id, checked);
  };

  const handleApplyFilter = (operator: string, amount: number) => {
    onApplyFilter(id, operator, amount);
  };

  return (
    <ListItem
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={shouldDisplay ? 'selected' : ''}
      paddingLeft={majorScale(1)}
      margin={0}
    >
      <Pane display="flex" alignItems="center">
        <Checkbox
          checked={shouldDisplay}
          marginRight={majorScale(1)}
          onChange={handleCheckboxChange}
        />
        <Text>{name}</Text>
      </Pane>
      <Pane display="flex" alignItems="center">
        {isFilterable ? (
          <>
            {filterOperator ? (
              <>
                <Pane>
                  <Badge isSolid marginRight={minorScale(1)}>
                    {filterOperator}
                  </Badge>
                  <Pill isSolid>{filterAmount}</Pill>
                </Pane>
              </>
            ) : null}
            <Popover
              content={({ close }) => {
                return (
                  <FilterPopover
                    filterOperator={filterOperator}
                    filterAmount={filterAmount}
                    filterName={name}
                    closePopover={close}
                    onApplyFilter={handleApplyFilter}
                  />
                );
              }}
              shouldCloseOnExternalClick={false}
            >
              <Button disabled={!shouldDisplay} marginRight={majorScale(2)}>
                Filter
              </Button>
            </Popover>
          </>
        ) : null}
      </Pane>
    </ListItem>
  );
};
