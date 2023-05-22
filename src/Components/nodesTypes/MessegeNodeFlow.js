import React from 'react';
import styles from './MessegeNodeFlow.module.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { style } from '@mui/system';
import { Handle, Position } from 'reactflow';
export default function MessegeNode({
  data,
  isConnectable,
  id,
  selected,
  setSelectedNode,
}) {
  return (
    <div
      className={styles.container}
      style={{ border: selected ? 'solid 2px #a5a2d0' : '' }}
      onClick={() => data?.setSelectedNode && data?.setSelectedNode(id)}
    >
      <Handle
        type='target'
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <div className={styles.messege_header}>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <div>
            <MessageOutlinedIcon style={{ height: '1rem', width: '1rem' }} />
          </div>
          <p className={styles.messege_text}>Send Messege</p>
        </div>
      </div>
      <div className={styles.messege_content}>
        <p>{data.label}</p>
      </div>
    </div>
  );
}
