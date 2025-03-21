'use client';
import React from 'react';
import { Box } from '@mantine/core';
import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
// import CustomButton from '@/components/CustomButton';
import { IconPlus } from '@/assets/icons';
import styles from './Video.module.css';
import useVideo from './useVideo';
import { getColumns } from './data';
// import ConfirmationModal from '@/components/ConfirmationModal';
// import AddVideo from './AddVideo';

export default function VideoModule() {
//   const {   
//     page,
//     setPage,
//     isLoading,
//     isFetching,
//     videosData,
//     // selectedRecords,
//     // setSelectedRecords,
//     setSearchBy,
//     // filterParams,
    
//     // Video Modal
//     // modalTitle,
//     // openModalVideo,
//     handleOpenModal,
//     // handleCloseModal,
//     // selectedVideo,
//     // formVideo,
//     // loadingModal,
//     // handleSubmit,

//     // Delete Modal
//     handleOpenModalDelete,

//     handleEditVideo
//   } = useVideo();

  const columns = getColumns({ 
    handleOpenModalDelete, 
    handleEditVideo 
  });

  return (
    <>
      <Box className={styles.filterbar}>
        <Box className={styles.filterbarLeft}>
          <Box className={styles.searchbar}>
            {/* <Search setSearchBy={() => {}} /> */}
          </Box>
        </Box>
        <Box className={styles.filterbarRight}>
          {/* <CustomButton
            leftSection={<IconPlus />}
            // onClick={() => handleOpenModal('New Video', null)}
            onClick={() => {}}
          >
            Add New Video
          </CustomButton> */}
        </Box>
      </Box>

      <Box>
        <DataTable
          columns={columns}
          records={videosData?.data || []}
          fetching={isLoading || isFetching}
          totalRecords={videosData?.pagination?.totalItems || 0}
          page={page}
          onPageChange={setPage}
        />
      </Box>

      {/* <AddVideo
        title={modalTitle}
        open={openModalVideo}
        onClose={handleCloseModal}
        selectedVideo={selectedVideo}
        form={formVideo}
        handleSubmit={handleSubmit}
        isLoading={loadingModal}
      /> */}

      {/* <ConfirmationModal
        title="Delete Video"
        message="Are you sure you want to delete this video?"
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onSubmit={handleDelete}
        isLoading={loadingDelete}
      /> */}
    </>
  );
}