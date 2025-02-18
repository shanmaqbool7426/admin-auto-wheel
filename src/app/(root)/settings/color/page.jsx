"use client"
import ColorModule from '@/modules/Color'
import React from 'react'   
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function ColorPage() {
  return (
    <ColorModule />
  )
})
  
