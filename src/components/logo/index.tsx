import { Link } from 'react-router-dom';
import { To } from 'history';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import { SxProps } from '@mui/system';
import logo from 'assets/images/app/logo.svg';
// project-imports
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import useAuth from 'hooks/useAuth';
import { APP_DEFAULT_PATH } from 'config';
import Avatar from 'components/@extended/Avatar';

interface Props {
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ isIcon, sx, to }: Props) {
  const { isLoggedIn } = useAuth();

  return (
    <ButtonBase disableRipple {...(isLoggedIn && { component: Link, to: !to ? APP_DEFAULT_PATH : to, sx })}>
      <Avatar alt="User 1" src={logo} variant="circular" size="lg" sx={{ m: '0 auto' }} />
      {/* {isIcon ? <LogoIcon /> : <Logo />} */}
    </ButtonBase>
  );
}
