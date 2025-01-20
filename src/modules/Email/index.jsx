// 'use client';
// import React from 'react';
// import styles from './Email.module.css';
// import { Box } from '@mantine/core';
// import Search from '@/components/Search';
// import CustomButton from '@/components/CustomButton';
// import useEmail from './useEmail';
// import { IconPlus } from '@/assets/icons';
// import EmailSidebar from './components/EmailSidebar';
// import EmailContent from './components/EmailContent';

// export default function Email() {
//   const {
//     setSearchBy,
//     filterParams,
//     handleChangeFilter,
//     handleClickEditRow,
//     handleClickDeleteRow,
//     handleClickDuplicate,
//   } = useEmail();

//   return (
//     <>
//       <Box className={styles.filterbar}>
//         <Box className={styles.filterbarLeft}>
//           <Box className={styles.searchbar}>
//             <Search
//               setSearchBy={setSearchBy}
//             />
//           </Box>
//         </Box>
//         <Box className={styles.filterbarRight}>
//           <Box>
//             <CustomButton
//               leftSection={<IconPlus />}
//             >
//               Create Email
//             </CustomButton>
//           </Box>
//         </Box>
//       </Box>
//       <Box className={styles.wrapper}>
//         <Box className={styles.sidebar}>
//           <EmailSidebar />
//         </Box>

//         <Box className={styles.content}>
//           <EmailContent />
//         </Box>
//       </Box>
//     </>
//   )
// }


export default function Email() {
  return <div>Email</div>
}