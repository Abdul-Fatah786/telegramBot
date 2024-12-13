const { axiosInstance } = require("./axios");

function sendMessage(messageObj, messageText) {
    return axiosInstance.get("", {
        chat_id: messageObj.chat.id,
        text: messageText
    })
}

function handleMessage(messageObj) {
    try {
        const messageText = messageObj.text || "";

        // Check if the message is a command
        if (messageText.startsWith("/")) {
            const command = messageText.substring(1).trim().toLowerCase(); // Extract and sanitize the command
            switch (command) {
                case "start":
                    return sendMessage(messageObj, "Hi! I am a bot. I can help you get started.");
                default:
                    return sendMessage(messageObj, `Hi, I don't recognize the command "/${command}".`);
            }
        } else {
            // Echo back the user's message
            return sendMessage(messageObj, messageText);
        }
    } catch (error) {
        console.error("Error in handleMessage:", error);
        return sendMessage(messageObj, "Sorry, an error occurred while processing your message.");
    }
}

module.exports = { handleMessage }