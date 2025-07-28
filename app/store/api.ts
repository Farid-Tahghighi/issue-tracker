import { createAction } from "@reduxjs/toolkit";

export interface ApiCallBeganPayload {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: unknown;
  onStart?: string;
  onSuccess?: string;
  onError?: string;
}

export const apiCallBegan = createAction<ApiCallBeganPayload>("api/callBegan");
export const apiCallSuccess = createAction<unknown>("api/callSuccess");
export const apiCallFailed = createAction<string>("api/callFailed");
