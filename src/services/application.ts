// Importing necessary utilities
import { applications } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils/index';
import { ApiEndpoint } from 'types/api';

export async function checkEligible({ body }: any) {
  return callApi({
    uriEndPoint: { ...applications.checkEligible.v1 } as ApiEndpoint,
    body
  });
}

