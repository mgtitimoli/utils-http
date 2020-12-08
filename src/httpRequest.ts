import fetch from "isomorphic-fetch";

import HttpResponseError from "./HttpResponseError";

type RequestJsonParams = Omit<RequestInit, "body"> & {data?: unknown};

const responseToJson = (response: Response) => response.json();

const ensureResponseIsSucceeded = (response: Response) =>
  response.ok ? response : Promise.reject(new HttpResponseError(response));

const request = (url: RequestInfo, params?: RequestInit) =>
  fetch(url, params).then(ensureResponseIsSucceeded);

const requestJsonHeaders = {"Content-Type": "application/json"};

const getFetchParamsWithData = ({
  data,
  headers,
  ...rest
}: RequestJsonParams) => ({
  ...rest,
  body: JSON.stringify(data),
  headers: {...headers, ...requestJsonHeaders}
});

const getFetchParams = (params: RequestJsonParams) =>
  params.data !== undefined ? getFetchParamsWithData(params) : params;

const requestJson = (url: RequestInfo, params: RequestJsonParams = {}) =>
  request(url, getFetchParams(params)).then(responseToJson);

export {request, requestJson};

export type {RequestJsonParams as HttpRequestJsonParams};
