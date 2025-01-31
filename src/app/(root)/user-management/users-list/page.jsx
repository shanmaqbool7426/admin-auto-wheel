"use client"
import React,{Suspense} from 'react';
import UsersList from  '@/modules/UserManagement/UsersList';
import ClientWrapper from '@/components/ClientWrapper';
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function UsersListPage() {
  return (    
    <ClientWrapper>
      <UsersList />
    </ClientWrapper>
  )
})
