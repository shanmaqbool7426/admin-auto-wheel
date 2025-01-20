import React from 'react';
import { Modal, Box, Group } from '@mantine/core';
import styles from './CustomModal.module.css';
import { IconModalClose } from '@/assets/icons';
import CustomButton from '../CustomButton';

export default function ConfirmationModal(props) {
  const {
    open,
    onClose,
    title = 'Delete',
    size = '480',
    message = 'Are you sure you want to delete this item?',
    okText = 'Delete',
    isLoading,
    onSubmit,
  } = props;
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
          <Box className={styles.messageText}>
            {message}
          </Box>
        </Modal.Body>
        <Box className={styles.modalFooter}>
          <Group justify="flex-end">
            <CustomButton onClick={onClose} variant="default">
              Cancel
            </CustomButton>
            <CustomButton onClick={onSubmit} loading={isLoading} disabled={isLoading}>
              {okText}
            </CustomButton>
          </Group>
        </Box>
      </Modal.Content>
    </Modal.Root>
  )
}
