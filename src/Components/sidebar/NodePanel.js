import React from 'react';
import styles from './NodePanel.module.css';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { nodeTypes } from '../../constants';
export default function NodePanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <div className={styles.conatiner}>
      <div
        className={styles.messege_container}
        onDragStart={(e) => onDragStart(e, nodeTypes.messegeNode)}
        draggable
      >
        <MessageOutlinedIcon
          style={{ width: '30px', height: '30px', color: '#7e8bd5' }}
        />
        <p className={styles.messege_text}>messege</p>
      </div>
    </div>
  );
}
