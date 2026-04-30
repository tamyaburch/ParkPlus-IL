# 🌿 ParkPulse

**The social platform for Illinois parks and recreation — built for the people, by the people.**

> *Access isn't enough. Quality is the right.*

---

## 📋 Product Requirements Document (PRD)

### Overview

**ParkPulse** is a civic-social web application that empowers Illinois residents to discover, rate, report on, and advocate for public parks and recreation facilities. It bridges the gap between what mapping tools (like ParkServe) show on paper and what communities actually experience on the ground — transforming passive park users into active civic participants.

---

### 🔍 Problem Statement

Research across Illinois and comparable states reveals a systemic disconnect:

- **Access ≠ Quality.** ParkServe data can show 100% park coverage in a low-income community while audit scores reveal facilities rated 22–40 out of 100 (Bopp et al., 2025).
- **Lower-income neighborhoods have fewer quality amenities** despite higher rates of free programming — yet children still use higher-quality facilities more, meaning programming alone cannot overcome poor physical conditions (McKenzie et al., 2013).
- **Park use correlates with walkability and safety** — improvements in surrounding street conditions increase park visitors, while incivilities like litter and broken windows decrease use (Richardson et al., 2020).
- **There is no public-facing, real-time feedback loop** between residents and park administrators or policymakers.
- **Funding is misallocated** because IDNR, IAPD, and local park districts lack granular, community-sourced quality data to guide OSLAD and PARC grant decisions.

**The core problem:** Illinois has 100+ park districts, $640M+ in OSLAD grants distributed since program inception, and millions of residents — but no unified platform that connects lived community experience to policy decisions.

---

### 👥 Target Users

| Segment | Age | Behavior |
|---|---|---|
| Gen Z residents | 16–27 | Mobile-first, visual storytellers, civic-minded, distrust institutions |
| Millennials | 28–42 | Parents, health-conscious, time-scarce, community-invested |
| Gen X / Boomers | 43–70 | Neighborhood advocates, frequent park users, politically engaged |
| Park administrators | Any | Need community data, want feedback loops |
| IDNR / legislators | Any | Need equity data to allocate grants |
| Journalists & advocates | Any | Need documented evidence of disparities |

---

### 💡 User Stories

#### Resident / Community Member
- *As a resident*, I want to check my nearest park's community rating before I take my kids, so I know if it's worth the trip.
- *As a resident*, I want to post a Story about the broken playground equipment at my park so my neighbors see it and local officials take action.
- *As a parent*, I want to find free programming at parks near me filtered by age and activity type.
- *As a teenager*, I want to discover cool park events and "drops" nearby like I would on social media.
- *As a senior*, I want to report accessibility barriers (broken ramps, no shade, locked bathrooms) in a simple, visual way.
- *As a community advocate*, I want to see data on park quality disparities in my zip code compared to wealthier nearby zip codes.

#### Park Administrator / Government User
- *As a park director*, I want to see a real-time dashboard of community-reported issues at my parks so I can prioritize maintenance.
- *As an IDNR grant manager*, I want to see which parks have the lowest community quality scores in economically distressed zip codes so I can prioritize OSLAD funding.
- *As a city council member*, I want to share ParkPulse equity data publicly to support my case for capital investment.

---

### 🎯 Core Features

#### 1. **The Feed** — TikTok-style discovery
- Vertical scroll of park Stories, photos, and short videos
- Algorithm surfaces nearby parks + trending community reports
- No follower gate — content is open and geographic
- "Drop" feature: time-limited stories that expire in 48hrs (Snapchat-inspired)

#### 2. **Park Profiles** — Pinterest-style visual boards
- Each park has a profile: photos, community rating, amenity checklist, active reports
- Photo boards curated by the community
- Seasonal tabs: Summer / Fall / Winter / Spring activities
- Pinned community petitions and grant campaign links

#### 3. **PulseScore** — Community Quality Index
- Residents rate parks on: Safety, Cleanliness, Amenities, Accessibility, Programming
- Aggregates into a 0–100 PulseScore visible on every park profile
- Contrasted with ParkServe's proximity-based "access" score to show the gap
- Color-coded equity map: overlay income data with PulseScore disparities

#### 4. **Report & Resolve**
- Photo-based issue reporting (broken equipment, vandalism, locked bathrooms, no shade)
- Reports are geo-tagged and timestamped
- Public visibility: neighbors can "back" a report (like a petition)
- Government portal: park districts see aggregated reports with severity scoring
- Resolve tracking: mark as "In Progress" or "Fixed" — builds accountability

#### 5. **Discover** — Programmatic calendar
- Free programming finder by zip code, age group, activity
- Filter: free / low-cost / subsidized
- Submission portal: park districts post events directly
- Community event submissions (pending approval)

#### 6. **Equity Map** — The accountability layer
- Illinois-wide choropleth map
- Layers: PulseScore, Median Income, Park Count, Active Reports
- Public and exportable — designed for journalists, advocates, policymakers
- Quarterly "State of Parks" report auto-generated from platform data

#### 7. **Campaigns & Advocacy**
- Community members start park campaigns: "Fix Garfield Park's bathrooms"
- Signature collection built in
- Shareable to social media with a single tap
- Direct link to IDNR OSLAD grant application portal
- Integration with local alderperson/council lookup

#### 8. **ParkPoints** — Community Engagement Rewards
- Earn points for reporting, rating, reviewing, attending events
- Points unlock profile badges: "Park Guardian," "Trail Blazer," "Block Captain"
- Non-monetary — recognition-only, by design
- Leaderboard by neighborhood / zip code / district

---

### 🗺️ Information Architecture

```
ParkPulse/
├── Feed (home)
│   ├── Stories (48hr drops)
│   ├── Photos / Videos
│   └── Reports trending nearby
├── Discover
│   ├── Map view
│   ├── Calendar / events
│   └── Search
├── Park Profile
│   ├── PulseScore breakdown
│   ├── Community photos
│   ├── Active reports
│   ├── Programming
│   └── Campaigns
├── Report
│   ├── Photo upload
│   ├── Category tagging
│   └── Location confirm
├── Equity Map
│   ├── PulseScore layer
│   ├── Income overlay
│   └── Report density
├── Profile
│   ├── ParkPoints
│   ├── My reports
│   ├── Saved parks
│   └── My stories
└── Gov Dashboard (admin-only)
    ├── Report queue
    ├── Equity analytics
    └── Grant data export
```

---

### 🔧 Technical Architecture

#### Frontend
- **React 18** with hooks
- **Tailwind CSS** for utility styling
- **Mapbox GL JS** for interactive maps
- **Framer Motion** for story animations
- **PWA-ready** (installable on mobile)

#### Backend (recommended implementation)
- **Supabase** — auth, database, real-time subscriptions, storage
- **PostGIS** — geospatial queries for park proximity
- **Edge Functions** — PulseScore computation, spam filtering

#### Data Sources
- Illinois Department of Natural Resources (IDNR) — park location data
- ParkServe API — baseline access metrics
- U.S. Census ACS — income/poverty data by census tract
- Illinois Association of Park Districts (IAPD) — district directories
- Community-generated — photos, ratings, reports, stories

#### API Integrations
- IDNR Open Data portal
- Illinois government open records (FOIA tracker)
- Mapbox / OpenStreetMap
- Cloudinary (image/video CDN)
- SendGrid (notification emails)

---

### 📊 Success Metrics

| Metric | 6-Month Target | 12-Month Target |
|---|---|---|
| Registered users | 10,000 | 75,000 |
| Parks with PulseScores | 500 | 2,000+ |
| Issue reports submitted | 5,000 | 40,000 |
| Issues resolved | 500 | 5,000 |
| Equity map downloads | 1,000 | 10,000 |
| Campaigns launched | 100 | 800 |
| Gov portal active users | 25 districts | 100+ districts |
| Press mentions | 10 | 50+ |

---

### ⚖️ Equity & Inclusion Commitments

- **Multilingual:** Spanish, Polish, Mandarin, Arabic interfaces (Illinois' top non-English languages)
- **Accessibility:** WCAG 2.1 AA compliant; screen reader optimized
- **Low-bandwidth mode:** Works on 3G; images lazy-loaded
- **Anonymous reporting:** Users can submit reports without an account
- **No algorithmic bias:** Report visibility is not influenced by neighborhood wealth signals
- **Open data:** All aggregated park quality data is freely downloadable
- **Non-partisan by design:** No political ads, no paid promotions, no sponsored park rankings

---

### 🚀 Go-to-Market Strategy

**Phase 1 — Seed (Months 1–3)**
- Launch in 5 pilot neighborhoods: Chicago (South Side, West Side), Rockford, East St. Louis, Springfield
- Partner with IPRA and 10 park districts
- Seed content with existing park advocacy organizations
- University outreach: UIUC, NIU, UIC urban planning / public health programs

**Phase 2 — Growth (Months 4–9)**
- Statewide launch
- Press campaign: Chicago Tribune, Block Club Chicago, Illinois Public Media
- IDNR partnership for gov dashboard
- Influencer seeding: local outdoor creators, community activists, park program staff

**Phase 3 — Scale (Months 10–18)**
- Multi-state expansion (Indiana, Wisconsin, Michigan)
- Federal partnership discussions (NPS, HUD, CDC)
- API licensing for municipal governments

---

### 💰 Revenue Model (Sustainability-Focused)

- **Government SaaS:** Park districts and IDNR pay for the analytics dashboard ($200–$2,000/mo per district)
- **Grant writing support:** Platform data packages sold to nonprofits for OSLAD/PARC applications
- **Foundation grants:** Knight Foundation, MacArthur Foundation, Robert Wood Johnson Foundation
- **No resident-facing fees ever.** The community layer is permanently free.

---

### 🔗 Relevant Policy Context

- [IDNR OSLAD Grant Program](https://dnr.illinois.gov/grants/openspacelandsaquisitiondevelopment-grant.html)
- [IDNR PARC Grant Program](https://dnr.illinois.gov/grants/parc-grant.html)
- [Illinois Association of Park Districts](https://www.ilparks.org)
- [Illinois Park and Recreation Association (IPRA)](https://www.ilipra.org)
- [Chicago Park District Equity Budget](https://www.chicagoparkdistrict.com)

---

### 📚 Research Foundation

- Bopp, M. et al. (2025). *Hiding access to quality parks.* Cities & Health.
- McKenzie, T.L. et al. (2013). *Neighborhood income matters: Disparities in community recreation facilities.* Journal of Park and Recreation Administration, 31(4), 12–22.
- Richardson, A.S. et al. (2020). *Improved street walkability, incivilities, and esthetics are associated with greater park use.* Journal of Urban Health, 97(2), 204–212.

---

### 🤝 Contributors

Built with ♥ for Illinois communities. Inspired by PSLD 404 research by Tamya Burch (NIU, 2026).

---

## 🛠️ Getting Started (Developer)

```bash
# Clone the repo
git clone https://github.com/your-org/parkpulse.git
cd parkpulse

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

```env
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 📄 License

MIT License — open source, forever. Park equity is a public good.
