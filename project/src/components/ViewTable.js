import React from 'react';
import { Pane, Table } from 'evergreen-ui';
import PropTypes from 'prop-types';

const ViewTable = ({ columnSettings, customerDataList }) => {
  const selectedColumnList = Object.keys(columnSettings).filter(
    (columnName) => columnSettings[columnName].shouldDisplay
  );

  // TODO : Apply filter logic here to every data row(customerData)
  const applyFilters = () => true;

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
