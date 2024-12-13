const express = require("express");
const PORT = 8080;
const { handler } = require("./controller/index")

const app = express();
app.use(express.json())

app.post("*", async (req, res) => {
    try {
        console.log("POST Request Body:", req.body); // Logging for debugging
        const ans = await handler(req);
        res.status(200).send(ans); // Send the handler's response
    } catch (error) {
        console.error("Error in POST handler:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.get("*", async (req, res) => {
    try {
        const ans = await handler(req);
        res.status(200).send(ans); // Send the handler's response
    } catch (error) {
        console.error("Error in GET handler:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})




// `https://api.telegram.org/bot${}/${}`