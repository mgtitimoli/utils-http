import fetch from "isomorphic-fetch";

import HttpResponseError from "./HttpResponseError";

type PostJsonOptions = Omit<RequestInit, "body" | "method"> & {data?: unknown};

type GetJsonOptions = Omit<RequestInit, "body" | "method">;

const responseToJson = (response: Response) => response.json();

const ensureResponseIsSucceeded = (response: Response) =>
  response.ok ? response : Promise.reject(new HttpResponseError(response));

const safeFetch = (url: RequestInfo, options?: RequestInit) =>
  fetch(url, options).then(ensureResponseIsSucceeded);

const postJsonHeaders = {"Content-Type": "application/json"};

const postJsonOptionsToFetchOptionsCommon = ({
  data,
  ...rest
}: PostJsonOptions) => ({
  ...rest,
  method: "POST"
});

const postJsonOptionsToFetchOptionsWithData = (options: PostJsonOptions) => ({
  ...postJsonOptionsToFetchOptionsCommon(options),
  body: JSON.stringify(options.data),
  headers: {...options.headers, ...postJsonHeaders}
});

const postJsonOptionsToFetchOptions = (options: PostJsonOptions) =>
  options.data !== undefined
    ? postJsonOptionsToFetchOptionsWithData(options)
    : postJsonOptionsToFetchOptionsCommon(options);

const postJson = (url: RequestInfo, options: PostJsonOptions = {}) =>
  safeFetch(url, postJsonOptionsToFetchOptions(options)).then(responseToJson);

const getJson = (url: RequestInfo, options?: GetJsonOptions) =>
  safeFetch(url, options).then(responseToJson);

export {getJson, postJson, safeFetch};

export type {
  GetJsonOptions as HttpRequestGetJsonOptions,
  PostJsonOptions as HttpRequestPostJsonOptions
};
