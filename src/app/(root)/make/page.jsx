"use client"
import React, { Suspense } from 'react';
import Makes from '@/modules/Makes';
import ClientWrapper from '@/components/ClientWrapper';
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function MakePage() {
  return (
    <ClientWrapper>
    <Makes  />
  </ClientWrapper>
  )
})



