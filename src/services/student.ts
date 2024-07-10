// Importing necessary utilities
import { student } from "utils/apiUtils/endpoints";
import { callApi } from "utils/apiUtils/index";
import { ApiEndpoint } from "types/api";

export async function addStudent({ body }: any) {
  return callApi({
    uriEndPoint: { ...student.addStudent.v1 } as ApiEndpoint,
    body,
  });
}

export async function getAllStudent({ query }: any) {
  return callApi({
    uriEndPoint: { ...student.getAllStudent.v1 } as ApiEndpoint,
    query,
  });
}

export async function getSingleStudent({ pathParams }: any) {
  console.log("pathParams", pathParams);
  return callApi({
    uriEndPoint: { ...student.getSingleStudent.v1 } as ApiEndpoint,
    pathParams,
  });
}

export async function updateStudent({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...student.updateStudent.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
}
