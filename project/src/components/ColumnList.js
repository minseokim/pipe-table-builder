import React from 'react';
import { Pane, UnorderedList } from 'evergreen-ui';
import PropTypes from 'prop-types';
import Column from './Column';

const ColumnList = ({ columnSettings, onApplyFilter, onColumnToggle }) => {
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
              shouldDisplay={columnSetting.shouldDisplay}
              onApplyFilter={onApplyFilter}
              onColumnToggle={onColumnToggle}
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
      shouldDisplay: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  onColumnToggle: PropTypes.func.isRequired,
};

export default ColumnList;
