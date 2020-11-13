import React from 'react';
import { Pane, Table } from 'evergreen-ui';
import PropTypes from 'prop-types';
import {
  NO_OPERATOR_SELECTED,
  GREATER_THAN,
  LESS_THAN,
  EQUAL_TO,
  NOT_EQUAL_TO,
} from './FilterPopover';

const ViewTable = ({ columnSettings, customerDataList }) => {
  const columnNameList = Object.keys(columnSettings);
  const selectedColumnList = columnNameList.filter(
    (columnName) => columnSettings[columnName].shouldDisplay
  );

  const filterList = selectedColumnList.filter(
    (columnName) => columnSettings[columnName].filterOperator
  );

  const applyFilters = (customerData) =>
    filterList.every((filterName) => {
      const rowValue = customerData[filterName];
      const { filterOperator, filterAmount } = columnSettings[filterName];

      switch (filterOperator) {
        case NO_OPERATOR_SELECTED:
          return true;
        case GREATER_THAN:
          return rowValue > filterAmount;
        case LESS_THAN:
          return rowValue < filterAmount;
        case EQUAL_TO:
          return rowValue === filterAmount;
        case NOT_EQUAL_TO:
          return rowValue !== filterAmount;
        default:
          return true;
      }
    });

  return (
    <Pane flex={3} background="tint1">
      <Table>
        <Table.Head>
          {selectedColumnList.map((column) => (
            <Table.TextHeaderCell key={column}>{column}</Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.VirtualBody allowAutoHeight height={600}>
          {customerDataList.filter(applyFilters).map((customerData) => {
            return (
              <Table.Row key={customerData.invoiceNo}>
                {selectedColumnList.map((columnKey) => (
                  <Table.TextCell key={columnKey}>
                    {customerData[columnKey]}
                  </Table.TextCell>
                ))}
              </Table.Row>
            );
          })}
        </Table.VirtualBody>
      </Table>
    </Pane>
  );
};

ViewTable.propTypes = {
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
};

export default ViewTable;
