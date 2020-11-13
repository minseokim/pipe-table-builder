import React from 'react';
import { Pane, Heading, majorScale } from 'evergreen-ui';
import PropTypes from 'prop-types';
import ColumnList from './ColumnList';

const EditPanel = ({ columnSettings, onApplyFilter, onColumnToggle }) => {
  console.log('columnSettings :', columnSettings);
  return (
    <Pane flex={1} background="tint2" border="default" borderTop="muted">
      <Pane>
        <Heading size={600} color="blue" marginTop={majorScale(2)}>
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

EditPanel.propTypes = {
  columnSettings: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isFilterable: PropTypes.bool,
      filterAmount: PropTypes.number,
      shouldDisplay: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onColumnToggle: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

export default EditPanel;
