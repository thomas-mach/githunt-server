// server.js

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: 50, // massimo richieste per ogni IP
  message: "Too many attempts, please try again later.", // messaggio da inviare se il limite è raggiunto
});

app.use(limiter);

app.get("/api/github-repos", async (req, res) => {
  const selectedOption = req.query.selectedOption || "";
  const searchValue = req.query.searchValue || "";
  const sortValue = req.query.sortValue || "stars";
  const pageToFetch = req.query.page || 1;

  const url = `https://api.github.com/search/${selectedOption}?q=${searchValue}&sort=${sortValue}&order=desc&per_page=100&page=${pageToFetch}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Usa il tuo token nel server
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/github-user-details", async (req, res) => {
  const user = req.query.user;

  const url = user;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Usa il tuo token nel server
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    res.status(500).json({ error: error.message });
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
