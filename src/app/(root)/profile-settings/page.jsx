"use client"
import React, { Suspense } from 'react'
import ProfileSettings from '@/modules/ProfileSettings'
import ClientWrapper from '@/components/ClientWrapper';
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function ProfileSettingsPage() {
  return (
      <ProfileSettings />
  )
})
