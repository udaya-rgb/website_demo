(function () {
  "use strict";

  const {
    SITE,
    ANNOUNCEMENT,
    GOLD_RATES,
    NAV,
    HERO_SLIDES,
    CATEGORIES,
    PRODUCTS,
    WORLD_PILLARS,
    ASSURANCE,
    SCHEMES,
    GENERAL_FAQS,
    SCHEME_FAQS,
    EXPERIENCE,
    BLOG_POSTS
  } = window.CHENTUR;

  const page = document.body.dataset.page || "";
  const pageFile = window.location.pathname.split("/").pop() || "index.html";
  const $ = (selector, scope) => (scope || document).querySelector(selector);
  const $$ = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));

  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const phoneHref = () => `tel:${String(SITE.phone).replace(/[^\d+]/g, "")}`;
  const whatsappLink = (message) =>
    `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
  const currentYear = new Date().getFullYear();

  const ICON = {
    search:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg>',
    heart:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.7 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>',
    calendar:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    pin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.4"/></svg>',
    chat:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.3-.7L3 21l1.7-5A8.3 8.3 0 0 1 4 11.5a8.4 8.4 0 0 1 8.5-8.4 8.4 8.4 0 0 1 8.5 8.4Z"/></svg>',
    gem:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 9 12 21 4 9Z"/><path d="M4 9h16M8.5 9 12 21M15.5 9 12 21"/></svg>',
    craft:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7Z"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.6 2.6L16.5 9"/></svg>',
    coin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6.5" rx="6.5" ry="3"/><path d="M5.5 6.5v5c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-5"/><path d="M5.5 11.5v5c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-5"/></svg>',
    whatsapp:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.3 4.8 4.9-1.3A9.9 9.9 0 1 0 12.04 2Zm0 17.9a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3a8 8 0 1 1 6.7 3.6Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3.2-.5.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.4 1.9.8 2.3.7 2.8.6.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1Z"/></svg>'
  };

  function renderHeader() {
    const host = $("#site-header");
    if (!host) return;

    const activeLabel = {
      home: "Home",
      about: "About Us",
      schemes: "Schemes",
      collections: "Jewellery Collections",
      blog: "Blog",
      contact: "Contact Us"
    }[page];

    const navMarkup = NAV.map((item) => {
      const hasMenu = Boolean(item.menu);
      const current = item.label === activeLabel ? ' aria-current="page"' : "";
      const menu = hasMenu
        ? `<div class="mega-menu">
            <div class="container mega-menu__inner">
              ${item.menu.columns
                .map(
                  (column) => `<div class="mega-menu__column">
                    <h3>${escapeHTML(column.title)}</h3>
                    <div class="mega-menu__links">
                      ${column.links
                        .map(
                          (link) =>
                            `<a href="${link.href}">${escapeHTML(link.label)}</a>`
                        )
                        .join("")}
                    </div>
                  </div>`
                )
                .join("")}
              ${
                item.menu.feature
                  ? `<a class="mega-menu__feature" href="${item.menu.feature.href}">
                      <img src="${item.menu.feature.image}" alt="${escapeHTML(
                        item.menu.feature.title
                      )}" width="500" height="360" loading="lazy">
                      <span class="mega-menu__feature-copy">
                        <span class="eyebrow">${escapeHTML(
                          item.menu.feature.eyebrow
                        )}</span>
                        <h4>${escapeHTML(item.menu.feature.title)}</h4>
                      </span>
                    </a>`
                  : ""
              }
            </div>
          </div>`
        : "";

      const badge = item.badge
        ? `<span class="nav-link__badge">${escapeHTML(item.badge)}</span>`
        : "";
      return `<li class="nav-item${hasMenu ? " nav-item--has-menu" : ""}">
        <a class="nav-link" href="${item.href}"${current}>${escapeHTML(
        item.label
      )}${badge}</a>
        ${menu}
      </li>`;
    }).join("");

    const drawerMarkup = NAV.map((item) => {
      if (item.menu) {
        const links = item.menu.columns.flatMap((column) => column.links);
        const viewAll =
          item.label === "Jewellery Collections"
            ? "View all jewellery"
            : `View all ${item.label}`;
        return `<details class="mobile-nav__group">
          <summary>${escapeHTML(item.label)}${
            item.badge
              ? `<span class="nav-link__badge">${escapeHTML(item.badge)}</span>`
              : ""
          }</summary>
          <div class="mobile-nav__sub">
            <a href="${item.href}">${escapeHTML(viewAll)}</a>
            ${links
              .map((link) => `<a href="${link.href}">${escapeHTML(link.label)}</a>`)
              .join("")}
          </div>
        </details>`;
      }
      return `<a class="mobile-nav__link" href="${item.href}">${escapeHTML(
        item.label
      )}${
        item.badge
          ? `<span class="nav-link__badge">${escapeHTML(item.badge)}</span>`
          : ""
      }</a>`;
    }).join("");

    const goldRateMarkup = GOLD_RATES.items
      .map(
        (rate) =>
          `<span class="announcement__rate"><span class="announcement__rate-label">${escapeHTML(
            rate.label
          )}</span><strong>${escapeHTML(rate.price)}</strong></span>`
      )
      .join('<span class="announcement__sep" aria-hidden="true">·</span>');

    const announcementGroup = (duplicate) => `
      <div class="announcement__group"${duplicate ? ' aria-hidden="true"' : ""}>
        <span class="announcement__rate">
          <span class="announcement__rate-dot" aria-hidden="true"></span>
          <span class="announcement__rate-label">${escapeHTML(GOLD_RATES.label)}</span>
          ${goldRateMarkup}
        </span>
        <span class="announcement__sep" aria-hidden="true">◆</span>
        <span class="announcement__item">${escapeHTML(ANNOUNCEMENT.text)}</span>
        <a href="${escapeHTML(ANNOUNCEMENT.href)}"${duplicate ? ' tabindex="-1"' : ""}>${escapeHTML(
          ANNOUNCEMENT.linkLabel
        )}</a>
      </div>`;

    const announcementMarkup = [false, true, true].map(announcementGroup).join("");

    host.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="announcement">
        <div class="announcement__viewport">
          <div class="announcement__track">${announcementMarkup}</div>
        </div>
      </div>
      <header class="site-header">
        <div class="header-main">
          <div class="container header-main__inner">
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Open menu">
              <span></span><span></span><span></span>
            </button>
            <a class="brand" href="index.html" aria-label="${escapeHTML(SITE.name)} home">
              <img class="brand__logo" src="assets/images/chentur-logo.png" alt="${escapeHTML(SITE.name)}" width="2344" height="540">
            </a>
            <form class="header-search" data-header-search role="search">
              <div class="header-search__form">
                <button class="header-search__icon" type="submit" aria-label="Search">${ICON.search}</button>
                <input class="header-search__input" type="search" name="q" placeholder="Search for necklaces, earrings, bangles" aria-label="Search jewellery" data-header-search-input autocomplete="off">
              </div>
              <div class="search-suggestions" data-header-suggestions></div>
            </form>
            <div class="header-actions">
              <button class="icon-btn icon-btn--search" type="button" data-open-search aria-label="Open search">${ICON.search}</button>
              <a class="header-visit" href="contact.html">Saving Scheme Payment</a>
            </div>
          </div>
        </div>
        <div class="header-nav">
          <div class="container">
            <ul class="main-nav">${navMarkup}</ul>
          </div>
        </div>
      </header>
      <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
        <div class="mobile-drawer__inner">
          <form class="mobile-search" data-mobile-search role="search">
            <input type="search" name="q" placeholder="Search for jewellery" aria-label="Search jewellery">
            <button type="submit" aria-label="Search">${ICON.search}</button>
          </form>
          <nav class="mobile-nav" aria-label="Mobile navigation">${drawerMarkup}</nav>
          <div class="mobile-drawer__foot">
            <p>${escapeHTML(SITE.description)}</p>
            <a href="${phoneHref()}" data-site-link="phone" data-site="phone">${escapeHTML(SITE.phone)}</a>
            <a href="mailto:${escapeHTML(SITE.email)}" data-site-link="email" data-site="email">${escapeHTML(SITE.email)}</a>
            <a class="btn btn--primary" href="contact.html">Saving Scheme Payment <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
      <div class="search-overlay" data-search-overlay aria-hidden="true">
        <div class="search-overlay__panel" role="dialog" aria-modal="true" aria-labelledby="search-overlay-title">
          <div class="search-overlay__head">
            <h2 id="search-overlay-title">Search Chentur</h2>
            <button class="search-overlay__close" type="button" data-close-search aria-label="Close search">&times;</button>
          </div>
          <form class="search-overlay__form" data-overlay-search role="search">
            <div class="header-search__form">
              <button class="header-search__icon" type="submit" aria-label="Search">${ICON.search}</button>
              <input class="header-search__input" type="search" name="q" placeholder="Search for necklaces, earrings, bangles" aria-label="Search jewellery" data-overlay-search-input autocomplete="off">
            </div>
          </form>
          <div class="search-overlay__results" data-overlay-suggestions></div>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    const host = $("#site-footer");
    if (!host) return;

    const socials = SITE.socials
      .map((social) =>
        social.href === "#"
          ? `<span>${escapeHTML(social.label)}</span>`
          : `<a href="${social.href}" target="_blank" rel="noopener noreferrer">${escapeHTML(
              social.label
            )}</a>`
      )
      .join("");

    host.innerHTML = `
      <footer class="site-footer">
        <div class="footer-card">
          <div class="container">
            <div class="footer-grid">
              <div class="footer-brand">
                <a class="brand brand--footer" href="index.html" aria-label="${escapeHTML(SITE.name)} home">
                  <img class="brand__logo" src="assets/images/chentur-logo.png" alt="${escapeHTML(SITE.name)}" width="2344" height="540">
                </a>
                <p>${escapeHTML(SITE.description)}</p>
                <address data-site="address">${escapeHTML(SITE.address)}</address>
                <div class="footer-contact">
                  <a href="${phoneHref()}" data-site-link="phone" data-site="phone">${escapeHTML(SITE.phone)}</a>
                  <a href="mailto:${escapeHTML(SITE.email)}" data-site-link="email" data-site="email">${escapeHTML(SITE.email)}</a>
                </div>
                <div class="social-links">${socials}</div>
              </div>
              <div class="footer-column">
                <h2>Shop</h2>
                <a href="collections.html">Jewellery collections</a>
                <a href="collections.html?filter=Gold">Gold</a>
                <a href="collections.html?filter=Signature">Signature</a>
                <a href="collections.html?filter=Bridal">Bridal</a>
                <a href="collections.html?filter=Everyday">Daily wear</a>
                <a href="collections.html?filter=Gifting">Gifting</a>
              </div>
              <div class="footer-column">
                <h2>Information</h2>
                <a href="schemes.html">Gold savings schemes</a>
                <a href="about.html">About Chentur</a>
                <a href="faq.html">Help &amp; FAQs</a>
                <a href="blog.html">Blog</a>
              </div>
              <div class="footer-column">
                <h2>Visit the showroom</h2>
                <address data-site="address">${escapeHTML(SITE.address)}</address>
                <div class="hours-list" data-site="hours"></div>
                <a href="${SITE.mapsUrl}" target="_blank" rel="noopener noreferrer">Get directions</a>
                <p class="footer-note">${escapeHTML(SITE.openingNote)}</p>
              </div>
            </div>
            <div class="footer-bottom">
              <p>© <span data-site="year">${currentYear}</span> ${escapeHTML(
                SITE.name
              )}. All rights reserved.</p>
              <div class="footer-legal">
                <a href="privacy.html">Privacy policy</a>
                <a href="terms.html">Terms of use</a>
                <a href="contact.html">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <a class="whatsapp-float" href="#" data-site-link="whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
        ${ICON.whatsapp}
        <span>Chat with us</span>
      </a>
    `;
  }

  function injectSiteDetails() {
    $$("[data-site]").forEach((element) => {
      const key = element.dataset.site;
      if (key === "year") {
        element.textContent = currentYear;
      } else if (key === "hours") {
        element.innerHTML = SITE.hours
          .map(
            (item) =>
              `<div class="hours-row"><span>${escapeHTML(
                item.days
              )}</span><span>${escapeHTML(item.time)}</span></div>`
          )
          .join("");
      } else if (SITE[key] !== undefined) {
        element.textContent = SITE[key];
      }
    });

    $$('[data-site-link="phone"]').forEach((element) => {
      element.href = phoneHref();
    });
    $$('[data-site-link="email"]').forEach((element) => {
      element.href = `mailto:${SITE.email}`;
    });
    $$('[data-site-link="whatsapp"]').forEach((element) => {
      element.href = whatsappLink(`Hello ${SITE.name}, I would like to make an enquiry.`);
    });
    $$('[data-site-link="maps"]').forEach((element) => {
      element.href = SITE.mapsUrl;
    });
    $$("[data-site-src]").forEach((element) => {
      if (SITE[element.dataset.siteSrc]) {
        element.src = SITE[element.dataset.siteSrc];
      }
    });
  }

  function setupHeader() {
    const header = $(".site-header");
    const toggle = $(".nav-toggle");
    const drawer = $("#mobile-drawer");
    if (!header || !toggle || !drawer) return;

    const setScrolled = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });

    const closeMenu = (restoreFocus) => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      drawer.setAttribute("aria-hidden", "true");
      if (restoreFocus) toggle.focus();
    };

    const openMenu = () => {
      document.body.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      drawer.setAttribute("aria-hidden", "false");
      const first = $(".mobile-search input", drawer);
      if (first) window.setTimeout(() => first.focus(), 80);
    };

    toggle.addEventListener("click", () => {
      if (document.body.classList.contains("menu-open")) closeMenu(false);
      else openMenu();
    });

    $$("a", drawer).forEach((link) => {
      link.addEventListener("click", () => closeMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
        closeMenu(true);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024 && document.body.classList.contains("menu-open")) {
        closeMenu(false);
      }
    });
  }

  function setupSearch() {
    const overlay = $("[data-search-overlay]");
    if (!overlay) return;

    const openSearch = () => {
      document.body.classList.add("search-open");
      overlay.setAttribute("aria-hidden", "false");
      const input = $("[data-overlay-search-input]", overlay);
      if (input) window.setTimeout(() => input.focus(), 60);
    };

    const closeSearch = () => {
      document.body.classList.remove("search-open");
      overlay.setAttribute("aria-hidden", "true");
    };

    $$("[data-open-search]").forEach((button) => {
      button.addEventListener("click", openSearch);
    });
    $$("[data-close-search]", overlay).forEach((button) => {
      button.addEventListener("click", closeSearch);
    });
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeSearch();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("search-open")) {
        closeSearch();
      }
    });

    const matches = (query) => {
      const clean = query.trim().toLowerCase();
      if (!clean) return [];
      return PRODUCTS.filter((product) =>
        [
          product.name,
          product.type,
          product.collection,
          product.material,
          ...product.tags
        ]
          .join(" ")
          .toLowerCase()
          .includes(clean)
      );
    };

    const suggestionMarkup = (list) =>
      list.length
        ? list
            .slice(0, 6)
            .map(
              (product) => `<a class="search-suggestion" href="product.html?piece=${product.id}">
                <img src="${product.image}" alt="" width="46" height="56" loading="lazy">
                <span><strong>${escapeHTML(product.name)}</strong><small>${escapeHTML(
                  product.collection
                )} · ${escapeHTML(product.type)}</small></span>
              </a>`
            )
            .join("")
        : `<p class="search-suggestion__empty">No pieces found. Try another search or explore all jewellery.</p>`;

    const bindSearch = (form, input, suggestions, closeOnSubmit) => {
      if (!form || !input || !suggestions) return;
      input.addEventListener("input", () => {
        const value = input.value.trim();
        if (!value) {
          suggestions.classList.remove("is-open");
          suggestions.innerHTML = "";
          return;
        }
        suggestions.innerHTML = suggestionMarkup(matches(value));
        suggestions.classList.add("is-open");
      });
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = input.value.trim();
        if (value) {
          window.location.href = `collections.html?q=${encodeURIComponent(value)}`;
        }
      });
      if (closeOnSubmit) {
        $$("a", suggestions).forEach((link) => {
          link.addEventListener("click", closeSearch);
        });
      }
    };

    bindSearch(
      $("[data-header-search]"),
      $("[data-header-search-input]"),
      $("[data-header-suggestions]"),
      false
    );
    bindSearch(
      $("[data-overlay-search]", overlay),
      $("[data-overlay-search-input]", overlay),
      $("[data-overlay-suggestions]", overlay),
      true
    );

    document.addEventListener("click", (event) => {
      const headerSearch = $("[data-header-search]");
      if (headerSearch && !headerSearch.contains(event.target)) {
        const suggestionBox = $("[data-header-suggestions]");
        if (suggestionBox) suggestionBox.classList.remove("is-open");
      }
    });
  }

  function setupMobileSearch() {
    const form = $("[data-mobile-search]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = $("input", form);
      const value = input ? input.value.trim() : "";
      if (value) {
        window.location.href = `collections.html?q=${encodeURIComponent(value)}`;
      }
    });
  }

  function renderHero() {
    const track = $("[data-hero-track]");
    if (!track) return;

    const viewport = $("[data-hero-viewport]");
    const carousel = $("[data-hero-carousel]");
    const dotsHost = $("[data-hero-dots]");
    const pauseButton = $("[data-hero-pause]");
    const pauseIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3v14H7zM14 5h3v14h-3z"/></svg>';
    const playIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7V5Z"/></svg>';
    const total = HERO_SLIDES.length;
    const loopedSlides = [
      { slide: HERO_SLIDES[total - 1], originalIndex: total - 1, clone: true },
      ...HERO_SLIDES.map((slide, index) => ({
        slide,
        originalIndex: index,
        clone: false
      })),
      { slide: HERO_SLIDES[0], originalIndex: 0, clone: true }
    ];

    track.innerHTML = loopedSlides
      .map(
        (item, index) => `<a class="hero-slide" href="${item.slide.primaryHref}" data-hero-slide data-hero-index="${item.originalIndex}" data-clone="${item.clone}" aria-hidden="true" tabindex="-1">
          <picture>
            <source media="(max-width: 760px)" srcset="${item.slide.mobile}">
            <img src="${item.slide.desktop}" alt="${escapeHTML(
              item.slide.alt
            )            }" width="1920" height="768" ${
              !item.clone && item.originalIndex === 0
                ? 'fetchpriority="high" loading="eager"'
                : 'loading="eager"'
            } decoding="async">
          </picture>
        </a>`
      )
      .join("");

    if (dotsHost) {
      dotsHost.innerHTML = HERO_SLIDES.map(
        (slide, index) =>
          `<button class="hero-dot" type="button" data-hero-dot="${index}" aria-label="Go to slide ${
            index + 1
          }: ${escapeHTML(slide.eyebrow)}"></button>`
      ).join("");
    }

    const slides = $$("[data-hero-slide]", track);
    const dots = $$("[data-hero-dot]", dotsHost || track);
    let current = 1;
    let timer = null;
    let settleTimer = null;
    let paused = false;

    const updateSlides = () => {
      const originalIndex = (current - 1 + total) % total;
      slides.forEach((slide, index) => {
        const isActive = index === current;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
        slide.tabIndex = isActive ? 0 : -1;
      });
      dots.forEach((dot, index) => {
        const isActive = index === originalIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    const positionTrack = (animate) => {
      const slide = slides[current];
      if (!slide || !viewport) return;
      const trackStyle = window.getComputedStyle(track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "0") || 0;
      const slideWidth = slide.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      const offset = (viewportWidth - slideWidth) / 2 - current * (slideWidth + gap);
      track.style.transition = animate
        ? "transform 1s cubic-bezier(0.65, 0, 0.35, 1)"
        : "none";
      track.style.transform = `translate3d(${offset}px, 0, 0)`;

      if (settleTimer) {
        window.clearTimeout(settleTimer);
        settleTimer = null;
      }
      if (animate && (current === 0 || current === total + 1)) {
        settleTimer = window.setTimeout(() => {
          current = current === 0 ? total : 1;
          updateSlides();
          positionTrack(false);
        }, 1020);
      }
    };

    const goTo = (trackIndex, animate) => {
      const target = Math.max(0, Math.min(loopedSlides.length - 1, trackIndex));
      current = target;
      updateSlides();
      positionTrack(animate);
    };

    const goNext = () => goTo(current + 1, true);
    const goPrev = () => goTo(current - 1, true);

    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      if (paused || timer) return;
      timer = window.setInterval(() => {
        if (!document.hidden) goNext();
      }, 4000);
    };

    const restart = () => {
      stop();
      start();
    };

    const updatePauseButton = () => {
      if (!pauseButton) return;
      pauseButton.innerHTML = paused ? playIcon : pauseIcon;
      pauseButton.setAttribute(
        "aria-label",
        paused ? "Play automatic slideshow" : "Pause automatic slideshow"
      );
      pauseButton.setAttribute("aria-pressed", String(paused));
    };

    if (pauseButton) {
      pauseButton.addEventListener("click", () => {
        paused = !paused;
        if (paused) stop();
        else start();
        updatePauseButton();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const targetIndex = Number(dot.dataset.heroDot) + 1;
        goTo(targetIndex, true);
        restart();
      });
    });

    if (carousel) {
      carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrev();
          restart();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
          restart();
        }
      });
    }

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => positionTrack(false), 100);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    updateSlides();
    positionTrack(false);
    updatePauseButton();
    start();
  }

  function renderCategories() {
    const host = $("[data-categories]");
    if (!host) return;
    host.innerHTML = CATEGORIES.map(
      (category) => `<a class="category-tile" href="collections.html?filter=${encodeURIComponent(
        category.filter
      )}">
        <span class="category-tile__image">
          <img src="${category.image}" alt="${escapeHTML(
        category.name
      )} jewellery" width="600" height="600" loading="lazy">
        </span>
        <span class="category-tile__label">${escapeHTML(category.name)}</span>
      </a>`
    ).join("");
  }

  function productCard(product) {
    const secondary = product.images && product.images[1];
    return `<article class="product-card">
      <div class="product-card__media">
        <a href="product.html?piece=${product.id}" aria-label="View ${escapeHTML(
      product.name
    )}">
          <img class="product-card__image product-card__image--primary" src="${
            product.image
          }" alt="${escapeHTML(product.alt)}" width="900" height="1200" loading="lazy">
          ${
            secondary
              ? `<img class="product-card__image product-card__image--secondary" src="${secondary}" alt="" width="900" height="1200" loading="lazy">`
              : ""
          }
        </a>
        ${
          product.badge
            ? `<span class="product-card__badge">${escapeHTML(product.badge)}</span>`
            : ""
        }
      </div>
      <div class="product-card__body">
        <p class="product-card__category">${escapeHTML(
          product.collection
        )} · ${escapeHTML(product.type)}</p>
        <h3 class="product-card__name"><a href="product.html?piece=${
          product.id
        }">${escapeHTML(product.name)}</a></h3>
        <p class="product-card__price">${escapeHTML(product.price)}</p>
      </div>
    </article>`;
  }

  const formatBlogDate = (value) => {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const blogCard = (post) => `<a class="blog-card" href="blog-post.html?post=${encodeURIComponent(
    post.slug
  )}">
      <span class="blog-card__media">
        <img src="${escapeHTML(post.cover)}" alt="${escapeHTML(
    post.coverAlt || post.title
  )}" width="800" height="600" loading="lazy">
      </span>
      <span class="blog-card__title">${escapeHTML(post.title)}</span>
    </a>`;

  const sortBlogPosts = (posts) =>
    [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  function renderBlogList() {
    const host = $("[data-blog-list]");
    if (!host) return;
    const posts = sortBlogPosts(BLOG_POSTS);
    host.innerHTML = posts.length
      ? posts.map(blogCard).join("")
      : `<p class="blog-empty">New stories are on the way. Please check back soon.</p>`;
    const count = $("[data-blog-count]");
    if (count) {
      count.textContent = `${posts.length} ${
        posts.length === 1 ? "story" : "stories"
      }`;
    }
  }

  function renderBlogBlock(block) {
    switch (block.type) {
      case "heading":
        return `<h2>${escapeHTML(block.text || "")}</h2>`;
      case "image":
        return `<figure class="blog-post__figure">
          <img src="${escapeHTML(block.src || "")}" alt="${escapeHTML(
          block.alt || ""
        )}" width="1200" height="800" loading="lazy">
          ${block.caption ? `<figcaption>${escapeHTML(block.caption)}</figcaption>` : ""}
        </figure>`;
      case "quote":
        return `<blockquote>${escapeHTML(block.text || "")}</blockquote>`;
      case "list":
        return `<ul>${(block.items || [])
          .map((item) => `<li>${escapeHTML(item)}</li>`)
          .join("")}</ul>`;
      case "paragraph":
      default:
        return `<p>${escapeHTML(block.text || "")}</p>`;
    }
  }

  function initBlogPost() {
    const articleHost = $("[data-blog-article]");
    if (!articleHost) return;

    const params = new URLSearchParams(window.location.search);
    const posts = sortBlogPosts(BLOG_POSTS);
    const post =
      posts.find((item) => item.slug === params.get("post")) || posts[0];
    if (!post) return;

    document.title = `${post.title} | ${SITE.name}`;
    const setText = (selector, value) => {
      const node = $(selector);
      if (node) node.textContent = value;
    };
    setText("[data-blog-title]", post.title);
    setText("[data-blog-category]", post.category || "Blog");
    setText(
      "[data-blog-meta]",
      [formatBlogDate(post.date), post.readTime].filter(Boolean).join(" · ")
    );

    const description = (post.body || []).find((block) => block.type === "paragraph");
    const metaDescription = $('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute("content", description.text);
    }

    const breadcrumb = $("[data-blog-breadcrumb]");
    if (breadcrumb) {
      breadcrumb.innerHTML = `<a href="index.html">Home</a><span aria-hidden="true">/</span><a href="blog.html">Blog</a><span aria-hidden="true">/</span><span>${escapeHTML(
        post.title
      )}</span>`;
    }

    const cover = $("[data-blog-cover]");
    if (cover) {
      cover.src = post.cover;
      cover.alt = post.coverAlt || post.title;
    }

    articleHost.innerHTML = (post.body || []).map(renderBlogBlock).join("");

    const moreSection = $("[data-blog-more-section]");
    const moreHost = $("[data-blog-more]");
    if (moreHost) {
      const more = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
      if (more.length) {
        moreHost.innerHTML = more.map(blogCard).join("");
        if (moreSection) moreSection.hidden = false;
      }
    }
  }

  function renderProductRail() {
    $$("[data-product-rail]").forEach((host) => {
      const mode = host.dataset.productRail;
      let list = PRODUCTS.filter((product) =>
        mode === "new" ? product.newArrival : product.featured
      );
      if (list.length < 4) {
        list = [...list, ...PRODUCTS.filter((product) => !list.includes(product))];
      }
      host.innerHTML = list.slice(0, 4).map(productCard).join("");
    });
  }

  function renderSchemeMini() {
    const host = $("[data-scheme-mini]");
    if (!host) return;
    host.innerHTML = SCHEMES.map(
      (scheme) => `<a class="scheme-mini" href="schemes.html#${scheme.id}">
        <span class="scheme-mini__top">
          <span class="scheme-mini__index">${escapeHTML(scheme.index)}</span>
          <span class="scheme-mini__duration">${escapeHTML(scheme.duration)}</span>
        </span>
        <span>
          <span class="scheme-mini__name">${escapeHTML(scheme.name)}</span>
          <span class="scheme-mini__duration">${escapeHTML(scheme.start)}</span>
        </span>
      </a>`
    ).join("");
  }

  function renderWorld() {
    const host = $("[data-world]");
    if (!host) return;
    host.innerHTML = WORLD_PILLARS.map(
      (pillar) => `<a class="world-card" href="${pillar.href}">
        <img src="${pillar.image}" alt="${escapeHTML(
        pillar.name
      )} jewellery" width="1000" height="1250" loading="lazy">
        <span class="world-card__copy">
          <h3>${escapeHTML(pillar.name)}</h3>
          <p>${escapeHTML(pillar.copy)}</p>
        </span>
      </a>`
    ).join("");
  }

  function renderAssurance() {
    const host = $("[data-assurance]");
    if (!host) return;
    const icons = [ICON.gem, ICON.craft, ICON.check, ICON.coin];
    host.innerHTML = ASSURANCE.map(
      (item, index) => `<article class="assurance-item">
        <span class="assurance-item__icon">${icons[index]}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.copy)}</p>
      </article>`
    ).join("");
  }

  function renderExperience() {
    const host = $("[data-experience]");
    if (!host) return;
    const icons = [ICON.pin, ICON.calendar, ICON.chat, ICON.coin];
    host.innerHTML = EXPERIENCE.map(
      (item, index) => `<article class="experience-item">
        <span class="experience-item__icon">${icons[index]}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.copy)}</p>
        <a href="${item.href}">${escapeHTML(item.link)} <span aria-hidden="true">→</span></a>
      </article>`
    ).join("");
  }

  const FILTER_GROUPS = [
    {
      key: "category",
      title: "Category",
      values: ["Necklaces", "Earrings", "Bangles", "Rings", "Pendants", "Chains"]
    },
    {
      key: "collection",
      title: "Collection",
      values: ["Bridal", "Everyday", "Signature", "Gifting"]
    },
    {
      key: "material",
      title: "Material",
      values: ["Gold"]
    }
  ];

  function getFilterGroup(value) {
    return FILTER_GROUPS.find((group) => group.values.includes(value));
  }

  function initCollectionPage() {
    const grid = $("[data-product-grid]");
    const filtersHost = $("[data-plp-filters]");
    if (!grid || !filtersHost) return;

    const params = new URLSearchParams(window.location.search);
    const state = {
      q: params.get("q") || "",
      sort: params.get("sort") || "featured",
      groups: {
        category: new Set(),
        collection: new Set(),
        material: new Set()
      }
    };

    (params.get("filter") || "")
      .split(",")
      .filter(Boolean)
      .forEach((value) => {
        const group = getFilterGroup(value);
        if (group) state.groups[group.key].add(value);
      });

    filtersHost.innerHTML = FILTER_GROUPS.map(
      (group) => `<div class="filter-group">
        <h3>${escapeHTML(group.title)}</h3>
        ${group.values
          .map(
            (value) => `<label class="filter-option">
              <input type="checkbox" name="${group.key}" value="${escapeHTML(value)}" ${
              state.groups[group.key].has(value) ? "checked" : ""
            }>
              <span>${escapeHTML(value)}</span>
            </label>`
          )
          .join("")}
      </div>`
    ).join("");

    const matchesFilters = (product) => {
      return FILTER_GROUPS.every((group) => {
        const values = state.groups[group.key];
        if (!values.size) return true;
        return [...values].some((value) => {
          if (group.key === "material") {
            return product.material.includes(value);
          }
          return product.tags.includes(value);
        });
      });
    };

    const matchesQuery = (product) => {
      if (!state.q) return true;
      return [
        product.name,
        product.type,
        product.collection,
        product.material,
        ...product.tags
      ]
        .join(" ")
        .toLowerCase()
        .includes(state.q.toLowerCase());
    };

    const sortProducts = (list) => {
      const sorted = [...list];
      if (state.sort === "newest") {
        sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
      } else if (state.sort === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
      }
      return sorted;
    };

    const syncUrl = () => {
      const url = new URL(window.location.href);
      const filterValues = Object.values(state.groups).flatMap((set) => [...set]);
      if (state.q) url.searchParams.set("q", state.q);
      else url.searchParams.delete("q");
      if (filterValues.length) url.searchParams.set("filter", filterValues.join(","));
      else url.searchParams.delete("filter");
      if (state.sort !== "featured") url.searchParams.set("sort", state.sort);
      else url.searchParams.delete("sort");
      window.history.replaceState({}, "", url);
    };

    const resetFilters = () => {
      Object.values(state.groups).forEach((set) => set.clear());
      state.q = "";
      state.sort = "featured";
      $$('input[type="checkbox"]', filtersHost).forEach((input) => {
        input.checked = false;
      });
      const sortSelect = $("[data-sort]");
      if (sortSelect) sortSelect.value = "featured";
      apply();
    };

    const apply = () => {
      const selected = Object.values(state.groups).flatMap((set) => [...set]);
      const list = sortProducts(
        PRODUCTS.filter((product) => matchesFilters(product) && matchesQuery(product))
      );
      const titleHost = $("[data-plp-title]");
      const leadHost = $("[data-plp-lead]");
      if (titleHost) {
        if (state.q) titleHost.textContent = `Search results for “${state.q}”`;
        else if (selected.length === 1) titleHost.textContent = `${selected[0]} Jewellery`;
        else if (selected.length > 1) titleHost.textContent = "Filtered Jewellery";
        else titleHost.textContent = "Jewellery Collections";
      }
      if (leadHost) {
        leadHost.textContent = state.q
          ? `Showing pieces matching “${state.q}”.`
          : "Jewellery for every chapter — from bridal heirlooms to the pieces you reach for every day.";
      }
      if (titleHost) {
        document.title = `${titleHost.textContent} | ${SITE.name}`;
      }
      $$("[data-plp-count]").forEach((element) => {
        element.textContent = `${list.length} ${list.length === 1 ? "piece" : "pieces"}`;
      });
      grid.innerHTML = list.length
        ? list.map(productCard).join("")
        : `<div class="plp-empty">
            <h2>No pieces found</h2>
            <p>Try a different filter or explore the full collection.</p>
            <button class="btn btn--outline" type="button" data-reset-filters>Clear filters</button>
          </div>`;
      $$("[data-reset-filters]").forEach((button) =>
        button.addEventListener("click", resetFilters)
      );
      syncUrl();
    };

    filtersHost.addEventListener("change", (event) => {
      const input = event.target.closest('input[type="checkbox"]');
      if (!input) return;
      const group = state.groups[input.name];
      if (!group) return;
      if (input.checked) group.add(input.value);
      else group.delete(input.value);
      apply();
    });

    $("[data-filter-clear]")?.addEventListener("click", resetFilters);
    $("[data-sort]")?.addEventListener("change", (event) => {
      state.sort = event.target.value;
      apply();
    });

    const filtersOverlay = $("[data-filters-overlay]");
    const filterToggle = $("[data-filter-toggle]");
    const closeFilters = () => document.body.classList.remove("filters-open");
    filterToggle?.addEventListener("click", () =>
      document.body.classList.add("filters-open")
    );
    filtersOverlay?.addEventListener("click", closeFilters);
    $$("[data-close-filters]").forEach((button) =>
      button.addEventListener("click", closeFilters)
    );
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("filters-open")) {
        closeFilters();
      }
    });

    const sortSelect = $("[data-sort]");
    if (sortSelect) sortSelect.value = state.sort;
    apply();
  }

  function initProductPage() {
    const infoHost = $("[data-pdp-info]");
    if (!infoHost) return;

    const params = new URLSearchParams(window.location.search);
    const product =
      PRODUCTS.find((item) => item.id === params.get("piece")) || PRODUCTS[0];
    const related = PRODUCTS.filter(
      (item) =>
        item.id !== product.id &&
        (item.collection === product.collection || item.type === product.type)
    ).slice(0, 3);
    const fallbackRelated = PRODUCTS.filter(
      (item) => item.id !== product.id && !related.includes(item)
    ).slice(0, 3 - related.length);
    const similar = [...related, ...fallbackRelated];

    document.title = `${product.name} | ${SITE.name}`;
    const breadcrumbHost = $("[data-pdp-breadcrumb]");
    if (breadcrumbHost) {
      breadcrumbHost.innerHTML = `<a href="index.html">Home</a><span aria-hidden="true">/</span><a href="collections.html">Jewellery Collections</a><span aria-hidden="true">/</span><span>${escapeHTML(
        product.name
      )}</span>`;
    }

    const mainImage = $("[data-pdp-main]");
    if (mainImage) {
      mainImage.src = product.images[0];
      mainImage.alt = product.alt;
    }
    const thumbsHost = $("[data-pdp-thumbs]");
    if (thumbsHost) {
      thumbsHost.innerHTML = product.images
        .map(
          (image, index) => `<button class="pdp-thumb${
            index === 0 ? " is-active" : ""
          }" type="button" data-pdp-thumb="${image}" aria-label="View image ${
            index + 1
          }">
            <img src="${image}" alt="" width="72" height="90" loading="lazy">
          </button>`
        )
        .join("");
      $$("[data-pdp-thumb]", thumbsHost).forEach((button) => {
        button.addEventListener("click", () => {
          if (mainImage) {
            mainImage.src = button.dataset.pdpThumb;
            mainImage.alt = product.alt;
          }
          $$("[data-pdp-thumb]", thumbsHost).forEach((thumb) =>
            thumb.classList.toggle("is-active", thumb === button)
          );
        });
      });
    }

    infoHost.innerHTML = `
      <p class="eyebrow">${escapeHTML(product.collection)} · ${escapeHTML(product.type)}</p>
      <h1>${escapeHTML(product.name)}</h1>
      <p class="pdp-price">${escapeHTML(product.price)}</p>
      <p class="pdp-tax-note">Inclusive of applicable taxes. Final details confirmed by our team.</p>
      <p class="pdp-description">${escapeHTML(product.description)}</p>
      <div class="pdp-meta">
        <span>${escapeHTML(product.material)}</span>
        <span>${escapeHTML(product.collection)}</span>
        <span>${escapeHTML(product.type)}</span>
      </div>
      <div class="pdp-actions">
        <a class="btn btn--primary" href="${whatsappLink(
          `Hello ${SITE.name}, I would like to enquire about ${product.name}.`
        )}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">→</span></a>
        <a class="btn btn--outline" href="contact.html">Book a viewing</a>
      </div>
      <div class="pdp-availability">
        <h2>Available at our showroom</h2>
        <p>${escapeHTML(SITE.address)}</p>
        <a href="${SITE.mapsUrl}" target="_blank" rel="noopener noreferrer">Get directions →</a>
      </div>
      <div class="pdp-accordions">
        <details class="pdp-accordion" open>
          <summary>Jewellery details</summary>
          <div class="pdp-accordion__body">${escapeHTML(
            product.details
          )}<br>Material: ${escapeHTML(product.material)}<br>Collection: ${escapeHTML(
            product.collection
          )}</div>
        </details>
        <details class="pdp-accordion">
          <summary>Care guidance</summary>
          <div class="pdp-accordion__body">Store each piece separately in a soft pouch. Keep jewellery away from perfume and harsh chemicals. Bring it to the showroom periodically for professional cleaning and care.</div>
        </details>
        <details class="pdp-accordion">
          <summary>Gold savings schemes</summary>
          <div class="pdp-accordion__body">Eligible gold jewellery may qualify for scheme benefits. Ask our team about the current schemes, eligibility and complete terms before you enrol.</div>
        </details>
      </div>
      <div class="pdp-assurance">
        <div>View in showroom</div>
        <div>Personal guidance</div>
        <div>Savings schemes</div>
      </div>
    `;

    const similarHost = $("[data-pdp-similar]");
    if (similarHost) {
      similarHost.innerHTML = similar.map(productCard).join("");
    }
  }

    const SCHEME_ICONS = [ICON.calendar, ICON.gem, ICON.check, ICON.pin];

  function initSchemesPage() {
    const tabsHost = $("[data-scheme-tabs]");
    const panelsHost = $("[data-scheme-panels]");
    if (!tabsHost || !panelsHost) return;

    tabsHost.innerHTML = SCHEMES.map(
      (scheme, index) => `<button class="scheme-tab${
        index === 0 ? " is-active" : ""
      }" type="button" role="tab" id="tab-${scheme.id      }" aria-selected="${
        index === 0 ? "true" : "false"
      }" tabindex="${index === 0 ? "0" : "-1"}" aria-controls="${
        scheme.id
      }" data-scheme-tab="${scheme.id}">${escapeHTML(
        scheme.name.replace("Chenthur ", "")
      )}</button>`
    ).join("");

    panelsHost.innerHTML = SCHEMES.map(
      (scheme, index) => `<article class="scheme-panel${
        index === 0 ? " is-active" : ""
      }" id="${scheme.id}" role="tabpanel" aria-labelledby="tab-${scheme.id}" tabindex="0">
        <div class="scheme-visual">
          <span class="scheme-visual__index">${escapeHTML(scheme.index)}</span>
          <div class="scheme-visual__body">
            <h2>${escapeHTML(scheme.name)}</h2>
            <p>${escapeHTML(scheme.subtitle)}</p>
          </div>
        </div>
        <div class="scheme-detail">
          <p class="eyebrow">${escapeHTML(scheme.tag)}</p>
          <h2>${escapeHTML(scheme.name)}</h2>
          <p>${escapeHTML(scheme.description)}</p>
          <div class="scheme-benefit">${escapeHTML(scheme.benefit)}</div>
          <dl class="scheme-specs">
            <div class="scheme-spec"><dt>Duration</dt><dd>${escapeHTML(
              scheme.duration
            )}</dd></div>
            <div class="scheme-spec"><dt>Start from</dt><dd>${escapeHTML(
              scheme.start
            )}</dd></div>
            <div class="scheme-spec"><dt>Eligibility</dt><dd>${escapeHTML(
              scheme.eligibility
            )}</dd></div>
            <div class="scheme-spec"><dt>Terms</dt><dd>${escapeHTML(
              scheme.note
            )}</dd></div>
          </dl>
          <ul class="scheme-feature-list">
            ${scheme.features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join("")}
          </ul>
          ${
            scheme.taglines
              ? `<p class="scheme-detail__taglines">${scheme.taglines
                  .map((line) => escapeHTML(line))
                  .join("<br>")}</p>`
              : ""
          }
          <p class="scheme-detail__fine">${escapeHTML(scheme.eligibility)}. ${escapeHTML(
            scheme.note
          )}.</p>
          <div class="scheme-actions">
            <a class="btn btn--primary" href="contact.html">Book a consultation <span aria-hidden="true">→</span></a>
            <a class="btn btn--outline" href="${whatsappLink(
              `Hello ${SITE.name}, I would like to enquire about ${scheme.name}.`
            )}" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
          </div>
        </div>
      </article>`
    ).join("");

    const tabs = $$("[data-scheme-tab]", tabsHost);
    const panels = $$(".scheme-panel", panelsHost);

    const activate = (id, updateHash) => {
      const exists = SCHEMES.some((scheme) => scheme.id === id);
      if (!exists) return;
      tabs.forEach((tab) => {
        const isActive = tab.dataset.schemeTab === id;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });
      panels.forEach((panel) =>
        panel.classList.toggle("is-active", panel.id === id)
      );
      window.setTimeout(() => {
        const activePanel = panels.find((panel) => panel.id === id);
        if (!activePanel) return;
        $$("[data-reveal]", activePanel).forEach((element) =>
          element.classList.add("is-revealed")
        );
      }, 40);
      if (updateHash) {
        window.history.replaceState({}, "", `#${id}`);
      }
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab.dataset.schemeTab, true));
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = tabs[(index + direction + tabs.length) % tabs.length];
        next.focus();
        activate(next.dataset.schemeTab, true);
      });
    });

    if (window.location.hash) {
      const requested = window.location.hash.slice(1);
      if (SCHEMES.some((scheme) => scheme.id === requested)) {
        activate(requested, false);
      }
    }

    const tableHost = $("[data-scheme-table]");
    if (tableHost) {
      tableHost.innerHTML = SCHEMES.map(
        (scheme) => `<tr>
          <th scope="row"><span>${escapeHTML(
            scheme.name
          )}</span><small>${escapeHTML(scheme.subtitle)}</small></th>
          <td>${escapeHTML(scheme.duration)}</td>
          <td>${escapeHTML(scheme.start)}</td>
          <td>${escapeHTML(scheme.bestFor)}</td>
          <td>${escapeHTML(scheme.benefit)}</td>
        </tr>`
      ).join("");
    }

    const schemeFaqHost = $("[data-scheme-faqs]");
    if (schemeFaqHost) {
      schemeFaqHost.innerHTML = FAQ_MARKUP(SCHEME_FAQS);
    }
  }

  const FAQ_MARKUP = (faqs) =>
    faqs
      .map(
        (faq) => `<details class="faq-item">
          <summary>${escapeHTML(faq.question)}</summary>
          <div class="faq-answer"><p>${escapeHTML(faq.answer)}</p></div>
        </details>`
      )
      .join("");

  function renderFaqs() {
    $$("[data-general-faqs]").forEach((host) => {
      host.innerHTML = FAQ_MARKUP(GENERAL_FAQS);
    });
    $$("[data-scheme-faqs]").forEach((host) => {
      if (!host.innerHTML.trim()) host.innerHTML = FAQ_MARKUP(SCHEME_FAQS);
    });
  }

  function setupEnquiryForm() {
    const form = $("[data-enquiry-form]");
    if (!form) return;
    const status = $("[data-form-status]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const interest = String(formData.get("interest") || "").trim();
      const visitDate = String(formData.get("visit-date") || "").trim();
      const visitTime = String(formData.get("visit-time") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const lines = [
        `Hello ${SITE.name}, I would like to make an enquiry.`,
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Interested in: ${interest}`,
        `Preferred visit: ${visitDate || "Not specified"}${
          visitTime ? `, ${visitTime}` : ""
        }`,
        "",
        message
      ];
      window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
      if (status) {
        status.hidden = false;
        status.innerHTML = `Thank you, ${escapeHTML(
          name
        )}. Your enquiry has been prepared in WhatsApp. If it did not open, please email us at <a href="mailto:${escapeHTML(
          SITE.email
        )}">${escapeHTML(SITE.email)}</a>.`;
      }
      form.reset();
    });
  }

  function initScrollReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const groups = [
      {
        selector: ".page-head .breadcrumbs, .page-head__row, .page-head__lead",
        type: "up",
        stagger: 70
      },
      { selector: ".page-hero__content", type: "up", stagger: 0 },
      { selector: ".scheme-banner__copy", type: "left", stagger: 0 },
      { selector: ".scheme-mini", type: "up", stagger: 50 },
      { selector: ".section-head", type: "up", stagger: 0 },
      { selector: ".category-tile", type: "scale", stagger: 55 },
      { selector: ".editorial-card", type: "scale", stagger: 100 },
      { selector: ".world-card", type: "up", stagger: 70 },
      { selector: ".new-arrivals__content", type: "up", stagger: 0 },
      { selector: ".assurance-intro", type: "left", stagger: 0 },
      { selector: ".assurance-item", type: "up", stagger: 70 },
      { selector: ".revival-media", type: "left", stagger: 0 },
      { selector: ".revival-copy", type: "right", stagger: 0 },
      { selector: ".experience-item", type: "up", stagger: 70 },
      { selector: ".product-card", type: "up", stagger: 55 },
      { selector: ".plp-toolbar", type: "up", stagger: 0 },
      { selector: ".plp-promo", type: "up", stagger: 0 },
      { selector: ".plp-seo", type: "up", stagger: 0 },
      { selector: ".pdp .breadcrumbs", type: "up", stagger: 0 },
      { selector: ".pdp-gallery__main", type: "left", stagger: 0 },
      { selector: ".pdp-info", type: "right", stagger: 0 },
      { selector: ".scheme-tabs", type: "up", stagger: 0 },
      { selector: ".scheme-visual", type: "left", stagger: 0 },
      { selector: ".scheme-detail", type: "right", stagger: 0 },
      { selector: ".scheme-feature", type: "up", stagger: 70 },
      { selector: ".step-card", type: "up", stagger: 80 },
      { selector: ".comparison", type: "up", stagger: 0 },
      { selector: ".scheme-note", type: "up", stagger: 0 },
      { selector: ".scheme-cta", type: "up", stagger: 0 },
      { selector: ".faq-item", type: "up", stagger: 45 },
      { selector: ".about-story__media", type: "left", stagger: 0 },
      { selector: ".about-story__copy", type: "right", stagger: 0 },
      { selector: ".value-card", type: "up", stagger: 80 },
      { selector: ".about-craft__image", type: "right", stagger: 0 },
      { selector: ".about-craft__copy", type: "left", stagger: 0 },
      { selector: ".about-quote blockquote", type: "up", stagger: 0 },
      { selector: ".about-quote cite", type: "up", stagger: 0 },
      { selector: ".contact-intro", type: "left", stagger: 0 },
      { selector: ".contact-form-wrap", type: "right", stagger: 0 },
      { selector: ".contact-option", type: "up", stagger: 80 },
      { selector: ".map-frame", type: "up", stagger: 0 },
      { selector: ".help-card", type: "up", stagger: 80 },
      { selector: ".faq-intro", type: "left", stagger: 0 },
      { selector: ".blog-card", type: "scale", stagger: 70 },
      { selector: ".blog-post__head", type: "up", stagger: 0 },
      { selector: ".blog-post__body", type: "up", stagger: 0 },
      { selector: ".legal-meta", type: "up", stagger: 0 },
      { selector: ".legal-notice", type: "up", stagger: 0 },
      { selector: ".legal-content section", type: "up", stagger: 45 },
      { selector: ".not-found__inner", type: "up", stagger: 0 },
      { selector: ".footer-card", type: "up", stagger: 0 }
    ];

    const seen = new Set();
    groups.forEach((group) => {
      const counts = new Map();
      $$(group.selector).forEach((element) => {
        if (seen.has(element)) return;
        if (
          element.closest(
            ".site-header, .mobile-drawer, .search-overlay, .mega-menu, .hero-carousel, .plp-filters"
          )
        ) {
          return;
        }
        seen.add(element);
        element.setAttribute("data-reveal", group.type || "up");
        const parent = element.parentElement;
        const index = counts.get(parent) || 0;
        counts.set(parent, index + 1);
        const delay = Math.min(index, 5) * (group.stagger || 0);
        if (delay) element.style.setProperty("--reveal-delay", `${delay}ms`);
      });
    });

    const elements = $$("[data-reveal]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    let ticking = false;
    const revealPassed = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const trigger = window.innerHeight * 0.93;
        $$("[data-reveal]:not(.is-revealed)").forEach((element) => {
          if (!element.offsetParent && getComputedStyle(element).position !== "fixed") {
            return;
          }
          if (element.getBoundingClientRect().top < trigger) {
            element.classList.add("is-revealed");
            observer.unobserve(element);
          }
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", revealPassed, { passive: true });
    window.addEventListener("resize", revealPassed);
    window.setTimeout(revealPassed, 100);
  }

  function handleInitialHash() {
    if (!window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) {
      window.setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }

  renderHeader();
  renderFooter();
  renderHero();
  renderCategories();
  renderSchemeMini();
  renderProductRail();
  renderWorld();
  renderAssurance();
  renderExperience();
  initCollectionPage();
  initProductPage();
  initSchemesPage();
  renderFaqs();
  renderBlogList();
  initBlogPost();
  injectSiteDetails();
  setupHeader();
  setupSearch();
  setupMobileSearch();
  setupEnquiryForm();
  initScrollReveal();
  handleInitialHash();
})();

