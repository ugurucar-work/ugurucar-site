export const DECK_PDF = '/creative-ops/Creative_Ops_Overview_Ugur_Ucar.pdf';

// Alt text per slide (also gives search engines the deck's content).
export const SLIDES = [
  'The AI Creative Machine — how I turned a creative funnel into a system that runs itself',
  'At a glance: what AI now runs for me — research, production, ad kits, testing, performance, creators and launch',
  'Why I built it: creative is the lever, the work around it was the bottleneck',
  'The idea: one loop run every week — research, produce, test, read, scale or iterate',
  'The map: one Creative Ops dashboard for tasks, performance, testing, studio, ad kit, TikTok One and influencer',
  'The engine underneath: every tab runs on its own skills',
  'Connected tools: Claude Code, Higgsfield, Arcads, Meta Ads, TikTok Ads, Adjust, Additor, SensorTower, Google Drive, Slack',
  'Studio research: every source of ideas in one tab row',
  'Studio projects: from a link to a finished ad, tracked end to end',
  'Ad Kit: one single prompt in, a complete ad set out — avatar clips, kinetic ads, story films, static images',
  'Ad Kit in the dashboard',
  'Creative testing: the Monday run turns last week’s winners into this week’s tests',
  'The Monday run engine: one skill per step',
  'Feedback loop: every note becomes a rule',
  'Feedback loop in the dashboard: questions land like a social feed',
  'Performance: live numbers and a weekly read on what to do with them',
  'Weekly diagnostics: four lists, each with a reason and a next step',
  'Weekly diagnostics in the dashboard',
  'TikTok One: creator content at scale, from brief to ready-to-launch',
  'Influencer: find the right creators, reach out with AI, track every deal',
  'Launch layer: from finished creative to live campaign with Additor',
  'Guardrails: AI does the work, I keep the keys',
  'The machine runs. I steer.',
].map((alt, i) => ({ src: `/creative-ops/slide-${String(i + 1).padStart(2, '0')}.webp`, alt }));
