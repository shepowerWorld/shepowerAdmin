import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL; // Ensure this is defined in `.env`

const authApi = {
  loginAdmin: async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}adminLogin`, {
        ...payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error logging in admin:",
        error.response?.data || error.message
      );
      return error.response?.data || { error: "Unknown error occurred" };
    }
  },
};

export default authApi;
