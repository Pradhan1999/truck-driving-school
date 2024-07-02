// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DocumentCode2, Home, Home2 } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  dashboard: Home
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const dashboard: NavItemType = {
  id: 'Dashboard',
  title: <FormattedMessage id="Dashboard" />,
  type: 'group',
  url: '/dashboard',
  icon: icons.dashboard
};

export default dashboard;
