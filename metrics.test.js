"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { safeNumber, calculateMetrics } = require("../metrics.js");

test("safeNumber rejects invalid and negative values", () => {
  assert.equal(safeNumber("abc"), 0);
  assert.equal(safeNumber(-5), 0);
  assert.equal(safeNumber("25"), 25);
});

test("calculates core SaaS metrics from sample values", () => {
  const result = calculateMetrics({
    mrr: 25000,
    previousMrr: 22000,
    customers: 240,
    startingCustomers: 225,
    newCustomers: 28,
    churnedCustomers: 13,
    acquisitionSpend: 7500,
    grossMargin: 80
  });

  assert.equal(result.mrr, 25000);
  assert.equal(result.arr, 300000);
  assert.ok(Math.abs(result.growthRate - 13.63636) < 0.001);
  assert.ok(Math.abs(result.churnRate - 5.77778) < 0.001);
  assert.ok(Math.abs(result.arpu - 104.16667) < 0.001);
  assert.ok(Math.abs(result.cac - 267.85714) < 0.001);
  assert.ok(Math.abs(result.ltv - 1442.30769) < 0.001);
  assert.ok(Math.abs(result.ltvCac - 5.38462) < 0.001);
});

test("avoids NaN and Infinity when denominators are zero", () => {
  const result = calculateMetrics({
    mrr: 1000,
    previousMrr: 0,
    customers: 0,
    startingCustomers: 0,
    newCustomers: 0,
    churnedCustomers: 0,
    acquisitionSpend: 500,
    grossMargin: 80
  });

  for (const value of Object.values(result)) {
    assert.equal(Number.isFinite(value), true);
  }

  assert.equal(result.growthRate, 0);
  assert.equal(result.churnRate, 0);
  assert.equal(result.arpu, 0);
  assert.equal(result.cac, 0);
  assert.equal(result.ltv, 0);
  assert.equal(result.ltvCac, 0);
});

test("caps gross margin at 100 percent", () => {
  const result = calculateMetrics({
    mrr: 1000,
    customers: 10,
    startingCustomers: 10,
    churnedCustomers: 1,
    grossMargin: 150
  });

  assert.equal(result.ltv, 1000);
});
