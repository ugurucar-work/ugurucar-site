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
  group?: 'clone' | 'adkit' | 'variation' | 'best';
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
    group: 'clone',
  },
  { app: 'Telicall', type: 'video', src: '/work/telicall/adkit-avatar-nightstand.mp4', poster: '/work/telicall/adkit-avatar-nightstand.jpg', title: 'Two WhatsApps, nightstand hook', format: 'Avatar', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/adkit-avatar-scribble.mp4', poster: '/work/telicall/adkit-avatar-scribble.jpg', title: 'Private number, scribble hook', format: 'Avatar', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/adkit-kinetic-two-whatsapps.mp4', poster: '/work/telicall/adkit-kinetic-two-whatsapps.jpg', title: '2 WhatsApps on 1 phone', format: 'Kinetic', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/adkit-kinetic-three-steps.mp4', poster: '/work/telicall/adkit-kinetic-three-steps.jpg', title: '2 WhatsApps in 3 steps', format: 'Kinetic', ai: true, group: 'adkit' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/variation-presenter-a.mp4', poster: '/work/telicall/variation-presenter-a.jpg', title: 'Winner variation, presenter A', format: 'AI video', ai: true, group: 'variation' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/variation-presenter-b.mp4', poster: '/work/telicall/variation-presenter-b.jpg', title: 'Winner variation, presenter B', format: 'AI video', ai: true, group: 'variation' },
  { app: 'Telicall', type: 'video', src: '/work/telicall/variation-presenter-c.mp4', poster: '/work/telicall/variation-presenter-c.jpg', title: 'Winner variation, presenter C', format: 'AI video', ai: true, group: 'variation' },
];
