const express = require("express");
const path = require("path"); // Import path module to handle directory paths
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const maintenanceRequestRoute = require("./routes/maintenanceRequestRoute");
const invoiceRoute = require("./routes/invoiceRoute");
const quotationRoute = require("./routes/quotationRoute");

const corsOptions = {
  // Allow only requests from this domain
  origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOptions));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/invoices", express.static(path.join(__dirname, "invoices")));
app.use("/quottations", express.static(path.join(__dirname, "quottations")));

app.use(userRoute);
app.use(maintenanceRequestRoute);
app.use(invoiceRoute);
app.use(quotationRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
