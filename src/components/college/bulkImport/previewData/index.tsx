import Table from 'components/ui/Table';
import { columns, data } from './columns';
import { Box, Button, Chip, Grid, Stack, Tab, Typography } from '@mui/material';
import { ArrowRight } from 'iconsax-react';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import MainCard from 'components/MainCard';
import { bulkImport } from 'services/institute';
import { openSnackbar } from 'api/snackbar';
import * as XLSX from 'xlsx';

const PreviewData = ({ handleNext, handleBack, setBulkData, bulkData }: any) => {
  const [value, setValue] = useState('all');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const importedData = [...bulkData?.errors?.map((val: any) => val?.value), ...bulkData?.data?.map((val: any) => val?.data)];
  const errorRecords = bulkData?.errors?.map((val: any) => val?.value);
  let errors: any = [];
  bulkData?.errors?.map((val: any, idx: any) => {
    errors?.push({
      index: idx?.toString(),
      error: val?.errors?.map((val: any) => val?.message)
    });
  });

  const tabs = [
    { label: `All (${importedData?.length})`, value: 'all', content: <Table data={importedData} columns={columns('all', [])} /> },
    {
      label: `Error (${errorRecords?.length})`,
      value: 'error',
      content: <Table data={errorRecords} columns={columns('error', errors)} />
    },
    {
      label: `Success (${bulkData?.data?.length})`,
      value: 'success',
      content: <Table data={bulkData?.data?.map((val: any) => val?.data)} columns={columns('success', [])} />
    }
  ];

  const uploadCorrectEntries = () => {
    bulkImport({
      body: { records: bulkData?.data?.map((val: any) => val?.data) }
    })?.then((res: any) => {
      console.log('res', res);
      if (res?.inserted == bulkData?.data?.length) {
        openSnackbar({
          open: true,
          message: `Imported ${res?.inserted} ${res?.inserted == 0 ? 'record' : 'records'} successfully!`,
          variant: 'alert',
          alert: {
            color: 'success'
          }
        } as any);
        handleNext();
      } else {
        setBulkData(res);
        openSnackbar({
          open: true,
          message: `Error in ${res?.errors?.length || 0} ${res?.errors?.length == 1 ? 'record' : 'records'}`,
          variant: 'alert',
          alert: {
            color: 'error'
          }
        } as any);
      }
    });
  };

  const downloadWrongRecords = () => {
    const data = [
      'name',
      'campus',
      'website',
      'intakes',
      'state',
      'school_id',
      'DLI',
      'application_fee',
      'institute_type',
      'location',
      'country'
    ];
    const wrongRecords = errorRecords?.map((record: any) => data?.map((header) => record[header] || ''));
    const csvData = [data].concat(wrongRecords);
    const csvString = csvData.map((row) => row.join(',')).join('\n');
    const workbook = XLSX.read(csvString, { type: 'string' });
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'records.xlsx';
    link.click();
  };

  return (
    <Grid xs={12}>
      <Box px={4}>
        <TabContext value={value}>
          {bulkData?.errors?.length > 0 && (
            <Stack gap={1} direction={'row'}>
              <Chip
                color="error"
                variant="combined"
                size="small"
                sx={{ borderRadius: '4px', mb: 1 }}
                label={`${bulkData?.errors?.length} ${bulkData?.errors?.length == 1 ? 'record is' : 'records are'} invalid`}
              />
              <Chip color="error" variant="combined" size="small" sx={{ borderRadius: '4px', mb: 1 }} label={`Please fix the error(s)`} />
            </Stack>
          )}
          <MainCard
            content={false}
            headerSX={{ p: 0 }}
            title={
              <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </TabList>
              </Box>
            }
          >
            {tabs.map((tab) => (
              <TabPanel key={tab.value} value={tab.value} sx={{ p: 0 }}>
                {tab.content}
              </TabPanel>
            ))}
          </MainCard>
        </TabContext>
      </Box>
      <Stack direction={'row'} alignItems="center" spacing={2} justifyContent="flex-end" width="100%" mt={2} pr={4}>
        {/* <Typography color="GrayText" variant="h6" sx={{ fontSize: 12, fontWeight: '500' }}>
          Try Again
        </Typography> */}
        <Button color="secondary" variant="contained" onClick={downloadWrongRecords} sx={{ fontSize: 12, fontWeight: '500' }}>
          Download wrong records
        </Button>
        <Button
          sx={{ fontSize: 12, fontWeight: '500' }}
          variant="contained"
          onClick={uploadCorrectEntries}
          endIcon={<ArrowRight />}
          disabled={bulkData?.data?.length === 0}
        >
          Continue with correct entries
        </Button>
      </Stack>
    </Grid>
  );
};

export default PreviewData;
