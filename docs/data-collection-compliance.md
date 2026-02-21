# 🔒 GeoTarget Pro — Data Collection & Compliance Documentation

## 1. Data Collection Overview

GeoTarget Pro collects audience data to enable businesses to understand customer behavior and deliver targeted marketing. All data collection follows a **privacy-first** approach with strict compliance to GDPR and CCPA.

### 1.1 Data Types Collected

| Data Type | Description | Storage | Anonymization |
|-----------|-------------|---------|---------------|
| **Location Coordinates** | GPS lat/lng when within geofence | MongoDB (encrypted) | Rounded to 3 decimal places |
| **Device ID** | Unique device identifier | MongoDB (encrypted) | Hashed with SHA-256 + salt |
| **Visit Frequency** | Number of times entering a geofence | MongoDB | Aggregated, no PII link |
| **Dwell Time** | Duration spent within geofence | MongoDB | Aggregated averages |
| **Entry/Exit Timestamps** | When user enters or exits geofence | MongoDB (encrypted) | Rounded to nearest hour |
| **Device Type** | Mobile, tablet, OS version | MongoDB | No PII association |
| **Demographics** | Age range, gender (optional opt-in) | MongoDB (encrypted) | Anonymized cohorts only |
| **Behavior Patterns** | Visit chains, popular routes | MongoDB | Fully anonymized, statistical |

### 1.2 Data NOT Collected

- ❌ Personal names
- ❌ Email addresses (except account holders)
- ❌ Phone numbers (except account holders)
- ❌ Photos or media
- ❌ Browsing history
- ❌ Financial information
- ❌ Health data
- ❌ Precise home addresses

---

## 2. Consent Mechanism

### 2.1 Opt-In Flow

```
User Opens App/Web → Consent Banner Appears
         │
         ├── "Accept All" → Full data collection enabled
         │
         ├── "Customize" → Granular toggle controls:
         │     ├── Location Sharing: ON/OFF
         │     ├── Visit Analytics: ON/OFF
         │     ├── Demographics: ON/OFF
         │     └── Marketing Notifications: ON/OFF
         │
         └── "Reject All" → Minimal functionality, no tracking
```

### 2.2 Consent Record Schema

```javascript
{
  consentId: "uuid-v4",
  userId: "hashed-device-id",
  timestamp: "2026-02-22T00:00:00Z",
  version: "1.0",
  consents: {
    locationSharing: true,
    visitAnalytics: true,
    demographics: false,
    marketingNotifications: true
  },
  ipAddress: "anonymized",
  method: "banner-click",
  policyVersion: "2.0"
}
```

### 2.3 Consent Management

- Consent can be withdrawn at any time via Settings
- Consent records are maintained for audit trail
- Re-consent prompted when privacy policy changes
- Consent status visible in user profile

---

## 3. GDPR Compliance

### 3.1 Article-by-Article Compliance

| GDPR Article | Requirement | Implementation |
|-------------|-------------|----------------|
| **Art. 6** | Lawful Basis | Explicit consent (opt-in) |
| **Art. 7** | Conditions for Consent | Clear, affirmative action; easy withdrawal |
| **Art. 13** | Information to Data Subject | Full privacy policy; purpose explanation |
| **Art. 15** | Right of Access | "Download My Data" feature |
| **Art. 17** | Right to Erasure | "Delete My Account" with full data wipe |
| **Art. 18** | Right to Restriction | Pause data collection toggle |
| **Art. 20** | Data Portability | Export data in JSON/CSV format |
| **Art. 25** | Data Protection by Design | Privacy-first architecture; encryption |
| **Art. 30** | Records of Processing | Automated processing activity logs |
| **Art. 32** | Security of Processing | AES-256 encryption; access controls |
| **Art. 33** | Breach Notification | 72-hour notification system |
| **Art. 35** | DPIA | Privacy Impact Assessment completed |

### 3.2 GDPR User Controls

```
Settings → Privacy → Data Controls

┌────────────────────────────────────────────┐
│  📋 My Data Controls                       │
│                                            │
│  Location Sharing      [████████████] ON   │
│  Visit Analytics       [████████████] ON   │
│  Demographics          [            ] OFF  │
│  Marketing Notifs      [████████████] ON   │
│                                            │
│  ┌──────────────────┐ ┌──────────────────┐ │
│  │ 📥 Download Data │ │ 🗑️ Delete Acct  │ │
│  └──────────────────┘ └──────────────────┘ │
│                                            │
│  Last consent update: Feb 22, 2026         │
│  View consent history →                    │
└────────────────────────────────────────────┘
```

---

## 4. CCPA Compliance

### 4.1 CCPA Requirements

| CCPA Right | Implementation |
|-----------|----------------|
| **Right to Know** | Categories and purposes of data collection disclosed |
| **Right to Delete** | Full data deletion within 45 days |
| **Right to Opt-Out** | "Do Not Sell My Personal Information" link |
| **Right to Non-Discrimination** | Equal service regardless of privacy choices |
| **Financial Incentives** | Pricing not linked to data sharing |

### 4.2 "Do Not Sell" Implementation

- Prominent footer link on all pages
- One-click opt-out from data sharing
- Global Privacy Control (GPC) signal respected
- Annual notification to California users

---

## 5. Data Anonymization

### 5.1 Techniques Used

| Technique | Applied To | Method |
|-----------|-----------|--------|
| **Hashing** | Device IDs | SHA-256 with random salt (rotated monthly) |
| **Generalization** | Location | Round coordinates to 3 decimals (~111m precision) |
| **K-Anonymity** | Demographics | Ensure groups of ≥5 users per cohort |
| **Aggregation** | Visit data | Store hourly/daily aggregates, not individual events |
| **Noise Addition** | Analytics | Differential privacy (ε=1.0) for statistical queries |
| **Pseudonymization** | User records | Replace identifiers with random tokens |

### 5.2 Anonymization Pipeline

```
Raw Data → Validation → PII Detection → Anonymization → Encrypted Storage
                              │
                              ├── Hash identifiers
                              ├── Round coordinates
                              ├── Remove unnecessary fields
                              └── Apply k-anonymity check
```

---

## 6. Data Storage & Security

### 6.1 Storage Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Primary Database** | MongoDB Atlas | Geofences, user accounts, analytics |
| **Object Storage** | AWS S3 | Reports, exports, backups |
| **Cache** | Redis | Real-time location data, session tokens |
| **Backup** | Automated daily | Point-in-time recovery, 30-day retention |

### 6.2 Encryption

| At Rest | In Transit |
|---------|-----------|
| AES-256 encryption for all stored data | TLS 1.3 for all API communications |
| MongoDB field-level encryption for PII | HTTPS enforced on all endpoints |
| Encrypted backups with separate key management | Certificate pinning for mobile apps |

### 6.3 Access Controls

- **Role-Based Access Control (RBAC)** — Admin, Manager, Viewer roles
- **API Key Authentication** — Scoped API keys per integration
- **2FA** — Optional two-factor authentication for admin accounts
- **Audit Logging** — All data access logged with timestamps

---

## 7. Data Retention Policy

| Data Type | Retention Period | After Expiry |
|-----------|-----------------|-------------|
| Location events | 90 days (Free), 1 year (Paid) | Permanently deleted |
| Analytics aggregates | 2 years | Anonymized archives |
| Consent records | 5 years (legal requirement) | Permanent audit trail |
| User accounts | Until deletion requested | 30-day grace, then full wipe |
| Backups | 30 days rolling | Auto-deleted |

---

## 8. Incident Response Plan

### Breach Notification Timeline

| Time | Action |
|------|--------|
| **0-24 hours** | Identify and contain breach |
| **24-48 hours** | Assess scope and impacted users |
| **48-72 hours** | Notify supervisory authority (GDPR Art. 33) |
| **72 hours** | Notify affected users (if high risk) |
| **7 days** | Publish post-incident report |
| **30 days** | Implement remediation measures |

---

*Compliance Document Version: 1.0 | Last Updated: February 2026 | GeoTarget Pro*
