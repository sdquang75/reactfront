import React from 'react';
import styles from './AdminEmployeeTable.module.css'; // CSS mới
import AdminEmployeeListItem from '../AdminEmployeeListItem/AdminEmployeeListItem';

function AdminEmployeeTable({ employees = [], onViewDetails }) {
  return (
    <div className={styles.tableContainer}>
      {/* Header */}
      <div className={styles.tableHeader}>
        <span className={`${styles.headerCell} ${styles.employeeId}`}>社員番号</span>
        <span className={`${styles.headerCell} ${styles.employeeName}`}>氏名</span>


        
        {/* ///////////////////////////////////////////// */}
        {/* Thay đổi cột */}
        <span className={`${styles.headerCell} ${styles.department}`}>部署</span>
        <span className={`${styles.headerCell} ${styles.details}`}>詳細</span>
      </div>

      {/* Body của bảng */}
      <div className={styles.tableBody}>
        {employees.length > 0 ? (
          employees.map((employee) => (
            // Sử dụng AdminEmployeeListItem
            <AdminEmployeeListItem key={employee.id} employee={employee} onViewDetails={onViewDetails} />
          ))
        ) : (
          <div className={styles.noData}>表示するデータがありません。</div>
        )}
      </div>
    </div>
  );
}

export default AdminEmployeeTable;