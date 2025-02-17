'use client';
import React from 'react';
import { Box } from '@mantine/core';
import { IconPlus } from '@/assets/icons';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddFaq from './AddFaq';
import useFaq from './useFaq';
import { getColumns } from './data';
import styles from './Faq.module.css';
import FormField from '@/components/FormField';

export default function Faq() {
  const {
    page,
    setPage,
    isLoading,
    isFetching,
    faqData,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    modalTitle,
    openAddModal,
    handleOpenModal,
    handleCloseModal,
    editData,
    openDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditFaq
  } = useFaq();

  const columns = getColumns({ 
    handleOpenModalDelete, 
    handleEditFaq 
  });

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search setSearchBy={setSearchBy} />
          </Box>
          <Box className={styles.dropdown}>
            <FormField
              type="select"
              name="type"
              data={[
                { value: 'car', label: 'Car' },
                { value: 'bike', label: 'Bike' },
                { value: 'truck', label: 'Truck' },
              ]}
              placeholder="Vehicle Type"
              value={filterParams.type}
              onChange={(_value, option) => handleChangeFilter('type', option.value)}
            />
          </Box>
        </Box>
        <Box>
          <CustomButton
            leftSection={<IconPlus />}
            onClick={() => handleOpenModal('New FAQ', null)}
          >
            Add FAQ
          </CustomButton>
        </Box>
      </Box>

      <DataTable
        columns={columns}
        records={faqData?.data?.data || []}
        fetching={isLoading || isFetching}
        totalRecords={faqData?.pagination?.totalItems || 0}
        page={page}
        onPageChange={setPage}
      />

      <AddFaq 
        open={openAddModal}
        onClose={handleCloseModal}
        editData={editData}
      />

      <ConfirmationModal
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ?"
        open={openDeleteModal}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />
    </>
  );
}