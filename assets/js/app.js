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
  var WA_ICON = '<svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.2-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.4-5-3.8-10.5-6.6z"/></svg>';
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

  /* ---------- INSTAGRAM REELS MARQUEE (click-to-load, GDPR-friendly) ---------- */
  var reelsWrap = $("#reelsWrap"), reelsBtn = $("#reelsLoad");
  if (reelsWrap && reelsBtn) {
    var reelsLoaded = false;
    function loadReels() {
      if (reelsLoaded) return; reelsLoaded = true;
      var reels = [];
      try { reels = JSON.parse(($("#reelsData") || {}).textContent || "[]"); } catch (e) {}
      if (!reels.length) return;
      var marquee = document.createElement("div"); marquee.className = "reels-marquee";
      var track = document.createElement("div"); track.className = "reels-track";
      function esc(s) { var d = document.createElement("span"); d.textContent = s || ""; return d.innerHTML; }
      // two copies for a seamless loop
      [].concat(reels, reels).forEach(function (r) {
        var card = document.createElement("div"); card.className = "reel-card";
        var ifr = document.createElement("iframe");
        ifr.src = "https://www.instagram.com/reel/" + r.c + "/embed/";
        ifr.setAttribute("loading", "lazy");
        ifr.setAttribute("scrolling", "no");
        ifr.setAttribute("allowtransparency", "true");
        ifr.setAttribute("allow", "encrypted-media");
        ifr.setAttribute("title", r.t ? (r.t + (r.a ? " — " + r.a : "")) : "Instagram reel");
        card.appendChild(ifr);
        if (r.t) {
          var cap = document.createElement("div"); cap.className = "reel-cap";
          cap.innerHTML = '<span class="song"><svg class="icon"><use href="#i-note"/></svg>' + esc(r.t) + '</span>' +
                          (r.a ? '<span class="artist">' + esc(r.a) + '</span>' : '');
          card.appendChild(cap);
        }
        track.appendChild(card);
      });
      marquee.appendChild(track);
      reelsWrap.innerHTML = ""; reelsWrap.appendChild(marquee);
      // auto-scroll right-to-left, pause on hover/touch
      var paused = false;
      marquee.addEventListener("mouseenter", function () { paused = true; });
      marquee.addEventListener("mouseleave", function () { paused = false; });
      marquee.addEventListener("touchstart", function () { paused = true; }, { passive: true });
      marquee.addEventListener("touchend", function () { setTimeout(function () { paused = false; }, 1200); });
      function step() {
        if (!paused) {
          marquee.scrollLeft += 0.7;
          var half = marquee.scrollWidth / 2;
          if (marquee.scrollLeft >= half) marquee.scrollLeft -= half;
        }
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    function reelsMarketingOK() { try { var c = JSON.parse(localStorage.getItem("blm_consent")); return !!(c && c.marketing); } catch (e) { return false; } }
    reelsBtn.addEventListener("click", loadReels);
    window.__blmLoadReels = loadReels;
    // auto-show the reels for visitors who accepted marketing cookies; the button stays only for those who declined
    if (reelsMarketingOK()) loadReels();
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
    if (c && c.marketing && window.__blmLoadReels) window.__blmLoadReels(); // reveal reels once marketing is accepted
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
