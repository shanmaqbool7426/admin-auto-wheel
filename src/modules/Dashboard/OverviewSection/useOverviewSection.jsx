import React, { useState } from 'react'

export default function useOverviewSection() {
  const [daysValue, setDaysValue] = useState('today');

  const handleChangeDays = (_value, option) => {
    setDaysValue(option);
  }

  return {
    daysValue,
    handleChangeDays,
  }
}
