import React from 'react';
import { Pane, Heading, majorScale } from 'evergreen-ui';
import ColumnList from './ColumnList';

const EditPanel = () => {
  return (
    <Pane flex={1} background="tint2" border="default" borderTop="muted">
      <Pane>
        <Heading size={600} color="blue" marginTop={majorScale(2)}>
          Edit Panel
        </Heading>
        <ColumnList />
      </Pane>
    </Pane>
  );
};

export default EditPanel;
