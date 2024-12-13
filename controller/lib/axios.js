const axios = require('axios');

// Ensure the token is set
const MY_TOKEN = "" // Use environment variable or fallback
if (!MY_TOKEN) {
    throw new Error("MY_TOKEN is not set. Please provide a valid Telegram bot token.");
}

const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;

/**
 * Creates an Axios instance with the configured base URL.
 * @param {string} [baseUrl=BASE_URL] - Optional base URL for Axios instance.
 * @returns {Object} An object with `get` and `post` methods.
 */
const getAxiosInstance = (baseUrl = BASE_URL) => {
    const instance = axios.create({
        baseURL: baseUrl,
    });

    return {
        /**
         * Sends a GET request to the specified method.
         * @param {string} method - The API method name.
         * @param {Object} params - The query parameters.
         * @returns {Promise<Object>} The API response data.
         */
        async get(method, params) {
            try {
                const response = await instance.get(`/${method}`, { params });
                return response.data;
            } catch (error) {
                console.error(`GET request to "${method}" failed:`, error.response?.data || error.message);
                throw error;
            }
        },

        /**
         * Sends a POST request to the specified method.
         * @param {string} method - The API method name.
         * @param {Object} data - The request payload.
         * @returns {Promise<Object>} The API response data.
         */
        async post(method, data) {
            try {
                const response = await instance.post(`/${method}`, data);
                return response.data;
            } catch (error) {
                console.error(`POST request to "${method}" failed:`, error.response?.data || error.message);
                throw error;
            }
        },
    };
};

module.exports = { axiosInstance: getAxiosInstance() };
