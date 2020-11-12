import React from 'react';
import { ListItem } from 'evergreen-ui';
import PropTypes from 'prop-types';

const Column = ({ name, isFilterable }) => {
  return (
    <ListItem>
      {name} {isFilterable}
    </ListItem>
  );
};

Column.propTypes = {
  name: PropTypes.string.isRequired,
  isFilterable: PropTypes.bool.isRequired,
};

export default Column;
