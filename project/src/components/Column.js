import {
  Badge,
  Button,
  Checkbox,
  ListItem,
  majorScale,
  Pane,
  Pill,
  Popover,
  Text,
} from 'evergreen-ui';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Column.css';
import FilterPopover, { NO_OPERATOR_SELECTED } from './FilterPopover';

const Column = ({
  name,
  isFilterable,
  onApplyFilter,
  onColumnToggle,
  shouldDisplay,
}) => {
  const [filterOperator, setFilterOperator] = useState(NO_OPERATOR_SELECTED);

  const [filterAmount, setFilterAmount] = useState(0);

  const handleFilterOperatorChange = (value) => {
    setFilterOperator(value);
  };

  const handleFilterAmountChange = (value) => {
    setFilterAmount(+value);
  };

  const handleCheckboxChange = ({ target: { checked } }) => {
    // Clear Filter Inputs when deselected
    if (!checked) {
      setFilterOperator(NO_OPERATOR_SELECTED);
      setFilterAmount(0);
    }

    // Call Event Handler from Parent
    onColumnToggle(name, checked);
  };

  const handleApplyFilter = (operator, amount) => {
    setFilterOperator(operator);
    setFilterAmount(amount);

    onApplyFilter(name, operator, amount);
  };

  return (
    <ListItem
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={shouldDisplay ? 'selected' : null}
    >
      <Pane display="flex" alignItems="center">
        <Checkbox
          checked={shouldDisplay}
          marginRight={majorScale(1)}
          onChange={handleCheckboxChange}
        />
        <Text>{name}</Text>
      </Pane>
      <Pane display="flex">
        {isFilterable ? (
          <>
            {filterOperator ? (
              <>
                <Pane>
                  <Badge>{filterOperator}</Badge>
                  <Pill>{filterAmount}</Pill>
                </Pane>
              </>
            ) : null}
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

Column.propTypes = {
  name: PropTypes.string.isRequired,
  isFilterable: PropTypes.bool.isRequired,
  shouldDisplay: PropTypes.bool.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  onColumnToggle: PropTypes.func.isRequired,
};

export default Column;
