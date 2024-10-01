const csv = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("data.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results[21]);
    const formattedTransactions = results
      .filter((transaction) => transaction._2 > 0)
      .map((transaction) => ({
        date: transaction["ACCOUNT TRANSACTION HISTORY"].trim(), // Extract and trim the date
        amount: transaction._2,
        reference: transaction._3.replace(/\s+/g, " ").trim(),
      }));

    console.log(formattedTransactions);
  });
