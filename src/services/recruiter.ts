// Importing necessary utilities
import { recruiter } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils/index';
import { ApiEndpoint } from 'types/api';

export async function addRecruiter({ body }: any) {
  return callApi({
    uriEndPoint: { ...recruiter.addRecruiter.v1 } as ApiEndpoint,
    body
  });
}
export async function fetchAllRecruiter({ query }: any) {
  return callApi({
    uriEndPoint: { ...recruiter.fetchAllRecruiter.v1 } as ApiEndpoint,
    query
  });
}
