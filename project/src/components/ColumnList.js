import React from 'react';
import { Pane, UnorderedList } from 'evergreen-ui';
import { map as _map } from 'lodash';
import Column from './Column';
import customerData from '../dataSource/customerData';

const ColumnList = () => {
  return (
    <Pane>
      <UnorderedList>
        {customerData && customerData.length
          ? _map(customerData[0], (value, key) => {
              const isFilterable = !Number.isNaN(Number(value));
              return (
                <Column
                  key={value.name}
                  name={key}
                  isFilterable={isFilterable}
                />
              );
            })
          : null}
      </UnorderedList>
    </Pane>
  );
};

export default ColumnList;
