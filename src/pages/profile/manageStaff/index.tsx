import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import Input from 'components/ui/Input';
import Dropdown from 'components/ui/Dropdown';
import ScrollX from 'components/ScrollX';
import { useTheme } from '@mui/material';
import { HeaderGroup, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { pendingStaffColumns } from './columns';
import ApprovedStaffTable from 'components/profile/approvedStaffTable';
import errorMap from 'zod/lib/locales/en';
import { GetAllStaff, inviteStaff } from 'services/staff';
import { openSnackbar } from 'api/snackbar';
import { LoadingButton } from '@mui/lab';
import { useRole } from 'hooks/useAuth';
import { InfoCircle } from 'iconsax-react';
import { SnackbarProps } from 'types/snackbar';
import TablePagination from 'components/third-party/TablePagination';
import TableLoading from 'components/ui/TableLoading';

const ManageStaff = () => {
  const [StaffData, setStaffData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(10);
  const [tableLoading, setTableLoading] = useState(false);

  const theme = useTheme();

  const { roles }: any = useRole();
  const formSchema = z.object({
    first_name: z.string().min(2, { message: 'Please Enter FirstName' }),
    last_name: z.string().min(2, { message: 'Please Enter LastName' }),
    phone: z.string().min(2, { message: 'Please Enter Phone' }),
    email: z.string().min(2, { message: 'Please Enter Email' }).email('This is not a valid email.'),
    role_id: z.number().min(1, { message: 'Please Select Role' })
  });

  const defaultValues = { first_name: '', last_name: '', phone: '', email: '', role_id: [] };
  const {
    formState: { errors },
    control,
    handleSubmit,
    reset
  }: any = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(formSchema)
  });

  const fetchAllStaff = () => {
    setTableLoading(true);
    GetAllStaff({ query: { limit: viewPage, start: startIndex, is_active: false } })?.then((res) => {
      setTableLoading(false);
      setStaffData(res);
    });
  };

  useEffect(() => {
    fetchAllStaff();
  }, [viewPage, startIndex]);

  const onSubmit = (data: any) => {
    setLoading(true);
    inviteStaff({ body: { ...data } })
      ?.then((res) => {
        if (res?.staff_id) {
          reset(defaultValues);
          setLoading(false);
          fetchAllStaff();
          openSnackbar({
            open: true,
            message: 'Invite Send successfully.',
            variant: 'alert',
            alert: {
              color: 'success'
            }
          } as SnackbarProps);
        }
      })
      .catch((err) => {
        setLoading(false);
        openSnackbar({
          open: true,
          message: err?.data?.message || 'Something went wrong',
          variant: 'alert',
          alert: {
            color: 'error',
            icon: <InfoCircle />
          },
          transition: 'SlideDown',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        } as SnackbarProps);
      });
  };

  const pendingStaffTable = useReactTable({
    data: StaffData?.rows || [],
    columns: pendingStaffColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  const staffRoles = [
    {
      label: 'Admin',
      value: 'admin'
    },
    {
      label: 'Manager',
      value: 'manager'
    },
    {
      label: 'Counselor',
      value: 'counselor'
    },
    {
      label: 'Supervisor',
      value: 'supervisor'
    }
  ];
  return (
    <Grid xs={12}>
      <Stack spacing={2}>
        {/* Invite staff form card */}
        <MainCard title={<Typography sx={{ fontSize: '19px', color: '#394663', fontWeight: '600' }}>Invite Staff Members</Typography>}>
          <Grid item xs={12}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction={'row'} xs={12} spacing={2}>
                <Grid item xs={4}>
                  <Input control={control} label={'First Name'} name={'first_name'} placeholder="Enter firstname" error={errors} />
                </Grid>
                <Grid item xs={4}>
                  <Input control={control} label={'Last Name'} name={'last_name'} placeholder="Enter lastname" error={errors} />
                </Grid>
                <Grid item xs={4}>
                  <Input control={control} label={'Mobile No.'} name={'phone'} placeholder="Enter mobile no." error={errors} />
                </Grid>
                <Grid item xs={8}>
                  <Input control={control} label={'Email'} name={'email'} placeholder="Enter email" error={errors} />
                </Grid>
                <Grid item xs={4}>
                  <Dropdown
                    control={control}
                    placeholder="Select role"
                    label="Role"
                    name="role_id"
                    options={roles?.map((ite: any) => {
                      return {
                        label: ite?.name,
                        value: ite?.id
                      };
                    })}
                    error={errors}
                  />
                </Grid>
                <Stack direction="row" justifyContent="flex-end" width="100%">
                  <LoadingButton size="small" loading={loading} type="submit" variant="contained">
                    Send Invite
                  </LoadingButton>
                </Stack>
              </Grid>
            </form>
          </Grid>
        </MainCard>
        {/* Pending requests table */}
        <MainCard
          content={false}
          title={<Typography sx={{ fontSize: '19px', color: '#394663', fontWeight: '600' }}>Invited Staff Members</Typography>}
        >
          <Stack sx={{ padding: 2 }}>
            <MainCard content={false}>
              <ScrollX>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: theme.palette.primary.lighter }}>
                      {pendingStaffTable?.getHeaderGroups()?.map((headerGroup: HeaderGroup<any>) => (
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
                        <TableLoading columns={pendingStaffColumns} viewPage={viewPage} />
                      ) : (
                        pendingStaffTable.getRowModel().rows.map((row) => (
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
                </TableContainer>
              </ScrollX>
            </MainCard>
          </Stack>
        </MainCard>

        <ApprovedStaffTable />
      </Stack>
    </Grid>
  );
};

export default ManageStaff;
