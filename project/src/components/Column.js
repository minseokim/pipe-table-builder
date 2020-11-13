import React, { useState } from 'react';
import {
  ListItem,
  Pane,
  Checkbox,
  Button,
  majorScale,
  Popover,
  Text,
} from 'evergreen-ui';
import PropTypes from 'prop-types';
import FilterPopover, { NO_OPERATOR_SELECTED } from './FilterPopover';

const Column = ({
  name,
  isFilterable,
  onApplyFilter,
  onColumnToggle,
  shouldDisplay,
}) => {
  const [isColumnSelected, setIsColumnSelected] = useState(shouldDisplay);

  const [filterOperator, setFilterOperator] = useState(NO_OPERATOR_SELECTED);

  const [filterAmount, setFilterAmount] = useState(0);

  const handleFilterOperatorChange = (value) => {
    setFilterOperator(value);
  };

  const handleFilterAmountChange = (value) => {
    setFilterAmount(+value);
  };

  const handleCheckboxChange = ({ target }) => {
    // Toggle Checkbox
    setIsColumnSelected(target.checked);
    // Set Background Row Color
    // Call Event Handler from Parent
    onColumnToggle(name, target.checked);
  };

  const handleApplyFilter = (operator, amount) => {
    setFilterOperator(operator);
    setFilterAmount(amount);

    onApplyFilter(name, operator, amount);
  };

  return (
    <ListItem display="flex" justifyContent="space-between" alignItems="center">
      <Pane display="flex" alignItems="center">
        <Checkbox
          checked={isColumnSelected}
          marginRight={majorScale(1)}
          onChange={handleCheckboxChange}
        />
        <Text>{name}</Text>
      </Pane>
      {isFilterable ? (
        <Popover
          content={({ close }) => {
            return (
              <FilterPopover
                filterOperator={filterOperator}
                filterAmount={filterAmount}
                closePopover={close}
                onApplyFilter={handleApplyFilter}
                onFilterOperatorChange={handleFilterOperatorChange}
                onFilterAmountChange={handleFilterAmountChange}
              />
            );
          }}
        >
          <Button disabled={!isColumnSelected} marginRight={majorScale(2)}>
            Filter
          </Button>
        </Popover>
      ) : null}
    </ListItem>
  );
};

Column.propTypes = {
  name: PropTypes.string.isRequired,
  isFilterable: PropTypes.bool.isRequired,
  shouldDisplay: PropTypes.bool.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  onColumnToggle: PropTypes.func.isRequired,
};

export default Column;
