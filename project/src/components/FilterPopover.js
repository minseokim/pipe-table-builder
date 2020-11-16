import {
  Button,
  Heading,
  majorScale,
  Pane,
  SelectField,
  Text,
  TextInputField,
} from 'evergreen-ui';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// Constants for Filter Operators
export const NO_OPERATOR_SELECTED = null;
export const GREATER_THAN = 'Greater Than';
export const LESS_THAN = 'Less Than';
export const EQUAL_TO = 'Equal To';
export const NOT_EQUAL_TO = `Doesn't Equal`;

const FilterPopover = ({
  filterName,
  filterOperator,
  filterAmount,
  closePopover,
  onApplyFilter,
}) => {
  const [filterOperatorInput, setFilterOperatorInput] = useState(
    filterOperator
  );
  // Default to 0 if null
  const [filterAmountInput, setFilterAmountInput] = useState(filterAmount || 0);

  const handleSaveButtonClick = () => {
    onApplyFilter(filterOperatorInput, filterAmountInput);
    closePopover();
  };

  const handleClearButtonClick = () => {
    onApplyFilter(NO_OPERATOR_SELECTED, 0);
    closePopover();
  };

  const handleFilterOperatorInputChange = ({ target: { value } }) => {
    // Handle Weird edge case where dropdown option element's text, instead of 'value' property gets applied(TODO : Double-check evergreen ui's docs)
    if (value === 'None') {
      setFilterOperatorInput(NO_OPERATOR_SELECTED);
      return;
    }
    setFilterOperatorInput(value);
  };

  const handleFilterAmountInputChange = ({ target: { value } }) => {
    // Convert Input(String) to Number here
    setFilterAmountInput(+value);
  };

  return (
    <Pane
      width={400}
      height={240}
      paddingTop={majorScale(2)}
      paddingBottom={majorScale(2)}
      paddingLeft={majorScale(4)}
      paddingRight={majorScale(4)}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      flexDirection="column"
    >
      <Pane>
        <Text>Filter For</Text>
        <Heading>{filterName}</Heading>
      </Pane>
      <Pane display="flex" marginTop={majorScale(2)}>
        <SelectField
          label="Operator"
          marginRight={majorScale(4)}
          value={filterOperatorInput}
          onChange={handleFilterOperatorInputChange}
        >
          <option value={NO_OPERATOR_SELECTED}>None</option>
          <option value={GREATER_THAN}>{GREATER_THAN}</option>
          <option value={LESS_THAN}>{LESS_THAN}</option>
          <option value={EQUAL_TO}>{EQUAL_TO}</option>
          <option value={NOT_EQUAL_TO}>{NOT_EQUAL_TO}</option>
        </SelectField>

        <TextInputField
          label="Amount"
          name="Amount"
          type="number"
          value={filterAmountInput}
          required
          disabled={filterOperatorInput === NO_OPERATOR_SELECTED}
          onChange={handleFilterAmountInputChange}
        />
      </Pane>
      <Pane display="flex">
        <Button
          appearance="primary"
          onClick={handleSaveButtonClick}
          marginRight={majorScale(1)}
        >
          Save
        </Button>
        <Button appearance="default" onClick={handleClearButtonClick}>
          Clear
        </Button>
      </Pane>
    </Pane>
  );
};

FilterPopover.propTypes = {
  filterName: PropTypes.string.isRequired,
  filterOperator: PropTypes.string.isRequired,
  filterAmount: PropTypes.number.isRequired,
  closePopover: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

export default FilterPopover;
