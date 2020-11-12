import React from 'react';
import { Pane, Table } from 'evergreen-ui';
import customerData from '../dataSource/customerData';

const ViewTable = () => {
  const columnList = Object.keys(customerData[0]);

  return (
    <Pane flex={3} background="tint1">
      <Table>
        <Table.Head>
          {columnList.map((column) => (
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

export default ViewTable;
