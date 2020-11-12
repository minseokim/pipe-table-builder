import React from 'react';
import { Pane, majorScale, Heading, Button } from 'evergreen-ui';

const Header = () => {
  return (
    <Pane
      background="tint1"
      height={majorScale(7)}
      border="default"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Pane marginLeft={majorScale(2)}>
        <Heading size={600}>Subscriptions List</Heading>
      </Pane>
      <Pane marginRight={majorScale(2)}>
        <Button> Import </Button>
        <Button> Export </Button>
      </Pane>
    </Pane>
  );
};

export default Header;
