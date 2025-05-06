import React from 'react';
import styles from './AdminMenuPage.module.css';

import AdminMenuItem from './AdminMenuItem/AdminMenuItem';


import { useNavigate } from 'react-router-dom';

//useNavigate vs Link 

function AdminMenuPage({ onLogout }) {
  const navigate = useNavigate();

  // --- hành động ---
  const goToSafetyReport = () => navigate('/safety'); // Điều hướng đến trang safety
  const goToSafetyList = () => navigate('/safetylist'); // ĐH đến trang safetylist
  const goToEmployeeList = () => navigate('/employees'); // ĐH đến trang  employees
  const goToAddEmployee = () => navigate('/add-employee');
  // ĐH đến trang ...................
  const goToDeleteReports = () => navigate('/delete-employee');
  // ĐH đến trang ...................

  return (
    <div className={styles.page}>
      {/* Header */}



      {/* ///////////////////////////////////////////////// */}

      <main className={styles.mainContent}>



        {/* ////////////////////////////////////////////////////// */}

        {/* Container để chứa các card menu */}
        <div className={styles.menuContainer}>





          {/* Card 1 */}
          <AdminMenuItem
            title="安否登録"
            description="自分の安否情報を登録します"
            buttonText="安否登録"
            onClick={goToSafetyReport}
            buttonVariant="primary" // Mặc định
          />

          {/* Card 2 */}
          <AdminMenuItem
            title="安否一覧"
            description="全社員の安否情報を確認します"
            buttonText="安否一覧"
            onClick={goToSafetyList}
            buttonVariant="primary"
          />

          {/* Card 3*/}
          <AdminMenuItem
            title="社員一覧"
            description="社員の情報を確認します"
            buttonText="社員一覧"
            onClick={goToEmployeeList}
            buttonVariant="primary"
          />

          {/* Card 4*/}
          <AdminMenuItem
            title="新入社員登録"
            description="新しい社員を登録します"
            buttonText="新入社員登録"
            onClick={goToAddEmployee}
            buttonVariant="primary"
          />

          {/* Card 5*/}
          <AdminMenuItem
            title="安否情報削除"
            description="安否情報のバックアップと削除を行います"
            buttonText="安否情報削除"
            onClick={goToDeleteReports}
            buttonVariant="danger" // 
          />

        </div>
      </main>
    </div>
  );
}

export default AdminMenuPage;