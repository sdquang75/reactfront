import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import Header from '../../Common/Header/Header';
function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Employee ID:', employeeId);
    console.log('Password:', password);
    // LOGIN ここ
  };

  return (
    <div className={styles.page}>
     <Header showLogout={false}/>

      <main className={styles.mainContent}>
        {/* Title o ben ngoai con */}
        <h2 className={styles.pageTitle}>ログイン画面</h2> {/* Login Screen */}

        <div className={styles.formContainer}>
          {/* Bỏ subtitle hoặc ẩn nó bằng CSS */}
          <p className={styles.pageTitlemobile}>ログイン</p>
          <p className={styles.subtitle}> 社員番号とパスワードを入力してください </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="employeeId" className={styles.label}>
                社員番号
              </label>
              <input
                type="text"
                id="employeeId"
                className={styles.input}
                placeholder=""
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                パスワード
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Link to="/safety">
              <button type="submit" className={styles.button}>
                ログイン
              </button></Link>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;