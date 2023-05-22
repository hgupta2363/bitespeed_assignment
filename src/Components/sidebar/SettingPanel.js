import React from 'react';
import styles from './SettingPanel.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function SettingPanel({
  addTextOnSelectedNode,
  onBackSettings,
  selectedNodeText,
}) {
  console.log(selectedNodeText);
  return (
    <div>
      <div className={styles.header}>
        <div style={{ cursor: 'pointer' }} onClick={() => onBackSettings()}>
          <ArrowBackIcon
            style={{ width: '20px', height: '20px', color: 'black' }}
          />
        </div>
        <p className={styles.heder_text}>Messege</p>
      </div>
      <div className={styles.messege_box}>
        <p>Text</p>
        <div>
          <input
            placeholder='write node text'
            className={styles.msg_input}
            style={{ maxWidth: '230px' }}
            onChange={(e) => addTextOnSelectedNode(e.target.value)}
            value={selectedNodeText}
          />
        </div>
      </div>
    </div>
  );
}
