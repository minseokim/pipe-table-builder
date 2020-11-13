import React from 'react';
import { Pane, Table } from 'evergreen-ui';
import PropTypes from 'prop-types';

const ViewTable = ({ columnSettings, customerData }) => {
  const selectedColumnList = Object.keys(columnSettings).filter(
    (columnName) => columnSettings[columnName].shouldDisplay
  );

  return (
    <Pane flex={3} background="tint1">
      <Table>
        <Table.Head>
          {selectedColumnList.map((column) => (
            <Table.TextHeaderCell key={column}>{column}</Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.VirtualBody height={240}>
          {customerData.map((customerName) => {
            return (
              <Table.Row key={customerName.invoiceNo}>
                <Table.TextCell>{customerName.customerName}</Table.TextCell>
                <Table.TextCell>{customerName.status}</Table.TextCell>
                <Table.TextCell>{customerName.syncedFrom}</Table.TextCell>
                <Table.TextCell>{customerName.startDate}</Table.TextCell>
                <Table.TextCell>{customerName.mrr}</Table.TextCell>
                <Table.TextCell>{customerName.termLength}</Table.TextCell>
                <Table.TextCell>{customerName.invoiceNo}</Table.TextCell>
              </Table.Row>
            );
          })}
        </Table.VirtualBody>
      </Table>
    </Pane>
  );
};

ViewTable.propTypes = {
  customerData: PropTypes.arrayOf(
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
