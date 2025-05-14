import React, { useState, useEffect, useMemo,useCallback } from 'react';
import styles from './EmployeeSafetyList.module.css';

import SafetyListTable from './SafetyListTable/SafetyListTable';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Icons
import EmployeeDetailModal from '../../Morals/EmployeeDetailModal/EmployeeDetailModal';


import BackButton from '../../Misc/BackButton/BackButton.jsx';
import { ResetLocation } from '../../Misc/ResetLocation.jsx';

function EmployeeSafetyList({ currentUser }) {
    // console.log(' currentUser:', currentUser);


    
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('全て表示');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // State cho lỗi
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);





    
      const fetchEmployeesBasedOnRole = useCallback(async () => {
        if (!currentUser) {
          setError("ユーザー情報を読み込むためのデータがありません。");
          setLoading(false);
          setEmployees([]);
          return;
        }
    
        setLoading(true);
        setError(null);
        setEmployees([]); 
    
        let apiUrl = 'http://localhost/PHP1/employee_data_sheet.php';
    
        if (currentUser.role !== 'admin' && currentUser.dpt_no) {
          apiUrl += `?dpt_no=${currentUser.dpt_no}`;
        } else if (currentUser.role !== 'admin' && !currentUser.dpt_no) {
          setError("ユーザーの部品番号が不明です。データをロードできません。");
          setLoading(false);
          return;
        }
    
        console.log(` data : ${apiUrl}`);
    
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
              const errorJson = JSON.parse(errorText);
              errorMessage = errorJson.error || `${errorMessage} - ${errorText.substring(0,100)}`;
            } catch (parseError) {
              errorMessage = `${errorMessage} - ${errorText.substring(0,100)}`;
            }
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }
          if (data.message) {
            console.log('API message:', data.message);
            setEmployees([]);
          } else {
            const processedData = data.map(emp => ({
              ...emp,
              emp_no: String(emp.emp_no),
            }));
            setEmployees(processedData);
          }
        } catch (e) {
          console.error("従業員データを取得できません:", e);
          setError(e.message);
          setEmployees([]);
        } finally {
          setLoading(false);
        }
      }, [currentUser]);
    
     
      useEffect(() => {
        fetchEmployeesBasedOnRole();
      }, [fetchEmployeesBasedOnRole]);

      const handleSafetyInfoUpdated = useCallback((updatedEmployee) => {
        console.log('emp_no の安全情報が更新されました:', updatedEmployee.emp_no, 'New data:', updatedEmployee);
      
        fetchEmployeesBasedOnRole();
      }, [fetchEmployeesBasedOnRole]);


      
    const filteredEmployees = useMemo(() => {
        if (!Array.isArray(employees)) {
            return [];
        }
        return employees.filter(emp => {
            const statusMatch = statusFilter === '全て表示' || (emp && emp.status === statusFilter);
            const term = searchTerm.toLowerCase();
            const empNoString = emp && emp.emp_no ? emp.emp_no : '';
            const nameString = (emp && typeof emp.name === 'string') ? emp.name : '';
            const searchMatch = !term ||
            empNoString.toLowerCase().includes(term) ||
            nameString.toLowerCase().includes(term);

            // emp.emp_no.toLowerCase().includes(term) ||
            // emp.name.toLowerCase().includes(term);
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


    const handleViewDetails = (employee) => {
        setSelectedEmployeeData(employee);
        setIsDetailModalOpen(true);
    };


    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedEmployeeData(null);
    };


    return (
        <div className={styles.page}>
            {/* <BackButton /> */}
            <ResetLocation />

            <main className={styles.mainContent}>
                <div className={styles.contentContainer}>
                    <h2 className={styles.pageTitle}>安否一覧</h2>

                    {/*  Filters */}
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

                        {/*  Filter Dropdown */}
                        <div className={styles.filterGroup}>
                            <label htmlFor="statusFilter" className={styles.filterLabel}>安否状況</label>
                            <div className={styles.selectWrapper} onClick={toggleDropdown}>
                                <select
                                    id="statusFilter"
                                    className={styles.selectInput}
                                    value={statusFilter}
                                    onChange={handleFilterChange}
                                >
                                    <option value="全て表示">全て表示</option>
                                    <option value="安全">安全</option>
                                    <option value="危険">危険</option>
                                    <option value="未登録">未登録</option>
                                </select>
                                {isDropdownOpen ? (<FiChevronUp className={styles.selectArrow} />) : (<FiChevronDown className={styles.selectArrow} />)}
                            </div>
                        </div>
                    </div>

                    {/* TABLE*/}
                    <SafetyListTable employees={filteredEmployees} onViewDetails={handleViewDetails} />

                </div>
            </main><EmployeeDetailModal
                isOpen={isDetailModalOpen}
                onClose={handleCloseDetailModal}
                employeeData={selectedEmployeeData}
                currentUser={currentUser}
                onSafetyInfoUpdate={handleSafetyInfoUpdated}
            />
        </div>
    );
}

export default EmployeeSafetyList;