import React from 'react';
import { Modal } from '@mantine/core';
import styles from '../CustomModal/CustomModal.module.css';
import { IconModalClose } from '@/assets/icons';
// for login model
export default function CustomLoginModal({ title, size = '762px', open, onClose, children }) {
  return (
    <Modal.Root
      opened={open}


      onClose={onClose}
      size={size}
      centered
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className={styles.modalHeader}>
          <Modal.Title className={styles.modalHeaderTitle}>{title}</Modal.Title>
          <Modal.CloseButton icon={<IconModalClose />} />
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {children}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
