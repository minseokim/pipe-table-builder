import {
  Button,
  Dialog,
  Heading,
  Label,
  majorScale,
  Pane,
  Textarea,
} from 'evergreen-ui';
import React, { useState } from 'react';

const IMPORT_BUTTON_COPY = `Import Table Config`;

const Header = () => {
  const [showImportDialog, setShowImportDialog] = useState(false);

  const handleImportClick = () => {
    setShowImportDialog(true);
  };
  const handleExportClick = () => {
    // Copy settings to clipboard
  };

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
        <Dialog
          isShown={showImportDialog}
          title="Dialog title"
          onCloseComplete={() => {
            setShowImportDialog(false);
          }}
          confirmLabel={IMPORT_BUTTON_COPY}
        >
          <Label htmlFor="json-area" marginBottom={4} display="block">
            Import Table Settings
          </Label>
          <Textarea id="json-area" placeholder="Paste JSON Config Here" />
        </Dialog>
        <Button onClick={handleImportClick}> Import </Button>
        <Button onClick={handleExportClick}> Export </Button>
      </Pane>
    </Pane>
  );
};

export default Header;
