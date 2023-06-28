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

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    setError('');
  };

  return (
    <div>
      <button className={styles.openButton} onClick={openModal}>Open Modal</button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Question</h2>
            <p>which status want to update ?</p>
            <div className={styles.selectContainer}>
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className={styles.select}
              >
                <option color='red' value=""></option>
                <option value="status1">Status 1</option>
                <option value="status2">Status 2</option>
              </select>
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.acceptButton} onClick={handleAccept}>
                Accept
              </button>
              <button className={styles.rejectButton} onClick={handleReject}>
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
