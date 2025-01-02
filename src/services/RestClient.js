import axios from "axios";

// Create the Axios instance with a base URL based on the environment
const axiosObj = axios.create({
  baseURL: import.meta.env.VITE_PROD ? (import.meta.env.VITE_PROD+`/api`) : `http://localhost:8081/api`,
});

// Add an interceptor to inject the token into headers for non-login requests
axiosObj.interceptors.request.use(
  (config) => {
    // Skip adding Authorization header for login requests
    if (!config.url.startsWith("/login")) {
      const jwtToken = localStorage.getItem("token"); // Get JWT token from localStorage
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`; // Attach token
      }
    }
    // config.headers['ngrok-skip-browser-warning'] = 'true';
    return config;
  },
  (error) => {
    console.error("Error in request interceptor: ", error);
    return Promise.reject(error); // Reject the request if error occurs
  }
);

axiosObj.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, redirecting to login...");
      window.location.href="/logout"
    } else if (error.response?.status === 403) {
      console.warn("Forbidden: You don't have permission to access this resource");
      window.location.href="/logout"
    }
    return Promise.reject(error);
  }
);

const RestClient = {
  get: async (endpoint, config = {}) => {
    try {
      const response = await axiosObj.get(endpoint, config);
      return response.data;
    } catch (error) {
      console.error("Error in RestClient GET: ", error);
      return handleError(error); // Call common error handler
    }
  },
  post: async (endpoint, body = {}, config = {}) => {
    try {
      const response = await axiosObj.post(endpoint, body, config);
      return response.data; 
    } catch (error) {
      console.error("Error in RestClient POST: ", error);
      return handleError(error); 
    }
  },
};

const handleError = (error) => {
  if (error.response) {
    if (error.response.status === 401 || error.response.status === 403) {
      console.warn("logout chey")
      return error.response; 
    }
  }
  
  console.error("An unexpected error occurred: ", error);
  return error.response; 
};

export default RestClient;
