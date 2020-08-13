import type {Response} from "node-fetch";

import {CustomError} from "@mgtitimoli/utils-error";

import * as withHttpStatusCode from "./httpStatusCode";

import type {HttpStatusCode} from "./httpStatusCode";

const getResponseStatusCode = (response: Response): HttpStatusCode =>
  response.status as any;

const getMessage = (response: Response) =>
  response.statusText ||
  withHttpStatusCode.getText(getResponseStatusCode(response));

class HttpResponseError extends CustomError {
  response: Response;

  constructor(response: Response) {
    super(getMessage(response));

    this.response = response;
  }
}

export default HttpResponseError;
