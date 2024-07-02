import { Checkbox, Chip, Link } from '@mui/material';
import { ProfileIcon } from 'assets/svg/profile';
import Avatar from 'components/@extended/Avatar';
import MenuList from 'components/ui/menuList';
import { ArrowRight2, Edit } from 'iconsax-react';
import { Link as RouterLink } from 'react-router-dom';

const options = [
  {
    icon: <ProfileIcon />,
    value: 'Profile'
    // content: () => setOpen(true)
  }
];

export const columns = [
  {
    id: 'select',

    header: ({ table }: any) => (
      <Checkbox
        indeterminate={typeof table.getIsAllRowsSelected() === 'boolean' && !table.getIsAllRowsSelected() && table.getIsSomeRowsSelected()}
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
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }: any) => <Avatar sx={{ bgcolor: 'black', color: 'white', fontWeight: '500' }}>{row?.original?.name?.charAt(0)}</Avatar>
  },
  {
    header: 'Direct / 3rd Party',
    accessorKey: 'is_third_party'
    // cell: (cell: any) => {
    //   console.log('rowsssssssss', cell?.row?.original);
    //   return <div>{cell?.row?.original?.is_third_party ? 'sdsd' : 'sdsdsdsd'}</div>;
    // }
  },
  {
    header: 'Country',
    accessorKey: 'country'
  },
  {
    header: 'Province / State',
    accessorKey: 'state'
  },
  {
    header: 'Intakes',
    accessorKey: 'intakes'
  },
  {
    header: 'Website',
    accessorKey: 'website'
  },
  {
    header: 'Applications',
    accessorKey: 'applications',
    id: 'application',
    cell: (cell: any) => <Chip color="primary" label={cell?.row?.original?.applications} size="small" variant="light" />
  },
  {
    header: 'Commission',
    accessorKey: 'commission',
    id: 'commision'
  },
  {
    header: 'Action',
    accessorKey: 'action',
    cell: (cell: any) => {
      return <MenuList option={options} />;
    }
  },
  {
    header: '',
    id: 'profile',
    accessorKey: '',
    cell: (cell: any) => {
      return (
        <Link component={RouterLink} to={`/college/:${cell?.row?.original?.applications}`} color="text.primary">
          <ArrowRight2 size={'18'} />
        </Link>
      );
    }
  }
];
export const data = [
  {
    name: 'Canadore College',
    type: 'Direct',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024', 'Spring 2025'],
    website: 'www.canadore.com',
    applications: 20,
    commission: '12%',
    dliNumber: 12,
    instituteType: 'Public'
  },
  {
    name: 'Rajdeep',
    type: '3rd Party',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024'],
    website: 'www.canadore.com',
    applications: 12,
    commission: '10%'
  },
  {
    name: 'Areeb',
    type: 'Direct',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024'],
    website: 'www.canadore.com',
    applications: 24,
    commission: '20%'
  },
  {
    name: 'Gurpreet',
    type: '3rd Party',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024', 'Spring 2025'],
    website: 'www.canadore.com',
    applications: 8,
    commission: '22%'
  },
  {
    name: 'Gurpreet',
    type: 'Direct',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024', 'Spring 2025'],
    website: 'www.canadore.com',
    applications: 20,
    commission: '12%'
  },
  {
    name: 'Rajdeep',
    type: '3rd Party',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024'],
    website: 'www.canadore.com',
    applications: 12,
    commission: '10%'
  },
  {
    name: 'Areeb',
    type: 'Direct',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024'],
    website: 'www.canadore.com',
    applications: 24,
    commission: '20%'
  },
  {
    name: 'Gurpreet',
    type: '3rd Party',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024', 'Spring 2025'],
    website: 'www.canadore.com',
    applications: 8,
    commission: '22%'
  },
  {
    name: 'Gurpreet',
    type: 'Direct',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024', 'Spring 2025'],
    website: 'www.canadore.com',
    applications: 20,
    commission: '12%'
  },
  {
    name: 'Rajdeep',
    type: '3rd Party',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024'],
    website: 'www.canadore.com',
    applications: 12,
    commission: '10%'
  },
  {
    name: 'Areeb',
    type: 'Direct',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024'],
    website: 'www.canadore.com',
    applications: 24,
    commission: '20%'
  },
  {
    name: 'Gurpreet',
    type: '3rd Party',
    country: 'Canada',
    province: 'Alberta',
    campusCity: 'Calgary',
    intakes: ['Fall 2024', 'Spring 2025'],
    website: 'www.canadore.com',
    applications: 8,
    commission: '22%'
  }
];
