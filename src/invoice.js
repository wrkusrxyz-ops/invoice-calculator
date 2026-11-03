/**
 * Invoice calculation helpers used by the billing service.
 */

function calculateSubtotal(lineItems) {
  if (!Array.isArray(lineItems)) {
    throw new TypeError("lineItems must be an array");
  }
  return lineItems.reduce((total, item) => {
    if (item.quantity < 0 || item.unitPrice < 0) {
      throw new RangeError("quantity and unitPrice must be non-negative");
    }
    return total + item.quantity * item.unitPrice;
  }, 0);
}

function applyDiscount(amount, discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new RangeError("discountPercent must be between 0 and 100");
  }
  return amount - (amount * discountPercent) / 100;
}

function calculateTax(amount, taxRate) {
  if (taxRate < 0) {
    throw new RangeError("taxRate must be non-negative");
  }
  return Math.round(amount * taxRate * 100) / 100;
}

function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

module.exports = {
  calculateSubtotal,
  applyDiscount,
  calculateTax,
  formatCurrency,
};
