 "use client"
 import React from 'react'
 import BodiesModule from '@/modules/Bodies'
 import withProtectedRoute from '@/components/AuthGuard/withAuth'
 const BodiesPage = () => {
   return (
     <BodiesModule />
   )
 }
 
 export default  withProtectedRoute(BodiesPage)  // withProtectedRoute(BodiesPage)