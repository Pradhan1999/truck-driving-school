import { Button } from '@mui/material';
import { color } from '@mui/system';

interface ButtonProps {
  id?: string;
  buttonStyle?: any;
  onClick?: () => void;
  startIcon?: any;
  variant?: any;
  size?: any;
  children?: React.ReactNode;
  endIcon?: any;
  color?: any;
}

const ThemeButton = ({ id, startIcon, variant, size, buttonStyle, endIcon, color, onClick, ...props }: ButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      startIcon={startIcon}
      onClick={onClick}
      endIcon={endIcon}
      sx={{ borderRadius: '5px', height: '28px', fontSize: '12px', ...buttonStyle }}
    >
      {props?.children}
    </Button>
  );
};

export default ThemeButton;
