import React from 'react';
import styles from './SafetyListTable.module.css';
import SafetyListItem from '../SafetyListItem/SafetyListItem'; // Import item

function SafetyListTable({ employees = [],onViewDetails  }) { // Default là mảng rỗng
  return (
    <div className={styles.tableContainer}>
      {/* Header của bảng */}
      <div className={styles.tableHeader}>
        <span className={`${styles.headerCell} ${styles.employeeId}`}>社員番号</span>
        <span className={`${styles.headerCell} ${styles.employeeName}`}>氏名</span>
        <span className={`${styles.headerCell} ${styles.status}`}>安否</span>
        <span className={`${styles.headerCell} ${styles.details}`}>詳細</span>
      </div>

      {/* Body của bảng */}
      <div className={styles.tableBody}>
        {employees.length > 0 ? (
          employees.map((employee) => (
            // Cần có key duy nhất khi dùng map
            <SafetyListItem key={employee.id} employee={employee} onViewDetails={onViewDetails} />
          ))
        ) : (
          // Hiển thị thông báo khi không có dữ liệu
          <div className={styles.noData}>表示するデータがありません。</div>
        )}
      </div>
    </div>
  );
}

export default SafetyListTable;