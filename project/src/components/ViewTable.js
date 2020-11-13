import { majorScale, minorScale, Pane, Table } from 'evergreen-ui';
import PropTypes from 'prop-types';
import React from 'react';
import {
  EQUAL_TO,
  GREATER_THAN,
  LESS_THAN,
  NOT_EQUAL_TO,
  NO_OPERATOR_SELECTED,
} from './FilterPopover';

const ViewTable = ({ columnSettings, customerDataList }) => {
  const columnIDList = Object.keys(columnSettings);
  const selectedColumnIDList = columnIDList.filter(
    (ID) => columnSettings[ID].shouldDisplay
  );
  const selectedColumnNameList = selectedColumnIDList.map(
    (ID) => columnSettings[ID].name
  );

  const filterList = selectedColumnIDList.filter(
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
        <Table.Head height={minorScale(13)}>
          {selectedColumnNameList.map((name) => (
            <Table.TextHeaderCell key={name}>{name}</Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.VirtualBody allowAutoHeight height={majorScale(100)}>
          {customerDataList.filter(applyFilters).map((customerData) => {
            return (
              <Table.Row key={customerData.invoiceNo}>
                {selectedColumnIDList.map((ID) => (
                  <Table.TextCell key={ID}>{customerData[ID]}</Table.TextCell>
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
