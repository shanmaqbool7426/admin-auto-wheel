import React, { useState } from 'react';

export default function useChat() {

  const [value, setValue] = useState('');
  const handleChangeSendMessage = (event) => {
    setValue(event.currentTarget.value);
  }

  return {
    value,
    handleChangeSendMessage,
  };
}
