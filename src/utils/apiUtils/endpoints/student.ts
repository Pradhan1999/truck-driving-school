import defaults from './defaults';

const prefix = '/students';

const student = {
  // personal information start  here

  addStudent: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix
    }
  },

  getAllStudent: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix
    }
  },

  getSingleStudent: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/:student_id'
    }
  },
  updateStudent: {
    v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: prefix + '/:id'
    }
  },

  // personal information end  here

  //  education history start  here

  addEducation: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/:student_id/education'
    }
  },

  getEducation: {
     v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/:student_id/education'
    }
  },

  updateEducation:{
    v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: prefix + '/:student_id/education'
    }
  },


  //  education history end  here

  addEmployment: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/:student_id/employment'
    }
  },


  updateEmployment:{
      v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: prefix + '/:student_id/employment'
    }
  },


  getEmployment:{
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/:student_id/employment'
    }
  },

  // test score start  here

  addTestScore: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/:student_id/testScore'
    }
  },

  getSingleTestScore: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/:student_id/testScore'
    }
  },
  UpdateTestScore: {
    v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: prefix + '/testScore/:id'
    }
  }
};

export default student;
