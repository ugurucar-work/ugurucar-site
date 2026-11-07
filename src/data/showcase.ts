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
}

export const SHOWCASE: ShowcaseItem[] = [];
