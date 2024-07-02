import React, { useMemo, useEffect, useState, MouseEvent } from 'react';
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

const RecruitersAssociateTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [columnVisibility, setColumnVisibility] = useState({});

  const columns = useMemo(
    () => [
      {
        header: 'First Name',
        accessorKey: 'firstName',
        minSize: 80
      },

      {
        header: 'Last Name',
        accessorKey: 'lastName',
        minSize: 80
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },

      {
        header: 'Mobile No.',
        accessorKey: 'mobileNumber'
      },

      {
        header: 'Role',
        accessorKey: 'role'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (cell: any) => (
          <Chip
            color={cell?.row?.original?.status === 'Active' ? 'success' : 'error'}
            label={cell?.row?.original?.status}
            size="small"
            variant="light"
          />
        )
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

export default RecruitersAssociateTable;

const data = [
  {
    firstName: 'Raj',
    lastName: 'deep',
    mobileNumber: 979898999,
    email: 'example@gmail.com',
    status: 'Active'
  },
  {
    firstName: 'deep',
    lastName: 'singh',
    mobileNumber: 979898999,
    email: 'deep@gmail.com',
    status: 'Inactive'
  },
  { firstName: 'gurpreet', lastName: 'singh', mobileNumber: 979898999, email: 'yup@gmail.com', status: 'Active' }
];
