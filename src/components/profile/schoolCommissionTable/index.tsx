import { Box, CircularProgress, Divider, Paper, TableBody, TableCell, TableHead, TablePagination, TableRow, useTheme } from '@mui/material';
import { Table, TableContainer } from '@mui/material';
import { HeaderGroup, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { Edit } from 'iconsax-react';
import React, { useState } from 'react';

const SchoolCommissionTable = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  //table
  const [pageSize, setPageSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const columns = [
    {
      header: 'School Name',
      accessorKey: 'schoolName'
    },

    {
      header: 'Leave if applicable',
      accessorKey: 'leave'
    },
    {
      header: 'Payment Type',
      accessorKey: 'paymentType'
    },
    {
      header: 'Min @75%',
      accessorKey: 'min75'
    },
    {
      header: 'Max @75%',
      accessorKey: 'max75'
    },
    {
      header: 'Tax type and %',
      accessorKey: 'taxType'
    },

    {
      header: 'Variable Factors',
      accessorKey: 'variableFactors'
    }
    // {
    //   header: 'Action',
    //   accessorKey: 'action',
    //   cell: (cell: any) => {
    //     return <Edit size={'18'} />;
    //   }
    // }
  ];

  const data = [
    {
      schoolName: 'University',
      leave: 'Bachelor',
      paymentType: '%',
      min75: '3.25%',
      max75: '1.25%',
      taxType: 'HST 13%',
      variableFactors: 'Program'
    },
    {
      schoolName: 'GNDU',
      leave: 'Bachelor',
      paymentType: 'Fixed',
      min75: '2.25%',
      max75: '3.25%',
      taxType: 'HST 13%',
      variableFactors: 'Nationality'
    },
    {
      schoolName: 'University',
      leave: 'Bachelor',
      paymentType: '%',
      min75: '3.25%',
      max75: '1.25%',
      taxType: 'HST 13%',
      variableFactors: 'Program'
    },
    {
      schoolName: 'GNDU',
      leave: 'Bachelor',
      paymentType: 'Fixed',
      min75: '2.25%',
      max75: '3.25%',
      taxType: 'HST 13%',
      variableFactors: 'Nationality'
    },
    {
      schoolName: 'GNDU',
      leave: 'Bachelor',
      paymentType: 'Fixed',
      min75: '2.25%',
      max75: '3.25%',
      taxType: 'HST 13%',
      variableFactors: 'Nationality'
    },
    {
      schoolName: 'University',
      leave: 'Bachelor',
      paymentType: '%',
      min75: '3.25%',
      max75: '1.25%',
      taxType: 'HST 13%',
      variableFactors: 'Program'
    },
    {
      schoolName: 'GNDU',
      leave: 'Bachelor',
      paymentType: 'Fixed',
      min75: '2.25%',
      max75: '3.25%',
      taxType: 'HST 13%',
      variableFactors: 'Nationality'
    }
  ];
  const table = useReactTable({
    data: data || [],
    columns: columns,

    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  console.log('table', table);

  let headers: any[];
  table.getVisibleLeafColumns()?.map((columns) =>
    headers?.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <Box sx={{ mt: 2 }}>
      <MainCard content={false}>
        <ScrollX>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} {...header.column.columnDef.meta} sx={{ fontSize: '10px', paddingY: '4px' }}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          {...cell.column.columnDef.meta}
                          sx={{ fontSize: '12px', textAlign: cell?.column?.id == 'application' ? 'center' : 'left', paddingY: '10px' }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollX>
        <Divider />

        {/* <Box sx={{ p: 2 }}>
        <TablePagination
          setPageSize={setPageSize}
          pageSize={pageSize}
          startIndex={startIndex}
          setPageIndex={setStartIndex}
          getState={table.getState}
          getPageCount={10}
          setCurrentPage={setCurrentPage}
        />
      </Box> */}
      </MainCard>
    </Box>
  );
};

export default SchoolCommissionTable;
