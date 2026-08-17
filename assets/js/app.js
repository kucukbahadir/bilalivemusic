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
  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("open");
    if (burger) burger.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (burger && mobileMenu) {
    // inject a language chooser into the mobile menu (header stays logo + burger only on mobile)
    if (window.BLM_I18N && !$(".mm-lang", mobileMenu)) {
      var mm = document.createElement("div");
      mm.className = "mm-lang";
      var cur = window.BLM_I18N.current();
      window.BLM_I18N.supported.forEach(function (code) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("data-set-lang", code);
        b.textContent = window.BLM_I18N.codes[code];
        if (code === cur) b.classList.add("active");
        mm.appendChild(b);
      });
      mobileMenu.appendChild(mm);
    }
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", mobileMenu).forEach(function (a) {
      a.addEventListener("click", closeMobileMenu);
    });
  }

  /* ---------- FLOATING WHATSAPP CHAT WIDGET ---------- */
  var WA_NUMBER = "4915510989673";
  function waT(k, fb) { return (window.BLM_I18N && window.BLM_I18N.t) ? window.BLM_I18N.t(k, fb) : fb; }
  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.8c2.17 0 4.2.85 5.73 2.38a8.06 8.06 0 0 1 2.38 5.73c0 4.54-3.7 8.23-8.24 8.23-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.12.82.83-3.04-.2-.31a8.13 8.13 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.23-8.24zm5.8 11.21c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/></svg>';
  var waWrap = document.createElement("div");
  waWrap.className = "wa-widget";
  waWrap.innerHTML =
    '<div class="wa-panel" role="dialog" aria-label="WhatsApp">' +
      '<div class="wa-head">' +
        '<span class="wa-ava"><img src="assets/img/bilal-avatar.webp?v=17" alt="Bilal"></span>' +
        '<div class="wa-id"><b data-wa="name">Bilalive Music</b><small data-wa="online">Çevrimiçi</small></div>' +
        '<button class="wa-close" type="button" aria-label="Kapat">&times;</button>' +
      '</div>' +
      '<div class="wa-msgs"><div class="wa-bubble" data-wa="greet">Merhaba! Size nasıl yardımcı olabiliriz?</div></div>' +
      '<a class="wa-cta" target="_blank" rel="noopener">' + WA_ICON + '<span data-wa="cta">Sohbeti başlat</span></a>' +
    '</div>' +
    '<button class="wa-fab" type="button" aria-label="WhatsApp"><span class="wa-ic">' + WA_ICON + '</span><span class="wa-x" aria-hidden="true">&times;</span></button>';
  document.body.appendChild(waWrap);
  window.BLM_FAB = waWrap;

  var waFab = $(".wa-fab", waWrap), waCta = $(".wa-cta", waWrap), waCloseBtn = $(".wa-close", waWrap);
  function waTranslate() {
    $$("[data-wa]", waWrap).forEach(function (el) {
      el.textContent = waT("wa." + el.getAttribute("data-wa"), el.textContent);
    });
    waCta.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(waT("wa.msg", "Merhaba!"));
  }
  waTranslate();
  window.addEventListener("blm:lang", waTranslate);
  function waOpen(v) {
    waWrap.classList.toggle("open", v);
    if (v) { try { sessionStorage.setItem("blm_wa_seen", "1"); } catch (e) {} }
  }
  waFab.addEventListener("click", function () { waOpen(!waWrap.classList.contains("open")); });
  waCloseBtn.addEventListener("click", function () { waOpen(false); });
  // auto-open once per session to feel like an incoming chat
  var waSeen; try { waSeen = sessionStorage.getItem("blm_wa_seen"); } catch (e) {}
  if (!waSeen) setTimeout(function () { if (!waWrap.classList.contains("hidden")) waOpen(true); }, 3000);

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
  // delegation so dynamically-injected mobile-menu language buttons work too
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-set-lang]") : null;
    if (!b) return;
    if (window.BLM_I18N) window.BLM_I18N.set(b.getAttribute("data-set-lang"));
    $$(".lang.open").forEach(function (w) { w.classList.remove("open"); });
    closeMobileMenu();
  });

  /* ---------- COOKIE CONSENT ---------- */
  var CONSENT_KEY = "blm_consent";
  function getConsent() { try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) { return null; } }
  function saveConsent(c) { try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch (e) {} }

  var banner = $("#cookie");
  function showBanner() { if (banner) setTimeout(function () { banner.classList.add("show"); if (window.BLM_FAB) window.BLM_FAB.classList.add("hidden"); }, 60); }
  function hideBanner() { if (banner) banner.classList.remove("show"); if (window.BLM_FAB) window.BLM_FAB.classList.remove("hidden"); }

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
