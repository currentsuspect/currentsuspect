# KCH Night QA Pass — 2026-02-13

## Scope
Build, link sanity, content tone consistency, CTA tracking sanity, punch‑list.

## Build
- `npm run build` (Astro) ✅ completed successfully. Output: 7 pages, sitemap generated.

## Link Sanity
**Internal link scan (dist/*.html):**
- ✅ No broken internal page routes.
- ❌ Missing asset referenced site‑wide: `/apple-touch-icon.png` (linked in BaseLayout). 7 hits across all pages.

**Content links with placeholders / non‑functional URLs:**
- Social links in Contact page use `href="#"` (Facebook/Twitter/Instagram). This will be reported as dead/meaningless links by crawlers.
- Donate page: buttons like “Become a Monthly Donor”, amount buttons, and “Donate Online →” are `<button>` elements with no action/href. They currently do nothing.
- Contact form has no `action` or submission handler (static form). Submit button currently has no destination.
- Image placeholders (About/Suswa/Team/Map) are intentional but still placeholders — worth noting for production readiness.

## Content Tone Consistency
Overall tone is consistent: warm, credible, non‑sensational. A few inconsistencies to tighten:
- Some sections are highly specific (e.g., Suswa stats), while other areas use placeholders (“Team Member {i}”, “Photo Placeholder”, “Paybill: 123456”, “Account: 1234567890”). This weakens trust/credibility in otherwise polished messaging.
- Contact page mixes real details (phone, email, hours) with placeholder social links and map embed.

## CTA Tracking Sanity
- Global tracking script listens for elements with `data-analytics-event` and sends GA events when `PUBLIC_GA_MEASUREMENT_ID` is set.
- ✅ Tracked CTAs found: Hero donate, HowToHelp cards, WhatsApp widget.
- ⚠️ Untracked high‑value CTAs:
  - Header “Donate” button (desktop + mobile) not tracked.
  - About/Suswa/Volunteer CTA buttons not tracked.
  - Donate page “Monthly Donor”, amounts, “Donate Online” not tracked (and currently non‑functional).
- ⚠️ If `PUBLIC_GA_MEASUREMENT_ID` isn’t set, no CTA tracking will occur. Confirm env var in deployment.

## Punch‑List (Improvements)
1) Add `/public/apple-touch-icon.png` or update BaseLayout to an existing asset.
2) Replace `href="#"` social links with real URLs or remove until available.
3) Convert donate actions into real links (external payment page) or wire up form logic.
4) Add `data-analytics-event` to all primary CTAs (header donate, about/suswa/volunteer CTAs, donate buttons) for full funnel tracking.
5) Replace placeholders (Team Member, Photo Placeholder, Paybill/account numbers, Map embed) with real content.

## Notes
- Canonical URL is hard‑coded to `https://kch-website.vercel.app` in BaseLayout. If production domain differs, update `siteUrl` to prevent SEO canonical mismatch.
