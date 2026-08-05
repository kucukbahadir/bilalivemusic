/* ===================================================================
   Bilalive Music — behavior layer
   =================================================================== */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- CONFIG (swap these placeholders with real values) ---- */
  var CONFIG = window.BLM_CONFIG || {};
  var W3F_KEY = CONFIG.web3formsKey || "YOUR_WEB3FORMS_ACCESS_KEY"; // https://web3forms.com (free)
  var GA_ID = CONFIG.gaId || "";            // e.g. "G-XXXXXXX" — loaded only after statistics consent
  var INFO_EMAIL = CONFIG.email || "info@bilalivemusic.com";

  /* ---------- NAV ---------- */
  var nav = $("#nav");
  if (nav) {
    var forceSolid = nav.classList.contains("solid");
    var onScroll = function () { if (!forceSolid) nav.classList.toggle("scrolled", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  // mobile menu
  var burger = $("#burger"), mobileMenu = $("#mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", mobileMenu).forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("open"); burger.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- REVEAL ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- LANGUAGE SWITCHER ---------- */
  $$(".lang").forEach(function (wrap) {
    var toggle = $(".lang-toggle", wrap);
    if (toggle) toggle.addEventListener("click", function (e) {
      e.stopPropagation(); wrap.classList.toggle("open");
    });
  });
  document.addEventListener("click", function () { $$(".lang.open").forEach(function (w) { w.classList.remove("open"); }); });
  $$("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (window.BLM_I18N) window.BLM_I18N.set(b.getAttribute("data-set-lang"));
      $$(".lang.open").forEach(function (w) { w.classList.remove("open"); });
    });
  });

  /* ---------- COOKIE CONSENT ---------- */
  var CONSENT_KEY = "blm_consent";
  function getConsent() { try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) { return null; } }
  function saveConsent(c) { try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch (e) {} }

  var banner = $("#cookie");
  function showBanner() { if (banner) setTimeout(function () { banner.classList.add("show"); }, 60); }
  function hideBanner() { if (banner) banner.classList.remove("show"); }

  function applyConsent(c) {
    if (c && c.statistics && GA_ID) loadGA();
    // marketing-gated embeds could be enabled here when needed
  }
  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded || !GA_ID) return; gaLoaded = true;
    var s = document.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
  }

  if (banner) {
    var prefsBox = $("#cookiePrefs");
    var existing = getConsent();
    if (!existing) showBanner(); else applyConsent(existing);

    var setAndClose = function (stats, mkt) {
      var c = { functional: true, statistics: !!stats, marketing: !!mkt, ts: new Date().toISOString() };
      saveConsent(c); applyConsent(c); hideBanner();
    };
    $("#ckAccept") && $("#ckAccept").addEventListener("click", function () { setAndClose(true, true); });
    $("#ckReject") && $("#ckReject").addEventListener("click", function () { setAndClose(false, false); });
    $("#ckCustomize") && $("#ckCustomize").addEventListener("click", function () {
      prefsBox && prefsBox.classList.toggle("show");
    });
    $("#ckSave") && $("#ckSave").addEventListener("click", function () {
      setAndClose($("#ckStat") && $("#ckStat").checked, $("#ckMkt") && $("#ckMkt").checked);
    });
  }
  // reopen from footer / anywhere
  $$("[data-cookie-settings]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var c = getConsent();
      if (c) { $("#ckStat") && ($("#ckStat").checked = c.statistics); $("#ckMkt") && ($("#ckMkt").checked = c.marketing); }
      $("#cookiePrefs") && $("#cookiePrefs").classList.add("show");
      showBanner();
    });
  });

  /* ---------- VIDEO: open on YouTube in a new tab ----------
     Inline embeds (Error 153) break inside in-app browsers such as Instagram's,
     which is exactly where our traffic comes from. Opening the real YouTube page
     works everywhere, launches the YouTube app on mobile, and loads no YT code
     until the user clicks (GDPR-friendly). */
  $$("[data-video]").forEach(function (card) {
    var id = card.getAttribute("data-video");
    var open = function () { window.open("https://www.youtube.com/watch?v=" + id, "_blank", "noopener"); };
    card.addEventListener("click", open);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });

  /* ---------- PACKAGE FILTER ---------- */
  var pkgGrid = $("#pkgGrid");
  if (pkgGrid) {
    var activeEvent = "all", activeBudget = "all";
    var cards = $$(".pkg", pkgGrid);
    var emptyEl = $("#pkgEmpty");
    function budgetTier(v) { return v; }
    function refilter() {
      var shown = 0;
      cards.forEach(function (c) {
        var events = (c.getAttribute("data-events") || "").split(" ");
        var budget = c.getAttribute("data-budget") || "";
        var okE = activeEvent === "all" || events.indexOf(activeEvent) !== -1;
        var okB = activeBudget === "all" || budget === activeBudget ||
          (activeBudget === "low" && (budget === "low")) ||
          (activeBudget === "mid" && (budget === "mid")) ||
          (activeBudget === "high" && (budget === "high" || budget === "top")) ||
          (activeBudget === "top" && budget === "top");
        var show = okE && okB;
        c.style.display = show ? "" : "none";
        if (show) shown++;
      });
      if (emptyEl) emptyEl.style.display = shown ? "none" : "block";
    }
    $$("[data-filter-event]").forEach(function (b) {
      b.addEventListener("click", function () {
        activeEvent = b.getAttribute("data-filter-event");
        $$("[data-filter-event]").forEach(function (x) { x.classList.toggle("active", x === b); });
        refilter();
      });
    });
    $$("[data-filter-budget]").forEach(function (b) {
      b.addEventListener("click", function () {
        activeBudget = b.getAttribute("data-filter-budget");
        $$("[data-filter-budget]").forEach(function (x) { x.classList.toggle("active", x === b); });
        refilter();
      });
    });
    // "request this package" -> jump to booking form, preselect
    $$("[data-request-pkg]").forEach(function (b) {
      b.addEventListener("click", function () {
        var name = b.getAttribute("data-request-pkg");
        var sel = $("#f-pkg");
        if (sel) { for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value === name) sel.selectedIndex = i; }
        var target = $("#booking");
        if (target) target.scrollIntoView({ behavior: "smooth" });
        var nameField = $("#f-name"); if (nameField) setTimeout(function () { nameField.focus(); }, 600);
      });
    });
    refilter();
  }

  /* ---------- BOOKING FORM -> Web3Forms (email only; NEVER to WhatsApp) ---------- */
  function wireForm(form, subject, formType) {
    if (!form) return;
    var statusEl = form.querySelector(".form-status");
    var btn = form.querySelector('button[type="submit"]');
    var btnLabel = btn ? btn.querySelector("[data-i18n]") : null;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (statusEl) statusEl.className = "form-status";
      var fd = new FormData(form);
      fd.append("access_key", W3F_KEY);
      fd.append("subject", subject + " — Bilalive Music");
      fd.append("from_name", "Bilalive Music Website");
      fd.append("form_type", formType || "general"); // inbox filtering: booking / contact / newsletter
      // honeypot
      if (fd.get("botcheck")) return;
      var origText = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = tKey("bk.sending", "Sending..."); }
      fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { Accept: "application/json" }, body: fd
      }).then(function (r) { return r.json(); }).then(function (data) {
        if (data && data.success) {
          form.reset();
          if (statusEl) { statusEl.className = "form-status ok"; statusEl.textContent = tKey("bk.ok", "Thank you. Your request has been sent."); }
        } else { throw new Error(data && data.message || "fail"); }
      }).catch(function () {
        if (statusEl) { statusEl.className = "form-status err"; statusEl.textContent = tKey("bk.err", "Something went wrong. Please email us at " + INFO_EMAIL + "."); }
      }).then(function () {
        if (btn) { btn.disabled = false; btn.textContent = origText || "Send"; }
      });
    });
  }
  function tKey(key, fallback) {
    // translate in the current language via the i18n engine
    if (window.BLM_I18N && window.BLM_I18N.t) return window.BLM_I18N.t(key, fallback);
    var el = document.querySelector('[data-i18n="' + key + '"]');
    return el ? el.textContent : fallback;
  }
  wireForm($("#bookingForm"), "Yeni Rezervasyon Talebi", "booking");
  wireForm($("#contactForm"), "Yeni İletişim Mesajı", "contact");

  /* ---------- NEWSLETTER -> Web3Forms (captured now; connect Brevo later) ---------- */
  var nlForm = $("#newsletterForm");
  if (nlForm) {
    var nlStatus = $(".nl-status", nlForm);
    nlForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(nlForm);
      fd.append("access_key", W3F_KEY);
      fd.append("subject", "Yeni Bülten Kaydı — Bilalive Music");
      fd.append("from_name", "Bilalive Music Newsletter");
      fd.append("form_type", "newsletter");
      fetch("https://api.web3forms.com/submit", { method: "POST", headers: { Accept: "application/json" }, body: fd })
        .then(function (r) { return r.json(); }).then(function (d) {
          nlForm.reset();
          if (nlStatus) { nlStatus.style.display = "block"; nlStatus.textContent = tKey("nl.ok", "Thanks — you're on the list."); }
        }).catch(function () {
          if (nlStatus) { nlStatus.style.display = "block"; nlStatus.textContent = "—"; }
        });
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
