const {
  calculateSubtotal,
  applyDiscount,
  calculateTax,
  formatCurrency,
} = require("../src/invoice");

describe("calculateSubtotal", () => {
  test("sums quantity x unitPrice across line items", () => {
    const items = [
      { quantity: 2, unitPrice: 50 },
      { quantity: 1, unitPrice: 25.5 },
    ];
    expect(calculateSubtotal(items)).toBe(125.5);
  });

  test("returns 0 for an empty invoice", () => {
    expect(calculateSubtotal([])).toBe(0);
  });

  test("throws when lineItems is not an array", () => {
    expect(() => calculateSubtotal(null)).toThrow(TypeError);
  });

  test("throws on negative quantity or price", () => {
    expect(() => calculateSubtotal([{ quantity: -1, unitPrice: 10 }])).toThrow(
      RangeError,
    );
  });
});

describe("applyDiscount", () => {
  test("applies a percentage discount", () => {
    expect(applyDiscount(200, 10)).toBe(180);
  });

  test("returns the same amount for 0% discount", () => {
    expect(applyDiscount(200, 0)).toBe(200);
  });

  test("throws when discount is outside 0-100", () => {
    expect(() => applyDiscount(200, 120)).toThrow(RangeError);
    expect(() => applyDiscount(200, -5)).toThrow(RangeError);
  });
});

describe("calculateTax", () => {
  test("calculates tax rounded to 2 decimals", () => {
    expect(calculateTax(99.99, 0.075)).toBe(7.5);
  });

  // TODO: Add a test that checks that calculateTax throws an error for negative amounts or tax rates
});

describe("formatCurrency", () => {
  test("formats as USD by default", () => {
    expect(formatCurrency(1234.5)).toBe("$1,234.50");
  });

  test("formats with a given currency code", () => {
    expect(formatCurrency(1000, "EUR")).toBe("€1,000.00");
  });
});
