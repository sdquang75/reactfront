import React, { useState } from 'react';
import styles from './AdminDeletePage.module.css';
import Header from '../../Common/Header/Header';
import BackButton from '../../Misc/BackButton/BackButton';
import DeleteAnpiConfirmModal from '../../Morals/DeleteConfirmModal/DeleteAnpiConfirmModal';
import { FiX, FiAlertTriangle } from 'react-icons/fi';
function AdminDeletePage() {
    const [isBackedUp, setIsBackedUp] = useState(false);
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false); // State modal
    const [backupError, setBackupError] = useState('');
    const [deleteError, setDeleteError] = useState('');

    const BACKUP_API_URL = 'http://localhost/PHP1/backup_data_csv.php';
    const RESET_SAFETY_TABLE_API_URL = 'http://localhost/PHP1/reset_safety_table.php';


    //  Backup
    const handleBackup = () => {
        setIsBackingUp(true);
        setIsBackingUp(true);
        setBackupError('');
        console.log("Starting backup process...");
        // 
        try {
            window.location.href = BACKUP_API_URL;
            setIsBackedUp(true);
            
            setTimeout(() => {
                setIsBackingUp(false);
                 alert("バックアップが正常に取得されました。");
            }, 1300);

        } catch (error) {
            console.error("Error initiating backup:", error);
            setBackupError("バックアップの開始中にエラーが発生しました。");
            alert("バックアップの開始中にエラーが発生しました。コンソールを確認してください。");
            setIsBackingUp(false);
        }
    };

    // Hàm mở Modal xác nhận xóa
    const handleOpenDeleteConfirm = () => {
        // Chỉ cho mở modal nếu đã backup thành công
        if (!isBackedUp) {
            alert("安否情報を削除する前にバックアップを取得してください。");
            return;
        }
        setDeleteError('');
        setIsConfirmDeleteModalOpen(true);
    };

    // Hàm đóng Modal xác nhận xóa
    const handleCloseDeleteConfirm = () => {
        setIsConfirmDeleteModalOpen(false);
    };

    // Hàm xử lý khi xác nhận XÓA trong modal
    const handleConfirmDelete = async () => {
        handleCloseDeleteConfirm(); // Đóng modal
        setIsDeleting(true);
        setDeleteError('');
        console.log("Starting delete process...");
        // --- !!! Logic   API  !!! ---
        try {
            const response = await fetch(RESET_SAFETY_TABLE_API_URL, {
                method: 'POST',
              
            });

            // Kiểm tra xem response có phải là JSON không trước khi parse
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                let errorMessage = `サーバーエラー: ${response.status}`;
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || JSON.stringify(errorData);
                } else {
                    errorMessage = await response.text();
                }
                throw new Error(errorMessage);
            }

            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.message || "APIからエラーが返されました。");
                }
                console.log("Deletion successful!", data);
                alert(data.message || "安否情報が正常にリセットされました。");
                setIsBackedUp(false); // Yêu cầu backup lại nếu muốn thực hiện lại
            } else {
                // Nếu response không phải JSON nhưng vẫn OK (ít gặp với API này)
                console.log("Deletion request was OK, but no JSON response.");
                alert("安否情報のリセットが要求されましたが、サーバーからの応答形式が予期せぬものです。");
            }

        } catch (error) {
            console.error("Deletion failed:", error);
            setDeleteError(`削除に失敗しました: ${error.message}`);
            alert(`削除に失敗しました: ${error.message}`);
        } finally {
            setIsDeleting(false);
        }
    };
    return (
        <div className={styles.page}>

            {/* <BackButton /> */}

            <main className={styles.mainContent}>
                <div className={styles.contentContainer}>
                    <h2 className={styles.pageTitle}>安否情報の削除</h2>
                    <p className={styles.instructions}>
                        安否情報を削除する前に、必ずバックアップを取得してください。
                    </p>


                    <div className={styles.procedureBox}>
                        <h4>操作手順</h4>
                        <ol className={styles.steps}>
                            <li>「バックアップを取得」ボタンをクリックして、現在の安否情報をバックアップします。</li>
                            <li>バックアップが完了したら、「削除する」ボタンをクリックします。</li>
                            <li>確認ダイアログで「削除する」ボタンをクリックすると、安否情報が削除されます。</li>
                        </ol>
                    </div>

                    {/* Nút Backup */}
                    <button
                        onClick={handleBackup}
                        className={`${styles.actionButton} ${styles.backupButton}`}
                        disabled={isBackingUp || isDeleting}
                    >
                        {isBackingUp ? '処理中...' : 'バックアップの取得'}
                    </button>


                    <div className={styles.warningBox}>
                        <p>
                            <FiAlertTriangle className={styles.warningIconInline} />
                            安否情報を削除すると、すべての社員の安否情報がリセットされます。
                            この操作は取り消せません。必ずバックアップを取得してから実行してください。
                        </p>
                    </div>


                    <button
                        onClick={handleOpenDeleteConfirm}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        disabled={!isBackedUp || isDeleting || isBackingUp}
                    >
                        {isDeleting ? '処理中...' : '削除する'}
                    </button>

                </div>
            </main>


            <DeleteAnpiConfirmModal
                isOpen={isConfirmDeleteModalOpen}
                onClose={handleCloseDeleteConfirm}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default AdminDeletePage;