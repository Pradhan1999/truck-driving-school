// Importing necessary utilities
import { institute, program } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils/index';
import { ApiEndpoint } from 'types/api';

export async function addInstitute({ body }: any) {
  return callApi({
    uriEndPoint: { ...institute.addInstitute.v1 } as ApiEndpoint,
    body
  });
}

export async function updateInstitute({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...institute.updateInstitute.v1 } as ApiEndpoint,
    body,
    pathParams
  });
}

export async function GetAllInstitute({ query }: any) {
  return callApi({
    uriEndPoint: { ...institute.fetchAllInstitute.v1 } as ApiEndpoint,
    query
  });
}

export async function GetSingleInstitute({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...institute.fetchSingleInstitute.v1 } as ApiEndpoint,
    pathParams
  });
}

export async function addProgram({ body }: any) {
  return callApi({
    uriEndPoint: { ...program.addProgram.v1 } as ApiEndpoint,
    body
  });
}

export async function updateProgram({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...program.updateProgram.v1 } as ApiEndpoint,
    body,
    pathParams
  });
}

export async function GetAllProgram({ query}:any) {
  return callApi({
    uriEndPoint: { ...program.fetchAllProgram.v1 } as ApiEndpoint,
    query,
  });
}

export async function GetsingleProgram({ pathParams  }: any) {
  return callApi({
    uriEndPoint: { ...program.fetchSingleProgram.v1 } as ApiEndpoint,
    pathParams, 
    
  });
}

export async function bulkImport({ body }: any) {
  return callApi({
    uriEndPoint: { ...institute.bulkImport.v1 } as ApiEndpoint,
    body
    // additionalHeaders: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
}

export async function validateImport({ body }: any) {
  return callApi({
    uriEndPoint: { ...institute.validateImport.v1 } as ApiEndpoint,
    body,
    additionalHeaders: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export async function downloadExcel() {
  return callApi({
    uriEndPoint: { ...institute.downloadExcel.v1 } as ApiEndpoint
  });
}
export async function exportExcel() {
  return callApi({
    uriEndPoint: { ...program.exportExcel.v1 } as ApiEndpoint
  });
}
