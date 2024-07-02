import * as React from 'react';
import ProfileTabs from 'components/student/Profile';
import AddStudent from 'components/student/addStudent';

const StudentProfile = () => {
  const tabs = [
    { id: '1', label: 'Profile', content: <AddStudent /> }
    // { id: '2', label: 'Item Two', content: 'Content for Item Two' },
    // { id: '3', label: 'Item Three', content: 'Content for Item Three' }
  ];

  return (
    <>
      <ProfileTabs tabs={tabs} />
    </>
  );
};

export default StudentProfile;
