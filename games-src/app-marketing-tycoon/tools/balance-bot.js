// headless balance bot: runs inside the game page
(function () {
  const noop = () => { };
  for (const f of ['render', 'save', 'toast', 'say', 'showLoading', 'showReport', 'showFinal', 'closeModal']) try { window[f] = noop; } catch (e) { }
  const COMPS = {
    solo: {},
    lean: { creative: 1, perf: 1 },
    balanced: { creative: 3, perf: 3, analyst: 1, social: 1, mkt: 1, influencer: 1, ugc: 1, product: 1 },
    oneEach: { creative: 1, perf: 1, analyst: 1, social: 1, mkt: 1, influencer: 1, ugc: 1, product: 1, hr: 1 },
  };
  const ORDER = ['creative', 'perf', 'analyst', 'creative', 'perf', 'social', 'product', 'ugc', 'influencer', 'mkt', 'creative', 'perf', 'hr'];
  window.runBot = function (o) {
    newState({ name: 'Bot', country: o.country || 'TR', cat: 'fitness', price: 'orta', tone: 'samimi', color: 0, model: 'subs', icon: 'letter', letter: '', fg: 0, seed: o.seed || String(Math.random()).slice(2, 10) });
    ensureExtras(state);
    const s = state, comp = typeof o.comp === 'object' ? o.comp : COMPS[o.comp || 'balanced'], out = { first: null, roas: {}, minCash: 1e9, dirShare: [] };
    const plats = o.plats || ['meta', 'tiktok'];
    for (let w = 1; w <= 52 && !s.over; w++) {
      const off = o.offAt && w >= o.offAt;
      s.inbox.forEach(i => { if (i.done) return; const E = EVENTS[i.eid]; if (E.choices) { try { i.result = E.choices[o.choice === 'last' ? E.choices.length - 1 : 0].run(s, i.data); } catch (e) { } } i.done = true; });
      // handmade creatives
      for (let k = 0; k < 2; k++) addCreative({ tier: rollTier(MANUAL_ODDS), by: 'You', src: 'hand', type: pick(Object.keys(TYPES)), hook: pick(Object.keys(HOOKS)), code: 'H' + w + k });
      // hiring: once cash allows ~10 weeks of runway
      const burn = payroll() + 300 + s.camps.filter(c => c.on).reduce((a, c) => a + c.budget, 0);
      if (!off && w >= (o.hireFrom || 6) && s.cash > burn * (o.runway || 16)) {
        const have = r => s.team.filter(m => m.role === r).length;
        const role = ORDER.find(r => comp[r] && have(r) < comp[r]) || Object.keys(comp).find(r => have(r) < comp[r]);
        if (role) {
          if (s.team.length >= deskCap()) { const nx = (s.office || 0) + 1; if (nx <= LOFT && s.cash > 30000) ACT.officeMove({ i: nx }); }
          if (s.team.length < deskCap()) { const c = genCandidate(role, 'self'); c.hired = w; s.team.push(c); }
        }
      }
      // campaigns
      if (!off) {
        for (const ch of plats) for (const os of ['ios', 'android']) {
          if (ch === 'google') continue;
          if (!s.camps.some(c => c.ch === ch && c.os === os) && campCount() < campCap() && campsOf(ch).length < platCap()) { const cp = mkCamp(ch, campsOf(ch).length + 1); cp.os = os; cp.budget = o.budget || 150; cp.on = true; s.camps.push(cp); }
        }
        if (plats.includes('google')) { s.ads.google.on = true; s.ads.google.budget = o.budget || 150; }
        // play the creative loop like a person: keep every own campaign full, proven ads first, then untested ones; flops and tired ads out
        for (const cp of s.camps) { if (cp.pm) continue; const ch = cp.ch;
          cp.crs = cp.crs.filter(id => { const c = crById(id); return c && !(testedOn(c, ch) && (tierOf(c, ch) === 'flop' || c.fatigue > .55)); });
          const pool = s.creatives.filter(c => !cp.crs.includes(c.id) && !(testedOn(c, ch) && tierOf(c, ch) === 'flop')).sort((a, b) => (testedOn(b, ch) ? qOf(b, ch) : .95) - (testedOn(a, ch) ? qOf(a, ch) : .95));
          for (const c of pool) { if (cp.crs.length >= maxAds()) break; cp.crs.push(c.id); } }
        // hand each free Performance Marketer a campaign on their platform: test if there's a backlog, otherwise rotate winners
        for (const m of s.team.filter(x => x.role === 'perf')) { if (handledBy(m)) continue;
          if (m.spec === 'google') { s.ads.google.pm = m.id; s.ads.google.on = true; continue; }
          const cp = s.camps.find(c => c.ch === m.spec && !c.pm); if (cp) { cp.pm = m.id; cp.order = s.creatives.filter(c => !testedOn(c, m.spec)).length > 8 ? 'test' : 'rotate'; } }
        // scale like a player: once a platform's campaigns are maxed out and paying back, open another one (US region included)
        if (!o.fixed) for (const ch of plats) { if (ch === 'google') continue; const cs = s.camps.filter(c => c.ch === ch && !c.managed);
          const maxed = cs.length && cs.every(c => c.budget >= campMax(c) * .9), good = cs.some(c => c.last && c.last.spend && (c.last.orders || 0) * (s.lastReport ? s.lastReport.aov : 0) / c.last.spend > .3);
          if (maxed && good && campCount() < campCap() && s.cash > 15000) { const cp = mkCamp(ch); cp.mkts = ['home', 't1en']; cp.budget = 500; cp.on = true; s.camps.push(cp); } }
        // extra campaigns on the best platform once capped
        for (const cp of s.camps) {
          cp.on = true; const L = cp.last;
          if (o.fixed || !L || !L.spend) continue;
          const roas = (L.orders || 0) * (s.lastReport ? s.lastReport.aov : 0) / L.spend;
          if (cp.managed) continue;
          if (roas > .3 && cp.budget < campMax(cp)) cp.budget = Math.min(campMax(cp), Math.round(cp.budget * 1.3));
          else if (roas < .08 && cp.weeks > 4) cp.budget = Math.max(100, Math.round(cp.budget * .8));
        }
      } else { s.camps.forEach(c => c.on = false); s.ads.google.on = false; if (o.fire) s.team = []; }
      // loans
      if (o.loans && s.cash < 4000 && loanMax() >= 5000) { const P = Math.min(loanMax(), 25000); const l = mkLoan(P, 26); loans().push(l); s.cash += P; spendNow(Math.round(P * LOAN_FEE), 'loanfee'); }
      s.inbox.forEach(i => { if (!EVENTS[i.eid].choices) i.done = true; });
      simulate();
      const r = s.lastReport;
      if (r.adSpend > 0 && [2, 10, 20, 35].includes(w)) out.roas[w] = +(r.split.paid / r.adSpend).toFixed(2);
      if (r.split.paidO > 0 && w > 4) out.dirShare.push((r.src.direct || 0) / r.split.paidO);
      if (!out.first && w > 2 && r.profit > 0) out.first = w;
      out.minCash = Math.min(out.minCash, s.cash);
    }
    const v = valuation();
    out.bk = s.over === 'bankrupt'; out.week = s.week; out.rw = Object.keys(s.rewards || {}).length; out.val = Math.round(v.val); out.team = s.team.length;
    out.rev = Math.round(s.history.slice(-4).reduce((a, h) => a + h.revenue, 0) / 4);
    out.dir = out.dirShare.length ? +(out.dirShare.reduce((a, b) => a + b, 0) / out.dirShare.length).toFixed(2) : 0;
    return out;
  };
  window.batch = function (name, o, n) {
    const R = []; for (let i = 0; i < n; i++) R.push(runBot(o));
    const avg = f => R.reduce((a, x) => a + f(x), 0) / R.length, med = a => a.sort((x, y) => x - y)[a.length >> 1];
    const ro = w => { const a = R.filter(x => x.roas[w] != null).map(x => x.roas[w]); return a.length ? (a.reduce((p, q) => p + q, 0) / a.length).toFixed(2) : '-'; };
    return `${name.padEnd(14)} bk ${R.filter(x => x.bk).length}/${n} val ${Math.round(med(R.map(x => x.val)) / 1000)}K rev/wk ${Math.round(avg(x => x.rev) / 1000 * 10) / 10}K first ${Math.round(avg(x => x.first || 53))} roas2/10/20/35 ${ro(2)}/${ro(10)}/${ro(20)}/${ro(35)} dir/paid ${avg(x => x.dir).toFixed(2)} team ${avg(x => x.team).toFixed(1)} rewards ${avg(x => x.rw || 0).toFixed(1)} bkWeek ${Math.round(avg(x => x.bk ? x.week : 0) / Math.max(1, R.filter(x => x.bk).length) * R.length)}`;
  };
})();
