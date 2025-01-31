'use client';
import React from 'react';
import styles from './UsersList.module.css';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import FormField from '@/components/FormField';
import DataTable from '@/components/DataTable';
import CustomButton from '@/components/CustomButton';
import useUsersList from './useUsersList';
import { getColumns, MODAL_TYPE } from './UsersList.data';
import { IconPlus } from '@/assets/icons';
import AddUser from './AddUser';

export default function UsersList() {
  const {
    page,
    setPage,

    usersData,
    loadingGetUsers,
    fetchingGetUsers,

    setSearchBy,
    filterParams,
    handleChangeFilter,

    modalType,
    isOpenAddUserModal,
    formAddUser,
    handdleOpenAddUserModal,
    handdleCloseAddUserModal,
    handleClickEditRow,
    handleSubmit,
    isLoading,

    handleClickDuplicate,
  } = useUsersList();

  const columns = getColumns(handleClickEditRow, handdleOpenAddUserModal, handleClickDuplicate)

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            <Search
              setSearchBy={setSearchBy}
            />
          </Box>
        </Box>
        <Box className={styles.filterbarRight}>
          <Box className={styles.rightDropdown}>
            <FormField
              type="select"
              name="sortOrder"
              data={[
                { value: 'desc', label: 'Date, new to old' },
                { value: 'asc', label: 'Date, old to new' },
              ]}
              placeholder="Date, new to old"
              checkIconPosition="right"
              value={filterParams?.sortOrder}
              onChange={(_value, option) => handleChangeFilter('sortOrder', option.value)}
            />
          </Box>
          <CustomButton
            leftSection={<IconPlus />}
            onClick={() => handdleOpenAddUserModal(MODAL_TYPE.ADD, null)}
          >
            New User
          </CustomButton>
        </Box>
      </Box>
      <Box>
        <DataTable
          columns={columns}
          records={usersData?.data?.users || []}
          fetching={loadingGetUsers || fetchingGetUsers}
          totalRecords={usersData?.data?.totalUsers || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>

      <AddUser
        type={modalType}
        open={isOpenAddUserModal}
        onClose={handdleCloseAddUserModal}
        form={formAddUser}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  )
}
