import defaults from './defaults';

const prefix = '/applications';

const application = {
  checkEligible: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + "/check"
    }
  },

 
};

export default application;
