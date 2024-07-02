import defaults from './defaults';

const prefix = '/staffs';

const staff = {
  invite: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/invite'
    }
  },

  fetchAllFetch: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix
    }
  },

resendInvite:{
  v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix+ "/invite/resend/:id"
    }
}

};

export default staff;
