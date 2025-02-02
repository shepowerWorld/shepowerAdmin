import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem("token");

const dashboardApi = {
  getStateScheme: async (payload) => {
    try {
      const response = await axios.get(`${BASE_URL}getStateScheme`, {
        ...payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  },
  add: async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}addgovscheme`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  },
  totalCitizensCount: async (payload) => {
    try {
      const response = await axios.get(`${BASE_URL}totalCitizensCount`, {
        ...payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  },
  totalLeaderCount: async (payload) => {
    try {
      const response = await axios.get(`${BASE_URL}totalLeaderCount`, {
        ...payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  },
  groupCount: async (payload) => {
    try {
      const response = await axios.get(`${BASE_URL}groupCount`, {
        ...payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  },
  newusersCount: async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}newusers`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  },
  totalLeaderCount: async (payload) => {
    try {
      const response = await axios.get(`${BASE_URL}totalLeaderCount`, {
        ...payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return [];
    }
  },
};

export default dashboardApi;
