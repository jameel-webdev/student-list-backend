import express from "express";

const port = 4000;

const app = express();

app.get("/", (req, res) => {
  res.send(`Welcome to the Student List App`);
});
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
