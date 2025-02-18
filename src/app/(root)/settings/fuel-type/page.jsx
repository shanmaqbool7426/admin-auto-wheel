"use client"
import FuelTypeModule from '@/modules/FuelType'
import React from 'react'   
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function FuelTypePage() {
  return (
    <FuelTypeModule />
  )
})
    
