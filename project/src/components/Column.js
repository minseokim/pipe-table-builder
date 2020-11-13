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

const Column = ({ name, isFilterable, onColumnToggle, shouldDisplay }) => {
  const [isColumnSelected, setIsColumnSelected] = useState(shouldDisplay);

  const handleCheckboxChange = ({ target }) => {
    // Toggle Checkbox
    setIsColumnSelected(target.checked);
    // Set Background Row Color
    // Call Event Handler from Parent
    onColumnToggle(name, target.checked);
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
          content={
            <Pane
              width={400}
              height={240}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Text>PopoverContent</Text>
            </Pane>
          }
        >
          <Button marginRight={majorScale(2)}>Filter</Button>
        </Popover>
      ) : null}
    </ListItem>
  );
};

Column.propTypes = {
  name: PropTypes.string.isRequired,
  isFilterable: PropTypes.bool.isRequired,
  shouldDisplay: PropTypes.bool.isRequired,
  onColumnToggle: PropTypes.func.isRequired,
};

export default Column;
