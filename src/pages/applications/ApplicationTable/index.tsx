import { useEffect, useState } from 'react';

// material-ui
import { Avatar, Checkbox, IconButton, MenuItem, Select, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Stack, useTheme } from '@mui/material';
import { Divider } from '@mui/material';

// third-party
import { flexRender, useReactTable, HeaderGroup, getCoreRowModel } from '@tanstack/react-table';
import { useNavigate } from 'react-router';
import { Add } from 'iconsax-react';

// project import
import ScrollX from 'components/ScrollX';
import Pagination from 'components/ui/Pagination';
import { MenuDots } from 'assets/svg/MenuDots';

const ApplicationTable = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [columnVisibility, setColumnVisibility] = useState({});

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
          onClick={(e) => e.stopPropagation()}
        />
      )
    },
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
      minSize: 80
    },
    {
      header: 'First Name',
      accessorKey: 'firstName'
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName'
    },
    {
      header: 'Program',
      accessorKey: 'program',
      minSize: 280,
      cell: ({ cell }: any) => (
        <Typography variant="inherit" color={theme.palette.primary.main}>
          {cell?.row?.original?.program}
        </Typography>
      )
    },
    {
      header: 'School',
      accessorKey: 'school',
      id: 'school',
      minSize: 120
    },
    {
      header: 'Assignee',
      accessorKey: 'assignee',
      id: 'assignee',
      cell: ({ cell }: any) => (
        <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', gap: 1 }} onClick={(e) => e.stopPropagation()}>
          {<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: '35px', height: '35px' }} />}

          <IconButton aria-label="Add assignee" color="secondary" sx={{ borderRadius: '50%', border: '1px dashed' }} size="small">
            <Add />
          </IconButton>
        </Stack>
      )
    },
    {
      header: 'Start Date',
      accessorKey: 'startDate',
      id: 'startDate',
      minSize: 80
    },
    {
      header: 'Status',
      accessorKey: 'status',
      id: 'status',
      minSize: 80,
      cell: ({ cell }: any) => (
        <Select labelId="select status" size="small" value={10} onClick={(e) => e.stopPropagation()}>
          <MenuItem value={10}>Ready for Visa</MenuItem>
          <MenuItem value={20}>Application Started</MenuItem>
          <MenuItem value={30}>New Lead</MenuItem>
        </Select>
      )
    },
    {
      header: 'Requirements',
      accessorKey: 'requirements',
      id: 'requirements'
    },
    {
      header: 'Current Stage',
      accessorKey: 'currentStage',
      id: 'currentStage'
    },
    {
      header: '',
      id: 'action',
      accessorKey: '',
      cell: (cell: any) => {
        return (
          <Stack sx={{ display: 'flex', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
            <MenuDots />
          </Stack>
        );
      }
    }
  ];

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
                        onClick={() => navigate(`/applications/${cell?.row?.original?.appId}`)}
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
            <Pagination total={20} />
          </Box>
        </Stack>
      </ScrollX>
    </>
  );
};

export default ApplicationTable;

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
    appId: '4199161',
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
    appId: '4199162',
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
    appId: '4199163',
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
    appId: '4199164',
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
    appId: '4199165',
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
