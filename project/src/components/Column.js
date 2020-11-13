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
import FilterPopover from './FilterPopover';

const Column = ({
  name,
  isFilterable,
  onApplyFilter,
  onColumnToggle,
  shouldDisplay,
}) => {
  const [isColumnSelected, setIsColumnSelected] = useState(shouldDisplay);

  const handleCheckboxChange = ({ target }) => {
    // Toggle Checkbox
    setIsColumnSelected(target.checked);
    // Set Background Row Color
    // Call Event Handler from Parent
    onColumnToggle(name, target.checked);
  };

  const handleApplyFilter = (filterOperator, filterAmount) => {
    onApplyFilter(name, filterOperator, filterAmount);
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
                closePopover={close}
                onApplyFilter={handleApplyFilter}
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
