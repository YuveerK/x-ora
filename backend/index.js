const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const corsOptions = {
  // Allow only requests from this domain
  origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(userRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
