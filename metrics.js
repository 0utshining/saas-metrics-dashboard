"use strict";

/**
 * Pure SaaS metric calculations shared by tests and suitable for future app reuse.
 * All inputs are expected to be non-negative numbers.
 */
function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function calculateMetrics(input = {}) {
  const mrr = safeNumber(input.mrr);
  const previousMrr = safeNumber(input.previousMrr);
  const customers = safeNumber(input.customers);
  const startingCustomers = safeNumber(input.startingCustomers);
  const newCustomers = safeNumber(input.newCustomers);
  const churnedCustomers = safeNumber(input.churnedCustomers);
  const acquisitionSpend = safeNumber(input.acquisitionSpend);
  const grossMargin = Math.min(safeNumber(input.grossMargin), 100);

  const arr = mrr * 12;
  const growthRate =
    previousMrr > 0 ? ((mrr - previousMrr) / previousMrr) * 100 : 0;
  const churnRate =
    startingCustomers > 0 ? (churnedCustomers / startingCustomers) * 100 : 0;
  const arpu = customers > 0 ? mrr / customers : 0;
  const cac = newCustomers > 0 ? acquisitionSpend / newCustomers : 0;

  const churnDecimal = churnRate / 100;
  const ltv =
    churnDecimal > 0 ? (arpu * (grossMargin / 100)) / churnDecimal : 0;
  const ltvCac = cac > 0 ? ltv / cac : 0;

  return {
    mrr,
    arr,
    growthRate,
    churnRate,
    arpu,
    cac,
    ltv,
    ltvCac
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { safeNumber, calculateMetrics };
}
