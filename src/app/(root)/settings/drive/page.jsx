"use client"
import DriveModule from '@/modules/Drive'
import React from 'react'   
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function DrivePage() {
  return (
    <DriveModule />
  )
})
  
