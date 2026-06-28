# Stripe card payments — setup

The donation form now shows a real **card field** (Stripe Elements). Card data is
entered inside a Stripe-hosted field and tokenized in the browser — it never passes
through your servers. To actually *charge* the card, Stripe requires one small
server-side call (a PaymentIntent must be created with your **secret** key, which can
never live in front-end code). Below is a copy-paste AWS Lambda that does exactly that.

## 1. Get your Stripe keys
Stripe Dashboard → Developers → API keys. Copy:
- **Publishable key** (`pk_live_…`) → paste into `assets/js/config.js` at `payments.stripe.publishableKey`
- **Secret key** (`sk_live_…`) → used only by the Lambda below (never in the website)

Use the `pk_test_…` / `sk_test_…` pair first to test safely.

## 2. (Only for monthly gifts) create one Product
Stripe Dashboard → Product catalog → add a product called e.g. "Monthly donation".
Copy its **Product ID** (`prod_…`). You'll set it as an env var. One-time gifts don't need this.

## 3. Create the Lambda
AWS Console → Lambda → Create function → Author from scratch → Runtime **Node.js 20.x**.

Paste this as `index.mjs`:

```js
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Lock this down to your real domain once live:
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "*";
const cors = {
  "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Content-Type": "application/json"
};

export const handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS")
    return { statusCode: 204, headers: cors, body: "" };

  try {
    const b = JSON.parse(event.body || "{}");
    const amount = parseInt(b.amount, 10);                 // in cents
    if (!amount || amount < 50) throw new Error("Invalid amount");
    const currency = b.currency || "usd";
    const metadata = { fund: b.fundLabel || "", donor: b.name || "" };

    let clientSecret;

    if (b.frequency === "monthly") {
      const customer = await stripe.customers.create({ email: b.email, name: b.name });
      const sub = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price_data: {
          currency,
          product: process.env.STRIPE_MONTHLY_PRODUCT_ID,
          unit_amount: amount,
          recurring: { interval: "month" }
        }}],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
        metadata
      });
      clientSecret = sub.latest_invoice.payment_intent.client_secret;
    } else {
      const pi = await stripe.paymentIntents.create({
        amount, currency,
        receipt_email: b.email || undefined,
        automatic_payment_methods: { enabled: true },
        metadata
      });
      clientSecret = pi.client_secret;
    }

    return { statusCode: 200, headers: cors, body: JSON.stringify({ clientSecret }) };
  } catch (err) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: err.message }) };
  }
};
```

The `stripe` package must be bundled. Easiest path: locally run `npm init -y && npm install stripe`,
zip the folder (including `node_modules`, `index.mjs`, `package.json`) and upload the zip
to the Lambda. Set `"type": "module"` in `package.json` so `.mjs` imports work.

## 4. Environment variables (Lambda → Configuration → Environment variables)
- `STRIPE_SECRET_KEY` = your `sk_…` key
- `STRIPE_MONTHLY_PRODUCT_ID` = your `prod_…` id (only needed for monthly)
- `ALLOW_ORIGIN` = `https://friendsofyajadv.org` (use `*` only while testing)

## 5. Expose it: Lambda → Configuration → Function URL
- Create function URL, Auth type **NONE**.
- Enable **CORS** there too (or rely on the headers above).
- Copy the URL and paste it into `assets/js/config.js` at `payments.stripe.createPaymentUrl`.

## 6. Test
With test keys, use card `4242 4242 4242 4242`, any future expiry, any CVC/ZIP.
You should see "Thank you for your gift!" and the charge in your Stripe test dashboard.
Card `4000 0025 0000 3155` triggers the 3-D Secure pop-up so you can confirm that path.

## 7. Receipts (optional but recommended)
Stripe can email receipts automatically: Dashboard → Settings → Customer emails →
turn on "Successful payments". For one-time gifts the Lambda already passes `receipt_email`.

## Going live checklist
- Swap `pk_test`/`sk_test` for `pk_live`/`sk_live`.
- Set `ALLOW_ORIGIN` to your real domain (not `*`).
- Confirm the bucket/site is served over **https** (Stripe requires it).
