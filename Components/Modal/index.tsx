import React, { useState } from 'react';
import styles from './Modal.module.css';

const Modal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [error, setError] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStatus('');
    setError('');
  };

  const handleAccept = () => {
    if (selectedStatus) {
      // Handle accept action here
      closeModal();
    } else {
      setError('Please select a status.');
    }
  };

  const handleReject = () => {
    // Handle reject action here
    closeModal();
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
    setError('');
  };

  return (
    <div>
      <button className={styles.openButton} onClick={openModal}>Open Modal</button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>please select status</h2>
            <div className={styles.radioContainer}>
              <label className={styles.radioButton}>
                <input
                  type="radio"
                  value="status1"
                  checked={selectedStatus === "status1"}
                  onChange={handleStatusChange}
                />
                <span className={styles.radioLabel}>Mobinnet---Intact_New</span>
              </label>
              <label className={styles.radioButton}>
                <input
                  type="radio"
                  value="status2"
                  checked={selectedStatus === "status2"}
                  onChange={handleStatusChange}
                />
                <span className={styles.radioLabel}>Mobinnet---Intact_Second-hand</span>
              </label>
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.acceptButton} onClick={handleAccept}>
                Update
              </button>
              <button className={styles.rejectButton} onClick={handleReject}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
