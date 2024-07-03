import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Chip, Drawer, Tab, Typography } from '@mui/material';

// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// third-party
import {
  flexRender,
  useReactTable,
  HeaderGroup,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedMinMaxValues
} from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import { Stack, useTheme } from '@mui/material';
import { Divider } from '@mui/material';
import TablePagination from 'components/third-party/TablePagination';
import SelectColumnVisibility from 'components/third-party/SelectColumnVisibility';
import Filter from 'components/Filter/Filter';
import { getFacetedRowModel } from '@tanstack/react-table';
import { getFacetedUniqueValues } from '@tanstack/react-table';
import MainCard from 'components/MainCard';
import TableLoading from 'components/ui/TableLoading';
import { getAllStudent } from 'services/student';
import MenuList from 'components/ui/menuList';
import { useNavigate } from 'react-router';
import { ProfileIcon } from 'assets/svg/profile';
import { Edit, Edit2 } from 'iconsax-react';

const StudentTable = ({ drawer, setDrawer }: any) => {
  const theme = useTheme();
  const [value, setValue] = useState('Columns');
  const navigate = useNavigate();
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [studentData, setStudentData] = useState<any>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(10);
  const [loading, setLoading] = useState(false);

  console.log('studentData', studentData);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const options = (id: any) => [
    {
      icon: <ProfileIcon />,
      value: 'Edit',
      content: () => navigate(`/student/${id}/personalInformation`)
    }
  ];
  const columns = useMemo(
    () => [
      {
        header: 'Student ID',
        accessorKey: 'id',
        minSize: 60,
        cell: ({ cell }: any) => (
          <Typography variant="inherit" color={theme.palette.primary.main}>
            {cell?.row?.original?.id}
          </Typography>
        )
      },
      {
        header: 'Student Email',
        accessorKey: 'email',
        minSize: 120,
        cell: ({ cell }: any) => (
          <Typography variant="inherit" sx={{ textTransform: 'lowercase' }} color={theme.palette.primary.main}>
            {cell?.row?.original?.email}
          </Typography>
        )
      },
      {
        header: 'First Name',
        accessorKey: 'first_name',
        minSize: 80
      },
      {
        header: 'Last Name',
        accessorKey: 'last_name',
        minSize: 80
      },
      {
        header: 'Nationality',
        accessorKey: 'country',
        minSize: 60,
        cell: (cell: any) => cell?.row?.original?.country || 'N/A'
      },
      {
        header: 'Education',
        accessorKey: 'education',
        minSize: 100,
        cell: (cell: any) => cell?.row?.original?.education || 'N/A'
      },
      {
        header: 'Applications',
        accessorKey: 'applications',
        id: 'application',
        minSize: 80,
        cell: (cell: any) => (
          <Box display={'flex'} ml={2}>
            <Avatar sx={{ color: '#394663', bgcolor: '#C8D7F7', height: 28, width: 28, fontSize: '14px' }}>
              {cell?.row?.original?.applications || 0}
            </Avatar>
          </Box>
        )
      },
      {
        header: 'Reruiter',
        accessorKey: 'reruiter',
        minSize: 80,
        cell: ({ cell }: any) => (
          <Stack direction="row" sx={{ display: 'flex' }}>
            {<Avatar alt="Meet" src="/static/images/avatar/1.jpg" sx={{ width: '25px', height: '25px' }} />}

            <Typography>{cell?.row?.original?.reruiter}</Typography>
          </Stack>
        )
      },

      {
        header: 'Stage',
        accessorKey: 'stage',
        minSize: 60,
        cell: (cell: any) => cell?.row?.original?.stage || 'N/A'
      },
      {
        header: 'Action',
        accessorKey: 'action',
        minSize: 60,
        cell: (cell: any) => {
          return (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  cursor: 'pointer'
                }}
              >
                <MenuList option={options(cell?.row?.original?.id)} />
              </Box>
            </>
          );
        }
      }
    ],
    []
  );

  const table = useReactTable({
    data: studentData?.rows || [],
    columns,
    state: {
      columnVisibility,
      columnFilters
    },

    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  });

  // useEffect(() => setColumnVisibility({ id: false, role: false, contact: false, country: false }), []);

  let headers: any[];

  table.getVisibleLeafColumns()?.map((columns) =>
    headers?.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  const tabs = [
    {
      label: 'Columns',
      value: 'Columns',
      content: (
        <SelectColumnVisibility
          {...{
            getVisibleLeafColumns: table.getVisibleLeafColumns,
            getIsAllColumnsVisible: table.getIsAllColumnsVisible,
            getToggleAllColumnsVisibilityHandler: table.getToggleAllColumnsVisibilityHandler,
            getAllColumns: table.getAllColumns
          }}
        />
      )
    }
  ];

  const fetchAllStudent = () => {
    setLoading(true);
    getAllStudent({ query: { limit: viewPage, start: startIndex, search: '' } })?.then((res) => {
      setStudentData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAllStudent();
  }, [viewPage, startIndex]);

  return (
    <div>
      <MainCard content={false}>
        <ScrollX sx={{ marginTop: 1.3 }}>
          <Stack>
            <TableContainer>
              <Table sx={{ padding: '16px' }}>
                <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                  {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell
                          key={header.id}
                          width={250}
                          {...header.column.columnDef.meta}
                          sx={{ fontSize: '11px', paddingY: '12px', textTransform: 'none', fontWeight: '600' }}
                        >
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableLoading columns={columns} viewPage={5} />
                  ) : table.getRowModel().rows?.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            {...cell.column.columnDef.meta}
                            sx={{
                              fontSize: '12px',
                              textAlign: 'left',
                              paddingY: '8px',
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
                    <Stack direction={'row'} justifyContent={'center'} width={'100%'} py={'8px'}>
                      <TableRow sx={{ color: 'gray', fontSize: '18px', opacity: 0.5, textAlign: 'center' }}>No Data Found!</TableRow>
                    </Stack>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider />
            <Box sx={{ p: 2 }}>
              <TablePagination
                totalCount={studentData?.count}
                startIndex={startIndex}
                setStartIndex={setStartIndex}
                viewPage={viewPage}
                setViewPage={setViewPage}
              />
            </Box>
          </Stack>
        </ScrollX>
      </MainCard>

      <Drawer
        open={drawer}
        onClose={() => {
          setDrawer(false);
        }}
        anchor="right"
        title=""
      >
        <Stack sx={{ width: 300 }}>
          <Stack py={2.4} sx={{ fontWeight: 600, ml: 2 }}>
            Filter (Hide/Show Columns)
          </Stack>
          <Divider />
          <TabContext value={value}>
            <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Box>

            {tabs?.map((tab) => (
              <TabPanel key={tab.value} value={tab.value} sx={{ p: 0 }}>
                {tab.content}
              </TabPanel>
            ))}
          </TabContext>
        </Stack>
      </Drawer>
    </div>
  );
};

export default StudentTable;
const data = [
  {
    studentId: 9899,
    studentEmail: 'deep@gmail.com',
    firstName: 'deep',
    lastName: 'singh',
    nationality: 'indian',
    education: 'High School (India)',
    applications: 32,
    reruiter: 'meet',
    stage: 'Addmission'
  }
];