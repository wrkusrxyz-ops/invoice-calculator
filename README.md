# Invoice Calculator

Helper functions used by the billing service to build customer invoices.

## Functions

| Function            | Description                                       |
| ------------------- | ------------------------------------------------- |
| `calculateSubtotal` | Sums `quantity × unitPrice` across line items     |
| `applyDiscount`     | Applies a percentage discount (0–100) to an amount |
| `calculateTax`      | Calculates tax on an amount, rounded to 2 decimals |
| `formatCurrency`    | Formats an amount as currency (default USD)       |

## Setup

```bash
npm install
```
