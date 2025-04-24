import React from 'react';
import styles from './StatusBadge.module.css';


const statusMap = {
  safe: { text: '安全', className: styles.safe },
  danger: { text: '危険', className: styles.danger },
  unanswered: { text: '未登録', className: styles.unanswered },
 
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