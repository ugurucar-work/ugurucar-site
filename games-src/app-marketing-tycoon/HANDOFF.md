# App Marketing Tycoon: handoff

A single-file browser game that teaches mobile app marketing (creative + paid acquisition). The player launches an app, makes ad creatives, runs Meta / TikTok / Google campaigns, hires a team and tries to turn a profit within 52 in-game weeks. Game UI is in English; the owner (Uğur) talks in Turkish.

**Goal of this handoff:** put the game on the owner's own domain. The site is **Astro**, deployed on **Cloudflare**. No accounts, no login, no backend.

---

## 1. What's in this folder

```
app-marketing-tycoon-handoff/
├─ HANDOFF.md                      ← this file
├─ source/marketing-tycoon.html    ← THE source of truth (edit this one)
├─ tools/
│  ├─ build.py                     ← wraps the source into a full web page
│  └─ balance-bot.js               ← headless balance bot (runs inside the game page)
└─ site/public/                    ← drop-in for the Astro project's public/ folder
   ├─ games/app-marketing-tycoon/
   │  ├─ index.html                ← built page (~470 KB, everything inline)
   │  └─ favicon.svg
   └─ _headers.example             ← Cloudflare headers to merge into the site's _headers
```

`source/marketing-tycoon.html` is written as a claude.ai Artifact body: no `<!doctype>`/`<head>` skeleton. Never deploy it directly. Always run `python3 tools/build.py`, which writes `site/public/games/app-marketing-tycoon/index.html` with doctype, viewport, description, Open Graph tags, favicon and a margin reset.

## 2. Deploying

**Current setup (Nov 2026):** the game is served from www.ugurucar.work/games/app-marketing-tycoon/ (pages.dev was unreachable for players in Türkiye, so the redirect was removed). A Cloudflare Pages project also exists `app-marketing-tycoon` at https://app-marketing-tycoon.pages.dev, built from this repo (build command `exit 0`, output `public/games/app-marketing-tycoon`, headers from that folder's `_headers`). `worker.js` 301-redirects the old `www.ugurucar.work/games/app-marketing-tycoon/` path there, and the site's Play button links to it. Saves live on the pages.dev origin. The steps below are the original same-domain setup.

### Original: deploying to the Astro site

1. Copy `site/public/games/app-marketing-tycoon/` into the Astro repo at `public/games/app-marketing-tycoon/`. Astro copies `public/` as-is, so the game is served at `https://<domain>/games/app-marketing-tycoon/`.
   - Make sure no Astro page or route already claims `/games/app-marketing-tycoon` (e.g. `src/pages/games/[slug].astro`). If one does, move the game to a different public path; the page uses only relative URLs (`favicon.svg`), so any folder works.
   - If the site sets `trailingSlash: 'never'`, check that `/games/app-marketing-tycoon` still resolves to the `index.html` on Cloudflare; linking with the trailing slash is safest.
2. Merge `site/public/_headers.example` into the site's `public/_headers` (create the file if there is none). Works on both Cloudflare Pages and Workers static assets.
3. Link to it from the site (nav, games page, blog post). Open it as a full page, not inside an iframe: the game is desktop-first and wants the whole viewport.
4. Optional: add a 1200×630 `og-image.png` next to `index.html` and add `<meta property="og:image" content="https://<domain>/games/app-marketing-tycoon/og-image.png">` in `tools/build.py` (needs an absolute URL, so the domain is required). Also consider a `<link rel="canonical">` once the final URL is known.
5. Deploy, then smoke-test on the live URL (section 6).

**External requests:** only Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`). For GDPR-strict hosting, self-host those fonts (Bricolage Grotesque, IBM Plex Sans, IBM Plex Mono, Fraunces, Nunito) and swap the `<link>` in the source. There are no other network calls, analytics or cookies.

## 3. Remembering players without accounts

The owner explicitly does **not** want login. Everything is stored in the player's browser (`localStorage`) on the site's origin:

| Key | What |
|---|---|
| `marketing-tycoon-app-v1` | The current game save (whole `state`, ~100–300 KB) |
| `marketing-tycoon-ach-v1` | Achievements, kept across games: `{ id: { t: unlockMs, w: week, b: brandName, g: seed } }` |
| `marketing-tycoon-prefs` | Settings (sound, music, chatter, theme, reduced motion) |

**Moving achievements to another device** uses a client-side **transfer code** (Achievements screen → "Copy transfer code" / "Paste a code"). Format: `AMT1-<base64url(JSON [[id, unixSeconds, week, brand], …])>-<4-char checksum>`. Importing merges: unknown ids are dropped and the earliest unlock time wins. No server involved.

Keys are origin-wide, so the same domain shares them with the rest of the site; the names are prefixed to avoid collisions. Moving the game to a new domain resets everyone's progress (expected).

If the owner later wants cross-device sync or a leaderboard without login, the free option on their stack is a **Cloudflare Worker + KV/D1** with an anonymous random id per browser, plus a short sync code to pair devices. Not built; it's only an idea.

## 4. How the game code is organised (source file)

One `<script>` with vanilla JS, no framework or build step:
- **State:** global `state`, saved with `save()` to localStorage. `newState(brand)` makes a fresh game; `ensureExtras(s)` migrates/fills older saves.
- **Rendering:** `render()` rebuilds `#app` from `views[state.tab]` (`vOverview`, `vAds`, `vStudio`, `vAnalysis`, …). Popups go to `#modal` (overlays) and `#dialog`.
- **Input:** one delegated click handler routes `data-act="x"` to `ACT.x(dataset, el)`. `SLOW` gives a button a short loading animation; `INSTANT` skips it. Loading buttons always restore in `finally`.
- **Week loop:** `ACT.endWeek` → `simulate()` → `achWeek()` → `showLoading()` → report (`showReport`) → `closeReport`. `rollEvents()`/`pushEvent()` drive the inbox events (`EVENTS`).
- **Onboarding, three layers, never stacked:**
  1. `TOUR`: two centred cards at game start (the angel's cheque, then "how it works"). It introduces the game only and doesn't walk through tabs.
  2. `QUEST`: the "First steps" checklist in the sidebar. It boxes the exact control to press for the first moves (make an ad, add it to Meta, budget, switch on, End week, hire a Marketing Artist, TikTok, hold 3 weeks).
  3. `TAB_GUIDE`: one popup with at most 3 points, shown the first time a screen is opened *after it unlocks*. It is suppressed for screens the checklist is currently walking through.

  Keep every text in these three in sync with the real rules: they reference `MANUAL_WEEK`, `MANUAL_CLICKS`, `RESEARCH_CLICKS` and `LOC_COST` directly so numbers can't drift.
- **Music:** `MUSIC` makes a lo-fi loop with Web Audio (no files). Starts on the first click or key press (browser autoplay rules), pauses when the tab is hidden. Toggle on the title screen (top right) and in Settings (`prefs.music`).
- **Keyboard:** Space = continue (tutorial/guide popup → "See the full report" → "On to week N" → End week). Digits 1–3 talk to the selected employee on the Office screen.
- **Market profile:** each game has a seed (`state.seed`, shown in Settings as the "game code"). `mkProfile(seed)` makes hidden per-segment CPM/CVR/retention, one hero segment, one trap segment, a sweet spot and 3 seasonal shifts. The same seed always gives the same market.
- **Achievements:** `ACH` array (30 entries, 7 categories, 5 secret), `checkAch(r)`, `achWeek(r)`, `showAch()`, `achToast()`, transfer code helpers `achCode()`/`achDecode()`.

## 5. Economy and balance (latest state)

- Start cash $30,000; fixed cost $300/week + $60 per person; ad budget up to $1,000 per campaign (default $150).
- `PAY_CONV = .6`: share of paid clicks that pay on day one. Retention by plan `PLAN_RET = [.8 weekly, .87 monthly, .6 yearly]`.
- **Organic / direct sales** (`r.src.direct` in `simulate()`) are a **fraction of paid momentum**: `paidEma * DIR_K (.3)` scaled by awareness and trust, plus a small brand floor that also fades without ads. Stopping ads makes revenue collapse within about 10 weeks. This fixed an exploit where a player could stop all ads and stay profitable on free "word of mouth" (old direct was 4–6× paid sales; now 0.2–0.4×).
- Awareness decays 2.5%/week with ads running, 5%/week without.
- Loans: amortised, terms 12/26/52 weeks, 2% fee, early payoff never below principal.
- **Out of cash** no longer ends the game at once: `showBroke()` offers personal savings (+$10K, once per game, only if it covers the hole), an emergency 26-week loan from Gerald (if `loanMax()` allows) and, by chance, a rescue round (+cash for 20%; odds rise with ROAS, users, trust and an early week, drop after a previous rescue). "Close the company" shows the final screen.
- Team: diminishing returns per extra person in the same role (`ROLE_W`).
- Home country defaults to Türkiye. The US & English-speaking region (`t1en`) is always open in campaigns (`freeMkt`/`openMkt`), so players can compare it with home before they can research; research still reveals its fit.
- Ads Manager: one tab per platform (Meta, TikTok, Google), campaigns scroll sideways. No BAU/test campaign types any more (old test campaigns migrate to normal). Default names `BAU_<country>_Week<n>`, editable. Campaign cap: 5 on your own, +10 for the first Performance Marketer, +3 for each extra one. Studio reputation gates better candidates and stars.

Latest bot results (16 games each):

| Scenario | Bankrupt | Median value |
|---|---|---|
| Solo + loans | 4/16 | ~$115K |
| 2-person team + loans | 11/16 | ~$60K |
| Ads off from week 20 | 0/16 | ~$3K, revenue → $0 |

The bot is a weak player. A skilled human run (from a real save) ends the year around $1.2M.

**Running the bot:** serve the built page locally, open it in a browser, and in the console:

```js
eval(await (await fetch('/path/to/balance-bot.js')).text());
batch('solo+loan', { comp: 'solo', loans: true }, 16);
// options: comp: solo|lean|balanced|oneEach, loans, offAt: week, fixed (no budget changes), budget, plats: ['meta','tiktok','google']
```
It overrides `render/save/toast` with no-ops, so reload the page afterwards. It does create new games in that browser's save slot.

## 6. Smoke test after deploy

- [ ] Page loads at `/games/app-marketing-tycoon/` with the favicon and no console errors.
- [ ] Start a game → tutorial appears → Space advances it.
- [ ] Make a campaign, End week (Space works) → report → On to week 2.
- [ ] Reload the page → the game continues where it was.
- [ ] Achievements (sidebar, bottom) → copy the transfer code → paste it in a private window → achievements appear.
- [ ] Settings → New game asks for confirmation; About shows the contact email.
- [ ] Narrow window: no horizontal scroll (desktop-first, but it should not break).

## 7. Owner preferences to keep in mind

- Realistic numbers (researched), hidden info the player discovers, a struggle early on but nothing impossible or game-breaking.
- Minimal text: explanations go in hover (i) tooltips; more visuals, less copy.
- Employees unlock features (locked tabs show who to hire). Running jokes: "AI doesn't exist yet", Gerald the bank manager, social media manager memes.
- Short delays; desktop-first; balanced for every play style (about 3 people per role should be optimal, not 10).
- Name stays **App Marketing Tycoon** (a "Profit in a Year" rename was considered and declined).
- No login, nothing paid.

## 8. Open ideas (not requested yet)

- Paywall Lab visuals; making Performance Marketer suggestions more visual.
- Direct sales are now ~0.2–0.4× paid; human playtests should confirm the difficulty feels right.
- The game is also published as a private claude.ai Artifact (the owner's preview copy). The website is the public version.
