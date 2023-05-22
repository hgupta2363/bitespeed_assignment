import React from 'react';
import styles from './Header.module.css';
export default function Header({ onSaveChanges, disable }) {
  return (
    <div className={styles.container}>
      <div className={styles.save_button_container}>
        <button
          className={styles.save_button}
          onClick={() => onSaveChanges()}
          style={{ opacity: disable ? 0.4 : 1 }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
