import React from 'react';
import styles from './SafetyListItem.module.css';
import StatusBadge from '../../../Common/StatusBadge/StatusBadge'; 
import { FiInfo } from 'react-icons/fi'; 



function SafetyListItem({ employee, onViewDetails }) {
    if (!employee) {
      return null;
    }
  
    const handleDetailButtonClick = () => {
      
      if (onViewDetails) { 
          onViewDetails(employee);
      } else {
          
      }
    };
  
  return (
    <div className={styles.itemRow}>
      <span className={`${styles.cell} ${styles.employeeId}`}>{employee.emp_no || 'N/A'}</span>
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