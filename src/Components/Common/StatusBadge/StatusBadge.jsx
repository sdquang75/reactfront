import React from 'react';
import styles from './StatusBadge.module.css';


const statusMap = {
  '安全': { text: '安全', className: styles.safe },
  '危険': { text: '危険', className: styles.danger },
  '未登録': { text: '未登録', className: styles.unanswered },
};

function StatusBadge({ status }) {
 
  const displayInfo = statusMap[status] || { text: status || 'N/A', className: styles.unknown };

  return (
    <span className={`${styles.badgeBase} ${displayInfo.className}`}>
      {displayInfo.text}
    </span>
  );
}

export default StatusBadge;