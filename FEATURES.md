# Veh Fleet — Feature Specification Document

**Version:** 1.0  
**Date:** April 10, 2026  
**Status:** Planning  

---

## 1. Executive Summary

Veh Fleet is a modern, mobile-first fleet and vehicle management application designed for individual vehicle owners, small fleet operators, and enterprise fleet managers. The app provides comprehensive vehicle tracking, maintenance scheduling, fuel analytics, driver management, and compliance tools.

**Target Users:**
- Individual vehicle owners (cars, bikes)
- Small to mid-size fleet operators (5-50 vehicles)
- Enterprise fleet managers

---

## 2. Competitor Analysis

### 2.1 Leading Fleet Management Apps

| App | Strengths | Weaknesses | Pricing |
|-----|-----------|------------|--------|
| **Samsara** | All-in-one platform, real-time GPS, AI dashcams, safety scoring | Expensive, complex setup, enterprise-focused | $200+/vehicle/month |
| **Motive** | ELD compliance, driver app, AI safety, fuel card integration | Requires hardware, monthly fees | $40-60/vehicle/month |
| **Fleet Complete** | GPS tracking, asset management, competitive pricing | Less advanced analytics, dated UI | $30-50/vehicle/month |
| **KeepTruckin** | Simple ELD, good for compliance, mobile app | Basic features, limited customization | $20-40/vehicle/month |
| **CARFAX Fleet Manager** | Vehicle history, maintenance records, value tracking | Not real-time, limited GPS | $15-30/vehicle/month |

### 2.2 Key Differentiators to Target

1. **Affordable pricing** — Free/低 cost vs $20-200+/month
2. **Modern UI** — Dark mode, mobile-first, intuitive
3. **No hardware required** — GPS via phone, manual entry
4. **All-in-one** — Combine vehicle, fuel, service, reminders
5. **Quick setup** — No complex onboarding

---

## 3. Feature Roadmap

### Phase 1: Core Vehicle Management (MVP)
**Priority: HIGH**

| # | Feature | Status | Description |
|---|---------|--------|-------------|
| F1 | User Authentication | ✅ Done | Login/Register with email |
| F2 | Vehicle CRUD | ✅ Done | Add, view, edit vehicles |
| F3 | Dashboard | ✅ Done | Overview stats and recent activity |
| F4 | Service History | ✅ Done | Record past maintenance |
| F5 | Fuel Log | ✅ Done | Track fuel purchases |
| F6 | Expense Tracking | ✅ Done | All vehicle expenses |

### Phase 2: Smart Maintenance
**Priority: HIGH**

| # | Feature | Status | Target |
|---|---------|--------|--------|
| F7 | Service Reminders | ✅ Done | Apr 10 |
| F8 | Reminder Notifications | 🔲 | Apr 11 |
| F9 | Auto Service Suggestions | 🔲 | Apr 12 |
| F10 | Odometer-based Alerts | 🔲 | Apr 13 |
| F11 | Insurance Renewal Alerts | 🔲 | Apr 14 |
| F12 | Registration Renewal Alerts | 🔲 | Apr 14 |

### Phase 3: Analytics & Insights
**Priority: MEDIUM**

| # | Feature | Status | Target |
|---|---------|--------|--------|
| F13 | Fuel Efficiency Calculator | 🔲 | Apr 15 |
| F14 | Cost Per Mile/KM | 🔲 | Apr 15 |
| F15 | Monthly/Yearly Reports | 🔲 | Apr 16 |
| F16 | Expense Breakdown Charts | 🔲 | Apr 17 |
| F17 | Vehicle Comparison | 🔲 | Apr 18 |
| F18 | Total Cost of Ownership | 🔲 | Apr 19 |

### Phase 4: Trip & Route Management
**Priority: MEDIUM**

| # | Feature | Status | Target |
|---|---------|--------|--------|
| F19 | Trip Logger | 🔲 | Apr 20 |
| F20 | Start/End Odometer | 🔲 | Apr 20 |
| F21 | Trip Purpose Notes | 🔲 | Apr 21 |
| F22 | Route History | 🔲 | Apr 21 |
| F23 | Distance Calculator | 🔲 | Apr 22 |

### Phase 5: Document Management
**Priority: MEDIUM**

| # | Feature | Status | Target |
|---|---------|--------|--------|
| F24 | Document Vault | 🔲 | Apr 23 |
| F25 | Upload Registration | 🔲 | Apr 23 |
| F26 | Upload Insurance | 🔲 | Apr 23 |
| F27 | Upload Service Receipts | 🔲 | Apr 24 |
| F28 | Document Expiry Alerts | 🔲 | Apr 25 |
| F29 | Export Documents | 🔲 | Apr 25 |

### Phase 6: Driver Management
**Priority: MEDIUM**

| # | Feature | Status | Target |
|---|---------|--------|--------|
| F30 | Multiple Drivers per Vehicle | 🔲 | Apr 26 |
| F31 | Driver Profiles | 🔲 | Apr 26 |
| F32 | Driver Assignment | 🔲 | Apr 27 |
| F33 | Driver Safety Score | 🔲 | Apr 28 |
| F34 | Trip Attribution | 🔲 | Apr 28 |

### Phase 7: Alerts & Notifications
**Priority: HIGH**

| # | Feature | Status | Target |
|---|---------|--------|--------|
| F35 | Push Notifications | 🔲 | Apr 29 |
| F36 | Email Alerts | 🔲 | Apr 29 |
| F37 | Maintenance Due Alerts | 🔲 | Apr 30 |
| F38 | Low Fuel Reminders | 🔲 | Apr 30 |
| F39 | Expensive Alerts | 🔲 | May 1 |

### Phase 8: Advanced Features
**Priority: LOW**

| # | Feature | Status | Target |
|---|---------|--------|--------|
| F40 | GPS Location Tracking | 🔲 | May 15 |
| F41 | Real-time Vehicle Map | 🔲 | May 16 |
| F42 | Geofencing | 🔲 | May 17 |
| F43 | IFTA Reporting | 🔲 | May 20 |
| F44 | Integration with Fuel Cards | 🔲 | May 25 |
| F45 | Fleet vs Individual Mode | 🔲 | May 30 |

---

## 4. Detailed Feature Specifications

### F7: Service Reminders (IMPLEMENTED)

**Description:** Automated reminders for scheduled maintenance based on date or odometer.

**Features:**
- Create reminder with vehicle, service type, due date, due odometer
- Recurring reminders (monthly, 3-month, 6-month, yearly)
- Status: Scheduled, Due Soon (within 7 days), Overdue, Completed
- Mark complete with actual date and cost

**UI Components:**
- Stats cards: Overdue count, Due Soon count, Upcoming count
- Reminder list with status badges
- Quick actions: Mark Done, Edit, Delete

**Data Model:**
```javascript
{
  id: string,
  vehicleId: string,
  serviceType: string,  // Oil Change, Tire Rotation, etc.
  dueDate: Date,
  dueOdometer: number,
  status: 'scheduled' | 'due_soon' | 'overdue' | 'completed',
  recurring: string | null,  // '3 months', '6 months', etc.
  completedDate: Date | null,
  completedCost: number | null,
  notes: string
}
```

---

### F13: Fuel Efficiency Calculator

**Description:** Calculate fuel efficiency (MPG or km/L) per vehicle.

**Formula:**
```
Fuel Efficiency = Distance Traveled / Fuel Consumed
```

**Features:**
- Auto-calculate from fuel log entries
- Show efficiency trend over time
- Compare vehicles
- Flag low efficiency

**UI Components:**
- Efficiency card on dashboard
- Line chart showing efficiency over time
- Comparison table

---

### F14: Cost Per Mile/KM

**Description:** Calculate total cost per mile/km including all expenses.

**Formula:**
```
Cost Per Mile = (Fuel Cost + Service Cost + Other Cost) / Total Miles
```

**Features:**
- Total cost breakdown by category
- Per-vehicle cost tracking
- Monthly/yearly summaries
- Projections

---

### F19: Trip Logger

**Description:** Log individual trips with start/end locations and odometer.

**Features:**
- Start trip with current odometer
- End trip with end odometer and purpose
- Auto-calculate distance
- Link to driver

**Data Model:**
```javascript
{
  id: string,
  vehicleId: string,
  driverId: string | null,
  startOdometer: number,
  endOdometer: number | null,
  distance: number | null,  // calculated
  startTime: Date,
  endTime: Date | null,
  purpose: string | null,  // Business, Personal, Commute
  notes: string
}
```

---

### F24: Document Vault

**Description:** Store and organize vehicle documents.

**Document Types:**
- Registration
- Insurance
- Service receipts
- Inspection certificates
- Title
- Custom documents

**Features:**
- Upload images/PDFs
- Document expiry tracking
- Quick access from vehicle card
- Share/export

---

### F40: GPS Location Tracking

**Description:** Track vehicle location in real-time.

**Implementation:**
- Mobile app for location updates
- Background location tracking
- Location history
- Battery optimization

**Features:**
- Live map view
- Last known location
- Location history timeline
- Battery-efficient mode

---

## 5. Technical Architecture

### Frontend (Current)
- React + Vite
- React Router
- Lucide Icons
- CSS Modules (dark theme)

### Backend (Future)
- NestJS API
- PostgreSQL database
- Firebase Auth
- REST API

### Mobile (Future)
- React Native (Expo)
- Native location APIs
- Push notifications

---

## 6. Data Models

### Vehicle
```javascript
{
  id: string,
  userId: string,
  name: string,
  make: string,
  model: string,
  year: number,
  licensePlate: string,
  vin: string,
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid',
  currentOdometer: number,
  registrationExpiry: Date,
  insuranceExpiry: Date,
  imageUrl: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Fuel Entry
```javascript
{
  id: string,
  vehicleId: string,
  date: Date,
  odometer: number,
  liters: number,
  pricePerLiter: number,
  totalCost: number,
  station: string,
  notes: string
}
```

### Expense
```javascript
{
  id: string,
  vehicleId: string,
  category: 'fuel' | 'service' | 'insurance' | 'parking' | 'toll' | 'other',
  amount: number,
  date: Date,
  description: string
}
```

### Service Record
```javascript
{
  id: string,
  vehicleId: string,
  date: Date,
  serviceType: string,
  cost: number,
  odometer: number,
  provider: string,
  notes: string
}
```

---

## 7. UI/UX Guidelines

### Design Principles
1. **Dark mode first** — Primary theme matches veh app (#0F172A)
2. **Mobile responsive** — Works on all screen sizes
3. **Fast** — Under 3s load times
4. **Intuitive** — No learning curve
5. **Data-rich** — Show relevant stats at a glance

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Background | Dark Blue | #0F172A |
| Card | Slate | #1E293B |
| Surface | Light Slate | #334155 |
| Primary | Indigo | #4F46E5 |
| Success | Green | #34D399 |
| Warning | Amber | #FBBF24 |
| Danger | Red | #F87171 |
| Text Primary | White | #F8FAFC |
| Text Muted | Gray | #94A3B8 |

### Typography
- **Headings:** Inter / SF Pro Display
- **Body:** Inter / SF Pro Text
- **Monospace:** JetBrains Mono (for numbers/IDs)

---

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| App Load Time | < 2 seconds |
| Test Coverage | > 80% |
| Pages Implemented | All Phase 1-3 features |
| Playwright Tests | > 20 tests |
| User Retention | 70% weekly active |

---

## 9. Implementation Checklist

### Tonight (IST 1am-6am)
- [ ] Research competitors
- [ ] Create this document
- [ ] Improve Service Reminders (add form)
- [ ] Build Trip Logger page
- [ ] Run Playwright tests
- [ ] Push to GitHub

### This Week
- [ ] Complete Phase 2 (Smart Maintenance)
- [ ] Complete Phase 3 (Analytics)
- [ ] Complete Phase 4 (Trip Management)
- [ ] 50+ Playwright tests
- [ ] Alpha version ready

---

_Document maintained by Veh AI Agent_  
_Last updated: April 10, 2026_
