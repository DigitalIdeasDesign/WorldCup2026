export interface GroupInsight {
  status: 'Open' | 'Chalky';
  predictability: 1 | 2 | 3; // 1: Wildcard, 2: Competitive, 3: Predictable
  favorite: string;
  impliedChance: string;
  upsetPick: string;
  scoutNote: string;
  noviceTakeaway: string;
  valuePicks?: string[];
  fullOdds: Record<string, string>;
}

export const GROUP_INSIGHTS: Record<string, GroupInsight> = {
  A: {
    status: 'Open',
    predictability: 1,
    favorite: 'Mexico',
    impliedChance: '54%',
    upsetPick: 'South Korea (+330)',
    scoutNote: 'One of the most open groups. Mexico is the slight favorite, but Czechia and South Korea are legitimate upset picks.',
    noviceTakeaway: 'This is one of the most open groups. Both Czechia and South Korea are legitimate upset picks. South Africa would be a true long shot but offers a big payout.',
    valuePicks: ['South Korea', 'Czech Republic'],
    fullOdds: { 'Mexico': '-120', 'Czech Republic': '+350', 'South Korea': '+330', 'South Africa': '+1100' }
  },
  B: {
    status: 'Open',
    predictability: 1,
    favorite: 'Switzerland',
    impliedChance: '50%',
    upsetPick: 'Canada (+185)',
    scoutNote: 'Switzerland is only a slight favorite. Canada or Bosnia winning would not be shocking.',
    noviceTakeaway: 'Switzerland is only a slight favorite, so Canada or Bosnia winning would not be shocking. Qatar winning the group would be a major upset.',
    valuePicks: ['Canada', 'Bosnia-Herzegovina'],
    fullOdds: { 'Switzerland': '+105', 'Canada': '+185', 'Bosnia-Herzegovina': '+350', 'Qatar': '+2500' }
  },
  C: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Brazil',
    impliedChance: '75%',
    upsetPick: 'Morocco (+450)',
    scoutNote: 'Brazil is a strong favorite. Morocco is the main "plausible upset" with real recent tournament pedigree.',
    noviceTakeaway: 'Brazil is a strong favorite; markets expect them to top the group most of the time. Morocco is the main "plausible upset" if you want plus money.',
    valuePicks: ['Morocco'],
    fullOdds: { 'Brazil': '-290', 'Morocco': '+450', 'Scotland': '+700', 'Haiti': '+10000' }
  },
  D: {
    status: 'Open',
    predictability: 2,
    favorite: 'USA',
    impliedChance: '43%',
    upsetPick: 'Turkiye (+180)',
    scoutNote: 'USA and Turkiye are almost co-favorites. Paraguay and Australia are true upset plays.',
    noviceTakeaway: 'USA and Turkiye are almost co-favorites; backing either is reasonable. Paraguay and Australia are true upset plays – bigger odds, lower likelihood.',
    valuePicks: ['Turkey', 'Paraguay'],
    fullOdds: { 'United States': '+135', 'Turkey': '+180', 'Paraguay': '+400', 'Australia': '+750' }
  },
  E: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Germany',
    impliedChance: '70%',
    upsetPick: 'Ecuador (+350)',
    scoutNote: 'Germany is a solid favorite, but Ecuador is widely seen as a value upset pick.',
    noviceTakeaway: 'Markets respect Germany, but Ecuador is widely seen as a value upset pick at mid-range plus money. Ivory Coast is another puncher’s chance option.',
    valuePicks: ['Ecuador'],
    fullOdds: { 'Germany': '-240', 'Ecuador': '+350', 'Ivory Coast': '+600', 'Curacao': '+4500' }
  },
  F: {
    status: 'Open',
    predictability: 1,
    favorite: 'Netherlands',
    impliedChance: '58%',
    upsetPick: 'Japan (+340)',
    scoutNote: 'Japan and Sweden are "live underdogs" capable of topping the group.',
    noviceTakeaway: 'Both Japan and Sweden sit in the classic "live underdog" zone: not favorites, but definitely capable. Tunisia is the higher-risk, bigger-payout upset.',
    valuePicks: ['Japan', 'Sweden'],
    fullOdds: { 'Netherlands': '-140', 'Japan': '+340', 'Sweden': '+430', 'Tunisia': '+1000' }
  },
  G: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Belgium',
    impliedChance: '68%',
    upsetPick: 'Egypt (+390)',
    scoutNote: 'Belgium is favored, but Egypt is a very sensible upset pick led by Salah.',
    noviceTakeaway: 'Belgium is favored, but Egypt is a very sensible upset pick if you believe in their regional strength. Iran offers a bigger price for a more speculative upset.',
    valuePicks: ['Egypt'],
    fullOdds: { 'Belgium': '-220', 'Egypt': '+390', 'Iran': '+700', 'New Zealand': '+1900' }
  },
  H: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Spain',
    impliedChance: '82%',
    upsetPick: 'Uruguay (+500)',
    scoutNote: 'Spain is one of the heaviest favorites. Uruguay is the only non-trivial upset chance.',
    noviceTakeaway: 'Spain is one of the heaviest group favorites in the tournament. Uruguay still has a non-trivial upset chance.',
    valuePicks: ['Uruguay'],
    fullOdds: { 'Spain': '-450', 'Uruguay': '+500', 'Saudi Arabia': '+2200', 'Cape Verde': '+7000' }
  },
  I: {
    status: 'Chalky',
    predictability: 2,
    favorite: 'France',
    impliedChance: '64%',
    upsetPick: 'Norway (+250)',
    scoutNote: 'Norway is the obvious challenger. Senegal is an interesting mid-range upset.',
    noviceTakeaway: 'Norway is the obvious challenger in the odds and offers a reasonable upset price. Senegal is an interesting mid-range upset.',
    valuePicks: ['Norway', 'Senegal'],
    fullOdds: { 'France': '-175', 'Norway': '+250', 'Senegal': '+700', 'Iraq': '+3000' }
  },
  J: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Argentina',
    impliedChance: '74%',
    upsetPick: 'Austria (+500)',
    scoutNote: 'Argentina expected to win comfortably. Austria and Algeria are credible upset plays.',
    noviceTakeaway: 'Market expects Argentina to win comfortably, but both Austria and Algeria are credible upset plays if you think Argentina could slip.',
    valuePicks: ['Austria', 'Algeria'],
    fullOdds: { 'Argentina': '-290', 'Austria': '+500', 'Algeria': '+650', 'Jordan': '+5000' }
  },
  K: {
    status: 'Chalky',
    predictability: 2,
    favorite: 'Portugal',
    impliedChance: '68%',
    upsetPick: 'Colombia (+260)',
    scoutNote: 'Colombia is a very strong upset candidate with a competitive team.',
    noviceTakeaway: 'Colombia is a very strong upset candidate: competitive team at mid-range plus money. DR Congo is a higher-variance upset spin.',
    valuePicks: ['Colombia'],
    fullOdds: { 'Portugal': '-210', 'Colombia': '+260', 'DR Congo': '+1000', 'Uzbekistan': '+3500' }
  },
  L: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'England',
    impliedChance: '68%',
    upsetPick: 'Croatia (+340)',
    scoutNote: 'Croatia is the clear "if things go wrong" option with proven pedigree.',
    noviceTakeaway: 'Croatia is the obvious "if something goes wrong for England" play, with proven tournament pedigree. Ghana is more speculative but offers a decent upset angle.',
    valuePicks: ['Croatia'],
    fullOdds: { 'England': '-220', 'Croatia': '+340', 'Ghana': '+700', 'Panama': '+4500' }
  }
};

export const MARKET_ODDS = {
  tournamentWinner: [
    { team: 'Spain', odds: '+445', chance: '18%' },
    { team: 'England', odds: '+575', chance: '15%' },
    { team: 'France', odds: '+625', chance: '14%' },
    { team: 'Brazil', odds: '+800', chance: '11%' },
    { team: 'Argentina', odds: '+800', chance: '11%' },
    { team: 'Germany', odds: '+1400', chance: '7%' },
    { team: 'Netherlands', odds: '+2000', chance: '5%' },
    { team: 'USA', odds: '+4000', chance: '2%' },
    { team: 'Mexico', odds: '+6600', chance: '1.5%' }
  ],
  goldenBoot: [
    { name: 'Kylian Mbappé', odds: '+600', chance: '14%' },
    { name: 'Harry Kane', odds: '+675', chance: '13%' },
    { name: 'Lionel Messi', odds: '+1200', chance: '8%' },
    { name: 'Erling Haaland', odds: '+1400', chance: '7%' },
    { name: 'Lamine Yamal', odds: '+1700', chance: '6%' }
  ],
  goldenBall: [
    { name: 'Kylian Mbappé', odds: '+600', chance: '14%' },
    { name: 'Harry Kane', odds: '+650', chance: '13%' },
    { name: 'Lionel Messi', odds: '+1200', chance: '8%' },
    { name: 'Erling Haaland', odds: '+1400', chance: '7%' },
    { name: 'Lamine Yamal', odds: '+1800', chance: '5%' }
  ],
  goldenGlove: [
    { name: 'Emiliano Martínez', odds: '+450', chance: '18%' },
    { name: 'Jordan Pickford', odds: '+500', chance: '16%' },
    { name: 'Thibaut Courtois', odds: '+600', chance: '14%' },
    { name: 'Mike Maignan', odds: '+650', chance: '13%' },
    { name: 'Unai Simón', odds: '+700', chance: '12%' }
  ],
  bestYoungPlayer: [
    { name: 'Lamine Yamal', odds: '+250', chance: '28%' },
    { name: 'Endrick', odds: '+500', chance: '16%' },
    { name: 'João Neves', odds: '+800', chance: '11%' },
    { name: 'Warren Zaïre-Emery', odds: '+1000', chance: '9%' }
  ]
};

export const TOURNAMENT_FAVORITES = ['Spain', 'England', 'France'];
