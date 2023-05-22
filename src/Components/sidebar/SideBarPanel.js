import React from 'react';
import NodePanel from './NodePanel';
import styles from './SideBarPanel.module.css';
import SettingPanel from './SettingPanel';
export default function SideBarPanel({
  isNodeSelected,
  addTextOnSelectedNode,
  onBackSettings,
  selectedNodeText,
}) {
  //if node is selected setting panel will replace node panel
  return (
    <div className={styles.container}>
      {isNodeSelected ? (
        <SettingPanel
          addTextOnSelectedNode={addTextOnSelectedNode}
          onBackSettings={onBackSettings}
          selectedNodeText={selectedNodeText}
        />
      ) : (
        <NodePanel />
      )}
    </div>
  );
}
