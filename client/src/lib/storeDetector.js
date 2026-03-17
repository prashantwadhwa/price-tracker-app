export function detectStore(productURL) {
  if (productURL.includes("amazon." || "amzn.to")) {
    return "amazon";
  }
  if (productURL.includes("flipkart.")) {
    return "flipkart";
  }
  if (productURL.includes("myntra.")) {
    return "myntra";
  }
  if (productURL.includes("ajio.")) {
    return "ajio";
  }
  return null;
}
