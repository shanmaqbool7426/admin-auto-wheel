"use client"
import FaqModule from '@/modules/Faq'
import React from 'react'
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function FaqPage() {
  return (
    <FaqModule />
  )
})

