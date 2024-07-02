import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import { Stack } from '@mui/material';

interface TabProps {
  value: string | number;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export default function CustomTabs({ tabs, value, onChange }: any) {
  return (
    <Tabs value={value} onChange={onChange}>
      <TabsList>
        {tabs.map((tab: TabProps) => (
          <Tab value={tab.value}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Stack>{tab.icon}</Stack>
              <Stack>{tab.label}</Stack>
            </Stack>
          </Tab>
        ))}
      </TabsList>
      {tabs.map((tab: TabProps) => (
        <TabPanel value={tab.value}>{tab.content}</TabPanel>
      ))}
    </Tabs>
  );
}

const Tab = styled(BaseTab)`
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #778194;
  background-color: transparent;
  min-width: 140px;
  padding: 5px 12px;
  margin-right: 10px;
  border: 1px solid #e7edf8;
  border-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;

  &:hover {
    color: #2a50ed;
  }

  &:focus {
    color: #fff;
  }

  &.${tabClasses.selected} {
    background-color: #2a50ed;
    color: #fff;
    font-weight: 600;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  `
);

const TabsList = styled(BaseTabsList)`
  min-width: 400px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  align-content: space-between;
  border-bottom: 1px solid #c8d7f7;
`;
