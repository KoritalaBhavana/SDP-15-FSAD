# Travel Nest Pro — Exact Figma Prototype (No Code Build)

Use this when you want your prototype to look exactly like the current website.

## Best choice: Figma (for exact match)
Canva is better for mockups, but Figma is better for exact website-level prototype fidelity.

## 1) Generate exact screens from your running site
1. In your project folder, run:
   - `npm install`
   - `npm run dev`
2. Open Figma Desktop App.
3. Install plugin: **html.to.design**.
4. In plugin, import these URLs one by one (Desktop 1440 width):
   - `http://localhost:8080/`
   - `http://localhost:8080/homestays`
   - `http://localhost:8080/homestay/1`
   - `http://localhost:8080/booking/1?checkin=2026-03-20&checkout=2026-03-23&guests=2`
   - `http://localhost:8080/payment/1?amount=8400&nights=3&checkin=2026-03-20&checkout=2026-03-23&guests=2`
5. Repeat import for Mobile width 390 (same URLs).

## 2) Build prototype flow (clickable)
Create links in Prototype tab:
- Home → Homestays (from Search/CTA)
- Homestays → Homestay Detail (card click)
- Homestay Detail → Booking (Reserve button)
- Booking → Payment (Proceed to Payment)
- Payment → Success overlay/frame
- Success → My Bookings or Home

## 3) Keep it identical to website
- Do not change spacing, typography, or colors after import.
- Keep navbar fixed behavior visually represented in each screen.
- Keep card corners, shadows, and button styles unchanged.
- Reuse imported navbar/footer as components to keep consistency.

## 4) Required frames (minimum)
- Home
- Homestays Listing
- Homestay Detail
- Booking
- Payment
- Booking Success

## 5) Export/share
- Click **Present** in Figma and test full user flow.
- Share link with "Anyone with link can view".

## Optional Canva path (not exact)
If you must use Canva:
1. Take full-page screenshots of each route.
2. Place each screenshot in Canva pages.
3. Add page-to-page link hotspots.
4. This is faster, but less accurate than Figma for exact web fidelity.
