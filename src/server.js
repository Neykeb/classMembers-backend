const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/connectDB");
const classMemberRoutes = require("./routes/classMemberRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Alle Anfragen für Class Members an den neuen Router leiten
app.use("/api/class-members", classMemberRoutes);

app.get("/", (req, res) => {
  res.send("Class Member API läuft!");
});

// Der Error Handler MUSS als allerletzte app.use()-Zeile vor listen stehen
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
