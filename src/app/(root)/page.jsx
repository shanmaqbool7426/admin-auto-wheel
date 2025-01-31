"use client"
import { Box } from "@mantine/core";
import Dashboard from "@/modules/Dashboard";
import withProtectedRoute from "@/components/AuthGuard/withAuth";

export default withProtectedRoute(function Home() {
  return (
    <Dashboard />
  );
})
