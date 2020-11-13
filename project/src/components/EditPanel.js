import { Heading, majorScale, Pane } from 'evergreen-ui';
import PropTypes from 'prop-types';
import React from 'react';
import COLORS from '../colors';
import ColumnList from './ColumnList';

const EditPanel = ({ columnSettings, onApplyFilter, onColumnToggle }) => {
  return (
    <Pane flex={1} background="tint2" border="default" borderTop="muted">
      <Pane display="flex" flexDirection="column" alignItems="flex-start">
        <Heading
          size={400}
          color={COLORS.blue.base}
          marginTop={majorScale(2)}
          marginBottom={majorScale(2)}
          paddingLeft={majorScale(2)}
          className="edit-panel--heading"
        >
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
