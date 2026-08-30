# SaaS Metrics Dashboard

A lightweight, open-source dashboard for calculating and visualizing essential SaaS business metrics directly in the browser.

Built with vanilla HTML, CSS, and JavaScript with no external runtime dependencies.

## Overview

SaaS Metrics Dashboard is designed to make common SaaS metrics easier to calculate, understand, and visualize.

The project currently supports interactive calculations for revenue, growth, customer economics, and churn while keeping all entered data in the user's browser.

No backend or account is required.

## Current Features

- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- Month-over-month revenue growth
- Customer churn rate
- Average Revenue Per User (ARPU)
- Customer Acquisition Cost (CAC)
- Estimated Customer Lifetime Value (LTV)
- LTV:CAC ratio
- Revenue trend visualization
- Customer-growth visualization
- Responsive desktop and mobile interface
- Synthetic sample dataset
- Local browser-based calculations
- No external JavaScript dependencies

## Quick Start

Clone the repository:

```bash
git clone https://github.com/0utshining/saas-metrics-dashboard.git
cd saas-metrics-dashboard
```

Then open:

```text
index.html
```

in a modern web browser.

Because the current version has no build process or runtime dependencies, no package installation is required.

You can also download the repository as a ZIP and open `index.html` locally.

## Using the Dashboard

Enter your SaaS data into the input fields.

The dashboard recalculates the metrics automatically as values change.

To explore the interface without entering your own data, select **Load Sample Data**.

The included demonstration values are synthetic and do not represent a real company, project usage, customers, downloads, or adoption.

Select **Reset** to clear the dashboard.

## Metrics

### Monthly Recurring Revenue (MRR)

Recurring subscription revenue normalized to a monthly amount.

```text
MRR = Monthly Recurring Revenue
```

### Annual Recurring Revenue (ARR)

```text
ARR = MRR × 12
```

### Month-over-Month Growth

```text
Growth % = ((Current MRR - Previous MRR) / Previous MRR) × 100
```

### Customer Churn

```text
Customer Churn % =
(Customers Lost / Customers at Start of Period) × 100
```

### Average Revenue Per User

```text
ARPU = MRR / Current Customers
```

### Customer Acquisition Cost

```text
CAC = Acquisition Spend / New Customers
```

### Estimated Customer Lifetime Value

The current implementation uses:

```text
LTV = (ARPU × Gross Margin) / Customer Churn Rate
```

This is a simplified SaaS LTV model. Different organizations may use different LTV methodologies depending on their business model and reporting requirements.

### LTV:CAC

```text
LTV:CAC = LTV / CAC
```

## Privacy

The current dashboard performs its calculations locally in the browser.

The project does not currently require a backend service, user account, analytics service, or database to calculate metrics.

Users should still review the source code and deployment environment before entering sensitive business information into any hosted version.

## Sample Data

Synthetic demonstration data is available in:

```text
data/sample-data.json
```

The sample dataset exists for development, testing, demonstrations, and screenshots.

It must not be interpreted as evidence of real project adoption or company performance.

## Project Structure

```text
saas-metrics-dashboard/
├── .github/
├── data/
│   └── sample-data.json
├── .gitignore
├── app.js
├── CONTRIBUTING.md
├── index.html
├── LICENSE
├── README.md
├── ROADMAP.md
├── SECURITY.md
└── styles.css
```

## Technology

The project intentionally starts with a small technology footprint:

- HTML5
- CSS3
- Vanilla JavaScript
- Browser DOM APIs
- Intl.NumberFormat

There are currently no required external runtime dependencies.

## Roadmap

Planned development includes:

- Automated tests
- GitHub Actions validation
- CSV and JSON imports
- Data export
- Local browser persistence
- Net Revenue Retention
- Gross Revenue Retention
- Expansion and contraction MRR
- Revenue churn
- SaaS Quick Ratio
- Payback period
- Additional reporting and visualization tools

See [`ROADMAP.md`](ROADMAP.md) for the detailed development plan.

## Contributing

Contributions are welcome.

Potential contributions include bug fixes, documentation improvements, accessibility work, additional SaaS metrics, testing, data import/export, visualization improvements, and methodology reviews.

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting a pull request.

## Security

Please avoid publicly disclosing security vulnerabilities through normal GitHub issues.

See [`SECURITY.md`](SECURITY.md) for the project's security policy.

## Status

The project is currently in early active development.

APIs, calculations, interface elements, and data formats may change before the first stable release.

## License

SaaS Metrics Dashboard is available under the MIT License.

See [`LICENSE`](LICENSE) for details.
