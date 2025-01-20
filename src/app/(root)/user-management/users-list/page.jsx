import React,{Suspense} from 'react';
import UsersList from  '@/modules/UserManagement/UsersList';
import ClientWrapper from '@/components/ClientWrapper';

export default function UsersListPage() {
  return (    
    <ClientWrapper>
      <UsersList />
    </ClientWrapper>
  )
}
