# Supabase — logging donation confirmations

Every time a donation is confirmed (and, in test mode, every time the preview panel
shows) the site posts one row to a Supabase table. It uses the **public anon key**,
which is safe to ship in the browser *as long as* the table's row-level security only
lets the anonymous role INSERT — never read, update, or delete. The SQL below sets that
up correctly.

## 1. Create a project
supabase.com → New project. Once it's ready, go to **Project Settings → API** and copy:
- **Project URL** (`https://xxxx.supabase.co`) → `config.js` → `supabase.url`
- **anon public key** → `config.js` → `supabase.anonKey`

(Leave the `service_role` key out of the website — it bypasses all security.)

## 2. Create the table + security policy
Supabase → **SQL Editor** → New query → paste and run:

```sql
-- 1. The table
create table if not exists public.donations (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  fund         text,          -- "general" | "earthquake"
  fund_label   text,          -- "General Fund" | "Earthquake Relief 2026"
  frequency    text,          -- "once" | "monthly"
  amount       numeric,       -- in dollars (e.g. 100.00)
  currency     text default 'usd',
  donor_name   text,
  donor_email  text,
  status       text,          -- "succeeded" | "preview"
  provider     text,          -- "stripe-card" | "test" | ...
  payment_ref  text,          -- Stripe PaymentIntent id when available
  lang         text           -- "es" | "en"
);

-- 2. Turn on row-level security (denies everything by default)
alter table public.donations enable row level security;

-- 3. Allow ONLY anonymous inserts from the website.
--    No select/update/delete policy is created, so the public
--    cannot read or change any rows — only add new ones.
create policy "anon can insert donations"
  on public.donations
  for insert
  to anon
  with check (true);
```

That's all the website needs. After you paste your URL + anon key into
`assets/js/config.js`, submit a test donation and the row will appear under
**Table Editor → donations**.

## 3. Reading your data
Because there's no SELECT policy for `anon`, the public site can't read the table —
which is what you want. You read it yourself in the **Table Editor**, the **SQL Editor**,
or via the API using the `service_role` key from a trusted place (never the website).

Handy query for a quick total:

```sql
select status, count(*), sum(amount) as total_usd
from public.donations
group by status;
```

## 4. A note on trusting amounts (important)
These rows are written by the browser, so treat `amount`/`status` as a **convenience log**,
not as your accounting source of truth — a determined person could post a row with any
values. Stripe itself is the authoritative record of money received. For a tamper-proof
log, add a Stripe **webhook** that writes the confirmed charge to this same table using the
`service_role` key from a small server/Lambda; then the browser row is just a fast UI signal
and the webhook row is the trusted one. (The Lambda in STRIPE-SETUP.md is a natural place to
add that webhook later.)

## 5. Optional: get an email on every donation
Supabase → **Database → Webhooks** (or a simple Edge Function) can fire on each insert into
`public.donations` and send you an email/Slack message. Not required for logging to work.
