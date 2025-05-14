import React from 'react';
import styles from './AdminMenuItem.module.css';


function AdminMenuItem({ title, description, buttonText, buttonVariant = 'primary', onClick }) {


  let buttonClass = styles.actionButton;
  if (buttonVariant === 'danger') {
    buttonClass += ` ${styles.danger}`;
  } else {
    buttonClass += ` ${styles.primary}`;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <button
        type="button"
        className={buttonClass}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default AdminMenuItem;