import {
  Button,
  Heading,
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
  filterOperator,
  filterAmount,
  closePopover,
  onApplyFilter,
}) => {
  const [filterOperatorInput, setFilterOperatorInput] = useState(
    filterOperator
  );
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
        <Button appearance="primary" onClick={handleSaveButtonClick}>
          Save
        </Button>
        <Button appearance="default" onClick={handleClearButtonClick}>
          Clear
        </Button>
      </Pane>
    </Pane>
  );
};

FilterPopover.defaultProps = {
  filterOperator: NO_OPERATOR_SELECTED,
  filterAmount: 0,
};

FilterPopover.propTypes = {
  filterOperator: PropTypes.string,
  filterAmount: PropTypes.number,
  closePopover: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

export default FilterPopover;
