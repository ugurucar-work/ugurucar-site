// AI ad outputs shown on /creative-ops.
// Put files in public/showreel/<project>/ and list them here.
// ratio: '9:16' | '1:1' | '4:5' | '16:9'
export interface Clip {
  src: string;
  poster?: string;
  title: string;
  format: 'Avatar' | 'Kinetic' | 'Story film' | 'UGC' | 'Static' | 'AI video';
  ratio?: '9:16' | '1:1' | '4:5' | '16:9';
}
export interface ShowreelProject {
  slug: string;
  name: string;
  tagline: string;
  logo?: string;
  clips: Clip[];
}

export const SHOWREEL: ShowreelProject[] = [
  {
    slug: 'telicall',
    name: 'Telicall',
    tagline: 'Second Phone Number · AI ad kit outputs',
    logo: '/images/projects/telicall.png',
    clips: [],
  },
];
