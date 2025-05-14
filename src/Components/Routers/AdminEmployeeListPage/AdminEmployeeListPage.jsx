import React, { useState, useEffect, useMemo } from 'react';
import styles from './AdminEmployeeListPage.module.css';

import AdminEmployeeTable from './AdminEmployeeTable/AdminEmployeeTable';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import EmployeeDetailModal from '../../Morals/EmployeeDetailModal/EmployeeDetailModal';

// --- TEST  ---



import { MOCK_EMPLOYEES, MOCK_DEPARTMENTS } from '../../Misc/DATA/data.js';
import BackButton from '../../Misc/BackButton/BackButton.jsx';




// --- Component  ---
function AdminEmployeeListPage() {

  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [departmentFilter, setDepartmentFilter] = useState('全て表示');
  const [departments, setDepartments] = useState([]);
  // --- State cho Modal ---
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State quản lý hiển thị modal
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null); // State lưu dữ liệu nhân viên đang xem




  // Fetch DATA
  useEffect(() => {

    setEmployees(MOCK_EMPLOYEES);
    setDepartments(MOCK_DEPARTMENTS);

  }, []);

  // FILTER
  ///////////////////////////////////////////////////////////////
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {

      const departmentMatch = departmentFilter === '全て表示' || emp.department === departmentFilter;

      const term = searchTerm.trim().toLowerCase();
      const searchMatch = !term ||
        emp.id.toLowerCase().includes(term) ||
        emp.name.toLowerCase().includes(term);
      return departmentMatch && searchMatch;
    });
  }, [employees, searchTerm, departmentFilter]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleFilterChange = (event) => {
    setDepartmentFilter(event.target.value);
  };

  ////////////////////////////////////////////////////
  const handleViewDetails = (employee) => {
    setSelectedEmployeeData(employee); // Lưu dữ liệu nhân viên được chọn
    setIsDetailModalOpen(true);       // Mở modal
  };

  // --- Hàm xử lý đóng Modal ---
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);      // Đóng modal
    setSelectedEmployeeData(null);    // Reset dữ liệu nhân viên
  };





  return (
    <div className={styles.page}>
     {/* <BackButton/> */}

      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          {/* Title của trang */}
          <h2 className={styles.pageTitle}>社員一覧</h2>

          {/* Phần Filters */}
          <div className={styles.filters}>
            {/* Search Input */}
            <div className={styles.filterGroup}>
              <label htmlFor="search" className={styles.filterLabel}>検索</label>
              <div className={styles.searchInputWrapper}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  id="search"
                  placeholder="社員番号または氏名で検索"
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Department Filter Dropdown */}
            <div className={styles.filterGroup}>
              {/* Sửa label */}
              <label htmlFor="departmentFilter" className={styles.filterLabel}>部門</label>
              <div className={styles.selectWrapper}>
                <select
                  id="departmentFilter"
                  className={styles.selectInput}
                  value={departmentFilter}
                  onChange={handleFilterChange} // Dùng hàm mới
                >
                  {/* Tạo options từ state departments */}
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <FiChevronDown className={styles.selectArrow} />
              </div>
            </div>
          </div>

          {/* Bảng dữ liệu nhân viên */}
          <AdminEmployeeTable employees={filteredEmployees} onViewDetails={handleViewDetails} />

        </div>
      </main><EmployeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        employeeData={selectedEmployeeData}
      />

    </div>
  );
}

export default AdminEmployeeListPage;