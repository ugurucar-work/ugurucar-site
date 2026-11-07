// Creative examples shown on /portfolio (gallery) and /creative-ops.
// Put files in public/work/<app>/ (or use a full URL if hosted elsewhere, e.g. R2).
// Videos: H.264 MP4, 720p, under ~8 MB. Give each a poster JPG (first frame).
export type Format = 'Avatar' | 'UGC' | 'Influencer' | 'Kinetic' | 'Story film' | 'AI video' | 'Static';
export interface ShowcaseItem {
  app: string;            // must match a project name, e.g. 'Telicall'
  type: 'video' | 'image';
  src: string;
  poster?: string;        // videos only
  title: string;          // short, e.g. 'Second number, privacy angle'
  format: Format;
  ratio?: '9:16' | '1:1' | '4:5' | '16:9';
  ai?: boolean;           // made with the AI pipeline
  reference?: string;     // URL of the ad this was adapted from (competitor clone)
  referenceImage?: string; // still of the reference, when there is no embeddable link
  referenceLabel?: string; // e.g. 'Competitor UGC ad'
  group?: 'clone' | 'adkit' | 'variation' | 'best' | 'hook';
}

export const SHOWCASE: ShowcaseItem[] = [
  { app: 'Telicall', type: 'video', src: '/work/telicall/ai-creator-go-viral.mp4', poster: '/work/telicall/ai-creator-go-viral.jpg', title: 'Why you can\'t go viral abroad', format: 'AI video', ai: true, group: 'best' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/ai-creator-global-number.mp4', poster: '/work/telicall/ai-creator-global-number.jpg', title: 'A UK number from Lagos', format: 'AI video', ai: true, group: 'best' },
  {
    app: 'Telicall',
    type: 'video',
    src: '/work/telicall/scandal-story.mp4',
    poster: '/work/telicall/scandal-story.jpg',
    title: 'Scandal story, adapted from a viral reference',
    format: 'Story film',
    ai: true,
    reference: 'https://www.tiktok.com/@unutulmazreklam/video/7378117805297634565',
    referenceLabel: 'Viral TikTok story ad',
    group: 'clone',
  },
  {
    app: 'Telicall',
    type: 'video',
    src: '/work/telicall/clone-ugc-second-number.mp4',
    poster: '/work/telicall/clone-ugc-second-number.jpg',
    title: 'Second number UGC, adapted from a competitor ad',
    format: 'UGC',
    ai: true,
    referenceImage: '/work/telicall/clone-ugc-second-number-ref.webp',
    referenceLabel: 'Competitor UGC ad (Sideline)',
    group: 'clone',
  },
  { app: 'Telicall', type: 'video', src: '/work/telicall/ugc-why-nobody-told-me.mp4', poster: '/work/telicall/ugc-why-nobody-told-me.jpg', title: 'Why did nobody tell me about a second number?', format: 'UGC', ai: true },
  { app: 'Telicall', type: 'video', src: '/work/telicall/ugc-number-for-signups.mp4', poster: '/work/telicall/ugc-number-for-signups.jpg', title: 'One number for sign-ups, one for me', format: 'UGC', ai: true },
  { app: 'Telicall', type: 'video', src: '/work/telicall/adkit-avatar-nightstand.mp4', poster: '/work/telicall/adkit-avatar-nightstand.jpg', title: 'Two WhatsApps, nightstand hook', format: 'Avatar', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/adkit-avatar-scribble.mp4', poster: '/work/telicall/adkit-avatar-scribble.jpg', title: 'Private number, scribble hook', format: 'Avatar', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/adkit-kinetic-two-whatsapps.mp4', poster: '/work/telicall/adkit-kinetic-two-whatsapps.jpg', title: '2 WhatsApps on 1 phone', format: 'Kinetic', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/adkit-kinetic-three-steps.mp4', poster: '/work/telicall/adkit-kinetic-three-steps.jpg', title: '2 WhatsApps in 3 steps', format: 'Kinetic', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/variation-presenter-a.mp4', poster: '/work/telicall/variation-presenter-a.jpg', title: 'Winner variation, presenter A', format: 'AI video', ai: true, group: 'variation' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/variation-presenter-b.mp4', poster: '/work/telicall/variation-presenter-b.jpg', title: 'Winner variation, presenter B', format: 'AI video', ai: true, group: 'variation' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/variation-presenter-c.mp4', poster: '/work/telicall/variation-presenter-c.jpg', title: 'Winner variation, presenter C', format: 'AI video', ai: true, group: 'variation' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/hook-sim-under-skin.mp4', poster: '/work/telicall/hook-sim-under-skin.jpg', title: 'SIM card under the skin', format: 'AI video', ai: true, group: 'hook' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/hook-id-in-jelly.mp4', poster: '/work/telicall/hook-id-in-jelly.jpg', title: 'ID card cut out of jelly', format: 'AI video', ai: true, group: 'hook' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/hook-jelly-phone.mp4', poster: '/work/telicall/hook-jelly-phone.jpg', title: 'Jelly phone eats a SIM', format: 'AI video', ai: true, group: 'hook' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/hook-wooden-sim.mp4', poster: '/work/telicall/hook-wooden-sim.jpg', title: 'Sanding a wooden SIM', format: 'AI video', ai: true, group: 'hook' },
  { app: 'Telicall', type: 'image', src: '/work/telicall/static-tiny-rates.webp', title: 'Real calls. Tiny rates.', format: 'Static', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'image', src: '/work/telicall/static-uk-number.webp', title: 'Your own UK number', format: 'Static', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'image', src: '/work/telicall/static-call-detected.webp', title: 'International call detected', format: 'Static', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'image', src: '/work/telicall/static-travel-work.webp', title: 'You travel for work', format: 'Static', ai: true, group: 'adkit' },
];
