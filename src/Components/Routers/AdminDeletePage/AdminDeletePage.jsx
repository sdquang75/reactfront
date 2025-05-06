import React, { useState } from 'react';
import styles from './AdminDeletePage.module.css';
import Header from '../../Common/Header/Header';
import BackButton from '../../Misc/BackButton/BackButton';
import DeleteConfirmModal from '../../Morals/DeleteConfirmModal/DeleteConfirmModal';
import { FiX, FiAlertTriangle } from 'react-icons/fi';
function AdminDeletePage() {
    const [isBackedUp, setIsBackedUp] = useState(false);
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false); // State modal

    //  Backup
    const handleBackup = () => {
        setIsBackingUp(true);
        console.log("Starting backup process...");
        // --- !!!  API !!! ---
        // 
        setTimeout(() => {
            console.log("Backup successful!");
            alert("バックアップが正常に取得されました。");
            setIsBackedUp(true);
            setIsBackingUp(false);
            // Có thể cung cấp link download file backup nếu API trả về
        }, 1500);
        // TODO: Xử lý trường hợp API backup thất bại
    };

    // Hàm mở Modal xác nhận xóa
    const handleOpenDeleteConfirm = () => {
        // Chỉ cho mở modal nếu đã backup thành công
        if (!isBackedUp) {
            alert("安否情報を削除する前にバックアップを取得してください。");
            return;
        }
        setIsConfirmDeleteModalOpen(true);
    };

    // Hàm đóng Modal xác nhận xóa
    const handleCloseDeleteConfirm = () => {
        setIsConfirmDeleteModalOpen(false);
    };

    // Hàm xử lý khi xác nhận XÓA trong modal
    const handleConfirmDelete = () => {
        handleCloseDeleteConfirm(); // Đóng modal trước
        setIsDeleting(true);
        console.log("Starting delete process...");
        // --- !!! Logic   API  !!! ---
        // Ví dụ giả lập thành công sau 1.5 giây
        setTimeout(() => {
            console.log("Deletion successful!");
            alert("安否情報が正常に削除されました。");
            setIsDeleting(false); // Tắt loading
            setIsBackedUp(false); // Reset trạng thái backup sau khi đã xóa
            // Có thể điều hướng người dùng về Admin Menu
            // navigate('/admin');
        }, 1500);
        // Xử lý trường hợp API xóa thất bại
    };

    return (
        <div className={styles.page}>

            <BackButton />

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


            <DeleteConfirmModal
                isOpen={isConfirmDeleteModalOpen}
                onClose={handleCloseDeleteConfirm}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default AdminDeletePage;