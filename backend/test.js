let percentage = 10;

const logPercentage = () => {
  console.log(`${percentage}% completed...`);
  percentage += 10;

  if (percentage > 100) {
    clearInterval(interval);
  }
};

const interval = setInterval(logPercentage, 1000);
