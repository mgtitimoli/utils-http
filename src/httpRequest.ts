import fetch from "isomorphic-fetch";

import HttpResponseError from "./HttpResponseError";

type PostJsonParams = Omit<RequestInit, "body" | "method"> & {data?: unknown};

type GetJsonParams = Omit<RequestInit, "body" | "method">;

const responseToJson = (response: Response) => response.json();

const ensureResponseIsSucceeded = (response: Response) =>
  response.ok ? response : Promise.reject(new HttpResponseError(response));

const safeFetch = (url: RequestInfo, params?: RequestInit) =>
  fetch(url, params).then(ensureResponseIsSucceeded);

const postJsonHeaders = {"Content-Type": "application/json"};

const postJsonParamsToFetchParamsCommon = ({
  data,
  ...rest
}: PostJsonParams) => ({
  ...rest,
  method: "POST"
});

const postJsonParamsToFetchParamsWithData = (params: PostJsonParams) => ({
  ...postJsonParamsToFetchParamsCommon(params),
  body: JSON.stringify(params.data),
  headers: {...params.headers, ...postJsonHeaders}
});

const postJsonParamsToFetchParams = (params: PostJsonParams) =>
  params.data !== undefined
    ? postJsonParamsToFetchParamsWithData(params)
    : postJsonParamsToFetchParamsCommon(params);

const postJson = (url: RequestInfo, params: PostJsonParams = {}) =>
  safeFetch(url, postJsonParamsToFetchParams(params)).then(responseToJson);

const getJson = (url: RequestInfo, params?: GetJsonParams) =>
  safeFetch(url, params).then(responseToJson);

export {getJson, postJson, safeFetch};

export type {
  GetJsonParams as HttpRequestGetJsonParams,
  PostJsonParams as HttpRequestPostJsonParams
};
