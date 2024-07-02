import React, { useMemo, useEffect, useState } from 'react';
import { Avatar, Checkbox, Chip, MenuItem, Select, Typography } from '@mui/material';
import { Add, ArrowRight2 } from 'iconsax-react';
import { useNavigate } from 'react-router';
import { flexRender, useReactTable, HeaderGroup, getCoreRowModel } from '@tanstack/react-table';

// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// third-party

// project import
import ScrollX from 'components/ScrollX';
import { Box, Stack, useTheme } from '@mui/material';
import { Divider } from '@mui/material';
import TablePagination from 'components/third-party/TablePagination';
import MainCard from 'components/MainCard';

const RecruitersApplicationTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [columnVisibility, setColumnVisibility] = useState({});
  const columns = useMemo(
    () => [
      {
        header: 'App ID',
        accessorKey: 'appId',
        cell: ({ cell }: any) => (
          <Typography variant="inherit" color={theme.palette.primary[700]}>
            {cell?.row?.original?.studentId}
          </Typography>
        )
      },

      {
        header: 'Student ID',
        accessorKey: 'studentId',
        cell: ({ cell }: any) => (
          <Typography variant="inherit" color={theme.palette.primary[700]}>
            {cell?.row?.original?.studentId}
          </Typography>
        )
      },

      {
        header: 'Apply Date',
        accessorKey: 'applyDate',
        minSize: 70
      },

      {
        header: 'First Name',
        accessorKey: 'firstName',
        minSize: 70
      },

      {
        header: 'Last Name',
        accessorKey: 'lastName',
        minSize: 70
      },
      {
        header: 'Program',
        accessorKey: 'program',
        minSize: 280,
        cell: ({ cell }: any) => (
          <Typography variant="inherit" color={theme.palette.primary[700]}>
            {cell?.row?.original?.program}
          </Typography>
        )
      },

      {
        header: 'School',
        accessorKey: 'school',
        minSize: 120
      },

      {
        header: 'Start Date',
        accessorKey: 'startDate',
        minSize: 70
      },
      {
        header: 'Status',
        accessorKey: 'status',
        minSize: 100
      },

      {
        header: 'Requriment',
        accessorKey: 'requriement'
      },
      {
        header: 'Current Stage',
        accessorKey: 'currentStage'
      }
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel()
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true
  });

  useEffect(() => setColumnVisibility({ id: false, role: false, contact: false, country: false }), []);

  let headers: any[];

  table.getVisibleLeafColumns()?.map((columns) =>
    headers?.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );
  return (
    <>
      <MainCard sx={{ height: '100%' }}>
        <ScrollX>
          <Stack>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                  {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell
                          key={header.id}
                          width={250}
                          {...header.column.columnDef.meta}
                          sx={{ paddingY: '4px', whiteSpace: 'nowrap', textTransform: 'none' }}
                        >
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          {...cell.column.columnDef.meta}
                          sx={{
                            fontSize: '12px',
                            paddingY: '5px'
                          }}
                        >
                          <Box sx={{ minWidth: cell.column.columnDef.minSize }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* PAGINATION */}
            <Divider />
            <Box sx={{ p: 2 }}>
              <TablePagination
                {...{
                  setPageSize: table.setPageSize,
                  setPageIndex: table.setPageIndex,
                  getState: table.getState,
                  getPageCount: table.getPageCount
                }}
              />
            </Box>
          </Stack>
        </ScrollX>
      </MainCard>
    </>
  );
};

export default RecruitersApplicationTable;

const data = [
  {
    appId: '4199160',
    studentId: '23509034',
    applyDate: '2024-01-10',
    firstName: 'Tanjeet ',
    lastName: 'Singh',
    program: `College Diploma - Nutrition and Food Service Management
      (1570)`,
    school: 'Canadore College',
    assignee: 20,
    startDate: '2024-01-10',
    status: 'Ready for Visa',
    requirements: '',
    currentStage: 'Pre-Payment'
  },
  {
    appId: '4199160',
    studentId: '23509034',
    applyDate: '2024-01-10',
    firstName: 'Tanjeet ',
    lastName: 'Singh',
    program: `College Diploma - Nutrition and Food Service Management
      (1570)`,
    school: 'Canadore College',
    assignee: 20,
    startDate: '2024-01-10',
    status: 'Ready for Visa',
    requirements: '',
    currentStage: 'Pre-Payment'
  },
  {
    appId: '4199160',
    studentId: '23509034',
    applyDate: '2024-01-10',
    firstName: 'Tanjeet ',
    lastName: 'Singh',
    program: `College Diploma - Nutrition and Food Service Management
      (1570)`,
    school: 'Canadore College',
    assignee: 20,
    startDate: '2024-01-10',
    status: 'Ready for Visa',
    requirements: '',
    currentStage: 'Pre-Payment'
  },
  {
    appId: '4199160',
    studentId: '23509034',
    applyDate: '2024-01-10',
    firstName: 'Tanjeet ',
    lastName: 'Singh',
    program: `College Diploma - Nutrition and Food Service Management
      (1570)`,
    school: 'Canadore College',
    assignee: 20,
    startDate: '2024-01-10',
    status: 'Ready for Visa',
    requirements: '',
    currentStage: 'Pre-Payment'
  },
  {
    appId: '4199160',
    studentId: '23509034',
    applyDate: '2024-01-10',
    firstName: 'Tanjeet ',
    lastName: 'Singh',
    program: `College Diploma - Nutrition and Food Service Management
      (1570)`,
    school: 'Canadore College',
    assignee: 20,
    startDate: '2024-01-10',
    status: 'Ready for Visa',
    requirements: '',
    currentStage: 'Pre-Payment'
  },
  {
    appId: '4199160',
    studentId: '23509034',
    applyDate: '2024-01-10',
    firstName: 'Tanjeet ',
    lastName: 'Singh',
    program: `College Diploma - Nutrition and Food Service Management
      (1570)`,
    school: 'Canadore College',
    assignee: 20,
    startDate: '2024-01-10',
    status: 'Ready for Visa',
    requirements: '',
    currentStage: 'Pre-Payment'
  }
];
