import { Box } from '@mui/material';
import CustomTabs from 'components/ui/Tabs';
import React, { useState } from 'react';
import { SystemUiconsDocument } from 'assets/svg/file';
import { UilComments } from 'assets/svg/UilComments';
import TimelineTab from './TimelineTab';
import DocumentTab from './DocumentTab';
import Comments from './Comments';
import { TemplateIcon } from 'assets/svg/TemplateIcon';
import TemplatesTab from './TemplatesTab';

interface TabsProps {
  value: string | number;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

const DocumentDetails = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabs: TabsProps[] = [
    {
      value: '1',
      label: 'All Documents',
      content: <DocumentTab />,
      icon: <SystemUiconsDocument />
    },
    {
      value: '2',
      label: 'Timeline',
      content: <TimelineTab />,
      icon: <SystemUiconsDocument />
    },
    {
      value: '3',
      label: 'Comments',
      content: <Comments />,
      icon: <UilComments />
    },
    {
      value: '4',
      label: 'Templates',
      content: <TemplatesTab />,
      icon: <TemplateIcon />
    }
  ];

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <CustomTabs tabs={tabs} value={value} onChange={handleChange} />
    </Box>
  );
};

export default DocumentDetails;
