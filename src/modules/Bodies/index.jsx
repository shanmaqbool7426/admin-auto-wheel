'use client';
import React from 'react';
import { Box, Select } from '@mantine/core';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import styles from './Bodies.module.css';
import useBodies from './useBodies';
import { getColumns } from './data';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddBody from './AddBody';
import FormField from '@/components/FormField';
import { useGetRolesQuery } from '@/services/roles';
import { getCookie } from '@/utils/cookies';
import { checkPermission } from '@/utils/permissions';

export default function BodiesModule() {
  const { data: roles } = useGetRolesQuery();
  const user = JSON.parse(getCookie('user'));
  const permissions = roles?.data?.roles.find(
    (role) => role.name?.toLowerCase() === user.roles?.toLowerCase()
  );

  const hasEditPermission = permissions?.permissions?.body?.edit;

  const {
    page,
    setPage,
    isLoading,
    isFetching,
    bodiesData,
    setSearchBy,
    filterParams,
    modalTitle,
    openModalBody,
    handleOpenModal,
    handleCloseModal,
    selectedBody,
    formBody,
    loadingModal,
    handleSubmit,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    setType,
    loadingDelete,
    handleEditBody
  } = useBodies();

  const columns = getColumns({ 
    handleOpenModalDelete, 
    handleEditBody 
  });


  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search setSearchBy={setSearchBy} />
          </Box>
        </Box>
        {/* type of body */}
        <Box>
          <FormField
            type="select" 
            data={[ {value: "all", label: "All"}, {value: "car", label: "Car"}, {value: "truck", label: "Truck"}, {value: "bike", label: "Bike"}]}
            placeholder="Select Body Type"
            onChange={(value) => setType(value)}
          />
        </Box>
        <Box className={styles.filterbarRight}>
          {hasEditPermission && (
            <CustomButton
              leftSection={<IconPlus />}
              onClick={() => handleOpenModal('New Body Type', null)}
            >
              Add New Body Type
            </CustomButton>
          )}
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={bodiesData || []}
          fetching={isLoading || isFetching}
          totalRecords={bodiesData?.pagination?.totalItems || 0}
          recordsPerPage={filterParams.limit}
          page={page}
          onPageChange={setPage}
          minHeight={200}
          withColumnBorders
        />
      </Box>

    
      <ConfirmationModal
        title="Delete Body Type"
        message="Are you sure you want to delete this body type?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />



<AddBody
        modalTitle={modalTitle}
        open={openModalBody}
        onClose={handleCloseModal}
        selectedBody={selectedBody}
        form={formBody}
        handleSubmit={handleSubmit}
        isLoading={loadingModal}
      />

    </>
  );
}
