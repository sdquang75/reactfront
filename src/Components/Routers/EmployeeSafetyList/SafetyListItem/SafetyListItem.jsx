import React from 'react';
import styles from './SafetyListItem.module.css';
import StatusBadge from '../../../Common/StatusBadge/StatusBadge'; // Import badge
import { FiInfo } from 'react-icons/fi'; // Icon chi tiết ví dụ



function SafetyListItem({ employee, onViewDetails }) {
    if (!employee) {
      return null;
    }
  
    // Hàm xử lý khi click nút chi tiết
    const handleDetailButtonClick = () => {
      // Gọi hàm onViewDetails được truyền từ cha, gửi toàn bộ object employee
      if (onViewDetails) { // Kiểm tra xem prop có tồn tại không
          onViewDetails(employee);
      } else {
          
      }
    };
  
  return (
    <div className={styles.itemRow}>
      <span className={`${styles.cell} ${styles.employeeId}`}>{employee.id || 'N/A'}</span>
      <span className={`${styles.cell} ${styles.employeeName}`}>{employee.name || 'N/A'}</span>
      <span className={`${styles.cell} ${styles.status}`}>
        <StatusBadge status={employee.status} />
      </span>
      <span className={`${styles.cell} ${styles.details}`}>
      <button onClick={handleDetailButtonClick} className={styles.detailsButton}>
          <FiInfo />
        </button>
      </span>
    </div>
  );
}

export default SafetyListItem;