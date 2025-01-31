"use client"
import ClientWrapper from '@/components/ClientWrapper';
import UserRoles from '@/modules/UserManagement/UserRoles';
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function UserRolesPage() {
  return (
    <ClientWrapper>
      <UserRoles />
    </ClientWrapper>
  )
})


