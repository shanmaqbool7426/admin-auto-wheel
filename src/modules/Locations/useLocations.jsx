'use client';
import { useState, useEffect } from 'react';
import {
  useGetLocationsQuery,
  useAddLocationMutation,
  useDeleteBulkLocationMutation,
} from '@/services/location';
import { PAGE_SIZE } from '@/constants/pagination';
import { successSnackbar, errorSnackbar } from '@/utils/snackbar';
import { useForm } from '@mantine/form';
import { Country, State, City } from 'country-state-city';

export default function useLocations() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchBy, setSearchBy] = useState();
  const [page, setPage] = useState(1);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const initParams = {
    page,
    limit: PAGE_SIZE,
  }
  const [filterParams, setFilterParams] = useState(initParams);
  const {
    data: locationsData,
    isLoading: loadingGetLocation,
    isFetching: fetchingGetLocation,
    isError
  } = useGetLocationsQuery(filterParams);

  useEffect(() => {
    if (fetchingGetLocation) {
      setSelectedRecords([]);
    }
  }, [fetchingGetLocation]);

  // Search query parameters
  useEffect(() => {
    setFilterParams(prev => ({ ...prev, search: searchBy }));
  }, [searchBy]);

  useEffect(() => {
    setFilterParams(prev => ({ ...prev, page: page }));
  }, [page]);


  // handle delete bulk locations
  const [deleteBulkLocation, { isLoading: loadingBulkDelete }] = useDeleteBulkLocationMutation();
  const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState(false);
  const handleOpenBulkDeleteModal = () => {
    setOpenBulkDeleteModal(true);
  };

  const handleCloseBulkDeleteModal = () => {
    setOpenBulkDeleteModal(false);
  };

  const handleBulkAction = async (action) => {
    if (action === 'delete') {
      handleOpenBulkDeleteModal();
    }
  };

  const handleBulkDeleteLocations = async () => {
    try {
      await deleteBulkLocation(selectedRecords.map(item => item?._id)).unwrap();
      handleCloseBulkDeleteModal();
      setSelectedRecords([]);
      successSnackbar('Locations deleted successfully.');
    } catch (error) {
      console.error('Error deleting location:', error);
      errorSnackbar(error.data.message);
    }
  };


  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  const handleCountryChange = (country) => {
    console.log('country::; ', country);
    setSelectedCountry(country);
    setSelectedState(''); // Reset state when country changes
    setSelectedCity(''); // Reset city when country changes

    // Fetch states for the selected country
    const fetchedStates = State.getStatesOfCountry(country).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));
    setStates(fetchedStates);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity(''); // Reset city when state changes

    // Fetch cities for the selected state
    const fetchedCities = City.getCitiesOfState(selectedCountry, state).map((city) => ({
      value: city.name,
      label: city.name,
    }));
    setCities(fetchedCities);
  };


  const filterForm = useForm({
    initialValues: {
      country: "",
      state: "",
      city: "",
    },
  });

  const handleOpenDrawer = () => {
    setOpenFilterDrawer(true)
  }
  const handleCloseDrawer = () => {
    setOpenFilterDrawer(false)
  }

  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  // const handleFilterSubmit = async (values) => {
  //   console.log('Form Data:: ', values);
  // };





  return {
    page,
    setPage,

    selectedRecords,
    setSelectedRecords,

    locationsData,
    loadingGetLocation,
    fetchingGetLocation,

    setSearchBy,
    filterParams,

    setIsLocationModalOpen,
    isLocationModalOpen,

    openBulkDeleteModal,
    handleCloseBulkDeleteModal,
    handleBulkAction,
    handleBulkDeleteLocations,
    loadingBulkDelete,

    openFilterDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    handleSubmit,
    filterForm,
  };
}
