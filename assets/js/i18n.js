/* ===================================================================
   Bilalive Music — i18n engine
   Turkish is the authoritative in-HTML language (no 'tr' dict needed).
   EN is complete; DE/NL/FR cover the visible shell + hero + titles +
   buttons + forms + cookie. Missing keys fall back: lang -> en -> TR(html).
   Language auto-selected from browser, overridable, stored in localStorage.
   =================================================================== */
(function () {
  "use strict";

  var SUPPORTED = ["tr", "en", "de", "nl", "fr"];
  var NAMES = { tr: "Türkçe", en: "English", de: "Deutsch", nl: "Nederlands", fr: "Français" };
  var CODES = { tr: "TR", en: "EN", de: "DE", nl: "NL", fr: "FR" };

  var DICT = {
    en: {
      "nav.about": "About", "nav.performances": "Performances", "nav.packages": "Packages",
      "nav.services": "Services", "nav.contact": "Contact", "nav.book": "Book Now",
      "hero.eyebrow": "Live Performance · Europe",
      "hero.h1a": "One Voice.", "hero.h1b": "One Guitar.", "hero.h1c": "One Unforgettable Experience.",
      "hero.sub": "A voice from Turkey, now on stage across Europe — powerful vocals and live guitar that turn every event into a moment people never forget.",
      "hero.t1": "Weddings", "hero.t2": "Festivals", "hero.t3": "Corporate", "hero.t4": "Private Events",
      "hero.book": "Book Your Event", "hero.watch": "Watch Performances",
      "mq.book": "Book Your Event",
      "about.eyebrow": "About", "about.title1": "15 years on stage.", "about.title2": "A voice from Turkey.",
      "about.body": "For 15 years Bilal Yılmaz performed live across many cities of Turkey. Now living in Europe, he brings that same voice to the Turkish community here — live vocals and live guitar, a one-man performance with the feeling of home.",
      "about.s1": "Years on stage", "about.s2": "Live vocals & guitar", "about.s3": "Across Europe",
      "about.quote": "The goal was never just music. It's the moment people never forget.",
      "about.more": "Read the full story",
      "vid.eyebrow": "Performances", "vid.title1": "Watch it", "vid.title2": "live.",
      "vid.sub": "Real performances — voice and guitar, live. More on the channel.",
      "vid.more": "See more on YouTube",
      "pk.eyebrow": "Packages", "pk.title1": "Live music for", "pk.title2": "every budget.",
      "pk.sub": "Filter by event type and budget. Every package is a real live performance — pick a starting point, we tailor the rest.",
      "pk.f_all": "All events", "pk.f_wedding": "Wedding", "pk.f_engagement": "Engagement / Henna",
      "pk.f_restaurant": "Restaurant / Venue", "pk.f_corporate": "Corporate", "pk.f_fair": "Fair / Festival", "pk.f_private": "Private",
      "pk.b_all": "Any budget", "pk.from": "from", "pk.duration": "Duration", "pk.request": "Request this package",
      "pk.empty": "No package matches this filter. Try another combination or request a custom quote.",
      "pk.custom": "Need something custom? Request a tailored quote →",
      "srv.eyebrow": "Services", "srv.title1": "Every event deserves", "srv.title2": "real live music.",
      "srv.w_h": "Weddings", "srv.w_p": "Modern wedding performances — from the first dance to the last song of the night.",
      "srv.c_h": "Corporate", "srv.c_p": "Company events, galas and receptions with a premium, professional stage presence.",
      "srv.f_h": "Fairs & Festivals", "srv.f_p": "Fairs, festivals and public events — big-stage energy and full stage production.",
      "srv.p_h": "Private & Venues", "srv.p_p": "Restaurants, birthdays and private invitations with an unforgettable atmosphere.",
      "tst.eyebrow": "Testimonials", "tst.title1": "What people", "tst.title2": "feel.",
      "tst.sub": "Moments from events across Europe.",
      "tst.note": "Sample testimonials — to be replaced with real client reviews before launch.",
      "tst.q1": "He didn't just play music — he read the room and carried the whole night. Our guests still talk about it.",
      "tst.a1": "Wedding · Amsterdam",
      "tst.q2": "One man, but the stage felt full. The Turkish songs brought everyone to their feet.",
      "tst.a2": "Engagement · Cologne",
      "tst.q3": "Professional from first contact to the last song. Exactly the atmosphere we hoped for.",
      "tst.a3": "Corporate evening · Rotterdam",
      "bk.eyebrow": "Booking", "bk.title1": "Let's make your event", "bk.title2": "unforgettable.",
      "bk.lead": "Tell us about your event — date, city and what you're celebrating. Every booking starts with this form; you'll get a personal reply by email.",
      "bk.email": "Email us", "bk.whats": "WhatsApp — quick questions", "bk.loc": "Based in Europe · Traveling everywhere",
      "bk.f_name": "Name", "bk.f_name_ph": "Your name", "bk.f_email": "Email", "bk.f_phone": "Phone", "bk.f_phone_ph": "+31 6 ...",
      "bk.f_date": "Event date", "bk.f_city": "City", "bk.f_city_ph": "Amsterdam, Berlin ...",
      "bk.f_type": "Event type", "bk.f_pkg": "Package (optional)", "bk.f_pkg_none": "Not sure yet",
      "bk.f_msg": "Message", "bk.f_msg_ph": "Tell us about your event...",
      "bk.submit": "Send Booking Request", "bk.sending": "Sending...",
      "bk.note": "Your details are sent securely by email — never shared without your consent.",
      "bk.ok": "Thank you. Your request has been sent — we'll reply by email soon.",
      "bk.err": "Something went wrong. Please email us directly at info@bilalivemusic.com.",
      "opt.wedding": "Wedding", "opt.engagement": "Engagement / Henna", "opt.corporate": "Corporate Event",
      "opt.fair": "Fair / Festival", "opt.restaurant": "Restaurant / Venue", "opt.private": "Private Celebration", "opt.other": "Other",
      "nl.title": "Stay in the loop", "nl.sub": "New performances, dates and sessions — no spam.",
      "nl.ph": "Your email", "nl.btn": "Subscribe", "nl.ok": "Thanks — you're on the list.",
      "ft.tag": "Premium live music across Europe. A voice from Turkey.",
      "ft.explore": "Explore", "ft.legal": "Legal", "ft.follow": "Follow",
      "ft.privacy": "Privacy Policy", "ft.cookies": "Cookie Policy", "ft.terms": "Terms",
      "ft.rights": "All rights reserved.", "ft.brand": "A WeIntensify B.V. brand.",
      "ck.title": "We value your privacy", "ck.body": "We use cookies for core functionality and — only with your consent — for statistics and marketing. See our",
      "ck.accept": "Accept all", "ck.reject": "Reject non-essential", "ck.customize": "Customize", "ck.save": "Save choices",
      "ck.c_func": "Functional", "ck.c_func_d": "Required for the site to work (language, security). Always on.",
      "ck.c_stat": "Statistics", "ck.c_stat_d": "Anonymous usage measurement to improve the site.",
      "ck.c_mkt": "Marketing", "ck.c_mkt_d": "Embedded media and campaign measurement.",
      "pg.home": "Home"
    },
    de: {
      "nav.about": "Über", "nav.performances": "Auftritte", "nav.packages": "Pakete",
      "nav.services": "Leistungen", "nav.contact": "Kontakt", "nav.book": "Buchen",
      "hero.eyebrow": "Live-Auftritt · Europa",
      "hero.h1a": "Eine Stimme.", "hero.h1b": "Eine Gitarre.", "hero.h1c": "Ein unvergessliches Erlebnis.",
      "hero.sub": "Eine Stimme aus der Türkei, jetzt auf Europas Bühnen — kraftvoller Gesang und Live-Gitarre, die jedes Event zu einem unvergesslichen Moment machen.",
      "hero.t1": "Hochzeiten", "hero.t2": "Festivals", "hero.t3": "Firmenevents", "hero.t4": "Private Feiern",
      "hero.book": "Event buchen", "hero.watch": "Auftritte ansehen",
      "about.eyebrow": "Über", "about.title1": "15 Jahre auf der Bühne.", "about.title2": "Eine Stimme aus der Türkei.",
      "about.s1": "Jahre auf der Bühne", "about.s2": "Live Gesang & Gitarre", "about.s3": "In ganz Europa",
      "about.more": "Die ganze Geschichte",
      "vid.eyebrow": "Auftritte", "vid.title1": "Erleb es", "vid.title2": "live.", "vid.more": "Mehr auf YouTube",
      "pk.eyebrow": "Pakete", "pk.title1": "Live-Musik für", "pk.title2": "jedes Budget.",
      "pk.f_all": "Alle Events", "pk.f_wedding": "Hochzeit", "pk.f_engagement": "Verlobung / Henna",
      "pk.f_restaurant": "Restaurant / Location", "pk.f_corporate": "Firmenevent", "pk.f_fair": "Messe / Festival", "pk.f_private": "Privat",
      "pk.b_all": "Jedes Budget", "pk.from": "ab", "pk.duration": "Dauer", "pk.request": "Dieses Paket anfragen",
      "pk.custom": "Etwas Individuelles? Angebot anfragen →",
      "srv.eyebrow": "Leistungen", "srv.title1": "Jedes Event verdient", "srv.title2": "echte Live-Musik.",
      "srv.w_h": "Hochzeiten", "srv.c_h": "Firmenevents", "srv.f_h": "Messen & Festivals", "srv.p_h": "Privat & Locations",
      "tst.eyebrow": "Referenzen", "tst.title1": "Was Menschen", "tst.title2": "fühlen.",
      "bk.eyebrow": "Buchung", "bk.title1": "Machen wir Ihr Event", "bk.title2": "unvergesslich.",
      "bk.email": "E-Mail", "bk.whats": "WhatsApp — kurze Fragen", "bk.loc": "In Europa · Überall unterwegs",
      "bk.f_name": "Name", "bk.f_name_ph": "Ihr Name", "bk.f_email": "E-Mail", "bk.f_phone": "Telefon",
      "bk.f_date": "Event-Datum", "bk.f_city": "Stadt", "bk.f_type": "Event-Art", "bk.f_pkg": "Paket (optional)", "bk.f_pkg_none": "Noch unsicher",
      "bk.f_msg": "Nachricht", "bk.f_msg_ph": "Erzählen Sie von Ihrem Event...",
      "bk.submit": "Anfrage senden", "bk.sending": "Senden...",
      "bk.ok": "Danke. Ihre Anfrage wurde gesendet — wir antworten bald per E-Mail.",
      "bk.err": "Etwas ist schiefgelaufen. Bitte schreiben Sie an info@bilalivemusic.com.",
      "opt.wedding": "Hochzeit", "opt.engagement": "Verlobung / Henna", "opt.corporate": "Firmenevent",
      "opt.fair": "Messe / Festival", "opt.restaurant": "Restaurant / Location", "opt.private": "Private Feier", "opt.other": "Sonstiges",
      "nl.title": "Bleiben Sie dran", "nl.sub": "Neue Auftritte und Termine — kein Spam.", "nl.ph": "Ihre E-Mail", "nl.btn": "Abonnieren",
      "ft.tag": "Premium Live-Musik in ganz Europa. Eine Stimme aus der Türkei.",
      "ft.explore": "Entdecken", "ft.legal": "Rechtliches", "ft.follow": "Folgen",
      "ft.privacy": "Datenschutz", "ft.cookies": "Cookie-Richtlinie", "ft.terms": "AGB",
      "ft.rights": "Alle Rechte vorbehalten.", "ft.brand": "Eine Marke der WeIntensify B.V.",
      "ck.title": "Ihre Privatsphäre ist uns wichtig", "ck.body": "Wir verwenden Cookies für Kernfunktionen und — nur mit Ihrer Zustimmung — für Statistik und Marketing. Siehe unsere",
      "ck.accept": "Alle akzeptieren", "ck.reject": "Nicht notwendige ablehnen", "ck.customize": "Anpassen", "ck.save": "Auswahl speichern",
      "ck.c_func": "Funktional", "ck.c_stat": "Statistik", "ck.c_mkt": "Marketing", "pg.home": "Start"
    },
    nl: {
      "nav.about": "Over", "nav.performances": "Optredens", "nav.packages": "Pakketten",
      "nav.services": "Diensten", "nav.contact": "Contact", "nav.book": "Boek nu",
      "hero.eyebrow": "Live optreden · Europa",
      "hero.h1a": "Eén stem.", "hero.h1b": "Eén gitaar.", "hero.h1c": "Eén onvergetelijke ervaring.",
      "hero.sub": "Een stem uit Turkije, nu op de podia van Europa — krachtige zang en live gitaar die elk event onvergetelijk maken.",
      "hero.t1": "Bruiloften", "hero.t2": "Festivals", "hero.t3": "Zakelijk", "hero.t4": "Privéfeesten",
      "hero.book": "Boek je event", "hero.watch": "Bekijk optredens",
      "about.eyebrow": "Over", "about.title1": "15 jaar op het podium.", "about.title2": "Een stem uit Turkije.",
      "about.s1": "Jaar op het podium", "about.s2": "Live zang & gitaar", "about.s3": "Door heel Europa",
      "about.more": "Lees het hele verhaal",
      "vid.eyebrow": "Optredens", "vid.title1": "Beleef het", "vid.title2": "live.", "vid.more": "Meer op YouTube",
      "pk.eyebrow": "Pakketten", "pk.title1": "Live muziek voor", "pk.title2": "elk budget.",
      "pk.f_all": "Alle events", "pk.f_wedding": "Bruiloft", "pk.f_engagement": "Verloving / Henna",
      "pk.f_restaurant": "Restaurant / Locatie", "pk.f_corporate": "Zakelijk", "pk.f_fair": "Beurs / Festival", "pk.f_private": "Privé",
      "pk.b_all": "Elk budget", "pk.from": "vanaf", "pk.duration": "Duur", "pk.request": "Vraag dit pakket aan",
      "pk.custom": "Iets op maat? Vraag een offerte aan →",
      "srv.eyebrow": "Diensten", "srv.title1": "Elk event verdient", "srv.title2": "echte live muziek.",
      "srv.w_h": "Bruiloften", "srv.c_h": "Zakelijk", "srv.f_h": "Beurzen & Festivals", "srv.p_h": "Privé & Locaties",
      "tst.eyebrow": "Referenties", "tst.title1": "Wat mensen", "tst.title2": "voelen.",
      "bk.eyebrow": "Boeken", "bk.title1": "Maak je event", "bk.title2": "onvergetelijk.",
      "bk.email": "E-mail ons", "bk.whats": "WhatsApp — korte vragen", "bk.loc": "Gevestigd in Europa · Overal onderweg",
      "bk.f_name": "Naam", "bk.f_name_ph": "Je naam", "bk.f_email": "E-mail", "bk.f_phone": "Telefoon",
      "bk.f_date": "Datum event", "bk.f_city": "Stad", "bk.f_type": "Soort event", "bk.f_pkg": "Pakket (optioneel)", "bk.f_pkg_none": "Nog niet zeker",
      "bk.f_msg": "Bericht", "bk.f_msg_ph": "Vertel over je event...",
      "bk.submit": "Verstuur aanvraag", "bk.sending": "Versturen...",
      "bk.ok": "Bedankt. Je aanvraag is verstuurd — we reageren snel per e-mail.",
      "bk.err": "Er ging iets mis. Mail ons direct op info@bilalivemusic.com.",
      "opt.wedding": "Bruiloft", "opt.engagement": "Verloving / Henna", "opt.corporate": "Zakelijk event",
      "opt.fair": "Beurs / Festival", "opt.restaurant": "Restaurant / Locatie", "opt.private": "Privéfeest", "opt.other": "Anders",
      "nl.title": "Blijf op de hoogte", "nl.sub": "Nieuwe optredens en data — geen spam.", "nl.ph": "Je e-mail", "nl.btn": "Aanmelden",
      "ft.tag": "Premium live muziek door heel Europa. Een stem uit Turkije.",
      "ft.explore": "Ontdek", "ft.legal": "Juridisch", "ft.follow": "Volg",
      "ft.privacy": "Privacybeleid", "ft.cookies": "Cookiebeleid", "ft.terms": "Voorwaarden",
      "ft.rights": "Alle rechten voorbehouden.", "ft.brand": "Een merk van WeIntensify B.V.",
      "ck.title": "We waarderen je privacy", "ck.body": "We gebruiken cookies voor kernfunctionaliteit en — alleen met jouw toestemming — voor statistiek en marketing. Zie ons",
      "ck.accept": "Alles accepteren", "ck.reject": "Niet-essentiële weigeren", "ck.customize": "Aanpassen", "ck.save": "Keuzes opslaan",
      "ck.c_func": "Functioneel", "ck.c_stat": "Statistiek", "ck.c_mkt": "Marketing", "pg.home": "Home"
    },
    fr: {
      "nav.about": "À propos", "nav.performances": "Performances", "nav.packages": "Forfaits",
      "nav.services": "Services", "nav.contact": "Contact", "nav.book": "Réserver",
      "hero.eyebrow": "Performance live · Europe",
      "hero.h1a": "Une voix.", "hero.h1b": "Une guitare.", "hero.h1c": "Une expérience inoubliable.",
      "hero.sub": "Une voix venue de Turquie, désormais sur les scènes d'Europe — un chant puissant et une guitare live qui rendent chaque événement inoubliable.",
      "hero.t1": "Mariages", "hero.t2": "Festivals", "hero.t3": "Entreprises", "hero.t4": "Événements privés",
      "hero.book": "Réserver", "hero.watch": "Voir les performances",
      "about.eyebrow": "À propos", "about.title1": "15 ans sur scène.", "about.title2": "Une voix venue de Turquie.",
      "about.s1": "Ans sur scène", "about.s2": "Chant & guitare live", "about.s3": "Partout en Europe",
      "about.more": "Lire toute l'histoire",
      "vid.eyebrow": "Performances", "vid.title1": "À vivre", "vid.title2": "en live.", "vid.more": "Plus sur YouTube",
      "pk.eyebrow": "Forfaits", "pk.title1": "De la musique live pour", "pk.title2": "chaque budget.",
      "pk.f_all": "Tous les événements", "pk.f_wedding": "Mariage", "pk.f_engagement": "Fiançailles / Henné",
      "pk.f_restaurant": "Restaurant / Lieu", "pk.f_corporate": "Entreprise", "pk.f_fair": "Salon / Festival", "pk.f_private": "Privé",
      "pk.b_all": "Tout budget", "pk.from": "à partir de", "pk.duration": "Durée", "pk.request": "Demander ce forfait",
      "pk.custom": "Besoin de sur-mesure ? Demandez un devis →",
      "srv.eyebrow": "Services", "srv.title1": "Chaque événement mérite", "srv.title2": "de la vraie musique live.",
      "srv.w_h": "Mariages", "srv.c_h": "Entreprises", "srv.f_h": "Salons & Festivals", "srv.p_h": "Privé & Lieux",
      "tst.eyebrow": "Témoignages", "tst.title1": "Ce que les gens", "tst.title2": "ressentent.",
      "bk.eyebrow": "Réservation", "bk.title1": "Rendons votre événement", "bk.title2": "inoubliable.",
      "bk.email": "Écrivez-nous", "bk.whats": "WhatsApp — questions rapides", "bk.loc": "Basé en Europe · Déplacements partout",
      "bk.f_name": "Nom", "bk.f_name_ph": "Votre nom", "bk.f_email": "E-mail", "bk.f_phone": "Téléphone",
      "bk.f_date": "Date de l'événement", "bk.f_city": "Ville", "bk.f_type": "Type d'événement", "bk.f_pkg": "Forfait (optionnel)", "bk.f_pkg_none": "Pas encore sûr",
      "bk.f_msg": "Message", "bk.f_msg_ph": "Parlez-nous de votre événement...",
      "bk.submit": "Envoyer la demande", "bk.sending": "Envoi...",
      "bk.ok": "Merci. Votre demande a été envoyée — nous répondrons bientôt par e-mail.",
      "bk.err": "Une erreur est survenue. Écrivez-nous à info@bilalivemusic.com.",
      "opt.wedding": "Mariage", "opt.engagement": "Fiançailles / Henné", "opt.corporate": "Événement d'entreprise",
      "opt.fair": "Salon / Festival", "opt.restaurant": "Restaurant / Lieu", "opt.private": "Célébration privée", "opt.other": "Autre",
      "nl.title": "Restez informé", "nl.sub": "Nouvelles performances et dates — pas de spam.", "nl.ph": "Votre e-mail", "nl.btn": "S'abonner",
      "ft.tag": "Musique live premium partout en Europe. Une voix venue de Turquie.",
      "ft.explore": "Explorer", "ft.legal": "Légal", "ft.follow": "Suivre",
      "ft.privacy": "Confidentialité", "ft.cookies": "Politique cookies", "ft.terms": "Conditions",
      "ft.rights": "Tous droits réservés.", "ft.brand": "Une marque WeIntensify B.V.",
      "ck.title": "Nous respectons votre vie privée", "ck.body": "Nous utilisons des cookies pour les fonctions essentielles et — uniquement avec votre consentement — pour les statistiques et le marketing. Voir notre",
      "ck.accept": "Tout accepter", "ck.reject": "Refuser non essentiels", "ck.customize": "Personnaliser", "ck.save": "Enregistrer",
      "ck.c_func": "Fonctionnel", "ck.c_stat": "Statistiques", "ck.c_mkt": "Marketing", "pg.home": "Accueil"
    }
  };

  var ORIG = {};   // key -> original TR html from the page
  var ORIG_ATTR = {}; // "attr|key" -> original attr value

  function detect() {
    var stored = null;
    try { stored = localStorage.getItem("blm_lang"); } catch (e) {}
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    var langs = navigator.languages || [navigator.language || "tr"];
    for (var i = 0; i < langs.length; i++) {
      var code = (langs[i] || "").slice(0, 2).toLowerCase();
      if (SUPPORTED.indexOf(code) !== -1) return code;
    }
    return "tr";
  }

  function tr(lang, key) {
    if (lang === "tr") return ORIG[key];
    var d = DICT[lang];
    if (d && d[key] != null) return d[key];
    if (DICT.en[key] != null) return DICT.en[key];
    return ORIG[key]; // ultimate fallback: Turkish
  }

  function apply(lang) {
    document.documentElement.setAttribute("lang", lang);
    // text content — textContent only; every data-i18n element is plain text
    // (titles that need styled fragments are split into separate keyed elements)
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i], key = el.getAttribute("data-i18n");
      if (ORIG[key] == null) ORIG[key] = el.textContent;
      var val = tr(lang, key);
      if (val != null) el.textContent = val;
    }
    // attributes: data-i18n-attr="placeholder:key;aria-label:key2"
    var aels = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < aels.length; j++) {
      var ae = aels[j];
      var pairs = ae.getAttribute("data-i18n-attr").split(";");
      for (var p = 0; p < pairs.length; p++) {
        var parts = pairs[p].split(":");
        if (parts.length < 2) continue;
        var attr = parts[0].trim(), k = parts[1].trim(), ok = attr + "|" + k;
        if (ORIG_ATTR[ok] == null) ORIG_ATTR[ok] = ae.getAttribute(attr) || "";
        var v = (lang === "tr") ? ORIG_ATTR[ok] : (tr(lang, k) != null ? tr(lang, k) : ORIG_ATTR[ok]);
        if (v != null) ae.setAttribute(attr, v);
      }
    }
    // reflect in switcher UI
    document.querySelectorAll("[data-lang-code]").forEach(function (n) {
      n.textContent = CODES[lang];
    });
    document.querySelectorAll(".lang-menu button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-set-lang") === lang);
    });
    try { localStorage.setItem("blm_lang", lang); } catch (e) {}
    window.dispatchEvent(new CustomEvent("blm:lang", { detail: { lang: lang } }));
  }

  window.BLM_I18N = {
    supported: SUPPORTED, names: NAMES, codes: CODES,
    current: function () { return document.documentElement.getAttribute("lang") || "tr"; },
    set: apply, detect: detect
  };

  // apply as early as possible
  function boot() { apply(detect()); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
