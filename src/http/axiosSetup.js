import axios from "axios";
import { store } from "../store/store";
import { loadingStart, loadingEnd } from "../features/ui";

let installed = false;

/**
 * Installs global axios interceptors once.
 * Shows a global loader for in-flight requests unless explicitly skipped:
 *   axios.get(url, { meta: { skipLoading: true } })
 */
export function installAxiosInterceptors() {
  if (installed) return;
  installed = true;

  axios.interceptors.request.use(
    (config) => {
      if (!config?.meta?.skipLoading) {
        store.dispatch(loadingStart());
      }
      return config;
    },
    (error) => {
      store.dispatch(loadingEnd());
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      if (!response?.config?.meta?.skipLoading) {
        store.dispatch(loadingEnd());
      }
      return response;
    },
    (error) => {
      if (!error?.config?.meta?.skipLoading) {
        store.dispatch(loadingEnd());
      }
      return Promise.reject(error);
    },
  );
}

