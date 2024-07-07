import defaults from "./defaults";

const prefix = "/students";

const student = {
  addStudent: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },

  getAllStudent: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },

  getSingleStudent: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + "/:student_id",
    },
  },
  updateStudent: {
    v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },
};

export default student;
