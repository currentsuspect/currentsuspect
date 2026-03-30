# KCH Website Changes - Pauline Feedback (2026-03-19)

## Quick Text Changes (5 mins each)

| Current | New | Location |
|---------|-----|----------|
| Kenya Children's Home | Kenya Children's Homes | Header, footer, meta |
| Projects | Programs | Navigation, headings |
| Our work | Our programs | Homepage sections |
| Kenyan Board | Board | About page |
| Home (nav) | Homes (nav) | Navigation |

## Medium Features (30-60 mins each)

### 1. Map Location Update
- **New coordinates:** `-1.314710, 36.814243`
- **File:** `src/components/Contact.astro` or map component

### 2. Gallery Navigation
- Add left/right arrows on image preview
- Keyboard navigation (arrow keys)
- Swipe on mobile
- **Files:** `src/components/Gallery.astro`, gallery script

### 3. WhatsApp Button
- Add next to contact form
- Link to: `https://wa.me/[KCH_NUMBER]`
- Green WhatsApp icon
- **Files:** `src/pages/contact.astro`

### 4. Mobile About Us Dropdown
- Parent: "About Us"
- Children: Leadership, Values, Mission, Vision
- Collapsible on mobile
- **Files:** `src/components/Navigation.astro`

## Big Features (2-3 hours each)

### 5. M-Pesa Integration (Sandbox)
- Research Daraja API (Safaricom)
- Create payment form
- Test with sandbox credentials
- **Files:** New `src/pages/donate.astro`, API routes

### 6. Fundraising Page
- Donations section
- Sponsorship information
- Payment methods (M-Pesa, card, bank)
- **Files:** New `src/pages/fundraising.astro`

## Files to Modify

```
src/
├── components/
│   ├── Navigation.astro      # Dropdown, text changes
│   ├── Contact.astro         # Map coords, WhatsApp
│   └── Gallery.astro         # Navigation arrows
├── pages/
│   ├── index.astro           # "Our work" → "Our programs"
│   ├── about.astro           # "Kenyan Board" → "Board"
│   ├── contact.astro         # WhatsApp button
│   └── fundraising.astro     # NEW PAGE
└── content/
    └── config.ts             # Update navigation structure
```

## Priority Order
1. ✅ Text changes (quick wins)
2. ✅ Map coordinates
3. ✅ Gallery navigation
4. ✅ WhatsApp button
5. ✅ Mobile dropdown
6. ⏳ M-Pesa sandbox
7. ⏳ Fundraising page
