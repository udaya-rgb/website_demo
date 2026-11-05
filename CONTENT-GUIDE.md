# Chentur Jewellers — Website Content & Photo Guide

This site is built with plain HTML, CSS and JavaScript. There is no build step, framework or database. Open `index.html` in a browser to preview it, then upload the whole folder to any static host when you are ready.

## Quick start

1. Open `index.html` in a browser to preview the site.
2. Change business details, products, schemes and FAQs in `assets/js/content.js`.
3. Replace or add photographs in `assets/images/`.
4. Change page-specific editorial copy in the relevant `.html` file.
5. Recheck links and images before publishing.

## 1. Business details and placeholders

Open `assets/js/content.js` and edit the `SITE` object at the top.

| Field | What it controls |
|---|---|
| `name` | Brand name in the header, footer and WhatsApp messages |
| `tagline` | Short brand line |
| `description` | Footer introduction and share description |
| `address` | Showroom address used across the site |
| `addressShort` | Short location label |
| `phone` | Displayed phone number and `tel:` links |
| `whatsapp` | WhatsApp number in international format, without `+` or spaces |
| `email` | Displayed email address and `mailto:` links |
| `mapsUrl` | Google Maps directions link |
| `mapEmbed` | Map shown on the contact page |
| `hours` | Showroom opening hours |
| `openingNote` | Small note beside the hours |
| `socials` | Instagram / Facebook links |

The current phone number, WhatsApp number, email address and opening hours are placeholders. Instagram and Facebook links are also placeholders. Update them in `SITE` before publishing. They are deliberately centralised so they do not need to be searched for across the HTML files.

The showroom address is already set to:

**829, Tenkasi Road, Rajapalayam, Virudhunagar, Tamil Nadu – 626117**

The address appears in the footer, contact page, about page, product availability panel and legal pages.

## 2. Navigation

Edit the `NAV` array in `assets/js/content.js`.

The main navigation currently has four simple links:

- Jewellery Collections
- Schemes
- Contact
- About

- Every item has a `label`, `href` and `page`.
- `page` controls which navigation item is highlighted on a page.
- The same data is used to build the mobile drawer automatically.
- Mega menus are not currently enabled. The header still supports a `menu` object if you want to reintroduce one later.

The collections page still supports filtered views. Use filters that match your product data, for example:

```html
collections.html?filter=Bridal
collections.html?filter=Gold
collections.html?q=necklace
```

## 3. Hero slides

Edit `HERO_SLIDES` in `assets/js/content.js`.

Each slide accepts:

```js
{
  desktop: "assets/images/home/hero-model-wide.jpg",
  mobile: "assets/images/home/hero-model-mobile.jpg",
  alt: "Description for accessibility",
  eyebrow: "The everyday gold edit",
  title: "Everyday gold. Quietly extraordinary.",
  copy: "Short supporting sentence.",
  primaryLabel: "Shop the edit",
  primaryHref: "collections.html?filter=Everyday"
}
```

Recommended image sizes:

- Desktop: **1920 × 768 px**, landscape (2.5:1).
- Mobile: **1080 × 1080 px**, square.

The carousel is full-width, shows one slide at a time, and changes every 4 seconds with a smooth sliding transition. The whole slide is a link, so keep one clear destination per slide.

## 4. Categories

The “Shop by category” tile row is currently removed from the homepage. The `CATEGORIES` data and category images are retained in case you want to bring it back later.

Edit `CATEGORIES` in `assets/js/content.js`.

Each category has:

```js
{
  name: "Necklaces",
  filter: "Necklaces",
  image: "assets/images/categories/necklaces.jpg"
}
```

The `filter` value must match a tag on at least one product. Category images are square crops. Recommended size: **600 × 600 px**.

## 5. Products

Edit `PRODUCTS` in `assets/js/content.js`.

Each product has:

```js
{
  id: "meenakshi-temple-necklace",
  name: "Meenakshi Temple Necklace",
  type: "Necklace",
  collection: "Bridal",
  tags: ["Bridal", "Necklaces", "Gold"],
  material: "Gold",
  price: "Price on request",
  image: "assets/images/products/necklace-01.jpg",
  images: [
    "assets/images/products/necklace-01.jpg",
    "assets/images/products/necklace-01b.jpg",
    "assets/images/products/necklace-01c.jpg"
  ],
  alt: "Traditional gold necklace with ruby-coloured details",
  description: "Short product story.",
  details: "Additional detail shown in the accordion.",
  featured: true,
  newArrival: true,
  badge: "Bridal edit"
}
```

- `id` is used in links such as `product.html?piece=meenakshi-temple-necklace`. Keep it lowercase and unique.
- `tags` controls the collection and category filters.
- `images` powers the product gallery. The first image is the main image; the second is also used for the product-card hover effect.
- `featured: true` places the product in the home page “Trending Now” rail.
- `newArrival: true` places it in the “Newest” sort.
- `price` is currently “Price on request”. If you add real pricing, make sure it is kept current.
- Replace the stock product photos with real product photography when available.

Recommended product image size: **900 × 1200 px**, portrait.

## 6. Schemes

Edit `SCHEMES` in `assets/js/content.js`.

The four schemes and their terms are maintained in this one array:

- **Future Gold** — monthly saving, 11 months / 330 days, from ₹500 or any amount.
- **Digi Gold** — 300 days, minimum ₹100.
- **One Time Investment** — 330 days, from ₹5,000 in multiples of ₹5,000 or any amount.
- **Revival** — 330 days, old gold exchange.

All four retain the **100% discount on wastage and making charges**, applicable on gold jewellery with **VA up to 18%**, subject to T&C.

Do not add returns, interest or benefits that are not in the official scheme terms. If the scheme terms change, update the `SCHEMES` array and the supporting notes on `schemes.html`.

The schemes page automatically renders:

- The four tabs and panels
- The comparison table
- The scheme FAQs
- WhatsApp enquiry links

## 7. FAQs

Edit:

- `GENERAL_FAQS` for the Help & FAQs page.
- `SCHEME_FAQS` for the schemes page and the scheme section of the FAQ page.

Each FAQ is:

```js
{
  question: "Question text",
  answer: "Answer text"
}
```

## 8. Page-specific copy

The following can be edited directly in each HTML file:

- `index.html` — home page section headings, editorial banners, experience copy.
- `collections.html` — listing introduction and SEO copy.
- `product.html` — product template shell.
- `schemes.html` — page hero, features, steps, notes and comparison heading.
- `about.html` — brand story, values, quote and showroom CTA.
- `contact.html` — appointment form, contact cards and showroom information.
- `faq.html` — help cards and FAQ page structure.
- `wishlist.html` — wishlist introduction.
- `privacy.html` / `terms.html` — legal copy.
- `404.html` — not-found message.

Content that appears in more than one place should stay in `content.js`.

## 9. Image folders

```
assets/images/
  home/         Hero slides
  categories/   Circular category images
  products/     Product cards and galleries
  editorial/    Bridal, gifting, world, assurance, store and CTA images
  ...
```

### Replacing a photo

1. Keep the same filename to replace an image without editing code.
2. Or add a new file and update the path in `content.js`.
3. Keep the recommended dimensions and aspect ratio.
4. Optimise images before upload (JPG or WebP, generally under 300 KB where possible).
5. Add useful `alt` text in `content.js` for product and category images.

### Current photography

The current photographs are royalty-free stock images from Unsplash, used as illustrative placeholders. They are not photographs of actual Chentur inventory. Replace them with your own showroom and product photography before publishing.

See `assets/images/CREDITS.md` for the source list.

## 10. Wishlist

The wishlist is stored in the visitor’s browser using `localStorage`. No account or server is required.

- Hearts are shown on product cards and product pages.
- The wishlist page reads the saved product IDs.
- The header wishlist count updates automatically.
- Clearing browser storage clears the wishlist.

There is no checkout, payment or cart. All purchase intent goes to WhatsApp or an appointment request.

## 11. Contact forms and WhatsApp

The contact and appointment forms do not submit to a server. They prepare a formatted WhatsApp message and open WhatsApp.

The WhatsApp number is controlled by `SITE.whatsapp` in `content.js`. The email fallback is controlled by `SITE.email`.

If you later connect a form service or email inbox, update the form handling in `assets/js/app.js`.

## 12. Scroll reveal animation

Scroll reveals are added automatically by `initScrollReveal()` in `assets/js/app.js`.

- Elements fade, unblur and move gently into place as they enter the viewport.
- Cards reveal with a short stagger.
- Large image blocks move in from the left or right.
- The animation runs once per element, so scrolling back up does not repeat it.
- `prefers-reduced-motion` is respected: when it is enabled, content appears without motion.

To change the reveal distance, blur, duration or easing, edit the `[data-reveal]` rules near the top of `assets/css/main.css`. To add or remove elements from the reveal, edit the selector groups inside `initScrollReveal()`.

## 13. Publishing checklist

Before publishing:

- Replace `phone`, `whatsapp`, `email` and `hours` in `SITE`.
- Update Instagram and Facebook links in `SITE.socials`.
- Confirm the showroom address and map location.
- Replace stock photography with real showroom and product images.
- Confirm all scheme terms with the official scheme documents.
- Check that every product link, price label and enquiry path is correct.
- Test on mobile at 360 px, 390 px and 768 px.
- Test desktop at 1024 px and 1440 px.
- Check the wishlist, search, filters, tabs, FAQs and WhatsApp forms.
- Confirm the privacy policy and terms reflect your actual business practices.
