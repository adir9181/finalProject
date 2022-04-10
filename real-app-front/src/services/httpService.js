import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (err) => {
  if (err.response && err.response.status >= 403) {
    toast.error("An unexpected error occurred");
  }

  return Promise.reject(err);
});

export function setDefaultCommonHeaders(header, value) {
  axios.defaults.headers.common[header] = value;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setDefaultCommonHeaders,
};

export default httpService;
