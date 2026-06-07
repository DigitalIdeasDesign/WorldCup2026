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
    scoutNote: 'Mexico projected winner, South Korea projected runner-up. Egypt and Norway projected best third-place qualifiers from other groups.',
    noviceTakeaway: 'Mexico and South Korea lead the charge. High volatility group with strong third-place contenders in the mix.',
    valuePicks: ['South Korea', 'Czech Republic'],
    fullOdds: { 'Mexico': '-120', 'Czech Republic': '+350', 'South Korea': '+330', 'South Africa': '+1100' }
  },
  B: {
    status: 'Open',
    predictability: 1,
    favorite: 'Switzerland',
    impliedChance: '50%',
    upsetPick: 'Canada (+185)',
    scoutNote: 'Switzerland projected winner, Canada projected runner-up. Massive battle for the top spot expected.',
    noviceTakeaway: 'Switzerland is a slight favorite, but Canada winning would not be shocking. Watch the Canada vs Switzerland match closely.',
    valuePicks: ['Canada', 'Bosnia-Herzegovina'],
    fullOdds: { 'Switzerland': '+105', 'Canada': '+185', 'Bosnia-Herzegovina': '+350', 'Qatar': '+2500' }
  },
  C: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Brazil',
    impliedChance: '75%',
    upsetPick: 'Morocco (+450)',
    scoutNote: 'Brazil projected winner, Morocco projected runner-up. Brazil seeking a return to glory.',
    noviceTakeaway: 'South America\'s leading contender is expected to dominate here. Morocco is the main "plausible upset" with pedigree.',
    valuePicks: ['Morocco'],
    fullOdds: { 'Brazil': '-290', 'Morocco': '+450', 'Scotland': '+700', 'Haiti': '+10000' }
  },
  D: {
    status: 'Open',
    predictability: 2,
    favorite: 'USA',
    impliedChance: '43%',
    upsetPick: 'Turkiye (+180)',
    scoutNote: 'United States projected winner on home soil, Türkiye projected runner-up.',
    noviceTakeaway: 'The US is the favorite to top the group, but Türkiye is a very dangerous runner-up candidate.',
    valuePicks: ['Turkey', 'Paraguay'],
    fullOdds: { 'United States': '+135', 'Turkey': '+180', 'Paraguay': '+400', 'Australia': '+750' }
  },
  E: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Germany',
    impliedChance: '70%',
    upsetPick: 'Ecuador (+350)',
    scoutNote: 'Germany projected winner, Ecuador projected runner-up. Ivory Coast a strong 3rd place contender.',
    noviceTakeaway: 'Germany remains the heavyweight, but Ecuador is widely seen as a value upset pick at mid-range plus money.',
    valuePicks: ['Ecuador'],
    fullOdds: { 'Germany': '-240', 'Ecuador': '+350', 'Ivory Coast': '+600', 'Curacao': '+4500' }
  },
  F: {
    status: 'Open',
    predictability: 1,
    favorite: 'Netherlands',
    impliedChance: '58%',
    upsetPick: 'Japan (+340)',
    scoutNote: 'Netherlands projected winner, Japan projected runner-up. Sweden projected best 3rd qualifier.',
    noviceTakeaway: 'The Netherlands are statistical dark horses. Japan and Sweden are "live underdogs" capable of topping the group.',
    valuePicks: ['Japan', 'Sweden'],
    fullOdds: { 'Netherlands': '-140', 'Japan': '+340', 'Sweden': '+430', 'Tunisia': '+1000' }
  },
  G: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Belgium',
    impliedChance: '68%',
    upsetPick: 'Egypt (+390)',
    scoutNote: 'Belgium projected winner, Iran projected runner-up. Egypt projected best 3rd qualifier.',
    noviceTakeaway: 'Belgium is favored, but keep an eye on Egypt led by Salah as a sensible upset pick or 3rd place qualifier.',
    valuePicks: ['Egypt'],
    fullOdds: { 'Belgium': '-220', 'Egypt': '+390', 'Iran': '+700', 'New Zealand': '+1900' }
  },
  H: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Spain',
    impliedChance: '82%',
    upsetPick: 'Uruguay (+500)',
    scoutNote: 'Spain projected winner (current favorite), Uruguay projected runner-up.',
    noviceTakeaway: 'Spain is the current favorite for the entire tournament. Uruguay is the only non-trivial upset chance.',
    valuePicks: ['Uruguay'],
    fullOdds: { 'Spain': '-450', 'Uruguay': '+500', 'Saudi Arabia': '+2200', 'Cape Verde': '+7000' }
  },
  I: {
    status: 'Chalky',
    predictability: 2,
    favorite: 'France',
    impliedChance: '64%',
    upsetPick: 'Norway (+250)',
    scoutNote: 'France projected winner, Senegal projected runner-up. Norway projected best 3rd qualifier.',
    noviceTakeaway: 'France has incredible depth. Senegal is a very strong runner-up play, with Norway as the obvious 3rd place challenger.',
    valuePicks: ['Norway', 'Senegal'],
    fullOdds: { 'France': '-175', 'Norway': '+250', 'Senegal': '+700', 'Iraq': '+3000' }
  },
  J: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'Argentina',
    impliedChance: '74%',
    upsetPick: 'Austria (+500)',
    scoutNote: 'Argentina projected winner (defending champs), Austria projected runner-up. Algeria projected best 3rd.',
    noviceTakeaway: 'Defending champions have the experience to challenge again. Austria is the credible runner-up play.',
    valuePicks: ['Austria', 'Algeria'],
    fullOdds: { 'Argentina': '-290', 'Austria': '+500', 'Algeria': '+650', 'Jordan': '+5000' }
  },
  K: {
    status: 'Chalky',
    predictability: 2,
    favorite: 'Portugal',
    impliedChance: '68%',
    upsetPick: 'Colombia (+260)',
    scoutNote: 'Portugal projected winner, Colombia projected runner-up.',
    noviceTakeaway: 'Portugal is loaded with talent. Colombia is a very strong runner-up candidate with a competitive team.',
    valuePicks: ['Colombia'],
    fullOdds: { 'Portugal': '-210', 'Colombia': '+260', 'DR Congo': '+1000', 'Uzbekistan': '+3500' }
  },
  L: {
    status: 'Chalky',
    predictability: 3,
    favorite: 'England',
    impliedChance: '68%',
    upsetPick: 'Croatia (+340)',
    scoutNote: 'England projected winner, Croatia projected runner-up. Ghana projected best 3rd.',
    noviceTakeaway: 'England has strong public support and a talented roster. Croatia remains the clear "pedigree" challenger.',
    valuePicks: ['Croatia'],
    fullOdds: { 'England': '-220', 'Croatia': '+340', 'Ghana': '+700', 'Panama': '+4500' }
  }
};

export const MARKET_ODDS = {
  tournamentWinner: [
    { team: 'Spain', odds: '+450', chance: '18%' },
    { team: 'France', odds: '+470', chance: '17.5%' },
    { team: 'England', odds: '+650', chance: '13%' },
    { team: 'Brazil', odds: '+850', chance: '11%' },
    { team: 'Portugal', odds: '+900', chance: '10%' },
    { team: 'Argentina', odds: '+1000', chance: '9%' },
    { team: 'Netherlands', odds: '+1800', chance: '5%' },
    { team: 'Germany', odds: '+1400', chance: '7%' },
  ],
  goldenBoot: [
    { name: 'Harry Kane', odds: '+750', chance: '12%' },
    { name: 'Kylian Mbappé', odds: '+900', chance: '10%' },
    { name: 'Erling Haaland', odds: '+1400', chance: '7%' },
    { name: 'Cristiano Ronaldo', odds: '+2500', chance: '4%' }
  ],
  goldenBall: [
    { name: 'Harry Kane', odds: '+750', chance: '13%' },
    { name: 'Lamine Yamal', odds: '+800', chance: '12%' },
    { name: 'Kylian Mbappé', odds: '+900', chance: '11%' },
    { name: 'Michael Olise', odds: '+1000', chance: '9%' },
    { name: 'Lionel Messi', odds: '+1200', chance: '8%' },
    { name: 'Vinícius Júnior', odds: '+1600', chance: '6%' }
  ],
  topAssist: [
    { name: 'Bruno Fernandes', odds: '+1000', chance: '10%' },
    { name: 'Michael Olise', odds: '+1000', chance: '10%' },
    { name: 'Lamine Yamal', odds: '+1200', chance: '8%' },
    { name: 'Lionel Messi', odds: '+1200', chance: '8%' },
    { name: 'Jérémy Doku', odds: '+1400', chance: '7%' }
  ],
  goldenGlove: [
    { name: 'Emiliano Martínez', odds: '+450', chance: '18%' },
    { name: 'Unai Simón', odds: '+500', chance: '16%' },
    { name: 'Alisson Becker', odds: '+600', chance: '14%' },
    { name: 'Mike Maignan', odds: '+650', chance: '13%' },
    { name: 'Jordan Pickford', odds: '+700', chance: '12%' }
  ]
};

export const TOURNAMENT_FAVORITES = ['Spain', 'France', 'England'];

export const KNOCKOUT_FORECAST = {
  roundOf32: {
    eliminations: ['Egypt', 'South Korea', 'Iran', 'Austria', 'Czech Republic', 'Algeria', 'Ghana', 'Ivory Coast']
  },
  roundOf16: {
    eliminations: ['Croatia', 'Mexico', 'United States', 'Canada', 'Switzerland', 'Senegal', 'Japan', 'Australia']
  },
  quarterfinals: {
    eliminations: ['Germany', 'Belgium', 'Uruguay', 'Colombia', 'Morocco', 'Netherlands', 'Norway', 'Portugal']
  },
  semifinals: {
    eliminations: ['Argentina', 'England']
  },
  final: {
    venue: 'MetLife Stadium',
    runnerUp: 'France',
    champion: 'Spain'
  }
};

export const TOURNAMENT_STATS = [
  { label: 'Total Teams', value: '48' },
  { label: 'Groups', value: '12' },
  { label: 'Total Matches', value: '104' },
  { label: 'Auto Qualifiers', value: '24' },
  { label: 'Best 3rd Qualifiers', value: '8' },
  { label: 'Round of 32 Teams', value: '32' },
  { label: 'Goal Projection', value: '275.5' }
];

export const BETTING_INSIGHTS = [
  { 
    title: '104 Total Matches', 
    description: 'The expanded format increases competition, creating more opportunities for goals and surprises.' 
  },
  { 
    title: '275.5 Goal Benchmark', 
    description: 'Markets project a high-scoring tournament given the larger structure and match count.' 
  },
  { 
    title: 'First-Time Champion Market', 
    description: 'Historical powers dominate, but Portugal and Netherlands are highlighted as potential first-time winners.' 
  }
];
