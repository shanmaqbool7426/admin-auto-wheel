"use client"
import Chat from '@/modules/Chat'
import React from 'react'
import ClientWrapper from '@/components/ClientWrapper';
import withProtectedRoute from '@/components/AuthGuard/withAuth';
export default withProtectedRoute(function ChatPage() {
  return (
    <ClientWrapper>
      <Chat />
    </ClientWrapper>
  )
})
