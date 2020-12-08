const httpMethods = {
  delete: "DELETE",
  get: "GET",
  patch: "PATCH",
  put: "PUT",
  post: "POST"
} as const;

type HttpMethod = typeof httpMethods[keyof typeof httpMethods];

export {httpMethods};

export type {HttpMethod};
