// Importing necessary utilities
import { callApi } from "utils/apiUtils/index";
import { ApiEndpoint } from "types/api";
import instructor from "utils/apiUtils/endpoints/instructor";

export async function addInstructor({ body }: any) {
  return callApi({
    uriEndPoint: { ...instructor.addInstructor.v1 } as ApiEndpoint,
    body,
  });
}

export async function getAllInstructor({ query }: any) {
  return callApi({
    uriEndPoint: { ...instructor.getAllInstructor.v1 } as ApiEndpoint,
    query,
  });
}

export async function getSingleInstructor({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...instructor.getSingleInstructor.v1 } as ApiEndpoint,
    pathParams,
  });
}

export async function updateInstructor({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...instructor.updateInstructor.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
}
