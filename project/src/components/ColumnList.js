import { majorScale, Pane, UnorderedList } from 'evergreen-ui';
import PropTypes from 'prop-types';
import React from 'react';
import Column from './Column';

const ColumnList = ({ columnSettings, onApplyFilter, onColumnToggle }) => {
  const columnIDList = Object.keys(columnSettings);

  return (
    <Pane width="100%">
      <UnorderedList marginLeft={0} paddingLeft={majorScale(1)}>
        {columnIDList.map((columnID) => {
          const columnSetting = columnSettings[columnID];

          return (
            <Column
              key={columnSetting.id}
              id={columnSetting.id}
              name={columnSetting.name}
              isFilterable={columnSetting.isFilterable}
              shouldDisplay={columnSetting.shouldDisplay}
              filterOperator={columnSetting.filterOperator}
              filterAmount={columnSetting.filterAmount}
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
