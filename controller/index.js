const { handleMessage } = require("./lib/telegram");

/**
 * Handles incoming requests and processes Telegram messages.
 * @param {Object} req - The HTTP request object.
 * @param {string} method - The HTTP method (e.g., "GET", "POST").
 * @returns {Promise<void>} Resolves when the message is processed.
 */
const handler = async (req, method) => {
    try {
        const { body } = req;

        // Ensure the request body exists and contains a message
        if (body && body.message) {
            const messageObj = body.message;
            console.log(`Processing message: ${JSON.stringify(messageObj)}`);
            await handleMessage(messageObj);
        } else {
            console.warn("No message found in the request body.");
        }
    } catch (error) {
        console.error(`Error handling request with method ${method}:`, error);
        throw error; // Re-throw the error for the caller to handle
    }
};

module.exports = { handler };
