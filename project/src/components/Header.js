import {
  Button,
  Dialog,
  Heading,
  Label,
  majorScale,
  Pane,
  Textarea,
} from 'evergreen-ui';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const IMPORT_BUTTON_COPY = `Import Table Config`;

const Header = ({ onImportConfig, onExportConfig }) => {
  const [showImportDialog, setShowImportDialog] = useState(false);

  const [importJSONConfig, setImportJSONConfig] = useState(null);

  const handleImportConfig = () => {
    console.log('importJSONConfig :', importJSONConfig);
    setShowImportDialog(false);
    if (importJSONConfig) {
      // Validate JSON here
      onImportConfig(JSON.parse(importJSONConfig));
    }
  };
  const onExportButtonClick = () => {
    // Copy settings to clipboard
    onExportConfig();
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
          onCloseComplete={handleImportConfig}
          confirmLabel={IMPORT_BUTTON_COPY}
        >
          <Label htmlFor="json-area" marginBottom={4} display="block">
            Import Table Settings
          </Label>
          <Textarea
            id="json-area"
            placeholder="Paste JSON Config Here"
            onChange={({ target: { value } }) => {
              setImportJSONConfig(value);
            }}
          />
        </Dialog>
        <Button onClick={() => setShowImportDialog(true)}> Import </Button>
        <Button onClick={onExportButtonClick}> Export </Button>
      </Pane>
    </Pane>
  );
};

Header.propTypes = {
  onImportConfig: PropTypes.func.isRequired,
  onExportConfig: PropTypes.func.isRequired,
};

export default Header;
