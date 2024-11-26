import Cookies from "js-cookie";
import Routes from "../constants/routes";
import history from "../utils/history";

const baseURL = process.env.REACT_APP_API_HOST;
let headers = { Accept: "application/json" };

const handleRequest = async (endpoint, method, params = null) => {
  if (!API.headers["Authorization"]) {
    API.headers["Authorization"] = `Bearer ${Cookies.get("token")}`;
    const token = !!Cookies.get("token");
    if (!token) {
      delete API.headers["Authorization"];
    }
  }
  const requestData = { method };

  if (params !== null) {
    if (params instanceof FormData) {
      requestData["body"] = params;
      delete headers["Content-Type"];
    } else {
      requestData["body"] = JSON.stringify(params);
      headers["Content-Type"] = "application/json";
    }
  }

  requestData["headers"] = headers;
  console.log("requestData", requestData);
  const response = await fetch(`${baseURL}${endpoint}`, requestData);
  let jsonResponse = {};

  try {
    jsonResponse = await response.json();

    if (response.status === 401) {
      console.log("STATUS 401", jsonResponse);
      if (jsonResponse.refreshed_token) {
        console.log("jsonResponse.refreshed_token", jsonResponse.refreshed_token);
        API.headers["Authorization"] = "Bearer " + jsonResponse.refreshed_token;
        return await handleRequest(endpoint, method, params);
      } else {
        history.push(Routes.LOGOUT);
        return Promise.reject({
          message: jsonResponse.message,
          error: jsonResponse.error || jsonResponse.errors,
          status: response.status,
        });
      }
    }
  } catch (e) {
    console.log("NO BODY", JSON.stringify(e));
  }

  if (!response.ok) {
    return Promise.reject({
      message: jsonResponse.message,
      error: jsonResponse.error || jsonResponse.errors,
      status: response.status,
    });
  }

  return {
    status: response.status,
    data: jsonResponse.data || jsonResponse,
  };
};

const post = (endpoint, params = null) => {
  return handleRequest(endpoint, "POST", params);
};

const put = (endpoint, params = null) => {
  return handleRequest(endpoint, "PUT", params);
};

const patch = (endpoint, params = null) => {
  return handleRequest(endpoint, "PATCH", params);
};

const get = (endpoint) => {
  return handleRequest(endpoint, "GET");
};

const deleteMethod = (endpoint) => {
  return handleRequest(endpoint, "DELETE");
};

const fetcher = async (...args) => {
  return await get(...args);
};

const create = (config) => {
  return {
    post,
    put,
    patch,
    get,
    delete: deleteMethod,
    fetcher,
    ...config,
  };
};

const API = create({
  baseURL,
  headers,
});

export default API;
