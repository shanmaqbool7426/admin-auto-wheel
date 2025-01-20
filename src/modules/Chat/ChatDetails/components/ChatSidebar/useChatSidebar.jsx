import React, { useState } from 'react';
import { useGetConversationsListQuery, useGetConversationsQuery } from '@/services/chat';
// import { useSession } from "next-auth/react";

export default function useChatSidebar() {
  // const { data: session } = useSession();
  const [searchBy, setSearchBy] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const { 
    data: conversationsList, 
    error, 
    isLoading 
  } = useGetConversationsListQuery(
    // session?.user?._id,
    // {
    //   skip: !session?.user?._id
    // }
  );

  const { data: conversations } = useGetConversationsQuery(selectedConversationId);

  const handleSelectConversation = (conversationId) => {
    setSelectedConversationId(conversationId);

      
  };

  // Filter conversations based on search
  const filteredConversations = React.useMemo(() => {
    if (!searchBy || !conversationsList?.data) return conversationsList?.data;

    return conversationsList.data.filter(conv => 
      conv.user.fullName.toLowerCase().includes(searchBy.toLowerCase()) ||
      conv.user.email.toLowerCase().includes(searchBy.toLowerCase())
    );
  }, [conversationsList, searchBy]);


  console.log('conversations>>>>>>>>>>>',conversations)
  return {
    setSearchBy,
    conversations,
    conversationsList: {
      ...conversationsList,
      data: filteredConversations
    },
    selectedConversationId,
    handleSelectConversation,
    isLoading,
    error
  };
}