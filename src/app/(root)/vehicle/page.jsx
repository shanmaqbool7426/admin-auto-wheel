"use client"
import React from 'react';
import NewVehicles from '@/modules/NewVehicles';
import ClientWrapper from '@/components/ClientWrapper';
import withProtectedRoute from '@/components/AuthGuard/withAuth';

export default withProtectedRoute(function VehiclePage() {
  return (
    <ClientWrapper>
      <NewVehicles />
    </ClientWrapper>
  );
})
