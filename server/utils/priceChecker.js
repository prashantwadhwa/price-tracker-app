const checkPriceDrop = (oldPrice, newPrice) => {
  if (!oldPrice) {
    return {
      dropped: false,
      difference: 0,
      percentage: 0,
    };
  }

  const difference = oldPrice - newPrice;

  if (difference > 0) {
    // price droppped
    const percentage = ((difference / oldPrice) * 100).toFixed(2);

    return {
      dropped: true,
      difference,
      percentage,
    };
  }

  return {
    dropped: false,
    difference: 0,
    percentage: 0,
  };
};

module.exports = checkPriceDrop;
