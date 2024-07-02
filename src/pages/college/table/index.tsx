import React, { useEffect, useMemo, useRef, useState } from 'react';

// material-ui
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// third-party
import { flexRender, useReactTable, HeaderGroup, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import MenuList from 'components/ui/menuList';
import AddCollege from '../addCollege';
import TablePagination from 'components/third-party/TablePagination';
import { GetAllInstitute, GetSingleInstitute, updateInstitute } from 'services/institute';
import { Checkbox, Chip, Link } from '@mui/material';
import { ArrowRight2, Edit2 } from 'iconsax-react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import Pagination from 'components/ui/Pagination';
import { MenuIcon } from 'assets/svg/menu';
import Popover from 'components/ui/Popover';
import { ProfileIcon } from 'assets/svg/profile';
import AnimateButton from 'components/@extended/AnimateButton';
import Modal from 'components/ui/Modal';
import { openSnackbar } from 'api/snackbar';
import TableLoading from 'components/ui/TableLoading';
import Avatar from 'components/@extended/Avatar';
import EmptyTable from 'components/ui/EmptyTable';
import Filter from 'components/ui/Filter';

interface CollegeTableProps {
  setInstituteId: any;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  instituteRecords: any;
  getAllInstitutes: any;
  loading: boolean;
  startIndex: any;
  setStartIndex: any;
  viewPage: number;
  setViewPage: any;
}

const CollegeListTable = ({
  setIsModalOpen,
  setInstituteId,
  instituteRecords,
  getAllInstitutes,
  loading,
  startIndex,
  setStartIndex,
  viewPage,
  setViewPage
}: CollegeTableProps) => {
  const theme = useTheme();
  //table
  const [columnVisibility, setColumnVisibility] = useState({});

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const rowsPerPage = Number(searchParams.get('rows_per_page') || 10);

  const [isActionOpen, setIsActionOpen] = useState<any>({ id: '', status: '' });
  const [selectedIds, setSelectedIds] = useState<any>([]);

  const options = (id: any, status: string) => [
    {
      value: 'Update Status',
      content: () => setIsActionOpen({ id: id, status: status })
    },
    {
      value: 'Edit',
      content: () => setIsModalOpen(true)
    }
  ];

  const toggleSingleRowSelection = (id: number) => {
    setSelectedIds((prevSelectedIds: any) => {
      const isSelected = prevSelectedIds?.includes(id);
      if (isSelected) {
        return prevSelectedIds?.filter((selectedId: any) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  console.log('selectedIds', selectedIds);

  const columns = [
    {
      id: 'select',

      header: ({ table }: any) => (
        <Checkbox
          indeterminate={
            typeof table.getIsAllRowsSelected() === 'boolean' && !table.getIsAllRowsSelected() && table.getIsSomeRowsSelected()
          }
          onChange={() => {
            table.getToggleAllRowsSelectedHandler();
          }}
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          indeterminate={typeof row.getIsSomeSelected() === 'boolean' && !row.getIsSomeSelected() && row.getIsSomeSelected()}
          onChange={() => {
            row.getToggleSelectedHandler();
            toggleSingleRowSelection(row.original.id);
          }}
          checked={selectedIds.includes(row.original.id)}
          disabled={!row.getCanSelect()}
        />
      )
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }: any) => (
        <Stack direction={'row'} alignItems={'center'} width={'195px'}>
          <Avatar sx={{ bgcolor: 'black', color: 'white', fontWeight: '500', height: 22, width: 22, textTransform: 'capitalize' }}>
            {row?.original?.name?.charAt(0)}
          </Avatar>
          <Typography sx={{ ml: 1, fontSize: '12px', color: theme.palette.primary.main, textTransform: 'capitalize' }}>
            {' '}
            {row?.original?.name?.length > 23 ? `${row?.original?.name?.slice(0, 23)}...` : row?.original?.name}
          </Typography>
        </Stack>
      )
    },

    {
      header: 'Direct / 3rd Party',
      accessorKey: 'is_third_party',
      cell: (cell: any) => {
        return (
          <div
            style={{
              width: '100px'
            }}
          >
            {cell?.row?.original?.is_third_party ? '3rd Party' : 'Direct'}
          </div>
        );
      }
    },
    {
      header: 'Country',
      accessorKey: 'country',
      cell: (cell: any) => {
        return <div>{cell?.row?.original?.country || 'N/A'}</div>;
      }
    },
    {
      header: 'Province / State',
      accessorKey: 'state',
      cell: (cell: any) => {
        return (
          <div
            style={{
              width: '100px'
            }}
          >
            {cell?.row?.original?.state || 'N/A'}
          </div>
        );
      }
    },
    {
      header: 'Campus City',
      accessorKey: 'campus',
      cell: (cell: any) => {
        return (
          <div
            style={{
              width: '100px'
            }}
          >
            {cell?.row?.original?.campus || 'N/A'}
          </div>
        );
      }
    },
    // {
    //   header: 'Intakes',
    //   accessorKey: 'intakes',
    //   cell: (cell: any) => {
    //     return (
    //       <div
    //         style={{
    //           width: '150px'
    //         }}
    //       >
    //         {cell?.row?.original?.intakes?.slice(0, 20) || 'N/A'}
    //       </div>
    //     );
    //   }
    // },
    {
      header: 'Website',
      accessorKey: 'website',
      cell: (cell: any) => {
        return (
          <div
            style={{
              width: '180px'
            }}
          >
            {cell?.row?.original?.website?.slice(0, 30) || 'N/A'}
          </div>
        );
      }
    },
    {
      header: 'Applications',
      accessorKey: 'applications',
      id: 'application',
      cell: (cell: any) => (
        <Box display={'flex'} justifyContent={'center'}>
          <Avatar sx={{ color: '#394663', bgcolor: '#C8D7F7', height: 28, width: 28, fontSize: '14px' }}>
            {cell?.row?.original?.applications || 0}
          </Avatar>
        </Box>
      )
    },
    {
      header: 'Status',
      accessorKey: 'is_active',
      cell: (cell: any) => {
        return (
          <div
            style={{
              width: '100px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Chip
              label={cell?.row?.original?.is_active ? 'Active' : 'Inactive'}
              variant="light"
              size="small"
              sx={{
                borderRadius: 4,
                height: 18
              }}
              color={cell?.row?.original?.is_active ? 'primary' : 'error'}
            />
            {/* {cell?.row?.original?.is_active ? 'Active' : 'Inactive'} */}
          </div>
        );
      }
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (cell: any) => {
        return (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <MenuList
                option={options(cell?.row?.original?.id, cell?.row?.original?.is_active)}
                onClick={() => {
                  setInstituteId(cell?.row?.original?.id);
                }}
              />
            </Box>
          </>
        );
      }
    },
    {
      header: '',
      id: 'profile',
      accessorKey: '',
      cell: (cell: any) => {
        console.log('cell', cell);
        return (
          <Link component={RouterLink} to={`/college/${cell?.row?.original?.id}`} color="text.primary">
            <ArrowRight2 size={'18'} />
          </Link>
        );
      }
    }
  ];

  const handleUpdateStatus = () => {
    updateInstitute({
      pathParams: { id: isActionOpen?.id },
      body: {
        is_active: !isActionOpen?.status
      }
    })
      ?.then((res: any) => {
        setIsActionOpen({ id: '', status: '' });
        getAllInstitutes();
        openSnackbar({
          open: true,
          message: 'Status updated!',
          variant: 'alert',
          alert: {
            color: 'success'
          }
        } as any);
      })
      ?.catch((err) => {});
  };

  console.log('isActionOpen', isActionOpen);
  const table = useReactTable({
    data: instituteRecords?.rows || [],
    columns: columns,
    state: {
      columnVisibility
    },
    // rowCount: 400,
    // getPaginationRowModel:,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
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
    <Box>
      <MainCard content={false}>
        <ScrollX sx={{ marginTop: 2 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        {...header.column.columnDef.meta}
                        sx={{ fontSize: '11px', paddingY: '4px', textTransform: 'none', fontWeight: '600' }}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                  <TableRow key={headerGroup.id} sx={{ bgcolor: 'white' }}>
                    {headerGroup.headers
                      .filter((val: any) => {
                        return val?.id !== 'action';
                      })
                      ?.map((header: any) => (
                        <TableCell key={header.id} {...header.column.columnDef.meta}>
                          {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody sx={{ height: table.getRowModel().rows?.length == 0 ? '300px' : 'auto' }}>
                {loading ? (
                  <TableLoading columns={columns} viewPage={viewPage} />
                ) : table.getRowModel().rows?.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          {...cell.column.columnDef.meta}
                          sx={{ fontSize: '12px', textAlign: cell?.column?.id == 'application' ? 'center' : 'left', paddingY: '2px' }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length}>
                      <EmptyTable msg="No Data" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollX>
        <Divider />
        <Box sx={{ pb: 1, pt: 2, px: 2 }}>
          <TablePagination
            totalCount={instituteRecords?.count}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            viewPage={viewPage}
            setViewPage={setViewPage}
          />
        </Box>
      </MainCard>
      <Modal
        open={isActionOpen?.id !== ''}
        maxWidth="xs"
        titleVariant="h6"
        title={`Are you sure you want to change status to ${isActionOpen?.status ? 'inactive' : 'active'}?`}
        sx={{
          '& .MuiDialog-paper': { p: 0, minWidth: { xl: 300, sm: 'calc(100% - 80%)' } },
          '& .MuiBackdrop-root': { opacity: '0.5 !important' }
        }}
      >
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
            <AnimateButton>
              <Button
                size="small"
                type="submit"
                variant="outlined"
                color="primary"
                onClick={() => setIsActionOpen({ id: '', status: false })}
              >
                Cancel
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button size="small" type="submit" variant="contained" color="primary" onClick={handleUpdateStatus}>
                Confirm
              </Button>
            </AnimateButton>
          </Stack>
        </Grid>
      </Modal>
    </Box>
  );
};

export default CollegeListTable;
