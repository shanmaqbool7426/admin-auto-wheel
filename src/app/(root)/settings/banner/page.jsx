"use client"
import BannerModule from '@/modules/Banner'
import React from 'react'
import withProtectedRoute from '@/components/AuthGuard/withAuth';
// import BannerModule from ''
export default withProtectedRoute(function BannerPage() {
  return (
    <BannerModule />
  )
})
  
