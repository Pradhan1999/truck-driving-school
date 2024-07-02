import defaults from './defaults';

const prefix = '/institute';

const institute = {
  addInstitute: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix
    }
  },

  updateInstitute: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + '/:id'
    }
  },
  fetchAllInstitute: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix
    }
  },

  fetchSingleInstitute: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/:id'
    }
  },

  bulkImport: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/bulk'
    }
  },
  validateImport: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/bulk/validate'
    }
  },
  downloadExcel: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/bulk/download'
    }
  }
};

export default institute;
