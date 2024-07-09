import defaults from "./defaults";

const prefix = "/instructor";

const instructor = {
  addInstructor: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },

  getAllInstructor: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },

  getSingleInstructor: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },
  updateInstructor: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },
};

export default instructor;
