import defaults from './defaults';

const prefix = '/recruiter';

const recruiter = {
  addRecruiter: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/invite'
    }
  },

  updateRecruiter: {
    v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: prefix + '/:id'
    }
  },

  fetchAllRecruiter: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix
    }
  }
};

export default recruiter;
