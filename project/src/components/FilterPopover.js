import React, { useState } from 'react';
import {
  Pane,
  Heading,
  Text,
  SelectField,
  TextInputField,
  Button,
} from 'evergreen-ui';
import PropTypes from 'prop-types';

// Constants for Filter Operators
export const NO_OPERATOR_SELECTED = null;
export const GREATER_THAN = 'Greater Than';
export const LESS_THAN = 'Less Than';
export const EQUAL_TO = 'Equals';
export const NOT_EQUAL_TO = `Doesn't Equal`;

const FilterPopover = ({ closePopover, onApplyFilter }) => {
  const [filterOperatorInput, setFilterOperatorInput] = useState(
    NO_OPERATOR_SELECTED
  );
  const [filterAmountInput, setFilterAmountInput] = useState(0);

  const handleSaveClick = () => {
    onApplyFilter(filterOperatorInput, filterAmountInput);
    closePopover();
  };

  const handleFilterOperatorInputChange = ({ target: { value } }) => {
    setFilterOperatorInput(value);
  };

  const handleFilterAmountInputChange = ({ target: { value } }) => {
    // Convert Input(String) to Number here
    setFilterAmountInput(+value);
  };

  return (
    <Pane width={240} height={240}>
      <Text>Filter For</Text>
      <Heading>Term Length</Heading>
      <Pane display="flex" alignItems="center" justifyContent="center">
        <SelectField
          label="Operator"
          description="Select an Operator"
          onChange={handleFilterOperatorInputChange}
        >
          <option value={NO_OPERATOR_SELECTED}>Select an Operator</option>
          <option value={GREATER_THAN}>{GREATER_THAN}</option>
          <option value={LESS_THAN}>{LESS_THAN}</option>
          <option value={EQUAL_TO}>{EQUAL_TO}</option>
          <option value={NOT_EQUAL_TO}>{NOT_EQUAL_TO}</option>
        </SelectField>

        <TextInputField
          label="Amount"
          name="Amount"
          type="number"
          required
          onChange={handleFilterAmountInputChange}
        />
      </Pane>
      <Pane display="flex">
        <Button appearance="primary" onClick={handleSaveClick}>
          Save
        </Button>
        <Button appearance="default">Clear</Button>
      </Pane>
    </Pane>
  );
};

FilterPopover.propTypes = {
  closePopover: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

export default FilterPopover;
