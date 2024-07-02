import { Checkbox, Chip, Tooltip, Zoom } from '@mui/material';
import { ArrowRight2, Edit, InfoCircle, TickCircle } from 'iconsax-react';

export const columns = (type: string, errors: any) => [
  {
    id: 'select',
    header: '',
    cell: ({ row }: any) => {
      return type == 'success' ? (
        <TickCircle color="green" size={18} />
      ) : type == 'error' ? (
        <Tooltip
          title={errors
            ?.find((val: any) => val?.index === row?.id)
            ?.error?.join(',')
            ?.replaceAll('"', '')}
          placement="top"
          TransitionComponent={Zoom}
          arrow
          style={{
            textTransform: 'capitalize'
          }}
        >
          <InfoCircle color="orange" size={18} />
        </Tooltip>
      ) : null;
    }
  },
  {
    header: 'First Name',
    accessorKey: 'name'
  },

  // {
  //   header: 'Direct / 3rd Party',
  //   accessorKey: 'type'
  // },
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
  // {
  //   header: 'Applications',
  //   accessorKey: 'applications',
  //   id: 'application',
  //   cell: (cell: any) => <Chip color="primary" label={cell?.row?.original?.applications} size="small" variant="light" />
  // },
  {
    header: 'DLI',
    accessorKey: 'DLI',
    id: 'dli'
  }
  // {
  //   header: 'Action',
  //   accessorKey: 'action',
  //   cell: (cell: any) => {
  //     return <Edit size={'18'} />;
  //   }
  // },
  // {
  //   header: '',
  //   id: 'profile',
  //   accessorKey: '',
  //   cell: (cell: any) => {
  //     return <ArrowRight2 size={'18'} />;
  //   }
  // }
];
export const data = [
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
  }
];
