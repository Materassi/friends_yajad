/* =====================================================================
   SITE CONFIG  —  edit everything in this one file
   ---------------------------------------------------------------------
   This is the only file you need to touch to update org details,
   tax info, contacts, and how donations are processed.
   ===================================================================== */

window.FYV_CONFIG = {

  /* ---- Legal / tax-exempt entity --------------------------------- */
  /* NOTE: Your IRS determination letter is issued to
     "Tzedaka Basseter Corp" (EIN 61-1973902), 501(c)(3) public charity,
     effective July 1, 2020. Confirm the exact name that should appear
     on donor receipts, then edit below. */
  org: {
    brand:      "Friends of Yajad-Venezuela",
    legalName:  "Tzedaka Basseter Corp",
    ein:        "61-1973902",
    addr:       "10580 NW 27th St, Ste 201, Doral, FL 33172",
    email:      "info@friendsofyajadv.org",
    facebook:   "https://www.facebook.com/Amigos-de-Yajad-Venezuela-1564721997114777/",
    exemptSince:"July 1, 2020"
  },

  /* ---- Contacts shown on the site -------------------------------- */
  contacts: [
    { name: "Dana Tangir",  phone: "+13054671928", display: "305.467.1928" },
    { name: "Jessica Meiler", phone: "+19548813123", display: "954.881.3123" },
    { name: "David Bassan",  phone: "+17864691574", display: "786.469.1574" }
  ],

  /* ---- The relief video ------------------------------------------ */
  videoId: "kT6v2obhS1E",

  /* ---- Payments --------------------------------------------------
     The donation form builds a checkout URL from the donor's choices.
     Pick ONE provider below and paste your real link. No backend or
     server is required — works on static AWS S3 / CloudFront hosting.

     OPTION A — Donorbox (recommended for nonprofits):
       Set provider:"donorbox" and donorboxUrl to your campaign URL.
       The form forwards amount, recurring, and a "designation" so the
       gift is tagged General Fund vs Earthquake Relief.

     OPTION B — Stripe Payment Links:
       Set provider:"stripe" and paste a Payment Link per fund/frequency.
       (Stripe Payment Links can't take an arbitrary amount, so we map
       to the closest link OR use a single "customer chooses amount" link.)

     OPTION C — "test": shows a confirmation panel instead of redirecting,
       so you can preview the flow before going live.                  */
  payments: {
    provider: "test",                 // "donorbox" | "stripe" | "test"

    donorboxUrl: "https://donorbox.org/REPLACE-WITH-YOUR-CAMPAIGN",

    stripeLinks: {
      // paste Stripe Payment Link URLs; leave blank to fall back to test
      general:   { once: "", monthly: "" },
      earthquake:{ once: "", monthly: "" }
    }
  }
};
