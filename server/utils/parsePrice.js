function parsePrice(priceString) {
  if (!priceString) return null;

  const str = String(priceString);

  const numeric = str.replace(/[^\d.]/g, "");

  if (!numeric) return null;

  const number = parseFloat(numeric);

  return isNaN(number) ? null : number;
}

module.exports = parsePrice;
