import defaults from './defaults';

const prefix = '/programs';

const program = {
  addProgram: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix
    }
  },

  updateProgram: {
    v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: prefix + '/:id'
    }
  },

  fetchAllProgram: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix
    }
  },

  fetchSingleProgram: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/:id'
    }
  },
  exportExcel: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/excel'
    }
  }
};

export default program;
