/* =====================================================================
   app.js — language toggle (ES default / EN), config injection,
   mobile menu, scroll reveal, and the donation flow.
   Spanish is the static content in the HTML; this file overlays English.
   ===================================================================== */
(function () {
  "use strict";
  var CFG = window.FYV_CONFIG || {};

  /* ---------- English overlay dictionary ----------
     Keys match data-i18n in the HTML. Values may contain inline HTML
     (e.g. empty <span class="ein-num"></span> placeholders that get
     filled afterwards by fillConfig). */
  var EN = {
    skip:"Skip to content",
    "brand.sub":"Jewish Community of Venezuela",

    "alert.tag":"Emergency:",
    "alert.text":"June 24, 2026 earthquake in Venezuela — more than 300 families in our community lost their homes.",
    "alert.cta":"See emergency relief →",

    "nav.home":"Home","nav.quake":"2026 Earthquake","nav.donate":"Donate","nav.contact":"Contact",
    "nav.cta":"Donate","nav.ctaQuake":"Help now",

    "hero.eyebrow":"Together, hand in hand",
    "hero.h1":"When there is need,<br><span class=\"accent\">we don't let go</span> of our community's hand.",
    "hero.lede":"Friends of Yajad-Venezuela unites those of us who were part of the Jewish Community of Venezuela. Your gift becomes food, housing, medicine, and emergency relief for the families who need it most.",
    "hero.cta1":"Make a gift","hero.cta2":"Earthquake relief",
    "hero.trust":"501(c)(3) organization — tax-deductible donations. EIN <span class=\"ein-num\"></span>",

    "path.general.t":"General Fund",
    "path.general.d":"Ongoing support for the Jewish Community of Venezuela: food, health, elder care, and education.",
    "path.quake.t":"Earthquake relief",
    "path.quake.d":"Housing and food for the 300+ families who lost their homes on June 24, 2026.",

    "help.eyebrow":"Where your gift goes",
    "help.h2":"Yajad unites the community's social-assistance network",
    "help.p":"Funds are coordinated and distributed in Venezuela by Yajad — the Jewish Community's Social Assistance Network — and used exclusively to cover basic needs.",
    "help.food.t":"Food","help.food.d":"Staple food for families and community kitchens.",
    "help.home.t":"Housing","help.home.d":"Help with rent, repairs, and shelter for those who lost everything.",
    "help.med.t":"Medicine & health","help.med.d":"Medication, hospital care, and urgent treatment.",
    "help.elder.t":"Elder care","help.elder.d":"Companionship and care for our older adults.",
    "help.edu.t":"Education","help.edu.d":"So no child is left out of Jewish school.",
    "help.emerg.t":"Emergencies","help.emerg.d":"Rapid response to crises like the 2026 earthquake.",

    "join.eyebrow":"Leave no one behind",
    "join.h2":"$18 a month makes you part of it",
    "join.p":"You who were a member of the Jewish Community of Venezuela and now live abroad: it's time to do our part. A steady monthly gift makes a real difference in many families' lives.",
    "join.quote":"\u201cDo not separate yourself from the community\u201d — Hillel, Pirkei Avot 2:4",
    "join.cta":"Join now",
    "join.s1":"Minimum monthly gift to be part of it",
    "join.s2":"Sustains one displaced family for a month",
    "join.s3":"Community families left homeless after the earthquake",
    "join.s4":"Of funds go to social assistance in Venezuela",

    "video.eyebrow":"The situation today",
    "video.h2":"See what our community is living through",

    "tax.eyebrow":"Trust & transparency",
    "tax.h2":"Your donation is tax-deductible",
    "tax.p":"Friends of Yajad-Venezuela operates under <strong class=\"org-legal\"></strong>, a 501(c)(3) nonprofit recognized by the IRS. Contributions are tax-deductible to the extent allowed by law, and you'll receive a receipt for your records.",
    "tax.badge.t":"501(c)(3) status",
    "tax.badge.org":"Legal entity:","tax.badge.ein":"EIN:","tax.badge.since":"Exempt since:",

    "contact.eyebrow":"We're here to help",
    "contact.h2":"Contact us",
    "contact.p":"Want to join, give in kind, or coordinate a larger contribution? Email us or call any of our coordinators.",

    "footer.tax":"A program of <span class=\"org-legal\"></span> — a 501(c)(3) organization. EIN <span class=\"ein-num\"></span>. Donations are tax-deductible to the extent allowed by law. <span class=\"org-addr\"></span>",
    "footer.nav":"Navigation","footer.connect":"Connect",
    "footer.tagline":"Yajad — uniting the social assistance of the Jewish Community of Venezuela.",

    /* Earthquake page */
    "q.date":"June 24, 2026 · Magnitude 7.2 and 7.5",
    "q.h1":"More than 300 families in our community<br><span class=\"accent\">lost their homes.</span>",
    "q.lede":"Two earthquakes struck Venezuela on June 24, 2026, with the heaviest damage in La Guaira and Caracas. Many Jewish Community families were left without shelter or food. Your help today decides how they sleep tonight.",
    "q.cta1":"Donate for housing & food","q.cta2":"See the situation",
    "q.trust":"501(c)(3) — tax-deductible donations. EIN <span class=\"ein-num\"></span>",
    "q.box1.t":"$1,000 = one family, one month",
    "q.box1.d":"Covers temporary rent, food, and basic needs for one displaced family for a full month.",
    "q.box2.t":"Every gift counts",
    "q.box2.d":"$36, $180, or whatever you can: 100% goes to assistance in Venezuela.",
    "q.what.eyebrow":"What happened",
    "q.what.h2":"The strongest quake in over a century",
    "q.what.p":"According to the U.S. Geological Survey (USGS), a magnitude 7.2 quake was followed seconds later by a 7.5 near San Felipe, Yaracuy state. The worst damage hit La Guaira and Caracas, declared disaster zones. It is the strongest earthquake Venezuela has seen since 1900.",
    "q.stat1":"Magnitudes recorded 39 seconds apart (USGS)",
    "q.stat2":"A national holiday — many families were home",
    "q.stat3":"Community families left homeless (community estimate)",
    "q.stat4":"Sustains one displaced family for a month",
    "q.need.eyebrow":"The most urgent need",
    "q.need.h2":"A roof and a plate of food",
    "q.need.p":"Families who lost their homes need immediate shelter and food. Yajad coordinates direct delivery in Venezuela, prioritizing the community's most vulnerable families: older adults, children, and those who lost everything.",
    "q.need.cta":"Sponsor a family",
    "q.need.fig":"= one displaced family sustained for a month",
    "q.need.l1":"🏠 Temporary rent or emergency repairs",
    "q.need.l2":"🍲 Food for the whole household",
    "q.need.l3":"💊 Medicine and basic supplies",
    "q.need.l4":"🤝 Follow-up and support from Yajad",
    "q.video.eyebrow":"Testimony",
    "q.video.h2":"The situation, told from Venezuela",
    "q.gal.eyebrow":"From the ground",
    "q.gal.h2":"Images of the relief effort",
    "q.gal.p":"Replace these with real photos of Yajad's work and the families supported (in assets/img/).",
    "q.gal.c1":"Food delivery to displaced families",
    "q.gal.c2":"Temporary shelter for those who lost their homes",
    "q.gal.c3":"Yajad volunteers coordinating relief",
    "q.gal.c4":"Support for the community's older adults",
    "q.tax.t":"Your emergency donation is tax-deductible",
    "q.tax.p":"Friends of Yajad-Venezuela operates under <span class=\"org-legal\"></span>, a 501(c)(3) organization recognized by the IRS (EIN <span class=\"ein-num\"></span>). You'll receive a valid receipt for your tax records.",
    "q.tax.cta":"Donate for the displaced families",

    /* Donate page */
    "d.eyebrow":"Your gift, hand in hand",
    "d.h2":"Make your donation",
    "d.p":"Choose the designation and amount. You'll receive a tax-deductible receipt. 100% goes to the social assistance of the Jewish Community of Venezuela.",
    "d.fund.lbl":"1 · Where does your gift go?",
    "d.fund.general":"General Fund","d.fund.general.s":"Food, health, elder care, education",
    "d.fund.quake":"2026 Earthquake","d.fund.quake.s":"Housing and food for the displaced",
    "d.freq.lbl":"2 · Frequency",
    "d.freq.monthly":"Monthly","d.freq.monthly.s":"Steady, ongoing support",
    "d.freq.once":"One time","d.freq.once.s":"A single donation",
    "d.amt.lbl":"3 · Amount (USD)",
    "d.amt.18":"Be part","d.amt.36":"Double chai","d.amt.1000":"1 family / month",
    "d.amt.custom":"Other amount",
    "d.donor.lbl":"4 · Your details",
    "d.donor.first":"First name","d.donor.last":"Last name",
    "d.donor.email":"Email (for your receipt)",
    "d.donor.hint":"We use your email only to send your tax-deductible receipt.",
    "d.submit":"Continue to secure payment",
    "d.confirm.t":"Donation preview",
    "d.confirm.note":"This is a preview. Connect Donorbox or Stripe in assets/js/config.js to enable real payments.",
    "d.sum.t":"Your donation",
    "d.sum.fund":"Designation","d.sum.freq":"Frequency","d.sum.total":"Total",
    "d.sum.tax.t":"Tax-deductible","d.sum.tax.b":"A program of"
  };

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Language ---------- */
  var origHTML = {}, origPh = {};
  var lang = "es";
  try { lang = window.localStorage.getItem("fyv-lang") || "es"; } catch (e) {}

  function capture() {
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!(k in origHTML)) origHTML[k] = el.innerHTML;
    });
    $$("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      if (!(k in origPh)) origPh[k] = el.getAttribute("placeholder") || "";
    });
  }

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = (l === "en") ? EN[k] : origHTML[k];
      if (v != null) el.innerHTML = v;
    });
    $$("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      var v = (l === "en") ? EN[k] : origPh[k];
      if (v != null) el.setAttribute("placeholder", v);
    });
    $$(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === l ? "true" : "false");
    });
    try { window.localStorage.setItem("fyv-lang", l); } catch (e) {}
    fillConfig();       // re-populate dynamic spans recreated by innerHTML
    if (window.__fyvUpdateSummary) window.__fyvUpdateSummary();
    if (window.__fyvOnLang) window.__fyvOnLang();
  }

  /* ---------- Config injection ---------- */
  function fillConfig() {
    var o = CFG.org || {};
    $$(".ein-num").forEach(function (el) { el.textContent = o.ein || ""; });
    $$(".org-legal").forEach(function (el) { el.textContent = o.legalName || ""; });
    $$(".org-addr").forEach(function (el) { el.textContent = o.addr || ""; });
    $$(".org-since").forEach(function (el) { el.textContent = o.exemptSince || ""; });
    $$(".org-email").forEach(function (el) {
      el.textContent = o.email || "";
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + (o.email || ""));
    });
    $$(".org-fb").forEach(function (el) { if (o.facebook) el.setAttribute("href", o.facebook); });

    var em = $("#emailLink");
    if (em && o.email) em.setAttribute("href", "mailto:" + o.email);

    var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

    var list = $("#peopleList");
    if (list && CFG.contacts && !list.dataset.built) {
      list.innerHTML = CFG.contacts.map(function (c) {
        return '<div class="person"><b>' + c.name + '</b><a href="tel:' + c.phone + '">' + c.display + "</a></div>";
      }).join("");
      list.dataset.built = "1";
    }
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var t = $("#menuToggle"), nav = $("#nav");
    if (!t || !nav) return;
    t.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      t.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#nav a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); t.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Language buttons ---------- */
  function initLangButtons() {
    $$(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
    });
  }

  /* ---------- Donation flow ---------- */
  function fmt(n) { return "$" + Number(n).toLocaleString("en-US"); }

  function initDonate() {
    var form = $(".dform");
    if (!form) return;

    // Preselect fund from ?fund=
    var params = new URLSearchParams(window.location.search);
    var pf = params.get("fund");
    if (pf === "earthquake" || pf === "general") {
      var r = $('input[name="fund"][value="' + pf + '"]'); if (r) r.checked = true;
    }

    var custom = $("#customAmount");

    function selectedRadio(name) { var r = $('input[name="' + name + '"]:checked'); return r ? r.value : ""; }
    function getAmount() {
      var c = custom && custom.value ? parseFloat(String(custom.value).replace(/[^0-9.]/g, "")) : 0;
      if (c && c > 0) return c;
      var a = selectedRadio("amount");
      return a ? parseFloat(a) : 0;
    }

    function L(es, en) { return lang === "en" ? en : es; }

    function updateSummary() {
      var fund = selectedRadio("fund");
      var freq = selectedRadio("freq");
      var amt = getAmount();

      var fundLabel = fund === "earthquake" ? L("Terremoto 2026", "2026 Earthquake") : L("Fondo general", "General Fund");
      var freqLabel = freq === "monthly" ? L("Mensual", "Monthly") : L("Una vez", "One time");

      var sF = $("#sumFund"); if (sF) sF.textContent = fundLabel;
      var sQ = $("#sumFreq"); if (sQ) sQ.textContent = freqLabel;
      var sT = $("#sumTotal");
      if (sT) sT.textContent = amt ? (fmt(amt) + (freq === "monthly" ? L("/mes", "/mo") : "")) : "$0";

      var imp = $("#sumImpact");
      if (imp) {
        var msg = "";
        if (fund === "earthquake" && amt >= 1000) {
          var fams = Math.floor(amt / 1000);
          msg = L("Sostiene a " + fams + (fams === 1 ? " familia" : " familias") + " damnificada" + (fams === 1 ? "" : "s") + " por un mes.",
                  "Sustains " + fams + (fams === 1 ? " displaced family" : " displaced families") + " for a month.");
        } else if (fund === "earthquake") {
          msg = L("Cada dólar va directo a vivienda y comida para familias damnificadas.",
                  "Every dollar goes straight to housing and food for displaced families.");
        } else if (freq === "monthly" && amt) {
          msg = L("Tu aporte mensual sostiene la asistencia social durante todo el año.",
                  "Your monthly gift sustains social assistance all year long.");
        } else {
          msg = L("El 100% se destina a la Comunidad Judía de Venezuela.",
                  "100% goes to the Jewish Community of Venezuela.");
        }
        imp.textContent = msg;
      }
    }
    window.__fyvUpdateSummary = updateSummary;

    // Amount radios <-> custom are mutually exclusive
    $$('input[name="amount"]').forEach(function (r) {
      r.addEventListener("change", function () { if (custom) custom.value = ""; updateSummary(); });
    });
    if (custom) custom.addEventListener("input", function () {
      if (custom.value) { var c = $('input[name="amount"]:checked'); if (c) c.checked = false; }
      updateSummary();
    });
    $$('input[name="fund"],input[name="freq"]').forEach(function (r) {
      r.addEventListener("change", updateSummary);
    });

    // Submit
    var btn = $("#donateBtn");
    var note = $("#provNote");
    var pay = CFG.payments || { provider: "test" };

    function setNote() {
      if (!note) return;
      if (pay.provider === "test") {
        note.textContent = L("Modo de prueba — los pagos aún no están conectados.",
                             "Test mode — payments are not connected yet.");
      } else {
        note.textContent = L("Serás dirigido a una página de pago segura.",
                             "You'll be taken to a secure payment page.");
      }
    }

    if (btn) btn.addEventListener("click", function () {
      var amt = getAmount();
      if (!amt || amt <= 0) { if (custom) { custom.focus(); } alert(L("Elige o escribe un monto.", "Choose or enter an amount.")); return; }
      var fund = selectedRadio("fund");
      var freq = selectedRadio("freq");
      var email = ($("#email") || {}).value || "";
      var name = (($("#firstName") || {}).value || "") + " " + (($("#lastName") || {}).value || "");
      name = name.trim();

      var fundLabel = fund === "earthquake" ? "Earthquake Relief 2026" : "General Fund";

      if (pay.provider === "donorbox" && pay.donorboxUrl && pay.donorboxUrl.indexOf("REPLACE") === -1) {
        var u = new URL(pay.donorboxUrl);
        u.searchParams.set("amount", String(amt));
        u.searchParams.set("recurring", freq === "monthly" ? "true" : "false");
        if (freq === "monthly") u.searchParams.set("default_interval", "m");
        u.searchParams.set("designation", fundLabel);
        if (email) u.searchParams.set("email", email);
        if (name) u.searchParams.set("name", name);
        window.location.href = u.toString();
        return;
      }

      if (pay.provider === "stripe") {
        var link = ((pay.stripeLinks || {})[fund] || {})[freq] || "";
        if (link) {
          var su = new URL(link);
          if (email) su.searchParams.set("prefilled_email", email);
          su.searchParams.set("client_reference_id", fundLabel + "|" + freq + "|" + amt);
          window.location.href = su.toString();
          return;
        }
      }

      // Fallback / test preview
      var panel = $("#confirmPanel"), body = $("#confirmBody");
      if (panel && body) {
        var freqTxt = freq === "monthly" ? L("mensual", "monthly") : L("una vez", "one-time");
        body.textContent = L(
          "Donativo de " + fmt(amt) + " (" + freqTxt + ") a “" + (fund === "earthquake" ? "Terremoto 2026" : "Fondo general") + "”" + (name ? " · " + name : "") + (email ? " · " + email : ""),
          "Donation of " + fmt(amt) + " (" + freqTxt + ") to “" + (fund === "earthquake" ? "Earthquake Relief 2026" : "General Fund") + "”" + (name ? " · " + name : "") + (email ? " · " + email : "")
        );
        panel.hidden = false;
        panel.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    setNote();
    updateSummary();

    // refresh note language on toggle
    var _apply = applyLang;
    window.__fyvOnLang = setNote;
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    capture();
    initLangButtons();
    initMenu();
    initReveal();
    initDonate();
    applyLang(lang);     // also calls fillConfig + summary
    if (window.__fyvOnLang) window.__fyvOnLang();
  });
})();
