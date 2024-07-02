// Importing necessary utilities
import { student } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils/index';
import { ApiEndpoint } from 'types/api';



export async function addStudent({ body }: any) {
  return callApi({
    uriEndPoint: { ...student.addStudent.v1 } as ApiEndpoint,
    body
  });
}





export async function addEducation({ body , pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.addEducation.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
}



export async function getEducation({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.getEducation.v1 } as ApiEndpoint,
  
    pathParams,
  });
}


export async function getEmployment({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.getEmployment.v1 } as ApiEndpoint,
  
    pathParams,
  });
}



export async function updateEducation({ body , pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.updateEducation.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
}


export async function addEmployment({ body , pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.addEmployment.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
}


export async function updateEmployment({ body , pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.updateEmployment.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
}







export async function getAllStudent({query}:any) {
  return callApi({
    uriEndPoint: { ...student.getAllStudent.v1 } as ApiEndpoint,
    query
   
  });
}



export async function getSingleStudent({pathParams}:any) {
  return callApi({
    uriEndPoint: { ...student.getSingleStudent.v1 } as ApiEndpoint,
    pathParams
   
  });
}


export async function updateStudent({body,pathParams}:any) {
  return callApi({
    uriEndPoint: { ...student.updateStudent.v1 } as ApiEndpoint,
    pathParams, body
   
  });
}





export async function addTestScore({ body , pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.addTestScore.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
}


export async function UpdateTestScore({ body , pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.UpdateTestScore.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
}


export async function getSingleTestScore({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.getSingleTestScore.v1 } as ApiEndpoint,
    pathParams,
  });
}
