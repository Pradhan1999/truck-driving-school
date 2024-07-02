// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// third-party
import { useDropzone } from 'react-dropzone';
import { DropzopType } from 'config';
import { Avatar, CardMedia, LinearProgress, Typography } from '@mui/material';
import { Camera, DocumentUpload } from 'iconsax-react';

import upload from 'assets/images/common/uploadFile.svg';
import { useState } from 'react';
import MainCard from 'components/MainCard';
import { height, padding, width } from '@mui/system';
import { DeleteIcon } from 'assets/svg/Delete';
import { XlsxIcon } from 'assets/svg/xlsxIcon';
// types
// import { CustomFile, UploadProps } from 'types/dropzone';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(3, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,
  border: '1px dashed',
  borderColor: theme.palette.secondary.main,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

const UploadFile = ({ error, file, setFile, sx }: any) => {
  const theme = useTheme();
  const [progress, setProgress] = useState<any>(0);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: { '.xlsx': [] },
    multiple: false,
    onDrop: (acceptedFiles: any) => {
      setFile(acceptedFiles.map((file: any) => Object.assign(file, { preview: URL.createObjectURL(file) })));
      if (fileRejections.length > 0) {
        setProgress(0);
      } else {
        setInterval(() => {
          setProgress((prevProgress: any) => (prevProgress >= 100 ? 100 : prevProgress + 10));
        }, 200);
      }
    }
  });

  function formatFileSize(bytes: number) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const thumbs =
    file &&
    file.map(
      (item: any) => {
        console.log('item', item);
        return { name: item?.name, size: item?.size };
      }
      // <img
      //   key={item.name}
      //   alt={item.name}
      //   src={item.preview}
      //   style={{
      //     top: 8,
      //     left: 8,
      //     borderRadius: 2,
      //     position: 'absolute',
      //     width: 'calc(100% - 16px)',
      //     height: 'calc(100% - 16px)',
      //     background: theme.palette.background.paper
      //   }}
      //   onLoad={() => {
      //     URL.revokeObjectURL(item.preview!);
      //   }}
      // />
    );

  console.log('thumbs', thumbs);

  const onRemove = () => {
    setFile(null);
    setProgress(0);
  };

  if (fileRejections.length > 0) {
    setFile(null);
  }
  return (
    <Box sx={{ width: '60%', ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && { color: 'error.main', borderColor: 'error.light', bgcolor: 'error.lighter' }),
          ...(file && { padding: '3% 0' })
        }}
      >
        <input {...getInputProps()} />
        <PlaceholderContent />
        {/* {thumbs} */}
      </DropzoneWrapper>

      {fileRejections.length > 0 && (
        <Stack mt={2} textAlign={'center'}>
          <Typography color={'red'}>Please upload xlsx file </Typography>
        </Stack>
      )}

      {file && (
        <>
          <Stack direction={'row'} justifyContent={'center'} mt={2}>
            <Stack sx={{ width: 550, padding: 1, border: '1px solid #EAECF0', borderRadius: 1 }}>
              <Box display="flex" alignItems={'start'} justifyContent={'space-between'}>
                <Box display={'flex'} gap={2}>
                  <XlsxIcon />
                  <Box display="flex" flexDirection={'column'} width={300}>
                    <Typography variant="body1">{thumbs[0]?.name}</Typography>
                    <Typography sx={{ fontSize: '12px' }}>{formatFileSize(thumbs[0]?.size)}</Typography>
                    {progress > 0 && (
                      <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                          <LinearProgress variant="determinate" value={progress} />
                        </Box>
                        <Typography variant="body2">{`${progress}%`}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Button variant="text" color="secondary" onClick={onRemove} sx={{ ml: 2 }}>
                  <DeleteIcon />
                </Button>
              </Box>
            </Stack>
          </Stack>
        </>
      )}

      {/* {file && file.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1.5 }}>
          <Button variant="contained" color="error" onClick={onRemove}>
            Remove
          </Button>
        </Stack>
      )} */}
    </Box>
  );
};
export default UploadFile;

function PlaceholderContent({ type }: { type?: DropzopType }) {
  return (
    <>
      {type !== DropzopType.STANDARD && (
        <Stack sx={{ p: 3 }} spacing={1} alignItems="center">
          <Avatar src={upload} sx={{ height: '60px', width: '70px', borderRadius: 0 }} />
          <Typography>
            <Typography component="span" color="#2A50ED" fontWeight="600">
              Upload file here&nbsp;
            </Typography>
            or drag and drop&nbsp;
          </Typography>
          <Typography color="secondary" variant="caption">
            XLSX (max size 3MB)
          </Typography>
        </Stack>
      )}
      {type === DropzopType.STANDARD && (
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Camera style={{ fontSize: '32px' }} />
        </Stack>
      )}
    </>
  );
}
