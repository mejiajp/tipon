# Product Requirements Document — Tipon

**Version:** 1.0  
**Date:** March 24, 2026  
**Status:** Draft

---

## 1. Overview

**Tipon** (from the Filipino word _tipon_, meaning "to gather") is a personal expense tracking mobile/web application designed to help individuals monitor and understand their spending habits. Tipon provides an intuitive interface for logging daily expenses, visualizing spending patterns, setting budgets, and gaining actionable insights — all in one place.

---

## 2. Goals & Objectives

- Provide a simple, fast way to record personal expenses on the go
- Help users understand where their money is going through visual summaries and insights
- Support both casual (guest) and committed (signed-in) users
- Enable proactive budget management through category-based limits
- Surface recurring expense patterns to reduce surprises

---

## 3. Target Users

- Individuals who want to track daily spending without complex tools
- Budget-conscious users looking to manage finances on mobile or web
- Filipino users and others who prefer a clean, localized personal finance experience

---

## 4. Authentication

### 4.1 Guest Mode

- Users can access the app without signing in
- Guest data is stored locally (device/browser)
- A prompt to sign in is shown when attempting to sync or access cross-device features

### 4.2 Google Sign-In

- OAuth 2.0 via Google
- User profile data (name, email, profile photo) pulled from Google account
- Data is synced to the cloud upon sign-in

> **Future consideration:** Apple Sign-In, email/password authentication

---

## 5. Features

### 5.1 Record Expense

Users can log a new expense with the following fields:

| Field    | Description                      | Required |
| -------- | -------------------------------- | -------- |
| Amount   | Numeric value of the transaction | Yes      |
| Category | Type of expense (see list below) | Yes      |
| Date     | Defaults to today; editable      | Yes      |
| Note     | Optional short description       | No       |

**Default Categories:**

- Housing
- Utilities
- Food & Dining
- Transportation
- Healthcare
- Insurance
- Shopping
- Entertainment
- Education
- Travel
- Financial
- Family
- Gifts & Donations
- Subscriptions
- Personal Care
- Pets
- Savings & Investments
- Miscellaneous

Users may not add custom categories in v1.0 (planned for future release).

---

### 5.2 Transaction List

- Displays all recorded transactions in reverse chronological order
- Each item shows: amount, category icon, note (if any), and date
- Supports filtering by category and date range
- Supports search by note/description
- Tapping a transaction opens a detail/edit view
- Swipe-to-delete with confirmation prompt

---

### 5.3 Calendar View

- Default view is the current month
- Each day cell displays the total accumulated expenses for that day
- Days with no expenses appear empty
- Days with high spending are visually highlighted (e.g., color intensity)
- Pagination (left/right arrows or swipe) to navigate to previous/future months
- Tapping a day opens a list of transactions for that day

---

### 5.4 Dashboard

The dashboard surfaces high-level spending stats for the current period:

- **Total spent** this week / this month
- **Top spending category** for the current month
- **Spending by category** — donut or bar chart
- **Daily spending trend** — line or bar chart for the past 7 or 30 days
- **Budget progress** — bar indicators per category showing spend vs. limit (if budgets are set)

---

### 5.5 Spending Insights & Trends

- Weekly and monthly summary reports auto-generated from transaction data
- **Week-over-week comparison** — how this week's spending compares to last week
- **Month-over-month comparison** — how this month compares to the previous month
- **Top categories** ranked by spend for the selected period
- **Average daily spend** for the current month
- Insights are surfaced as cards on the Dashboard and in a dedicated Insights section

---

### 5.6 Recurring Expenses

Users can mark a transaction as recurring:

| Field      | Description                             |
| ---------- | --------------------------------------- |
| Frequency  | Daily, Weekly, Monthly, Yearly          |
| Start Date | When the recurrence begins              |
| End Date   | Optional end date; otherwise indefinite |

- Recurring transactions are auto-logged on their scheduled date
- Users receive an in-app notification when a recurring expense is auto-logged
- Recurring entries are visually distinguished in the Transaction List (e.g., a repeat icon)
- Users can edit or cancel a recurring series at any time

---

### 5.7 Monthly Budget Limits

Users can set a spending limit per category per month:

- Navigate to **Settings > Budgets** or through the Dashboard
- Set a monthly limit (in local currency) for any category
- A **budget progress bar** appears in the Dashboard for each category with a limit set
- Push/in-app notification when spend reaches **80%** of the limit
- Notification again when the limit is **exceeded**
- Budget resets at the start of each calendar month

---

### 5.8 Profile

- Displays user's name, email, and profile photo (from Google account or placeholder for guests)
- Shows account type (Guest / Google)
- **Logout** button with confirmation
- For guests: prompt to sign in to back up data
- Summary stats: total transactions logged, member since date

---

## 6. Color Scheme

Tipon's visual identity is grounded in an earthy, natural palette — conveying calm, clarity, and trustworthiness.

| Role                    | Color                  | Hex       |
| ----------------------- | ---------------------- | --------- |
| Primary                 | Deep Olive             | `#4A5230` |
| Secondary / Accent      | Sage Green             | `#8A9E6E` |
| Background              | Off-White / Warm Cream | `#F7F5F0` |
| Surface (cards, modals) | Soft White             | `#FFFFFF` |
| Text Primary            | Dark Charcoal          | `#1E1E1E` |
| Text Secondary          | Muted Warm Gray        | `#6B6B5E` |
| Destructive / Alert     | Muted Terracotta       | `#C0604A` |
| Success                 | Light Sage             | `#B2C99A` |

**Usage guidelines:**

- **Deep Olive** is used for primary buttons, the bottom nav active state, headers, and key CTAs
- **Sage Green** is used for secondary buttons, category tags, badges, progress bar fills, and chart accents
- **Off-White/Cream** is the default app background to keep the feel warm and easy on the eyes
- **Muted Terracotta** is used for budget exceeded alerts, delete actions, and error states
- **Light Sage** is used for success states (e.g. transaction saved, budget on track)

---

## 7. Navigation Structure

```
Bottom Navigation Bar
├── Dashboard       (Home/stats overview)
├── Calendar        (Monthly calendar view)
├── + (FAB)         (Quick-add expense — floating action button)
├── Transactions    (Full transaction list)
└── Profile         (User profile & settings)
```

---

## 7. Non-Functional Requirements

| Area            | Requirement                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| Performance     | App should load in under 2 seconds on a standard mobile connection                                             |
| Offline support | Guest users and signed-in users should be able to log expenses offline; data syncs when connection is restored |
| Currency        | Default to Philippine Peso (PHP); future: multi-currency support                                               |
| Platform        | Responsive web (mobile-first); native mobile (iOS/Android) as v2                                               |
| Data privacy    | User financial data is private and not shared with third parties                                               |
| Accessibility   | Meets WCAG 2.1 AA standards                                                                                    |

---

## 8. Out of Scope (v1.0)

- Bank/e-wallet integration (GCash, Maya, etc.)
- Income tracking
- Multi-currency support
- Custom categories
- Social / shared expense features
- Export to CSV/PDF _(planned for v1.1)_
- Apple Sign-In / email authentication

---

## 9. Success Metrics

| Metric                                        | Target                   |
| --------------------------------------------- | ------------------------ |
| Day-1 retention                               | ≥ 40%                    |
| Day-7 retention                               | ≥ 20%                    |
| Avg. transactions logged per active user/week | ≥ 5                      |
| Users who set at least one budget             | ≥ 30% of signed-in users |
| Guest-to-signed-in conversion rate            | ≥ 25%                    |

---

## 10. Open Questions

1. What currency/locale should be the default for non-PH users?
2. Should guest data be migrated when the user eventually signs in?
3. Should recurring expenses support custom intervals (e.g., every 2 weeks)?
4. What happens to budget limits if the user changes currency?

---

_Document owner: TBD | Last updated: March 24, 2026_
