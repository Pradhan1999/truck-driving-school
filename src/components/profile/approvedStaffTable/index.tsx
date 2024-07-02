import {
  Box,
  Button,
  Chip,
  Divider,
  OutlinedInput,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { HeaderGroup, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import TablePagination from 'components/third-party/TablePagination';
import TableLoading from 'components/ui/TableLoading';
import { approvedStaffColumns, approvedStaffData } from 'pages/profile/manageStaff/columns';
import React, { useEffect, useState } from 'react';
import { GetAllStaff } from 'services/staff';

const ApprovedStaffTable = () => {
  const theme = useTheme();
  const [StaffData, setStaffData] = useState<any>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(10);
  const [tableLoading, setTableLoading] = useState(false);

  const fetchAllStaff = () => {
    setTableLoading(true);
    GetAllStaff({ query: { limit: viewPage, start: startIndex, is_active: true } })?.then((res) => {
      setTableLoading(false);
      setStaffData(res);
    });
  };

  useEffect(() => {
    fetchAllStaff();
  }, [viewPage, startIndex]);
  const approvedStaffTable = useReactTable({
    data: StaffData?.rows || [],
    columns: approvedStaffColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  return (
    <MainCard
      title={
        <Stack>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ fontSize: '19px', color: '#394663', fontWeight: '600' }}> Approved Staff Members </Typography>
            <Chip
              sx={{ fontSize: '14px', paddingY: '4px', height: '20px', marginLeft: '8px', color: '#2A50ED' }}
              label={`${StaffData?.count}  Member`}
              // color="primary"
              variant="light"
            />
          </Stack>
          <Typography variant="caption" color={'#778194'} fontWeight={400} fontSize={'14px'}>
            Keep track of your staff and associates here.
          </Typography>
        </Stack>
      }
      subtitle="Keep track of your staff and associates here"
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" width="100%">
          <OutlinedInput
            placeholder="Search by name or email?"
            sx={{
              height: '35px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              bgcolor: 'white'
            }}
            fullWidth
          />
          <Button variant="contained" size="small" sx={{ height: '35px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>
            Search
          </Button>
        </Stack>
        <MainCard content={false}>
          <ScrollX>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                  {approvedStaffTable.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
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
                  {tableLoading ? (
                    <TableLoading columns={approvedStaffColumns} viewPage={viewPage} />
                  ) : (
                    approvedStaffTable.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} {...cell.column.columnDef.meta} sx={{ fontSize: '12px', paddingY: '10px' }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider />
            <Box sx={{ p: 2 }}>
              <TablePagination
                totalCount={StaffData?.count}
                startIndex={startIndex}
                setStartIndex={setStartIndex}
                viewPage={viewPage}
                setViewPage={setViewPage}
              />
            </Box>
          </ScrollX>
        </MainCard>
      </Stack>
    </MainCard>
  );
};

export default ApprovedStaffTable;
