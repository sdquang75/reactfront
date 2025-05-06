import React from 'react';
import styles from "./BackButton.module.css"
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';




function BackButton() {
    const navigate = useNavigate();


    const handleGoBack = () => {
        navigate(-1);
    };
    return (


        <button onClick={handleGoBack} className={styles.backButton}>
            <FiArrowLeft /> 戻る
        </button>);
}
export default BackButton;