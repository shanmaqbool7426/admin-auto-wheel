"use client"
import TransmissionModule from '@/modules/Transmission'
import React from 'react'   
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function TransmissionPage() {
  return (
    <TransmissionModule />
  )
})
    
