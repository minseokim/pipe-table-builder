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
import PropTypes from 'prop-types';
import React from 'react';
import './Column.css';
import FilterPopover from './FilterPopover';

const Column = ({
  id,
  name,
  isFilterable,
  filterOperator,
  filterAmount,
  onApplyFilter,
  onColumnToggle,
  shouldDisplay,
}) => {
  const handleCheckboxChange = ({ target: { checked } }) => {
    // Be sure to pass id here, instead of name
    // ex) key : 'termLength', name: 'Term Length'
    onColumnToggle(id, checked);
  };

  const handleApplyFilter = (operator, amount) => {
    onApplyFilter(id, operator, amount);
  };

  return (
    <ListItem
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={shouldDisplay ? 'selected' : null}
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

Column.defaultProps = {
  filterOperator: null,
  filterAmount: null,
};

Column.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isFilterable: PropTypes.bool.isRequired,
  filterOperator: PropTypes.string,
  filterAmount: PropTypes.number,
  shouldDisplay: PropTypes.bool.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  onColumnToggle: PropTypes.func.isRequired,
};

export default Column;
