import React, { useMemo, useEffect, useState } from 'react';
import { Avatar, Checkbox, Chip, Skeleton, Typography } from '@mui/material';
import { ArrowRight2 } from 'iconsax-react';
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
import Button from '@mui/material/Button';
import MenuList from 'components/ui/menuList';
import { LockIcon, StyleLockIcon, StyleUnLockIcon, UnLockIcon } from 'assets/svg/lock';
import { ProfileIcon } from 'assets/svg/profile';
import { Modal } from '@mui/material';
import { fetchAllRecruiter } from 'services/recruiter';
import TableLoading from 'components/ui/TableLoading';

const RecruitersTable = ({ value, searchText }: any) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [recruiterStatus, setRecruiterStatus] = useState<string | Boolean>('');
  const [recruiterData, setRecruiterData] = useState<any>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const options = [
    { icon: <ProfileIcon />, value: 'View Profile', content: () => navigate('/manageRecruiters/profile') },
    {
      icon: <ProfileIcon />,
      value: 'Manage Application',
      content: () => navigate('/manageRecruiters/profile')
    },
    {
      icon: recruiterStatus ? <UnLockIcon /> : <LockIcon />,
      color: recruiterStatus ? '#EB5757' : '#18AB56',
      value: recruiterStatus ? 'Deactivate' : 'Active',
      content: () => setOpen(true)
    }
  ];

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const columns = [
    {
      id: 'select',
      header: ({ table }: any) => (
        <Checkbox
          indeterminate={
            typeof table.getIsAllRowsSelected() === 'boolean' && !table.getIsAllRowsSelected() && table.getIsSomeRowsSelected()
          }
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          indeterminate={typeof row.getIsSomeSelected() === 'boolean' && !row.getIsSomeSelected() && row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
        />
      )
    },
    {
      header: 'Recruiter Id',
      accessorKey: 'recruiter_id',
      cell: ({ cell }: any) => (
        <Typography variant="inherit" color={theme.palette.primary.main}>
          {cell?.row?.original?.recruiter_id || 'N/A'}
        </Typography>
      ),
      minSize: 80
    },

    {
      header: 'Name',
      accessorKey: 'name',
      cell: (cell: any) => <>{`${cell?.row?.original?.first_name} ${cell?.row?.original?.last_name} ` || 'N/A'}</>,
      minSize: 120
    },

    {
      header: 'First Name',
      accessorKey: 'first_name',
      minSize: 100
    },
    {
      header: 'Last Name',
      accessorKey: 'last_name',
      minSize: 100
    },

    {
      header: 'Request Date',
      accessorKey: 'requestDate',
      cell: (cell: any) => cell?.row?.original?.requestDate || 'N/A',
      minSize: 80
    },
    {
      header: 'Recruiter Email',
      accessorKey: 'email',
      cell: ({ cell }: any) => (
        <Typography variant="inherit" sx={{ textTransform: 'lowercase' }} color={theme.palette.primary.main}>
          {cell?.row?.original?.email || 'N/A'}
        </Typography>
      ),
      minSize: 120
    },

    {
      header: 'Company',
      accessorKey: 'company_name',
      cell: (cell: any) => cell?.row?.original?.company_name || 'N/A',
      minSize: 120
    },
    {
      header: 'Mobile No.',
      accessorKey: 'mobileNO',
      cell: (cell: any) => cell?.row?.original?.mobileNO || 'N/A',
      minSize: 100
    },

    {
      header: 'Nationality',
      accessorKey: 'nationality',
      meta: { className: 'cell-right' },
      cell: (cell: any) => cell?.row?.original?.nationality || 'N/A',
      minSize: 80
    },
    {
      header: 'Applications',
      accessorKey: 'applications_count',
      id: 'application',
      cell: (cell: any) => (
        <Box display={'flex'} justifyContent={'center'}>
          <Avatar sx={{ color: '#394663', bgcolor: '#C8D7F7', height: 28, width: 28, fontSize: '14px' }}>
            {cell?.row?.original?.applications_count || 0}
          </Avatar>
        </Box>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      meta: { className: 'cell-right' },
      cell: (cell: any) => cell?.row?.original?.status || 'N/A',
      minSize: 80
    },
    {
      header: 'Action',
      id: 'action',
      accessorKey: 'action',
      minSize: 60,
      cell: (cell: any) => {
        return (
          <div>
            {value !== 'pendingRequest' ? (
              <MenuList
                option={options}
                onClick={() => {
                  setRecruiterStatus(cell?.row?.original?.status === 'Active');
                }}
              />
            ) : (
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Button color="success">Approve</Button>
                <Button color="error">Decline</Button>
              </Stack>
            )}
          </div>
        );
      }
    },
    {
      header: '',
      accessorKey: 'resend',
      cell: (cell: any) => {
        return (
          <>
            <Button>Resend</Button>
          </>
        );
      }
    },
    {
      header: '',
      id: 'navigate',
      accessorKey: '',
      cell: (cell: any) => {
        return (
          <ArrowRight2
            style={{ cursor: 'pointer' }}
            size={'18'}
            onClick={() => {
              navigate('/manageRecruiters/profile');
            }}
          />
        );
      }
    }
  ];

  const getAllRecruiter = () => {
    setLoading(true);
    fetchAllRecruiter({ query: { limit: viewPage, start: startIndex, search: searchText } })?.then((res) => {
      setRecruiterData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllRecruiter();
  }, [viewPage, startIndex, searchText]);

  const columnsData = columns?.filter((ele: any) => {
    if (value === 'allRecruiter') {
      return !['first_name', 'last_name', 'requestDate', 'resend']?.includes(ele?.accessorKey);
    }

    if (value === 'pendingRequest') {
      return !['name', 'nationality', 'applications', 'status', 'resend']?.includes(ele?.accessorKey);
    }

    if (value === 'invited') {
      return !['name', 'nationality', 'applications']?.includes(ele?.accessorKey);
    }

    if (value === 'approved') {
      return !['name', 'nationality', 'applications', 'resend']?.includes(ele?.accessorKey);
    }
    return true;
  });

  const table = useReactTable({
    data: recruiterData?.rows || [],
    columns: columnsData,
    state: {
      columnVisibility,
      columnFilters,
      globalFilter
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel()
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
                        sx={{ fontSize: '11px', paddingY: '4px', textTransform: 'none', fontWeight: '600' }}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableLoading columns={columnsData} viewPage={5} />
                ) : table.getRowModel().rows?.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          {...cell.column.columnDef.meta}
                          sx={{
                            fontSize: '12px',
                            textAlign: ['application', 'action']?.includes(cell?.column?.id) ? 'center' : 'left',
                            paddingY: '2px',
                            textTransform: 'capitalize'
                          }}
                        >
                          <Box sx={{ minWidth: cell.column.columnDef.minSize }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <Stack direction={'row'} justifyContent={'center'} width={'100%'}>
                    <TableRow sx={{ color: 'gray', fontSize: '18px', opacity: 0.5, textAlign: 'center' }}>No Data Found!</TableRow>
                  </Stack>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* PAGINATION */}
          <Divider />
          <Box sx={{ p: 2 }}>
            <TablePagination
              totalCount={recruiterData?.count}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              viewPage={viewPage}
              setViewPage={setViewPage}
            />
          </Box>
        </Stack>
      </ScrollX>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box sx={style}>
          <Stack direction={'column'} alignItems={'center'} gap={4}>
            <Stack sx={{ backgroundColor: 'white', borderRadius: 100, boxShadow: 1, padding: 2 }}>
              {recruiterStatus ? <StyleUnLockIcon /> : <StyleLockIcon />}
            </Stack>
            <Stack sx={{ textAlign: 'center' }}>
              <Typography variant="h4">{`${recruiterStatus ? 'Deactivate' : 'Active'} Recruiter`}</Typography>
              <Typography variant="caption" marginTop={1}>
                Are you sure you want to {recruiterStatus ? 'Deactivate' : 'Active'} this recruiter?{' '}
              </Typography>
            </Stack>

            <Stack direction={'row'} gap={2}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Typography>Cancel</Typography>
              </Button>
              <Button variant="contained" color="primary" fullWidth>
                <Typography> Confirm</Typography>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default RecruitersTable;

const data = [
  {
    recuiterId: 98989,
    name: 'Rajdeep Singh',
    recruiterEmail: 'deepraj@gmail.com',
    company: 'upfork',
    firstName: 'akash',
    lastName: 'deep',
    mobileNO: 979898999,
    nationality: 'india',
    applications: '33',
    status: 'Active'
  },
  {
    recuiterId: 98990,
    name: 'deep Singh',
    recruiterEmail: 'deep@gmail.com',
    company: 'pvt ltd',
    applications: '34',
    firstName: 'deep',
    lastName: 'singh',
    mobileNO: 979898999,
    nationality: 'india',
    status: 'Inactive'
  },
  {
    recuiterId: 98991,
    name: 'Rajdeep Singh',
    recruiterEmail: 'deepraj@gmail.com',
    company: 'upfork',
    mobileNO: 979898999,
    firstName: 'meet',
    lastName: 'singh',
    applications: '36',
    nationality: 'india',
    status: 'Active'
  }
];
