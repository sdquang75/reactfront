import React from 'react';
import styles from './AdminMenuItem.module.css';

// Component này nhận props để hiển thị nội dung và xử lý hành động
function AdminMenuItem({ title, description, buttonText, buttonVariant = 'primary', onClick }) {

  // Xác định class cho button dựa trên variant
  let buttonClass = styles.actionButton;
  if (buttonVariant === 'danger') {
    buttonClass += ` ${styles.danger}`; // Thêm class danger nếu variant là 'danger'
  } else {
    buttonClass += ` ${styles.primary}`; // Mặc định là primary
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <button
        type="button" // Là button thường, không submit form
        className={buttonClass}
        onClick={onClick} // Gọi hàm được truyền từ component cha
      >
        {buttonText}
      </button>
    </div>
  );
}

export default AdminMenuItem;