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
import { ColumnSettings } from '../../typeDefs';

const IMPORT_BUTTON_COPY = `Import Table Config`;

interface HeaderProps {
  onImportConfig: (columnSettings: ColumnSettings) => void;
  onExportConfig: () => void;
}

export const Header = ({
  onImportConfig,
  onExportConfig,
}: HeaderProps): JSX.Element => {
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importedJSONConfig, setImportedJSONConfig] = useState<string | null>(
    null
  );

  const handleImportConfig = () => {
    setShowImportDialog(false);
    if (importedJSONConfig) {
      // Validate JSON here
      onImportConfig(JSON.parse(importedJSONConfig));
    }
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
        <Heading size={400}>Subscriptions List</Heading>
      </Pane>

      {/* Import Dialog */}
      <Pane marginRight={majorScale(2)}>
        <Dialog
          isShown={showImportDialog}
          title="Import Table Settings"
          onCloseComplete={handleImportConfig}
          confirmLabel={IMPORT_BUTTON_COPY}
        >
          <Label htmlFor="json-config" marginBottom={4} display="block">
            Import Table Settings
          </Label>
          <Textarea
            id="json-config"
            placeholder="Paste JSON Config Here"
            onChange={({
              target: { value },
            }: {
              target: { value: string };
            }) => {
              setImportedJSONConfig(value);
            }}
            height={250}
          />
        </Dialog>
        <Button
          onClick={() => setShowImportDialog(true)}
          marginRight={majorScale(2)}
        >
          {' '}
          Import{' '}
        </Button>
        <Button onClick={onExportConfig}> Export </Button>
      </Pane>
    </Pane>
  );
};
