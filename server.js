const express = require("express");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const { notFound, errorHandler } = require("./middlewares/error.Middleware");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

// --------------------------Deployment------------------------------

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname + "/frontend/build/index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// --------------------------Deployment------------------------------

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on PORT - ${PORT}`));
