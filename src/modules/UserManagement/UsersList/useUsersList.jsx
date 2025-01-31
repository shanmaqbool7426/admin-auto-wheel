'use client';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useCreateUserMutation, useUpdateUserProfileMutation } from '@/services/user-management';
import { useGetUsersQuery } from '@/services/user-management';
import { PAGE_SIZE } from '@/constants/pagination';
import { MODAL_TYPE } from './UsersList.data';
import { notifications } from '@mantine/notifications';
export default function useComments() {
  const [searchBy, setSearchBy] = useState();
  const [page, setPage] = useState(1);

  const [selectedRecords, setSelectedRecords] = useState([]);
  const initParams = {
    sortOrder: 'desc',
    page,
    limit: PAGE_SIZE,
  }
  const [filterParams, setFilterParams] = useState(initParams);
  const {
    data: usersData,
    isLoading: loadingGetUsers,
    isFetching: fetchingGetUsers
  } = useGetUsersQuery(filterParams);

  useEffect(() => {
    if (fetchingGetUsers) {
      setSelectedRecords([]);
    }
  }, [fetchingGetUsers]);

  // Search query parameters
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, page: page }));
  }, [page]);

  // handle change sortOrder
  const handleChangeFilter = (name, value) => {
    setFilterParams(prev => ({ ...prev, [name]: value }));
  };

  // Create/Edit New User
  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const [modalType, setModalType] = useState(MODAL_TYPE.ADD);
  const [modalData, setModalData] = useState(null);
  const formAddUser = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  useEffect(() => {
    if (modalData) {
      formAddUser.setValues({
        firstName: modalData.firstName || '',
        lastName: modalData.lastName || '',
        email: modalData.email || '',
        role: modalData.roles[0]?.name || '',
      });
    }
  }, [modalData]);

  const handdleOpenAddUserModal = (type, data) => {
    console.log("data",data);
    setModalType(type);
    setModalData(data);
    setIsOpenAddUserModal(true);
  }
  const handdleCloseAddUserModal = () => {
    setIsOpenAddUserModal(false);
    setModalData(null);
    formAddUser.reset();
  }

  const [createUser, { isLoading }] = useCreateUserMutation();
  const [updateUserProfile, { isLoading: isLoadingUpdateUserProfile }] = useUpdateUserProfileMutation();

  const handleSubmit = async (values) => {

    try {
      if(modalType === MODAL_TYPE.ADD){
        await createUser(values)?.unwrap();
      }else{
        await updateUserProfile(values)?.unwrap();
      }
      // setOnClose(false);
      formAddUser.reset();
      notifications.show({
        title: 'Success',
        message: 'User added successfully',
        color: 'green',
      });
    } catch (error) {
      console.log('error', error);
      notifications.show({
        title: 'Error',
        message: error?.data?.message,
        color: 'red',

      });
    }
  };



  const handleClickEditRow = (e,type, data) => {
    e.stopPropagation();
    handdleOpenAddUserModal(type, data);
  }

  const handleClickDeleteRow = (e, id) => {
    e.stopPropagation();
    alert(`Delete Row ${id}`);
  }

  const handleClickDuplicate = (e, id) => {
    e.stopPropagation();
    alert(`Toggle Row ${id}`);
  }

  return {
    page,
    setPage,

    selectedRecords,
    setSelectedRecords,

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
    handleSubmit,
    isLoading,

    handleClickEditRow,
    handleClickDeleteRow,
    handleClickDuplicate,
  };
}
