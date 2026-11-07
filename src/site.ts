export const SITE = {
  name: 'Uğur Uçar',
  title: 'Uğur Uçar | Creative Strategist & Paid UA',
  description:
    'I partner with global content creators and make high-performing Influencer & UGC videos. I also build AI tools to automate creative production.',
};

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ucarugur/' },
  { label: 'TikTok', href: 'https://tiktok.com/@ugurucar.ai' },
  { label: 'Instagram', href: 'https://instagram.com/ugurucar.ai' },
];

export const COMPETENCIES = [
  {
    title: 'Paid UA',
    short: 'Meta · TikTok · Google Ads',
    text: 'I plan, launch and scale paid user acquisition for consumer apps. Creative is my main lever: structured tests, clean reads and fast scaling of winners.',
  },
  {
    title: 'Creative Strategy',
    short: 'Angles · hooks · testing roadmaps',
    text: 'Creative roadmaps, angles and hooks built from competitor intel, trend data and our own test results, for performance campaigns localized across 20+ countries.',
  },
  {
    title: 'AI Creative Production',
    short: 'Arcads · Higgsfield · n8n · Claude Code',
    text: 'AI pipelines that turn one concept into a full ad set: avatar clips, kinetic ads, story films and statics. 10,000+ AI creatives produced, fact checked and on brand.',
  },
  {
    title: 'Creator & Influencer Marketing',
    short: '1000+ creators · TikTok One',
    text: 'Sourcing, briefing and managing creators end to end across telecom, lifestyle, social and tech apps, from first message to delivered content.',
  },
  {
    title: 'Social Media',
    short: 'TikTok · Instagram · LinkedIn',
    text: 'Organic presence for lifestyle, entertainment and AI brands, plus my own growing creator accounts.',
  },
];

export const PROJECTS = [
  { name: 'Telicall', tagline: 'Second Phone Number', logo: '/images/projects/telicall.png', color: '#5b3fd6' },
  { name: 'Getcontact', tagline: 'Caller ID & Spam Blocker', logo: '/images/projects/getcontact.png', color: '#2f6bff' },
  { name: 'eSIM io', tagline: 'Travel Internet Data', logo: '/images/projects/esimio.png', color: '#6b6b6b' },
  { name: 'FitEase', tagline: 'Hourglass Workout', logo: '/images/projects/fitease.jpg', color: '#9acd32' },
  { name: 'Hancy AI', tagline: 'Face Swap & Hairstyle Changer', logo: '/images/projects/hancy.png', color: '#2fbf8f' },
  { name: 'Joi', tagline: 'Live Stream & Video Chat', logo: '/images/projects/joi.png', color: '#7a4dff' },
  { name: 'Juds', tagline: 'AI Friend & Chat', logo: '/images/projects/juds.png', color: '#f2c200' },
];

// Extra apps shown only in the homepage logo marquee.
export const MARQUEE_EXTRA = [
  { name: 'DramaDash', tagline: 'Drama Shorts TV', logo: '/images/projects/dramadash.png', color: '#ff1f4b' },
  { name: 'Gaze', tagline: 'Live Video Chat', logo: '/images/projects/gaze.png', color: '#ffb800' },
  { name: 'Waplog', tagline: 'Dating & Video Call', logo: '/images/projects/waplog.png', color: '#e0338f' },
  { name: 'Nozy', tagline: 'Go Live & Watch Streams', logo: '/images/projects/nozy.png', color: '#17d7a0' },
  { name: 'Novely AI', tagline: 'AI Story Creator', logo: '/images/projects/novely.png', color: '#2fd1a5' },
];

export const ALL_APPS = [...PROJECTS, ...MARQUEE_EXTRA];
