# HoodHub — Premium Fashion & Lifestyle Services

> Where Style Meets Artistry. A full-service platform for barbing, braids & locs, tattoos, clothing, and lifestyle services — with online booking, multi-language support, and an admin dashboard.

**Live:** [hoodhub](https://hoodhub.ru)

---

## Screenshots

### Homepage & Services
![HoodHub Homepage](../../screenshot.png)
*Service categories: Barbing, Braids & Locks, Tattoo, Clothing, and Lifestyle (Manicure & Pedicure)*

---

## What This Is

HoodHub is the digital presence and booking platform for a premium fashion & lifestyle studio. It handles everything from showcasing services to letting customers book appointments online — all wrapped in a dark, editorial design that matches the brand's identity.

This isn't a template. I built it from scratch for a real business that needed its physical brand translated into a web experience.

## Key Features

### Service Showcase
Each service category — Barbing, Braids & Locks, Tattoo, Clothing Store, and Lifestyle (Manicure & Pedicure) — has its own dedicated section with a visual gallery, service descriptions, and pricing.

### Online Booking System
Customers can book appointments directly through the site. The booking flow handles service selection, date/time picking, and confirmation — integrated with WhatsApp for instant communication.

### Multi-Language Support (i18n)
The entire site is fully internationalized with a `[lang]` route parameter and a dictionaries system. Currently supports English and Russian, with the architecture ready for additional languages.

### Admin Dashboard
A protected admin panel for managing bookings, updating service information, and monitoring site activity. Role-based access ensures only authorized users can modify content.

### Authentication
Full auth flow with registration, login, and session management for both customers (booking history) and admin users.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | TailwindCSS |
| **Language** | TypeScript |
| **i18n** | Custom dictionary-based system with `[lang]` routing |
| **Auth** | Next-Auth / Custom auth |
| **Email** | Transactional email integration |
| **Deployment** | Vercel |
| **SEO** | Dynamic sitemap, robots.txt, Yandex verification |

## Architecture

```
app/
├── [lang]/              # Internationalized routes
│   ├── (auth)/          # Login, register
│   ├── (legal)/         # Terms, privacy
│   ├── admin/           # Admin dashboard
│   ├── barbing/         # Barbing services
│   ├── braids-locs/     # Braids & locks services
│   ├── book/            # Booking flow
│   ├── bookings/        # Booking management
│   ├── contact/         # Contact page
│   ├── dictionaries/    # i18n translation files
│   ├── faq/             # FAQ section
│   └── lifestyle/       # Lifestyle services
├── api/                 # API routes
├── components/          # Shared UI components
├── constants/           # Site configuration
├── emails/              # Email templates
└── lib/                 # Utilities and helpers
```

## Technical Decisions

**Why `[lang]` routing over `next-intl`?** Full control over the translation pipeline without external dependencies. Each route is prefixed with a locale code, and dictionary files are loaded server-side — keeping the bundle lean.

**Why server-side email templates?** Booking confirmations and admin notifications need to be reliable. Server-side rendering of email templates ensures consistent formatting across email clients.

## What I'd Improve

- **Add Stripe/Paystack for prepaid bookings** — currently bookings are pay-at-venue
- **Build a CMS layer** — let the business owner update gallery photos and pricing without code changes
- **Add automated testing** — Cypress for the booking flow, Jest for utility functions

---

**Built by [Abdurrahman Idris](https://abdurrahmanidris.com)** — Full Stack Developer
