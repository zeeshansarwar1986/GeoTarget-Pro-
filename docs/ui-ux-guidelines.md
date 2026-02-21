# 🎨 GeoTarget Pro — UI/UX Design Guidelines

## 1. Design Philosophy

**"Powerful yet Simple"** — GeoTarget Pro combines enterprise-level geofencing capabilities with an interface so intuitive that a small business owner can create their first geofence in under 5 minutes.

### Core UX Principles

| Principle | Description |
|-----------|-------------|
| **Clarity** | Every element has a clear purpose; no clutter |
| **Progressive Disclosure** | Show basic features first, advanced on demand |
| **Feedback** | Every action provides immediate visual feedback |
| **Consistency** | Uniform patterns across all pages |
| **Accessibility** | WCAG 2.1 AA compliant; keyboard navigable |
| **Privacy-First** | Transparent permissions; user always in control |

---

## 2. User Journey Map

```
┌──────────────────────────────────────────────────────────────────┐
│                    USER JOURNEY MAP                               │
│                                                                   │
│  1. DISCOVER        2. SIGN UP        3. ONBOARD                 │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐               │
│  │ Landing  │ ───> │ Register │ ───> │ Welcome  │               │
│  │ Page     │      │ Form     │      │ Tutorial │               │
│  └──────────┘      └──────────┘      └──────────┘               │
│                                            │                      │
│  4. CREATE          5. CONFIGURE     6. MONITOR                  │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐               │
│  │ Draw     │ ───> │ Set      │ ───> │ View     │               │
│  │ Geofence │      │ Triggers │      │Analytics │               │
│  └──────────┘      └──────────┘      └──────────┘               │
│                                            │                      │
│  7. OPTIMIZE        8. SCALE                                      │
│  ┌──────────┐      ┌──────────┐                                  │
│  │ A/B Test │ ───> │ Upgrade  │                                  │
│  │ Refine   │      │ Expand   │                                  │
│  └──────────┘      └──────────┘                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Detailed Journey Steps

| Step | Action | UI Element | Time Goal |
|------|--------|------------|-----------|
| 1. Discover | Visit landing page | Hero section, feature cards, pricing | 30 sec to understand value |
| 2. Sign Up | Create account | Simple form (email, password, business name) | < 1 min |
| 3. Onboard | Guided tour | Step-by-step overlay tutorial, skip option | 2 min |
| 4. Create Geofence | Draw on map | Map interface with draw tools | < 2 min |
| 5. Configure | Set trigger actions | Notification template editor | < 3 min |
| 6. Monitor | View analytics | Dashboard with charts and stats | Always available |
| 7. Optimize | Test and refine | A/B testing panel | Ongoing |
| 8. Scale | Upgrade plan | Pricing comparison modal | < 1 min |

---

## 3. Design System

### 3.1 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Primary** | `#6366F1` (Indigo) | Buttons, active states, links |
| **Primary Dark** | `#4F46E5` | Hover states, headers |
| **Secondary** | `#10B981` (Emerald) | Success, geofence active |
| **Accent** | `#F59E0B` (Amber) | Warnings, highlights |
| **Danger** | `#EF4444` (Red) | Errors, delete actions |
| **Dark BG** | `#0F172A` (Slate 900) | Dashboard background |
| **Card BG** | `#1E293B` (Slate 800) | Card backgrounds |
| **Surface** | `#334155` (Slate 700) | Input backgrounds |
| **Text Primary** | `#F8FAFC` (Slate 50) | Primary text |
| **Text Secondary** | `#94A3B8` (Slate 400) | Secondary text |

### 3.2 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| **H1 (Hero)** | Inter | 48px / 3rem | 800 (ExtraBold) |
| **H2 (Section)** | Inter | 36px / 2.25rem | 700 (Bold) |
| **H3 (Card)** | Inter | 24px / 1.5rem | 600 (Semibold) |
| **Body** | Inter | 16px / 1rem | 400 (Regular) |
| **Small** | Inter | 14px / 0.875rem | 400 (Regular) |
| **Caption** | Inter | 12px / 0.75rem | 500 (Medium) |

### 3.3 Spacing & Layout

- **Grid**: 12-column responsive grid
- **Base unit**: 4px (spacing scale: 4, 8, 12, 16, 24, 32, 48, 64)
- **Border radius**: 8px (cards), 6px (inputs), 99px (pills)
- **Shadows**: `0 4px 6px -1px rgba(0,0,0,0.3)` (subtle), `0 20px 25px -5px rgba(0,0,0,0.3)` (elevated)

---

## 4. Key UI Components

### 4.1 Dashboard Layout

```
┌─────────────────────────────────────────────────┐
│ 🔲 Logo    🔍 Search    🔔 Alerts    👤 Profile │  ← Top Navbar
├─────────┬───────────────────────────────────────┤
│ 📊 Dash │                                       │
│ 🗺️ Map  │     MAIN CONTENT AREA                │
│ 📈 Stats│     (Dynamic based on sidebar         │
│ 🔔 Notif│      selection)                       │
│ ⚙️ Sett │                                       │
│         │                                       │
│ 🔒 Priv │                                       │
├─────────┴───────────────────────────────────────┤
│              Status Bar / Footer                 │
└─────────────────────────────────────────────────┘
```

### 4.2 Map Interface

```
┌─────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────┐ │
│ │                                             │ │
│ │          INTERACTIVE MAP AREA               │ │
│ │     (Full-width, geofences overlaid)        │ │
│ │                                             │ │
│ │   ┌──────┐                                  │ │
│ │   │ Draw │  ○ Circle                        │ │
│ │   │Tools │  □ Rectangle                     │ │
│ │   │      │  ◇ Polygon                       │ │
│ │   └──────┘                                  │ │
│ │                                             │ │
│ └─────────────────────────────────────────────┘ │
│ ┌──────────────────┐ ┌──────────────────┐       │
│ │ Geofence List    │ │ Selected Fence   │       │
│ │ - Store Front    │ │ Name: ________   │       │
│ │ - Mall Area      │ │ Trigger: Enter ▼ │       │
│ │ - Parking Lot    │ │ Action: Push ▼   │       │
│ │ + Add New        │ │ [Save] [Delete]  │       │
│ └──────────────────┘ └──────────────────┘       │
└─────────────────────────────────────────────────┘
```

### 4.3 Stats Cards

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 📍 Active    │ │ 👥 Total     │ │ 🔔 Sent      │ │ 📊 Avg Dwell │
│ Geofences    │ │ Visitors     │ │ Notifications│ │ Time         │
│              │ │              │ │              │ │              │
│    24        │ │   12,847     │ │   45,231     │ │   18 min     │
│  ↑ 3 new    │ │  ↑ 12%      │ │  ↑ 8%       │ │  ↑ 5%       │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

---

## 5. UX Interaction Patterns

### 5.1 Geofence Creation Flow

1. **Click "Create Geofence"** → Map zoom to drawing mode
2. **Select shape tool** → Circle, Rectangle, or Polygon
3. **Draw on map** → Visual boundary appears with adjustable handles
4. **Name & configure** → Slide-in panel for settings
5. **Set triggers** → Choose enter/exit/dwell actions
6. **Configure notification** → Template editor with preview
7. **Activate** → Confirmation animation, fence turns green

### 5.2 Animations & Micro-interactions

| Interaction | Animation |
|------------|-----------|
| Page load | Fade-in with stagger (200ms between elements) |
| Card hover | Scale 1.02, shadow elevation |
| Button click | Subtle press (scale 0.98), ripple effect |
| Geofence drawn | Pulse animation on boundary |
| Notification sent | Bounce animation on counter |
| Toggle switch | Smooth slide with color transition |
| Chart data load | Animated drawing of lines/bars |
| Success action | Checkmark draw animation |

### 5.3 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| **Mobile** | < 768px | Single column, bottom nav, full-width map |
| **Tablet** | 768-1024px | Collapsible sidebar, 2-column grid |
| **Desktop** | > 1024px | Full sidebar, 3-4 column grid |

---

## 6. Privacy UX

### 6.1 Consent Banner

- Clear, non-intrusive banner at bottom of screen
- Three options: "Accept All", "Customize", "Reject"
- Link to full privacy policy
- Remember user choice

### 6.2 Privacy Dashboard

- Toggle controls for each data type
- "Download My Data" button (GDPR Article 20)
- "Delete My Account" button with confirmation
- Consent history log
- Data retention settings

### 6.3 Transparency

- Location permission requests explain WHY data is needed
- Real-time indicator when location is being tracked
- Monthly privacy summary email

---

## 7. Wireframe Descriptions (for Figma/Sketch)

### Landing Page

- **Hero**: Split layout — left: headline, subhead, CTA buttons; right: animated map dashboard mockup
- **Features**: 3-column grid with icon, title, description
- **Pricing**: 4 cards with tier comparison
- **Testimonials**: Carousel with company logos
- **CTA**: Full-width gradient section with signup form

### Dashboard

- **Top bar**: Logo, search, notifications bell, user avatar
- **Sidebar**: Icon + text navigation, collapsible
- **Main area**: 4 stat cards on top, chart below, recent activity table
- **Background**: Dark theme (#0F172A)

### Map Page

- **Map**: 70% of screen width, map controls on left edge
- **Panel**: 30% width, tabs for "Geofences" and "Settings"
- **Drawing tools**: Floating toolbar on map
- **Geofence list**: Cards with name, status toggle, edit/delete

---

*Design System Version: 1.0 | GeoTarget Pro*
