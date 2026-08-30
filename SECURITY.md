# Security Policy

## Supported Versions

SaaS Metrics Dashboard is currently in early active development.

Security fixes are applied to the latest version available on the `main` branch. Older snapshots, forks, and modified deployments may not receive security updates.

| Version | Supported |
| --- | --- |
| Latest `main` branch | Yes |
| Older snapshots / forks | No |

## Reporting a Vulnerability

Please **do not open a public GitHub issue** for a suspected security vulnerability.

If GitHub private vulnerability reporting is available for this repository, use the repository's **Security** tab to submit the report privately.

If private reporting is not available, contact the maintainer through the GitHub profile and request a private channel before sharing sensitive technical details.

When reporting a vulnerability, please include:

- A clear description of the issue
- Steps to reproduce it
- The affected file, feature, or deployment configuration
- The potential impact
- Any suggested fix or mitigation, if known

Please avoid including real credentials, access tokens, customer data, or other sensitive information in a report.

## Response Process

Security reports will be reviewed as soon as reasonably practical. If the issue is confirmed, the project may:

1. Reproduce and assess the vulnerability.
2. Develop and test a fix.
3. Publish the fix to the `main` branch.
4. Document the security impact when appropriate.

Because this is a volunteer-maintained open-source project, no guaranteed response or remediation timeframe is promised.

## Scope

The repository is currently a browser-based HTML, CSS, and JavaScript project with no required backend service.

Security reports may still be relevant for issues involving:

- Cross-site scripting or unsafe DOM handling
- Malicious or unsafe imported data in future versions
- Dependency or supply-chain risks introduced by future changes
- GitHub Actions or repository automation
- Hosted deployments of the project
- Exposure of secrets or credentials committed to the repository

Vulnerabilities in third-party hosting platforms, browsers, forks, or modified copies should normally be reported to the responsible provider or maintainer.

## Safe Harbor

Good-faith security research intended to improve this project is welcome. Please avoid privacy violations, service disruption, data destruction, or accessing data that does not belong to you.
