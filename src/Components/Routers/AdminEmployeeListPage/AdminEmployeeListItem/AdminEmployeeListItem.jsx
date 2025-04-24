import React from 'react';
import styles from './AdminEmployeeListItem.module.css'; // CSS mới
import { FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function AdminEmployeeListItem({ employee, onViewDetails }) {
  const navigate = useNavigate();

  const handleDetailButtonClick = () => {
    // Gọi hàm onViewDetails được truyền từ cha, gửi toàn bộ object employee
    if (onViewDetails) { // Kiểm tra xem prop có tồn tại không
        onViewDetails(employee);
    } else {
        
    }
  };

  if (!employee) {
    return null;
  }

  return (
    <div className={styles.itemRow}>
      <span className={`${styles.cell} ${styles.employeeId}`}>{employee.id || 'N/A'}</span>
      <span className={`${styles.cell} ${styles.employeeName}`}>{employee.name || 'N/A'}</span>

        {/* ///////////////////////////////////////////// */}
      {/* Thay thế StatusBadge bằng hiển thị Department */}
      <span className={`${styles.cell} ${styles.department}`}>{employee.department || 'N/A'}</span>
      <span className={`${styles.cell} ${styles.details}`}>
      <button onClick={handleDetailButtonClick} className={styles.detailsButton}>
          <FiInfo />
        </button>
      </span>
    </div>
  );
}

export default AdminEmployeeListItem;