'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import useCompetitor from './useCompetitor';
import useAddCompetitor from './AddCompetitor/useAddCompetitor';
import { getColumns } from './data';
import { IconPlus } from '@/assets/icons';
import styles from './Competitor.module.css';
import AddCompetitor from './AddCompetitor';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function CompetitorModule() {
  const {
    page,
    setPage,
    isLoading,
    isFetching,
    competitorsData,
    setSearchBy,
    filterParams,
    handleChangeFilter,
    
    // Add/Edit Modal
    modalTitle,
    openModalCompetitor,
    handleOpenModal,
    handleCloseModal,
    selectedCompetitorSet,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    loadingDelete,
    handleDelete,
  } = useCompetitor();

  const {
    form,
    handleSubmit,
    isLoading: isLoadingModal
  } = useAddCompetitor(handleCloseModal, selectedCompetitorSet);

  const columns = getColumns(handleOpenModal, handleOpenModalDelete);

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search 
              placeholder="Search competitors..."
              setSearchBy={setSearchBy} 
            />
          </Box>
          <Box className={styles.dropdown}>
            <FormField
              type="select"
              name="type"
              data={[
                { value: 'all', label: 'All Types' },
                { value: 'car', label: 'Cars' },
                { value: 'bike', label: 'Bikes' },
                { value: 'truck', label: 'Trucks' },
              ]}
              placeholder="Vehicle Type"
              checkIconPosition="right"
              value={filterParams.type}
              onChange={(_value, option) => handleChangeFilter('type', option.value)}
            />
          </Box>
        </Box>
        <Box className={styles.filterbarRight}>
          <CustomButton
            leftSection={<IconPlus />}
            onClick={() => handleOpenModal('New Competitor Set', null)}
          >
            Add Competitor Set
          </CustomButton>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={competitorsData?.data?.competitors || []}
          fetching={isLoading || isFetching}
          totalRecords={competitorsData?.data?.pagination?.total || 0}
          recordsPerPage={filterParams.limit}
          page={page}
          onPageChange={setPage}
          minHeight={200}
          withColumnBorders
        />
      </Box>

      <AddCompetitor
        title={modalTitle}
        open={openModalCompetitor}
        onClose={handleCloseModal}
        form={form}
        handleSubmit={handleSubmit}
        isLoading={isLoadingModal}
      />

      <ConfirmationModal
        title="Delete Competitor Set"
        message="Are you sure you want to delete this competitor set?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />
    </>
  );
} 