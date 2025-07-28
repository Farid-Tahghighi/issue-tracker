import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import {
  apiCallBegan,
  ApiCallBeganPayload,
  apiCallFailed,
  apiCallSuccess,
} from "../api";
import axios from "axios";
import { RootState } from "../store";

interface ApiCallBeganAction extends PayloadAction<ApiCallBeganPayload> {
  type: typeof apiCallBegan.type;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const api: Middleware<{}, RootState> = (store) => (next) => async (action) => {
  const { dispatch } = store;
  const apiAction = action as ApiCallBeganAction;
  if (apiAction.type !== apiCallBegan.type) {
    return next(action);
  }

  const { url, method, data, onSuccess, onError, onStart } = apiAction.payload;

  if (onStart) {
    dispatch({ type: onStart });
  }
  next(action);

  try {
    const response = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });
    dispatch(apiCallSuccess(response.data));
    if (onSuccess) {
      dispatch({ type: onSuccess, payload: response.data });
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      dispatch(apiCallFailed(e.message));
      if (onError) dispatch({ type: onError, payload: e.message });
    }
  }
};

export default api;
