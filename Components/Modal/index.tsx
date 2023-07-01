import React, { useState } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  onSelectStatus: (selectedStatus: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onSelectStatus }) => {
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
      onSelectStatus(selectedStatus); // Pass selectedStatus to the callback prop
      closeModal();
    } else {
      setError('Please select a status.');
    }
  };

  const handleReject = () => {
    closeModal();
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(event.target.value);
    setError('');
  };

  return (
    <div>
      <button className={styles.openButton} onClick={openModal}>
        choose status
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Please select status</h2>
            <div className={styles.radioContainer}>
              <label className={styles.radioButton}>
                <input
                  type="radio"
                  value="Mobinnet---Intact_New"
                  checked={selectedStatus === 'Mobinnet---Intact_New'}
                  onChange={handleStatusChange}
                />
                <span className={styles.radioLabel}>Mobinnet---Intact_New</span>
              </label>
              <label className={styles.radioButton}>
                <input
                  type="radio"
                  value="Mobinnet---Intact_Second-hand"
                  checked={selectedStatus === 'Mobinnet---Intact_Second-hand'}
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
