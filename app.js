const sampleData = {
  mrr: 25000,
  previousMrr: 22000,
  customers: 240,
  startingCustomers: 225,
  newCustomers: 28,
  churnedCustomers: 13,
  acquisitionSpend: 7500,
  grossMargin: 80,
  revenueHistory: [
    { month: "Mar", value: 14500 },
    { month: "Apr", value: 16200 },
    { month: "May", value: 18100 },
    { month: "Jun", value: 19800 },
    { month: "Jul", value: 22000 },
    { month: "Aug", value: 25000 }
  ],
  customerHistory: [
    { month: "Mar", value: 151 },
    { month: "Apr", value: 166 },
    { month: "May", value: 184 },
    { month: "Jun", value: 201 },
    { month: "Jul", value: 225 },
    { month: "Aug", value: 240 }
  ]
};

const form = document.getElementById("metricsForm");
const loadSampleBtn = document.getElementById("loadSampleBtn");
const resetBtn = document.getElementById("resetBtn");

const fields = {
  mrr: document.getElementById("mrr"),
  previousMrr: document.getElementById("previousMrr"),
  customers: document.getElementById("customers"),
  startingCustomers: document.getElementById("startingCustomers"),
  newCustomers: document.getElementById("newCustomers"),
  churnedCustomers: document.getElementById("churnedCustomers"),
  acquisitionSpend: document.getElementById("acquisitionSpend"),
  grossMargin: document.getElementById("grossMargin")
};

const metrics = {
  mrr: document.getElementById("metricMrr"),
  arr: document.getElementById("metricArr"),
  growth: document.getElementById("metricGrowth"),
  churn: document.getElementById("metricChurn"),
  arpu: document.getElementById("metricArpu"),
  cac: document.getElementById("metricCac"),
  ltv: document.getElementById("metricLtv"),
  ltvCac: document.getElementById("metricLtvCac")
};

const revenueChart = document.getElementById("revenueChart");
const customerChart = document.getElementById("customerChart");

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function safeDivide(numerator, denominator) {
  if (!denominator || denominator <= 0) {
    return 0;
  }

  return numerator / denominator;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function formatPercent(value) {
  return `${(value || 0).toFixed(1)}%`;
}

function formatRatio(value) {
  return `${(value || 0).toFixed(1)}×`;
}

function readFormData() {
  return {
    mrr: toNumber(fields.mrr.value),
    previousMrr: toNumber(fields.previousMrr.value),
    customers: toNumber(fields.customers.value),
    startingCustomers: toNumber(fields.startingCustomers.value),
    newCustomers: toNumber(fields.newCustomers.value),
    churnedCustomers: toNumber(fields.churnedCustomers.value),
    acquisitionSpend: toNumber(fields.acquisitionSpend.value),
    grossMargin: Math.min(toNumber(fields.grossMargin.value), 100)
  };
}

function calculateMetrics(data) {
  const arr = data.mrr * 12;

  const growthRate =
    data.previousMrr > 0
      ? ((data.mrr - data.previousMrr) / data.previousMrr) * 100
      : 0;

  const churnRate =
    safeDivide(data.churnedCustomers, data.startingCustomers) * 100;

  const arpu = safeDivide(data.mrr, data.customers);

  const cac = safeDivide(
    data.acquisitionSpend,
    data.newCustomers
  );

  const grossMarginDecimal = data.grossMargin / 100;
  const churnDecimal = churnRate / 100;

  const ltv =
    churnDecimal > 0
      ? (arpu * grossMarginDecimal) / churnDecimal
      : 0;

  const ltvCac = safeDivide(ltv, cac);

  return {
    mrr: data.mrr,
    arr,
    growthRate,
    churnRate,
    arpu,
    cac,
    ltv,
    ltvCac
  };
}

function updateMetricClasses(element, value) {
  element.classList.remove(
    "metric-positive",
    "metric-negative"
  );

  if (value > 0) {
    element.classList.add("metric-positive");
  } else if (value < 0) {
    element.classList.add("metric-negative");
  }
}

function renderMetrics() {
  const data = readFormData();
  const result = calculateMetrics(data);

  metrics.mrr.textContent = formatCurrency(result.mrr);
  metrics.arr.textContent = formatCurrency(result.arr);
  metrics.growth.textContent = formatPercent(result.growthRate);
  metrics.churn.textContent = formatPercent(result.churnRate);
  metrics.arpu.textContent = formatCurrency(result.arpu);
  metrics.cac.textContent = formatCurrency(result.cac);
  metrics.ltv.textContent = formatCurrency(result.ltv);
  metrics.ltvCac.textContent = formatRatio(result.ltvCac);

  updateMetricClasses(metrics.growth, result.growthRate);

  metrics.churn.classList.remove(
    "metric-positive",
    "metric-negative"
  );

  if (result.churnRate > 0) {
    metrics.churn.classList.add("metric-negative");
  }
}

function setFormValues(data) {
  fields.mrr.value = data.mrr;
  fields.previousMrr.value = data.previousMrr;
  fields.customers.value = data.customers;
  fields.startingCustomers.value = data.startingCustomers;
  fields.newCustomers.value = data.newCustomers;
  fields.churnedCustomers.value = data.churnedCustomers;
  fields.acquisitionSpend.value = data.acquisitionSpend;
  fields.grossMargin.value = data.grossMargin;
}

function renderBarChart(container, data, type) {
  container.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML =
      '<p class="chart-placeholder">No data available.</p>';
    return;
  }

  const maxValue = Math.max(
    ...data.map((item) => toNumber(item.value)),
    1
  );

  data.forEach((item) => {
    const value = toNumber(item.value);
    const height = Math.max((value / maxValue) * 100, 2);

    const column = document.createElement("div");
    column.className = "bar-column";

    const valueLabel = document.createElement("div");
    valueLabel.className = "bar-value";

    valueLabel.textContent =
      type === "currency"
        ? formatCompactCurrency(value)
        : Math.round(value).toLocaleString("en-US");

    const track = document.createElement("div");
    track.className = "bar-track";

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${height}%`;

    bar.title =
      type === "currency"
        ? `${item.month}: ${formatCurrency(value)}`
        : `${item.month}: ${value.toLocaleString("en-US")} customers`;

    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = item.month;

    track.appendChild(bar);
    column.appendChild(valueLabel);
    column.appendChild(track);
    column.appendChild(label);

    container.appendChild(column);
  });
}

function formatCompactCurrency(value) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }

  return `$${Math.round(value)}`;
}

function renderSampleCharts() {
  renderBarChart(
    revenueChart,
    sampleData.revenueHistory,
    "currency"
  );

  renderBarChart(
    customerChart,
    sampleData.customerHistory,
    "number"
  );
}

function clearCharts() {
  revenueChart.innerHTML = `
    <p class="chart-placeholder">
      Load sample data to display the revenue trend.
    </p>
  `;

  customerChart.innerHTML = `
    <p class="chart-placeholder">
      Load sample data to display customer growth.
    </p>
  `;
}

function loadSampleData() {
  setFormValues(sampleData);
  renderMetrics();
  renderSampleCharts();
}

function resetDashboard() {
  form.reset();
  renderMetrics();
  clearCharts();
}

form.addEventListener("input", renderMetrics);

loadSampleBtn.addEventListener("click", loadSampleData);

resetBtn.addEventListener("click", resetDashboard);

renderMetrics();
