# Security Alert Automation Script

This Python-based automation script is designed to streamline and improve security alert enrichment workflows. It significantly reduces manual investigation steps by automating data collection, utilizing APIs, and applying logic-based alert classification.

## Features

- **Automated Data Enrichment**: Automatically fetches context for IP addresses using public APIs (e.g., geolocation, ISP reputation).
- **Logic-Based Classification**: Evaluates alerts using customizable rules to automatically classify risks as Low, Medium, or High severity.
- **REST API Integration**: Built with the `requests` library to handle HTTP GET requests and JSON parsing.
- **Improved Workflow**: Output is structured in JSON for easy integration with SIEMs, case management tools, or alerting platforms.

## Prerequisites

- Python 3.7+
- Recommended to run inside a virtual environment.

## Installation

1. Navigate to the project directory:
   ```bash
   cd Security_Alert_Automation
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Run the main script to process the simulated security alerts:

```bash
python alert_enrichment.py
```

### Example Output

```json
[
    {
        "alert_id": "ALT-002",
        "alert_type": "failed_login",
        "source_ip": "167.99.241.135",
        "user_account": "jsmith",
        "failed_attempts": 15,
        "timestamp_processed": "2023-10-27T10:00:00.123456",
        "ip_intelligence": { ... },
        "severity": "High",
        "reasons": [
            "Originates from a known hosting provider/datacenter (VPN/Proxy risk)...",
            "High number of failed login attempts (15)"
        ]
    }
]
```

## Future Enhancements
- Integration with commercial Threat Intelligence feeds (e.g., VirusTotal, AbuseIPDB).
- Support for parsing alerts from a message queue (e.g., Kafka, RabbitMQ).
- Export automated reports to Slack or Microsoft Teams.
