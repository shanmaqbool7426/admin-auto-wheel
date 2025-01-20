'use client';
import { useState, useEffect } from 'react';
import { useGetComparisonSetsQuery } from '@/services/comparison';
import { PAGE_SIZE } from '@/constants/pagination';

  function useCompareVehicle() {
  const [page, setPage] = useState(1);
  const [searchBy, setSearchBy] = useState('');
  const [filterParams, setFilterParams] = useState({
    page,
    limit: PAGE_SIZE,
    search: searchBy
  });

  // Query for getting comparison sets
  const { 
    data: comparisonsData, 
    isLoading, 
    isFetching 
  } = useGetComparisonSetsQuery(filterParams);

  // Update filter params when search changes
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  // Update filter params when page changes
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, page }));
  }, [page]);

  const handleSearch = (value) => {
    setSearchBy(value);
    setPage(1);
  };

  return {
    page,
    setPage,
    searchBy,
    handleSearch,
    comparisons: comparisonsData?.data?.comparisons || [],
    isLoading,
    isFetching,
    filterParams,
    setFilterParams
  };
};

export default useCompareVehicle;