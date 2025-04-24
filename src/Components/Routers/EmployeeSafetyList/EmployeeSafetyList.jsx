import React, { useState, useEffect, useMemo } from 'react';
import styles from './EmployeeSafetyList.module.css';
import Header from '../../Common/Header/Header';
import SafetyListTable from './SafetyListTable/SafetyListTable';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Icons
import EmployeeDetailModal from '../../Morals/EmployeeDetailModal/EmployeeDetailModal';
// --- TEST ---
import { MOCK_EMPLOYEES } from '../../Misc/DATA/data.js'; 

function EmployeeSafetyList({ onLogout }) {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // --- State cho Modal ---
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State quản lý hiển thị modal
    const [selectedEmployeeData, setSelectedEmployeeData] = useState(null); // State lưu dữ liệu nhân viên đang xem

    useEffect(() => {
        setEmployees(MOCK_EMPLOYEES);
    }, []);

    const filteredEmployees = useMemo(() => {
        return employees.filter(emp => {
            const statusMatch = statusFilter === 'all' || emp.status === statusFilter;
            const term = searchTerm.toLowerCase();
            const searchMatch = !term ||
                emp.id.toLowerCase().includes(term) ||
                emp.name.toLowerCase().includes(term);
            return statusMatch && searchMatch;
        });
    }, [employees, searchTerm, statusFilter]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // --- OPEN Modal ---
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
            <Header showLogout={true} onLogout={onLogout} />

            <main className={styles.mainContent}>
                <div className={styles.contentContainer}> {/* Container trắng bao ngoài */}
                    <h2 className={styles.pageTitle}>安否一覧</h2>

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

                        {/* Status Filter Dropdown */}
                        <div className={styles.filterGroup}>
                            <label htmlFor="statusFilter" className={styles.filterLabel}>安否状況</label>
                            <div className={styles.selectWrapper} onClick={toggleDropdown}>
                                <select
                                    id="statusFilter"
                                    className={styles.selectInput}
                                    value={statusFilter}
                                    onChange={handleFilterChange}
                                >
                                    <option value="all">全て表示</option>
                                    <option value="safe">安全</option>
                                    <option value="danger">危険</option>
                                    <option value="unanswered">未登録</option>
                                </select>
                                {isDropdownOpen ? (<FiChevronUp className={styles.selectArrow} />) : (<FiChevronDown className={styles.selectArrow} />)}
                            </div>
                        </div>
                    </div>

                    {/* Bảng dữ liệu */}
                    <SafetyListTable employees={filteredEmployees} onViewDetails={handleViewDetails} />

                </div>
            </main><EmployeeDetailModal
                isOpen={isDetailModalOpen}
                onClose={handleCloseDetailModal}
                employeeData={selectedEmployeeData}
            />
        </div>
    );
}

export default EmployeeSafetyList;