const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let logs = [];
console.log(logs);

app.post("/logs", (req, res) => {
  logs.push(req.body);
  res.status(201).send({ message: "Log added" });
});

app.get("/logs", (req, res) => {
  res.send(logs);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
