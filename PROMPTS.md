# Project Prompts & Development Log

This document records the prompt history and feature progression for **SG ParkPulse** (Singapore Real-Time Carpark Availability Application).

---

## Prompt 1: Initial Frontend Application Build

**User Prompt:**
> "build a singapore based carpark application that tracks real time carpark lots availability. Build just the frontend for now, I will integrate the backend later."

**Delivered Features:**
- **Interactive Singapore Map**: Full Leaflet-based map with custom color-coded lot availability pins (green for >25 lots, amber for 4–24 lots, red for ≤3 lots).
- **Quick Region Jumps**: Instant zoom controls for Orchard, Marina Bay / CBD, Jurong East, Tampines, Changi Airport, Woodlands, and Punggol.
- **Singapore Carpark Dataset**: Comprehensive coverage across HDB Multi-Storey Carparks (with official HDB carpark numbers), URA surface carparks, major shopping malls (ION Orchard, Takashimaya, Bugis Junction, Suntec City, VivoCity, Jem, Jurong Point, Tampines Mall, Jewel Changi, NEX, Waterway Point, Northpoint City), and commercial CBD towers (One Raffles Quay, Guoco Tower).
- **EPS Pricing & Rates Calculator**: Side-by-side fee estimation comparing non-central HDB, Central Area URA/HDB, suburban malls, and Orchard/CBD commercial rates; supports HDB Sunday Free Parking Scheme (FPS), grace periods (10–15 mins), and night flat caps.
- **EV Charging Hub**: Dedicated views and filters for EV charging bays (SP Mobility, CDG ENGIE, Shell Recharge, Charge+, Tesla Supercharger) with charging speeds (50kW/120kW DC vs 22kW AC) and tariffs.
- **Driver Utilities**: Gantry clearance height filtering (≥2.0m), vehicle selector (Cars, Motorcycles, Heavy vehicles), persistent saved carparks (`localStorage`), and 1-click turn-by-turn navigation (Google Maps and Waze).
- **Styling**: Tailwind CSS v4 with full Dark and Light mode support.

---

## Prompt 2: GitHub Repository Push

**User Prompt:**
> "git push https://<GITHUB_TOKEN>@https://github.com/kellyckl85/cargowhere.git"

**Delivered Actions:**
- Initialized local Git repository on the `main` branch.
- Configured user metadata and staged all application source files, styles, assets, and configuration.
- Created initial commit (`7edd247`) and pushed to [https://github.com/kellyckl85/cargowhere](https://github.com/kellyckl85/cargowhere).

---

## Prompt 3: Serverless LTA DataMall Connection

**User Prompt:**
> "1. add a serverless connection that pulls live data from LTA's datamall using the following endpoint:
> 
> # Live carpark lots (HDB, LTA and URA):
> https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2
> 
> # Every request needs the header:  AccountKey: <LTA_ACCOUNT_KEY>
> 
> 2. store this in /api folder at project root level (not src file)
> 3. include /health.ts and /carpark availability.ts within the same sub folder
> 4. do not hardcode any key, I will input them later"

**Delivered Features:**
- **/api/health.ts**: Serverless health check endpoint reporting service health, uptime, and checking whether `LTA_ACCOUNT_KEY` is present in the environment without exposing secrets.
- **/api/carpark-availability.ts**: Serverless endpoint connecting to `https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2`, passing the required `AccountKey: <LTA_ACCOUNT_KEY>` header dynamically from `process.env.LTA_ACCOUNT_KEY`, supporting pagination (`$skip` and `?all=true`), and coordinate normalization. Returns an `awaiting_api_key` status when the key has not yet been set.
- **/api/carpark availability.ts**: Re-export file to support the exact requested path.
- **/server.ts**: Full-stack Express server mounting the serverless `/api/*` endpoints alongside Vite middlewares in development.
- **/.env.example**: Updated with `LTA_ACCOUNT_KEY=""` documentation.
- Pushed update commit (`245032e`) to GitHub repository.

---

## Prompt 4: Collating Prompts

**User Prompt:**
> "collate all of the prompts and store them as a PROMPTS.md file"

**Delivered Actions:**
- Created `PROMPTS.md` containing the complete chronological record of user prompts, delivered architectural components, and implementation summaries.
