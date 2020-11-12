import React from 'react';
import { Pane, UnorderedList } from 'evergreen-ui';
import PropTypes from 'prop-types';
import Column from './Column';

const ColumnList = ({ columnSettings }) => {
  const columnNameList = Object.keys(columnSettings);

  return (
    <Pane>
      <UnorderedList>
        {columnNameList.map((columnName) => {
          const columnSetting = columnSettings[columnName];

          return (
            <Column
              key={columnSetting.id}
              name={columnSetting.name}
              isFilterable={columnSetting.isFilterable}
            />
          );
        })}
      </UnorderedList>
    </Pane>
  );
};

ColumnList.propTypes = {
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

export default ColumnList;
