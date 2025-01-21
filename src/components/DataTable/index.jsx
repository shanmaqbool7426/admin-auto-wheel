"use client"
import React from 'react';
import { DataTable as MantineDataTable } from 'mantine-datatable';
import classes from './DataTable.module.css'
import { PAGE_SIZE } from '@/constants/pagination';

export default function DataTable({ enablePagination = true, columns, records, totalRecords, page, onPageChange, loading = false, ...rest }) {

  return (
    <MantineDataTable
      idAccessor="_id"
      columns={columns}
      records={records}
      totalRecords={enablePagination ? totalRecords : undefined}
      recordsPerPage={enablePagination ? PAGE_SIZE : undefined}
      page={enablePagination ? page : undefined}
      onPageChange={enablePagination ? onPageChange : undefined}
      paginationText={enablePagination ? ({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} results` : undefined}
      classNames={{
        root: classes.root,
        table: classes.table,
        header: classes.header,
        footer: classes.footer,
        pagination: classes.pagination,
      }}
      styles={{
        rowExpansionCellContent: {
          backgroundColor: '#f9f9f9',
        },
      }}
      {...rest}
      enablePagination={false}
      minHeight={220}
    />
  )
}
