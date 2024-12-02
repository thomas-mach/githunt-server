// server.js

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// Rotta per ottenere repository da GitHub
app.get("/api/github-repos", async (req, res) => {
  const selectedOption = req.query.selectedOption || "";
  const searchValue = req.query.searchValue || "";
  const sortValue = req.query.sortValue || "stars";
  const pageToFetch = req.query.page || 1;

  const url = `https://api.github.com/search/${selectedOption}?q=${searchValue}&sort=${sortValue}&order=desc&per_page=100&page=${pageToFetch}`;
  //   const url = `https://api.github.com/search/repositories?q=vue&sort=stars&order=desc&per_page=100&page=1`;
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
  console.log(`Token: ${process.env.GITHUB_TOKEN}`);
  console.log(`Server running on port ${port}`);
});
