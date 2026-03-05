import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use(async (config) => {
  config.baseURL = baseURL;
  const token = localStorage.getItem("accessToken");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** *
 * *axios response configs
 */
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.post(`${baseURL}/auth/refresh`, {
            refreshToken,
          });

          if (response.status === 200 || response.status === 201) {
            const { tokens } = response.data;
            localStorage.setItem("accessToken", tokens.access.token);
            localStorage.setItem("refreshToken", tokens.refresh.token);

            axios.defaults.headers.common["Authorization"] = `Bearer ${tokens.access.token}`;
            originalRequest.headers["Authorization"] = `Bearer ${tokens.access.token}`;

            return axios(originalRequest);
          }
        } catch (refreshError) {
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

const httpsCall = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  interceptors: axios.interceptors,
};

export default httpsCall;
