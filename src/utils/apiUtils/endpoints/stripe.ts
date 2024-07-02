import defaults from './defaults';

const prefix = '/stripe';

const stripe = {
  createCheckoutSession: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/session',
    },
  },
};

export default stripe;
