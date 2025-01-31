  "use client"
import React from 'react'
import UsedVehicles from '@/modules/usedVehicles';
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function UsedVehiclesPage() {
  return (
    <UsedVehicles />
  )
})

