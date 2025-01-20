'use client';
import React from "react";
// import { useParams, useRouter } from 'next/navigation'
import { Tabs, Box } from '@mantine/core';
// import { PATH_NAME } from "@/constants/pathname";
// import styles from './AllPostsLayout.module.css'
// import { useGetStatusCountsQuery } from "@/services/blog/posts";

export default function AllPostsLayout({ children }) {
  // const params = useParams();
  // const router = useRouter();
  // const { data: statusCountsData } = useGetStatusCountsQuery()

  return (
    <>
      {/* <Tabs
        value={params?.activeTab || 'all'}
        onChange={(value) => router.push(`${PATH_NAME.BLOG_ALL_POSTS}/${value}`)}
        classNames={{
          list: styles.list,
          tab: styles.tab,
          tabLabel: styles.tabLabel,
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="all">All ({statusCountsData?.data?.all})</Tabs.Tab>
          <Tabs.Tab value="mine">Mine ({statusCountsData?.data?.mine ?? 0})</Tabs.Tab>
          <Tabs.Tab value="published">Published ({statusCountsData?.data?.published})</Tabs.Tab>
          <Tabs.Tab value="draft">Draft ({statusCountsData?.data?.draft})</Tabs.Tab>
          <Tabs.Tab value="trash">Trash ({statusCountsData?.data?.trash})</Tabs.Tab>
        </Tabs.List>
      </Tabs> */}
      <Box>
        {children}
      </Box>
    </>
  )
}