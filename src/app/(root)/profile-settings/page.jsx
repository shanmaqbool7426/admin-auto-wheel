import React, { Suspense } from 'react'
import ProfileSettings from '@/modules/ProfileSettings'
import ClientWrapper from '@/components/ClientWrapper';
export default function ProfileSettingsPage() {
  return (
    <ClientWrapper>
      <ProfileSettings />
    </ClientWrapper>
  )
}
