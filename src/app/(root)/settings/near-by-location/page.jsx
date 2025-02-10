"use client"
import NearbyLocationModule from '@/modules/NearbyLocation'
import React from 'react'
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function NearbyLocationPage() {
  return (
    <NearbyLocationModule />
  )
})

