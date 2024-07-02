import CollegeListTable from './table';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import Page from 'components/ui/PageLayout';
import { Button, Link, Stack } from '@mui/material';
import { Add, DocumentUpload, Import, Sort } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AddCollege from './addCollege';
import { hostname } from 'utils/apiUtils';
import { getItem } from 'utils/apiUtils/localStorageControl';
import { GetAllInstitute } from 'services/institute';
import { openSnackbar } from 'api/snackbar';
import ThemeButton from 'components/ui/Button';

const College = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instituteId, setInstituteId] = useState();
  const [instituteRecords, setInstituteRecords] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [viewPage, setViewPage] = useState(10);
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const getAllInstitutes = () => {
    setLoading(true);
    GetAllInstitute({ query: { limit: viewPage, start: startIndex } })
      ?.then((res) => {
        setLoading(false);
        setInstituteRecords(res);
      })
      ?.catch((err) => {
        setLoading(false);
        openSnackbar({
          open: true,
          message: `An error occured while fetching institutes!`,
          variant: 'alert',
          alert: {
            color: 'error'
          }
        } as any);
      });
  };

  useEffect(() => {
    getAllInstitutes();
  }, [startIndex, viewPage]);

  const handleExportExcel = async () => {
    await fetch(`${hostname()}/api/v1/programs/excel`, {
      headers: {
        Authorization: getItem('accessToken') || ''
      }
    })
      ?.then(async (res: any) => {
        const response = await res.blob();
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sample.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  };

  return (
    <Page
      title="College/Institute"
      primaryAction={
        <Stack spacing={2} direction={'row'}>
          <ThemeButton variant="contained" size="small" startIcon={<Add />} onClick={() => setIsModalOpen(true)}>
            Add Institute
          </ThemeButton>
          <Link component={RouterLink} to="/college/bulkImport" color="text.primary">
            <ThemeButton variant="outlined" size="small" startIcon={<Import />}>
              Bulk Import
            </ThemeButton>
          </Link>

          <Link component={RouterLink} to="/college/bulkImport" color="text.primary">
            <ThemeButton variant="outlined" size="small" startIcon={<Import />}>
              Bulk Update
            </ThemeButton>
          </Link>
          <ThemeButton variant="outlined" size="small" startIcon={<DocumentUpload />} onClick={handleExportExcel}>
            Export Excel
          </ThemeButton>
          <ThemeButton variant="outlined" size="small" startIcon={<Sort />}>
            Sort
          </ThemeButton>
        </Stack>
      }
    >
      <CollegeListTable
        viewPage={viewPage}
        setViewPage={setViewPage}
        startIndex={startIndex}
        setStartIndex={setStartIndex}
        setIsModalOpen={setIsModalOpen}
        setInstituteId={setInstituteId}
        instituteRecords={instituteRecords}
        getAllInstitutes={getAllInstitutes}
        loading={loading}
      />

      {/* Add college modal */}
      <AddCollege
        open={isModalOpen}
        handleClose={handleClose}
        instituteId={instituteId}
        setInstituteId={setInstituteId}
        getAllInstitutes={getAllInstitutes}
      />
    </Page>
  );
};
export default College;
