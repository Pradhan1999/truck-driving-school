import {
  Box,
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  SxProps,
  Typography
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { CloseIcon } from 'assets/svg/CloseIcon';

interface ModalProps {
  open: boolean;
  handleClose?: () => void;
  title: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  handleSubmit?: () => void;
  closeIcon?: boolean;
  maxWidth?: Breakpoint;
  sx?: SxProps<Theme>;
  defaultFooter?: boolean;
  titleVariant?: any;
}

const Modal = ({ open, handleClose, title, children, closeIcon, handleSubmit, titleVariant, ...props }: ModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={props.maxWidth} sx={props.sx}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color={'#394663'} variant={titleVariant || 'h5'}>
            {title}
          </Typography>
          {closeIcon && (
            <Box
              sx={{
                cursor: 'pointer'
              }}
            >
              <CloseIcon onClick={handleClose} />
            </Box>
          )}
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}>{children}</DialogContent>
      <Divider />
      {props.defaultFooter && (
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      )}
      {props.footerActions && <DialogActions>{props.footerActions}</DialogActions>}
    </Dialog>
  );
};

export default Modal;
