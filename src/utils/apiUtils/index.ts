import axios, { AxiosRequestConfig, Method } from "axios";

// Assuming the getItem function returns any. You might want to specify a more precise type.
import { getItem } from "./localStorageControl";

export const hostname = () => {
  let hostUrl = "";
  switch (window.location.hostname) {
    case "localhost": // Development environment
      hostUrl = "https://truck-school.onrender.com";
      break;
    // Add more cases as needed for different environments
    default:
      hostUrl = "https://truck-school.onrender.com";
      break;
  }
  return hostUrl;
};

const authHeader = (): Record<string, string> => ({
  Authorization: getItem("accessToken") || "",
});

const client = axios.create({
  baseURL: hostname(),
  headers: {
    "Content-Type": "application/json",
  },
});

interface UriEndPoint {
  uri: string;
  version: string;
  method: Method;
}

interface CallApiParams {
  uriEndPoint: UriEndPoint;
  body?: Record<string, unknown>;
  query?: string;
  pathParams?: Record<string, string>;
  additionalHeaders?: Record<string, string>;
}

export const makeUrl = ({
  uri,
  pathParams,
  query,
}: {
  uri: string;
  pathParams?: Record<string, string>;
  query?: any;
}): string => {
  const queryString = query
    ? Object?.keys(query)
        .map(
          (key: any) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join("&")
    : "";
  return `${uri
    .split("/")
    .map((param) =>
      param.charAt(0) === ":" && pathParams
        ? encodeURI(pathParams[param.slice(1)])
        : param
    )
    .join("/")}${queryString ? `?${queryString}` : ""}`;
};
export const callApi = async ({
  uriEndPoint,
  body,
  query,
  pathParams,
  additionalHeaders,
}: CallApiParams): Promise<any> => // Consider specifying a more precise return type based on your API's response structure
  new Promise((resolve, reject) => {
    const url = makeUrl({
      uri: uriEndPoint.version + uriEndPoint.uri,
      pathParams,
      query,
    });

    const options: AxiosRequestConfig = {
      method: uriEndPoint.method,
      url,
      headers: { ...authHeader(), ...additionalHeaders },
      data: body,
    };

    client(options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error?.response);
      });
  });
