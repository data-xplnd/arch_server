const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
};

app.get("/tasks", async (req, res) => {
    const client = new Client(dbConfig);
    await client.connect();

    const result = await client.query("SELECT * FROM tasks");
    res.json(result.rows);

    await client.end();
});

app.listen(3000, () => console.log("Server running on port 3000"));
