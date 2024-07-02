import Modal from 'components/ui/Modal';
import { Button, Grid, Stack, Switch } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import Input from 'components/ui/Input';
import { ArrowRight, InfoCircle } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Section } from 'pages/profile/roleManager';
import { useEffect, useState } from 'react';
import { addPermission, addRole, fetchSinglePermission, fetchSingleRole, updatePermission, updateRole } from 'services/roleAndPermission';
import { LoadingButton } from '@mui/lab';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { useRole } from 'hooks/useAuth';
import { fontWeight } from '@mui/system';
import { RoleApplication, RoleInstitute, RolePayment, RoleStaff, RoleStudent } from 'assets/svg/Role';

const CreateRolePermission = ({ isVisible, setIsVisible, role_id, setRole_id, getAllRoles }: any) => {
  const values = {
    view_student: false,
    edit_student: false,
    create_student: false,
    delete_student: false,
    view_application: false,
    edit_application: false,
    create_application: false,
    delete_application: false,
    view_college: false,
    edit_college: false,
    create_college: false,
    delete_college: false,
    view_payment: false,
    view_commission: false,
    request_withdraw: false,
    invite_staff: false,
    delete_staff: false,
    add_edit_role: false
  };

  const [permissions, setPermissions] = useState<any>(values);
  const [loading, setLoading] = useState(false);
  const { FetchRoles }: any = useRole();
  const formSchema = z.object({
    name: z.string().min(1, 'Please enter title')
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    reset
  }: any = useForm({
    defaultValues: {
      name: ''
    },
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (role_id)
      fetchSingleRole({
        pathParams: {
          role_id
        }
      })?.then((res) => {
        setValue('name', res?.name);
        setPermissions({
          view_student: res?.view_student,
          edit_student: res?.edit_student,
          create_student: res?.create_student,
          delete_student: res?.delete_student,
          view_application: res?.view_application,
          edit_application: res?.edit_application,
          create_application: res?.create_application,
          delete_application: res?.delete_application,
          view_college: res?.view_college,
          edit_college: res?.edit_college,
          create_college: res?.create_college,
          delete_college: res?.delete_college,
          view_payment: res?.view_payment,
          view_commission: res?.view_commission,
          request_withdraw: res?.request_withdraw,
          invite_staff: res?.invite_staff,
          delete_staff: res?.delete_staff,
          add_edit_role: res?.add_edit_role
        });
      });
  }, [role_id]);

  const onSubmit = (data: any) => {
    setLoading(true);
    if (role_id) {
      updateRole({
        body: { ...data, ...permissions, is_owner_role: true, is_recruiter_role: false },
        pathParams: { id: role_id }
      })
        ?.then((res) => {
          openSnackbar({
            open: true,
            message: 'Role Updated ',
            variant: 'alert',
            alert: {
              color: 'success'
            }
          } as SnackbarProps);
          reset({ name: '' });
          getAllRoles();
          FetchRoles();
          setLoading(false);
          setIsVisible(false);
          setRole_id();
          setPermissions(values);
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
    } else {
      addRole({
        body: { ...data, is_owner_role: true, ...permissions, is_recruiter_role: false }
      })
        ?.then((res: any) => {
          openSnackbar({
            open: true,
            message: 'Role Created',
            variant: 'alert',
            alert: {
              color: 'success'
            }
          } as SnackbarProps);

          reset({ name: '' });
          getAllRoles();
          FetchRoles();
          setLoading(false);
          setIsVisible(false);
          setPermissions(values);
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
    }
  };

  const CheckBox = ({ title, description, name }: { title: string; description: string; name: string }) => (
    <Box
      sx={{
        borderBottom: '2px solid #C8D7F7',
        padding: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        gap: 10
      }}
    >
      <Stack>
        <Typography sx={{ color: '#292929', fontWeight: 400, fontSize: '16px' }}>{title}</Typography>
        <Typography variant="caption" fontSize={'12px'} fontWeight={400} color={'#5A667B'}>
          {description}
        </Typography>
      </Stack>

      <Stack direction={'row'} gap={4}>
        <Switch
          name={name}
          checked={permissions[name]}
          size="small"
          onChange={(e) => {
            setPermissions((prevPermissions: any) => ({
              ...prevPermissions,
              [name]: e.target.checked
            }));
          }}
        />
      </Stack>
    </Box>
  );

  return (
    <Modal
      open={isVisible}
      handleClose={() => {
        setIsVisible(false);
        reset({ name: '' });
        setRole_id();
        setPermissions(values);
      }}
      handleSubmit={() => {}}
      maxWidth="md"
      closeIcon
      title={role_id ? 'Update Role' : 'Create New Role'}
      sx={{
        '& .MuiDialog-paper': { p: 0, minWidth: { xl: 800, sm: 'calc(100% - 20%)' } },
        '& .MuiBackdrop-root': { opacity: '0.5 !important' }
      }}
      footerActions={
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} justifyContent="end" alignItems="center" gap={1}>
            <Button
              size="medium"
              type="submit"
              variant="outlined"
              color="primary"
              onClick={() => {
                setIsVisible(false);
                reset({ name: '' });
                setRole_id();
                setPermissions(values);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              size="medium"
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<ArrowRight />}
              onClick={handleSubmit(onSubmit)}
            >
              {role_id ? 'Update' : 'Add'}
            </LoadingButton>
          </Stack>
        </Grid>
      }
    >
      <Box sx={{ marginBottom: 2 }}>
        <Typography color={'#394663'} fontSize={'15px'} fontWeight={600}>
          BASIC DETAILS
        </Typography>
        <Typography color={'#737D98'} fontSize={'12px'}>
          Add basic details about this role you’re creating
        </Typography>

        <form noValidate>
          <Grid container spacing={3} paddingTop={1}>
            <Grid item xs={12}>
              <Input label="Title" error={errors} name={'name'} control={control} placeholder="Enter title" />
            </Grid>
          </Grid>
        </form>
      </Box>

      <Typography fontSize={'16px'} fontWeight={600} color={'#394663'}>
        Set Permission
      </Typography>
      <Typography variant="caption" color={'#737D98'} fontSize={'12px'}>
        Modify what individuals on this role can do
      </Typography>
      <Box sx={{ border: '1px solid #C8D7F7', borderRadius: 1, marginTop: 2 }}>
        <Section title="Student Management" icon={<RoleStudent />} />
        <CheckBox
          name="view_student"
          title="View Students"
          description="Access to view details of enrolled students, including personal information and immigration status."
        />
        <CheckBox
          name="edit_student"
          title="Edit Students"
          description="Permission to update student profiles, contact information, and immigration documents."
        />
        <CheckBox name="create_student" title="Create New Student" description="Ability to create new student profiles in the system." />
        <CheckBox name="delete_student" title="Delete Students" description="Ability to remove student records from the system." />

        <Section title="Application Management" icon={<RoleApplication />} />
        <CheckBox
          name="view_application"
          title="View Applications"
          description="Access to view details of student applications including application status, documents, and communication history."
        />
        <CheckBox
          name="edit_application"
          title="Edit Applications"
          description="Permission to update application information, review application materials"
        />
        <CheckBox
          name="create_application"
          title="Create New Applications"
          description="Permission to create new immigration applications on behalf of students."
        />
        <CheckBox
          name="delete_application"
          title="Process Applications"
          description="Ability to initiate, track the processing of applications and update timeline, including submitting forms, monitoring deadlines and communication."
        />

        <Section title="Institute Management" icon={<RoleInstitute />} />
        <CheckBox
          name="view_college"
          title="View Colleges/Institutes"
          description="Access to view details of partner colleges or institutes"
        />
        <CheckBox
          name="edit_college"
          title="Edit Colleges/Institutes"
          description="Permission to update college or institute information, including contact details, program offerings"
        />
        <CheckBox
          name="create_college"
          title="Add Colleges/Institutes"
          description="Permission to create new college or institute profiles in the system, including entering details such as name, location, contact information, and program offerings."
        />
        <CheckBox
          name="delete_college"
          title="Delete Colleges/Institutes"
          description="Ability to remove college or institute records from the system"
        />

        <Section title="Payment Management" icon={<RolePayment />} />
        <CheckBox
          name="view_payment"
          title="View Payments"
          description="Access to view payment records, invoices, and transaction history for student fees and immigration services."
        />
        <CheckBox
          name="view_commission"
          title="View Commissions"
          description="Access to view commission records, including details of enrol credits, payout dates, and commission rates."
        />
        <CheckBox
          name="request_withdraw"
          title="Request Withdraw"
          description="Permission to request the withdrawal of commission payments, initiating the process for transferring commission earnings to their designated bank accounts."
        />

        <Section title="Staff Management" icon={<RoleStaff />} />
        <CheckBox name="invite_staff" title="Invite Staff" description="Permission to send invitations to new staff members" />
        <CheckBox
          name="delete_staff"
          title="Delete Staff"
          description="Ability to remove staff member profiles from the system, including all associated data such as permissions and access rights."
        />

        <CheckBox name="add_edit_role" title="Can Add/Edit Roles" description="This enables access for modifying and creating roles." />
      </Box>
    </Modal>
  );
};

export default CreateRolePermission;
