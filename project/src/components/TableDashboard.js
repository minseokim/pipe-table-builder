/* eslint-disable no-param-reassign */
import { Pane } from 'evergreen-ui';
import PropTypes from 'prop-types';
import React from 'react';
import EditPanel from './EditPanel';
import ViewTable from './ViewTable';

const TableDashboard = ({
  columnSettings,
  customerDataList,
  onColumnToggle,
  onApplyFilter,
}) => {
  return (
    <Pane display="flex" background="tint2">
      <EditPanel
        columnSettings={columnSettings}
        onColumnToggle={onColumnToggle}
        onApplyFilter={onApplyFilter}
      />
      <ViewTable
        columnSettings={columnSettings}
        customerDataList={customerDataList}
      />
    </Pane>
  );
};

TableDashboard.propTypes = {
  customerDataList: PropTypes.arrayOf(
    PropTypes.shape({
      customerName: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      syncedFrom: PropTypes.string,
      startDate: PropTypes.string,
      mrr: PropTypes.number,
      termLength: PropTypes.number,
      invoiceNo: PropTypes.number,
    }).isRequired
  ).isRequired,
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

export default TableDashboard;
