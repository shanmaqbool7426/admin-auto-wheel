'use client';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import useUserRoles from './useUserRoles';
import { getColumns } from './UserRoles.data';
import UpdateRole from './UpdateRole';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function UserRolesContent() {
  const searchParams = useSearchParams();
  const {
    page,
    setPage,
    isLoading,
    isFetching,
    rolesData,
    setSearchBy,
    
    // Modal states and handlers
    modalTitle,
    openModalRole,
    handleOpenModal,
    handleCloseModal,
    selectedRole,
    handleSubmit,
    loadingModal,

    // Delete Modal
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDelete,
    loadingDelete,
    handleEditRole
  } = useUserRoles();

  const columns = getColumns({ handleOpenModalDelete, handleEditRole });

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search setSearchBy={setSearchBy} />
          </Box>
        </Box>
        <Box className={styles.filterbarRight}>
          <CustomButton
            leftSection={<IconPlus />}
            onClick={() => handleOpenModal('New Role', null)}
          >
            Add New Role
          </CustomButton>
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={rolesData?.data || []}
          fetching={isLoading || isFetching}
          totalRecords={rolesData?.pagination?.totalItems || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>

      <UpdateRole
        title={modalTitle}
        open={openModalRole}
        onClose={handleCloseModal}
        selectedRole={selectedRole}
        handleSubmit={handleSubmit}
        isLoading={loadingModal}
      />

      <ConfirmationModal
        title="Delete Role"
        message="Are you sure you want to delete this role?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      />
    </>
  );
} 