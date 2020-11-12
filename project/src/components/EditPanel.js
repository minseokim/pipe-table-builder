import React from 'react';
import { Pane, Heading, majorScale } from 'evergreen-ui';
import PropTypes from 'prop-types';
import ColumnList from './ColumnList';

const EditPanel = ({ columnSettings }) => {
  return (
    <Pane flex={1} background="tint2" border="default" borderTop="muted">
      <Pane>
        <Heading size={600} color="blue" marginTop={majorScale(2)}>
          Edit Panel
        </Heading>
        <ColumnList columnSettings={columnSettings} />
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
      isSelected: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default EditPanel;
