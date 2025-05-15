
import React, { useState, useEffect, useMemo } from 'react';
import styles from './AdminEmployeeListPage.module.css';
import AdminEmployeeTable from './AdminEmployeeTable/AdminEmployeeTable';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import AdminEmployeeEditModal from '../../Morals/AdminEmployeeEditModal/AdminEmployeeEditModal';
import AdminEmployeeDetailModal from '../../Morals/AdminEmployeeDetailModal/AdminEmployeeDetailModal';





function AdminEmployeeListPage({ currentUser, onCurrentUserProfileUpdate }) {
  console.log(currentUser);
  const [employees, setEmployees] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]); // Lưu trữ [{dpt_no, department_name}]
  const [departmentOptionsForFilter, setDepartmentOptionsForFilter] = useState(['全て表示']); // Chỉ tên phòng ban cho select

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('全て表示');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const handleOpenAdminEditModal = (employee) => {
    console.log('AdminListPage - Opening Edit Modal for employee:', JSON.stringify(employee, null, 2)); // Log chi tiết employee
    if (!employee || typeof employee.emp_no === 'undefined' || String(employee.emp_no).trim() === '') {
      console.error('AdminListPage - ERROR: Attempting to edit employee with invalid or missing emp_no.');
      alert('選択された社員の社員番号が無効です。');
      return;
    }
    setEmployeeToEdit(employee);
    setIsEditModalOpen(true);
  };
  const handleAdminDataUpdated = () => {
    console.log('Data updated by admin, refetching list...');
    fetchAdminPageData(); // Gọi lại hàm fetch chính
  };
  const handleCloseAdminEditModal = () => {
    setIsEditModalOpen(false);
    setEmployeeToEdit(null);
  };
  const handleAdminEmployeeHardDeleted = (deletedEmpNo) => {
    console.log('AdminListPage: Employee HARD DELETED, emp_no:', deletedEmpNo);
    fetchAdminPageData();
    if (selectedEmployeeData && String(selectedEmployeeData.emp_no) === String(deletedEmpNo)) {
      setSelectedEmployeeData(null);
      setIsDetailModalOpen(false);
    }
  };
  const handleAdminEmployeeUpdate = async (updatedEmployeeDataFromApi) => {
    console.log('AdminListPage: Employee data updated by admin:', updatedEmployeeDataFromApi);
    // 

    setIsEditModalOpen(false);
    await fetchAdminPageData
    ;


    if (selectedEmployeeData && selectedEmployeeData.emp_no === updatedEmployeeDataFromApi.emp_no) {
      fetchAdminPageData(); setSelectedEmployeeData(prevSelected => ({
        ...prevSelected,
        ...updatedEmployeeDataFromApi // Ghi đè với dữ liệu từ API update
      }));

    } if (currentUser && currentUser.emp_no === updatedEmployeeDataFromApi.emp_no && typeof onCurrentUserProfileUpdate === 'function') {
      console.log('AdminListPage: Current user (admin) profile was updated. Calling global update.');
      onCurrentUserProfileUpdate(updatedEmployeeDataFromApi); // Gọi hàm callback từ App.js
    }
    setIsEditModalOpen(false); // Đóng edit modal
  };


  const fetchAdminPageData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Gọi API 
      const response = await fetch('http://localhost/PHP1/get_all_employees_details.php');
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.error || `${errorMessage} - ${errorText.substring(0, 100)}`;
        } catch (parseError) {
          errorMessage = `${errorMessage} - ${errorText.substring(0, 100)}`;
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

  const newEmployeesList = data.employees || [];
    setEmployees(newEmployeesList); // Cập nhật danh sách nhân viên tổng thể

    // QUAN TRỌNG: Cập nhật selectedEmployeeData nếu DetailModal đang mở
    if (selectedEmployeeData && isDetailModalOpen) {
      const refreshedSelectedEmployee = newEmployeesList.find(
        emp => String(emp.emp_no) === String(selectedEmployeeData.emp_no)
      );

      if (refreshedSelectedEmployee) {
        console.log('AdminListPage: Refreshing selectedEmployeeData in DetailModal. New data:', refreshedSelectedEmployee);
        // ĐẢM BẢO DỮ LIỆU MỚI (BAO GỒM PASSWORD) ĐƯỢC ĐẶT VÀO SELECTEDEMPLOYEEDATA
        setSelectedEmployeeData(refreshedSelectedEmployee); 
      } else {
        console.log('AdminListPage: Selected employee not found in new list after fetch, closing DetailModal.');
        setSelectedEmployeeData(null);
        setIsDetailModalOpen(false);
      }
    }

      const deptsFromApi = data.departments || [];
      setAllDepartments([{ dpt_no: 'all', department_name: '全て表示' }, ...deptsFromApi]);
      setDepartmentOptionsForFilter(['全て表示', ...deptsFromApi.map(d => d.dpname)]);

    } catch (err) {
      console.error("Failed to fetch admin page data:", err);
      setError(err.message);
      setEmployees([]);
      setDepartmentOptionsForFilter(['全て表示']);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminPageData();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {

      const departmentMatch = departmentFilter === '全て表示' || emp.dpname === departmentFilter;
      const term = searchTerm.trim().toLowerCase();


      const empNoString = String(emp.emp_no || '').toLowerCase();
      const nameString = String(emp.name || '').toLowerCase(); // hoặc emp.ename

      const searchMatch = !term ||
        empNoString.includes(term) ||
        nameString.includes(term);
      return departmentMatch && searchMatch;
    });
  }, [employees, searchTerm, departmentFilter]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleFilterChange = (event) => setDepartmentFilter(event.target.value);
  const toggleDeptDropdown = () => setIsDeptDropdownOpen(!isDeptDropdownOpen);

  const handleViewDetails = (employee) => {

    // const detailData = {
    //   EMP_NO: employee.emp_no,
    //   ENAME: employee.name, // or employee.ename
    //   DPT_NO: employee.dpt_no,
    //   DPNAME: employee.dpname, // or employee.department_name
    //   MGR_NO: employee.mgr_no,
    //   MANAGER_NAME: employee.manager_name,
    //   TEL: employee.tel,
    //   PASSWORD: employee.password,
    //   POSITION: employee.position
    // };
    // setSelectedEmployeeData(detailData);
    setSelectedEmployeeData(employee);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEmployeeData(null);
  };

  if (isLoading) return <div className={styles.loadingMessage}>データを読み込んでいます...</div>;
  if (error) return <div className={styles.errorMessage}>エラー: {error}</div>;

  return (
    <div className={styles.page}>
      {/* <BackButton /> */}
      <main className={styles.mainContent}>
        <div className={styles.contentContainer}>
          <h2 className={styles.pageTitle}>社員一覧</h2>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="search" className={styles.filterLabel}>検索</label>
              <div className={styles.searchInputWrapper}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text" id="search" placeholder="社員番号または氏名で検索"
                  className={styles.searchInput} value={searchTerm} onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className={styles.filterGroup}>
              <label htmlFor="departmentFilter" className={styles.filterLabel}>部門</label>
              <div className={styles.selectWrapper} onClick={toggleDeptDropdown}>
                <select
                  id="departmentFilter" className={styles.selectInput}
                  value={departmentFilter} onChange={handleFilterChange}
                >
                  {departmentOptionsForFilter.map(deptName => (
                    <option key={deptName} value={deptName}>{deptName}</option>
                  ))}
                </select>
                {isDeptDropdownOpen ? <FiChevronUp className={styles.selectArrow} /> : <FiChevronDown className={styles.selectArrow} />}
              </div>
            </div>
          </div>
          {/* Truyền employees đã được filter cho AdminEmployeeTable */}
          <AdminEmployeeTable employees={filteredEmployees} onViewDetails={handleViewDetails} />
        </div>
      </main>
      {/* SỬ DỤNG AdminEmployeeDetailModal */}
      <AdminEmployeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        employeeData={selectedEmployeeData}
        currentUser={currentUser}
        onEditEmployee={handleOpenAdminEditModal}
        onEmployeeActionCompleted={(actionInfo) => {
          if (actionInfo.type === 'delete') {
            handleAdminEmployeeHardDeleted(actionInfo.emp_no);
          }

        }}
      />
      {employeeToEdit && (
        <AdminEmployeeEditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseAdminEditModal}
          onSave={handleAdminEmployeeUpdate}
          employeeData={employeeToEdit}
          departments={allDepartments.filter(d => d.DPT_NO !== 'all')}
          //  departments={allDepartments.filter(d => d.dpt_no !== 'all')} // API trả về dpt_no
          allEmployees={employees}
          currentUser={currentUser}
        />
      )}
    </div>
  );
}
export default AdminEmployeeListPage;